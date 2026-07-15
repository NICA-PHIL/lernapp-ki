'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { theme } from '@/lib/theme'

function generiereCode() {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

interface Kind { id: string; name: string }

export default function ZugangTeilen() {
  const router = useRouter()
  const supabase = createClient()
  const [kinder, setKinder] = useState<Kind[]>([])
  const [ausgewaehlt, setAusgewaehlt] = useState<string>('')
  const [code, setCode] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => { laden() }, [])

  async function laden() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { router.push('/login'); return }
    const { data } = await supabase.from('parent_child_links').select('children(id, name)').eq('parent_id', user.id)
    const liste = (data || []).map((row: any) => row.children).filter(Boolean) as Kind[]
    setKinder(liste)
    if (liste[0]) setAusgewaehlt(liste[0].id)
    setLoading(false)
  }

  async function codeErstellen() {
    if (!ausgewaehlt) return
    const neuerCode = generiereCode()
    await supabase.from('family_codes').insert({
      code: neuerCode, child_id: ausgewaehlt, typ: 'eltern_laedt_eltern_ein',
    })
    setCode(neuerCode)
  }

  return (
    <div style={{ minHeight: '100vh', background: theme.bg, fontFamily: 'var(--font-body), system-ui, sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: '480px', margin: '0 auto' }}>
        <button onClick={() => router.push('/eltern-uebersicht')} style={{ background: 'white', border: `1px solid ${theme.line}`, borderRadius: '10px', padding: '8px 14px', fontSize: '13px', cursor: 'pointer', marginBottom: '20px' }}>← Zurück</button>

        <h1 style={{ fontSize: '20px', fontWeight: '800', color: theme.ink, marginBottom: '6px' }}>👪 Zugang teilen</h1>
        <p style={{ fontSize: '13px', color: theme.mid, marginBottom: '24px' }}>Gebt Großeltern, dem zweiten Elternteil oder der Nanny echten Zugriff auf dasselbe Kinderprofil.</p>

        {loading ? (
          <p style={{ color: theme.muted, fontSize: '13px' }}>Lädt…</p>
        ) : kinder.length === 0 ? (
          <p style={{ color: theme.muted, fontSize: '13px', fontStyle: 'italic' }}>Noch kein Kind angelegt.</p>
        ) : !code ? (
          <div style={{ background: 'white', borderRadius: theme.radius.lg, padding: '20px', border: `1px solid ${theme.line}` }}>
            <div style={{ fontSize: '13px', fontWeight: '700', color: theme.ink, marginBottom: '10px' }}>Für welches Kind?</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
              {kinder.map(kind => (
                <button key={kind.id} onClick={() => setAusgewaehlt(kind.id)}
                  style={{ padding: '12px 14px', borderRadius: theme.radius.md, border: `2px solid ${ausgewaehlt === kind.id ? theme.brand.blue : theme.line}`, background: ausgewaehlt === kind.id ? theme.soft.blue : 'white', fontWeight: '700', fontSize: '14px', textAlign: 'left', cursor: 'pointer', color: theme.ink }}>
                  {kind.name}
                </button>
              ))}
            </div>
            <button onClick={codeErstellen}
              style={{ width: '100%', padding: '14px', background: theme.gradients.primary, color: 'white', border: 'none', borderRadius: theme.radius.md, fontWeight: '800', cursor: 'pointer' }}>
              Einladungscode erstellen →
            </button>
          </div>
        ) : (
          <div style={{ background: 'white', borderRadius: theme.radius.lg, padding: '20px', border: `1px solid ${theme.line}` }}>
            <div style={{ background: theme.soft.blue, borderRadius: theme.radius.lg, padding: '20px', textAlign: 'center', marginBottom: '16px' }}>
              <div style={{ fontSize: '11px', fontWeight: '700', color: theme.brand.blue, marginBottom: '8px', textTransform: 'uppercase' }}>Einladungscode</div>
              <div style={{ fontSize: '32px', fontWeight: '800', letterSpacing: '6px', color: theme.ink }}>{code}</div>
            </div>
            <ol style={{ margin: '0 0 20px', paddingLeft: '18px', fontSize: '13px', color: theme.mid, lineHeight: '1.9' }}>
              <li>Die Person registriert sich unter <strong>nica-phil.com/login</strong></li>
              <li>Wählt "Ich bin ein Elternteil"</li>
              <li>Gibt diesen Code unter "Hat sich dein Kind schon selbst registriert?" ein</li>
              <li>Sieht danach dasselbe Kinderprofil, dieselben Fortschritte und Einblicke</li>
            </ol>
            <button onClick={() => { setCode(null) }}
              style={{ width: '100%', padding: '12px', background: '#F3F4F6', color: '#374151', border: 'none', borderRadius: theme.radius.md, fontWeight: '700', cursor: 'pointer' }}>
              Weiteren Code erstellen
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
