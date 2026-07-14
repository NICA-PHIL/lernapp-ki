'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { theme } from '@/lib/theme'
import { BaukastenAvatar } from '@/components/BaukastenAvatar'

interface Kind { id: string; name: string; klasse: number; avatar_prefs: any; selbst_registriert: boolean }

export default function ElternUebersicht() {
  const router = useRouter()
  const supabase = createClient()
  const [kinder, setKinder] = useState<Kind[]>([])
  const [loading, setLoading] = useState(true)
  const [code, setCode] = useState('')
  const [codeFehler, setCodeFehler] = useState('')
  const [codeLoading, setCodeLoading] = useState(false)

  useEffect(() => { laden() }, [])

  async function laden() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { router.push('/login'); return }
    const { data } = await supabase.from('children').select('*').eq('parent_id', user.id)
    setKinder(data || [])
    setLoading(false)
  }

  function kindAnzeigen(kind: Kind) {
    localStorage.setItem('np_child_name', kind.name)
    localStorage.setItem('np_child_klasse', String(kind.klasse))
    if (kind.avatar_prefs?.type === 'baukasten') {
      localStorage.setItem('np_child_avatar_typ', 'baukasten')
      localStorage.setItem('np_child_avatar_baukasten', JSON.stringify(kind.avatar_prefs))
      localStorage.setItem('np_child_avatar', '')
    }
    router.push('/dashboard')
  }

  async function codeEinloesen() {
    setCodeLoading(true); setCodeFehler('')
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { setCodeLoading(false); return }

    const { data: gefunden } = await supabase.from('family_codes')
      .select('*').eq('code', code).eq('typ', 'kind_laedt_eltern_ein').eq('eingeloest', false).single()

    if (!gefunden) { setCodeFehler('Code nicht gefunden oder schon verwendet'); setCodeLoading(false); return }

    await supabase.from('family_codes').update({ eingeloest: true, parent_id: user.id }).eq('id', gefunden.id)
    await supabase.from('children').update({ parent_id: user.id }).eq('id', gefunden.child_id)

    setCode('')
    setCodeLoading(false)
    laden()
  }

  return (
    <div style={{ minHeight: '100vh', background: theme.bg, fontFamily: 'var(--font-body), system-ui, sans-serif', paddingBottom: '60px' }}>
      <div style={{ background: theme.gradients.eltern, padding: '32px 24px 44px' }}>
        <div style={{ maxWidth: '680px', margin: '0 auto' }}>
          <div style={{ fontSize: '13px', fontWeight: '700', color: 'rgba(255,255,255,0.6)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '6px' }}>ELTERN-BEREICH</div>
          <h1 style={{ fontFamily: theme.font.display, fontSize: '24px', fontWeight: '600', color: 'white', margin: 0 }}>Willkommen zurück 👋</h1>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '13px', margin: '4px 0 0' }}>Kinder verwalten, Einblicke ansehen, Zugang teilen</p>
        </div>
      </div>

      <div style={{ maxWidth: '680px', margin: '-24px auto 0', padding: '0 20px' }}>

        {/* ── Kinder-Liste ── */}
        <div style={{ background: 'white', borderRadius: theme.radius.xl, padding: '22px', marginBottom: '16px', border: `1px solid ${theme.line}`, boxShadow: '0 4px 20px rgba(79,124,255,0.06)' }}>
          <div style={{ fontSize: '15px', fontWeight: '700', color: theme.ink, marginBottom: '14px' }}>Eure Kinder</div>

          {loading ? (
            <p style={{ color: theme.muted, fontSize: '13px' }}>Lädt…</p>
          ) : kinder.length === 0 ? (
            <p style={{ color: theme.muted, fontSize: '13px', fontStyle: 'italic', marginBottom: '16px' }}>Noch kein Kind verknüpft.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
              {kinder.map(kind => (
                <button key={kind.id} onClick={() => kindAnzeigen(kind)}
                  style={{ background: theme.bg, border: `1.5px solid ${theme.line}`, borderRadius: theme.radius.lg, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer', textAlign: 'left' }}>
                  <BaukastenAvatar gesicht={kind.avatar_prefs?.gesicht} hautton={kind.avatar_prefs?.hautton || theme.soft.blue} haarfarbe={kind.avatar_prefs?.haarfarbe || theme.brand.blue} accessoire={kind.avatar_prefs?.accessoire} size={42} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: '800', fontSize: '14px', color: theme.ink }}>{kind.name}</div>
                    <div style={{ fontSize: '11.5px', color: theme.muted }}>Klasse {kind.klasse}{kind.selbst_registriert ? ' · hat eigenes Konto' : ''}</div>
                  </div>
                  <span style={{ fontSize: '13px', fontWeight: '700', color: theme.brand.blue }}>Anzeigen →</span>
                </button>
              ))}
            </div>
          )}

          <button onClick={() => router.push('/kind-erstellen')} style={{
            width: '100%', padding: '13px', background: theme.soft.blue, color: theme.brand.blue, border: 'none',
            borderRadius: theme.radius.md, fontWeight: '700', fontSize: '13.5px', cursor: 'pointer',
          }}>+ Kind hinzufügen</button>
        </div>

        {/* ── Code eines selbst-registrierten Kindes einlösen ── */}
        <div style={{ background: 'white', borderRadius: theme.radius.xl, padding: '22px', marginBottom: '16px', border: `1px solid ${theme.line}` }}>
          <div style={{ fontSize: '14px', fontWeight: '700', color: theme.ink, marginBottom: '4px' }}>Hat sich dein Kind schon selbst registriert?</div>
          <p style={{ fontSize: '12px', color: theme.mid, marginBottom: '12px' }}>Gib den 6-stelligen Code ein, den es dir gezeigt hat.</p>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input value={code} onChange={e => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))} placeholder="000000"
              style={{ flex: 1, padding: '12px 14px', fontSize: '18px', textAlign: 'center', letterSpacing: '4px', border: `2px solid ${theme.line}`, borderRadius: theme.radius.sm, fontFamily: 'monospace', boxSizing: 'border-box' }} />
            <button onClick={codeEinloesen} disabled={code.length !== 6 || codeLoading}
              style={{ padding: '0 20px', background: code.length === 6 ? theme.gradients.primary : theme.line, color: 'white', border: 'none', borderRadius: theme.radius.sm, fontWeight: '800', cursor: code.length === 6 ? 'pointer' : 'default' }}>
              {codeLoading ? '…' : 'OK'}
            </button>
          </div>
          {codeFehler && <p style={{ color: '#DC2626', fontSize: '12px', marginTop: '8px' }}>{codeFehler}</p>}
        </div>

        {/* ── Weitere Eltern-Funktionen ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <button onClick={() => router.push('/eltern-einblicke')} style={{
            background: 'white', border: `1px solid ${theme.line}`, borderRadius: theme.radius.lg, padding: '16px 18px',
            display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', textAlign: 'left',
          }}>
            <span style={{ fontSize: '20px' }}>👁️</span>
            <span style={{ flex: 1, fontWeight: '700', fontSize: '13.5px', color: theme.ink }}>Eltern-Einblicke</span>
            <span style={{ color: theme.muted }}>→</span>
          </button>
          <button onClick={() => router.push('/zugang-teilen')} style={{
            background: 'white', border: `1px solid ${theme.line}`, borderRadius: theme.radius.lg, padding: '16px 18px',
            display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', textAlign: 'left',
          }}>
            <span style={{ fontSize: '20px' }}>👪</span>
            <span style={{ flex: 1, fontWeight: '700', fontSize: '13.5px', color: theme.ink }}>Zugang teilen</span>
            <span style={{ color: theme.muted }}>→</span>
          </button>
          <button onClick={() => router.push('/feedback-uebersicht')} style={{
            background: 'white', border: `1px solid ${theme.line}`, borderRadius: theme.radius.lg, padding: '16px 18px',
            display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', textAlign: 'left',
          }}>
            <span style={{ fontSize: '20px' }}>💬</span>
            <span style={{ flex: 1, fontWeight: '700', fontSize: '13.5px', color: theme.ink }}>Feedback ansehen</span>
            <span style={{ color: theme.muted }}>→</span>
          </button>
        </div>
      </div>
    </div>
  )
}
