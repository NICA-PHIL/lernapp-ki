'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { theme } from '@/lib/theme'

function generiereCode() {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

export default function KindErstellen() {
  const router = useRouter()
  const supabase = createClient()
  const [name, setName] = useState('')
  const [klasse, setKlasse] = useState(3)
  const [code, setCode] = useState<string | null>(null)
  const [kindEmail, setKindEmail] = useState('')
  const [versendet, setVersendet] = useState(false)

  async function erstellen() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user || !name.trim()) return

    const { data: kind } = await supabase.from('children')
      .insert({ parent_id: user.id, name, klasse, selbst_registriert: false })
      .select().single()

    if (kind) await supabase.from('parent_child_links').insert({ parent_id: user.id, child_id: kind.id })

    const neuerCode = generiereCode()
    await supabase.from('family_codes').insert({
      code: neuerCode, parent_id: user.id, child_id: kind?.id, typ: 'eltern_erstellt_kind'
    })
    setCode(neuerCode)
  }

  async function perMailSenden() {
    // Vorbereitet für echten Mail-Versand (z.B. via Resend/Supabase Edge Function)
    // Aktuell: zeigt Bestätigung, echter Versand folgt in Ausbaustufe 2
    setVersendet(true)
  }

  return (
    <div style={{ minHeight: '100vh', background: theme.bg, fontFamily: 'var(--font-body), system-ui', padding: '32px 20px' }}>
      <div style={{ maxWidth: '440px', margin: '0 auto', background: 'white', borderRadius: theme.radius.xl, padding: '32px', boxShadow: '0 8px 32px rgba(79,124,255,0.1)' }}>

        {!code ? (
          <>
            <h1 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '20px' }}>👶 Kind hinzufügen</h1>
            <label style={{ fontSize: '13px', fontWeight: '700', display: 'block', marginBottom: '6px' }}>Name des Kindes</label>
            <input value={name} onChange={e => setName(e.target.value)} placeholder="z.B. Philipp"
              style={{ width: '100%', padding: '12px 14px', border: `2px solid ${theme.line}`, borderRadius: theme.radius.md, marginBottom: '16px', boxSizing: 'border-box' }} />

            <label style={{ fontSize: '13px', fontWeight: '700', display: 'block', marginBottom: '6px' }}>Klasse (nach den Ferien)</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '24px' }}>
              {[1,2,3,4,5,6,7,8,9,10].map(k => (
                <button key={k} onClick={() => setKlasse(k)}
                  style={{ width: '38px', height: '38px', borderRadius: theme.radius.sm, border: `2px solid ${klasse === k ? theme.brand.blue : theme.line}`, background: klasse === k ? theme.soft.blue : 'white', fontWeight: '700', cursor: 'pointer' }}>{k}</button>
              ))}
            </div>

            <button onClick={erstellen} disabled={!name.trim()}
              style={{ width: '100%', padding: '14px', background: theme.gradients.primary, color: 'white', border: 'none', borderRadius: theme.radius.md, fontWeight: '800', cursor: 'pointer' }}>
              Kind-Profil erstellen →
            </button>
          </>
        ) : (
          <>
            <h1 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '8px' }}>✅ {name} ist bereit!</h1>
            <p style={{ fontSize: '13px', color: theme.mid, marginBottom: '20px' }}>So bekommt {name} Zugang — wähle eine Option:</p>

            <div style={{ background: theme.soft.blue, borderRadius: theme.radius.lg, padding: '20px', textAlign: 'center', marginBottom: '16px' }}>
              <div style={{ fontSize: '11px', fontWeight: '700', color: theme.brand.blue, marginBottom: '8px', textTransform: 'uppercase' }}>Familien-Code</div>
              <div style={{ fontSize: '32px', fontWeight: '800', letterSpacing: '6px', color: theme.ink }}>{code}</div>
              <p style={{ fontSize: '11px', color: theme.mid, marginTop: '8px' }}>Gib diesen Code am Gerät von {name} ein, unter "Ich habe einen Code"</p>
            </div>

            <div style={{ fontSize: '12px', fontWeight: '700', color: theme.muted, textAlign: 'center', marginBottom: '12px' }}>— oder —</div>

            {!versendet ? (
              <>
                <input value={kindEmail} onChange={e => setKindEmail(e.target.value)} placeholder="E-Mail des Kindes (optional)"
                  style={{ width: '100%', padding: '12px 14px', border: `2px solid ${theme.line}`, borderRadius: theme.radius.md, marginBottom: '10px', boxSizing: 'border-box' }} />
                <button onClick={perMailSenden} disabled={!kindEmail}
                  style={{ width: '100%', padding: '12px', background: '#F3F4F6', color: '#374151', border: 'none', borderRadius: theme.radius.md, fontWeight: '700', cursor: 'pointer', marginBottom: '20px' }}>
                  📧 Zugangslink per Mail senden
                </button>
              </>
            ) : (
              <div style={{ background: theme.soft.green, borderRadius: theme.radius.md, padding: '14px', textAlign: 'center', marginBottom: '20px', fontSize: '13px', color: '#1a7a45', fontWeight: '700' }}>
                ✓ Zugangslink an {kindEmail} vorbereitet
              </div>
            )}

            <button onClick={() => router.push('/eltern-einblicke')}
              style={{ width: '100%', padding: '14px', background: theme.gradients.primary, color: 'white', border: 'none', borderRadius: theme.radius.md, fontWeight: '800', cursor: 'pointer' }}>
              Fertig — zum Eltern-Dashboard →
            </button>
          </>
        )}
      </div>
    </div>
  )
}
