'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

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
    <div style={{ minHeight: '100vh', background: '#F3F6FC', fontFamily: 'system-ui', padding: '32px 20px' }}>
      <div style={{ maxWidth: '440px', margin: '0 auto', background: 'white', borderRadius: '24px', padding: '32px', boxShadow: '0 8px 32px rgba(79,124,255,0.1)' }}>

        {!code ? (
          <>
            <h1 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '20px' }}>👶 Kind hinzufügen</h1>
            <label style={{ fontSize: '13px', fontWeight: '700', display: 'block', marginBottom: '6px' }}>Name des Kindes</label>
            <input value={name} onChange={e => setName(e.target.value)} placeholder="z.B. Philipp"
              style={{ width: '100%', padding: '12px 14px', border: '2px solid #E8ECF4', borderRadius: '12px', marginBottom: '16px', boxSizing: 'border-box' }} />

            <label style={{ fontSize: '13px', fontWeight: '700', display: 'block', marginBottom: '6px' }}>Klasse (nach den Ferien)</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '24px' }}>
              {[1,2,3,4,5,6,7,8,9,10].map(k => (
                <button key={k} onClick={() => setKlasse(k)}
                  style={{ width: '38px', height: '38px', borderRadius: '10px', border: `2px solid ${klasse === k ? '#4F7CFF' : '#E8ECF4'}`, background: klasse === k ? '#EAF0FF' : 'white', fontWeight: '700', cursor: 'pointer' }}>{k}</button>
              ))}
            </div>

            <button onClick={erstellen} disabled={!name.trim()}
              style={{ width: '100%', padding: '14px', background: 'linear-gradient(135deg,#4F7CFF,#8A5CFF)', color: 'white', border: 'none', borderRadius: '14px', fontWeight: '800', cursor: 'pointer' }}>
              Kind-Profil erstellen →
            </button>
          </>
        ) : (
          <>
            <h1 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '8px' }}>✅ {name} ist bereit!</h1>
            <p style={{ fontSize: '13px', color: '#6B7280', marginBottom: '20px' }}>So bekommt {name} Zugang — wähle eine Option:</p>

            <div style={{ background: '#EAF0FF', borderRadius: '16px', padding: '20px', textAlign: 'center', marginBottom: '16px' }}>
              <div style={{ fontSize: '11px', fontWeight: '700', color: '#4F7CFF', marginBottom: '8px', textTransform: 'uppercase' }}>Familien-Code</div>
              <div style={{ fontSize: '32px', fontWeight: '800', letterSpacing: '6px', color: '#1A1F36' }}>{code}</div>
              <p style={{ fontSize: '11px', color: '#6B7280', marginTop: '8px' }}>Gib diesen Code am Gerät von {name} ein, unter "Ich habe einen Code"</p>
            </div>

            <div style={{ fontSize: '12px', fontWeight: '700', color: '#9CA3AF', textAlign: 'center', marginBottom: '12px' }}>— oder —</div>

            {!versendet ? (
              <>
                <input value={kindEmail} onChange={e => setKindEmail(e.target.value)} placeholder="E-Mail des Kindes (optional)"
                  style={{ width: '100%', padding: '12px 14px', border: '2px solid #E8ECF4', borderRadius: '12px', marginBottom: '10px', boxSizing: 'border-box' }} />
                <button onClick={perMailSenden} disabled={!kindEmail}
                  style={{ width: '100%', padding: '12px', background: '#F3F4F6', color: '#374151', border: 'none', borderRadius: '12px', fontWeight: '700', cursor: 'pointer', marginBottom: '20px' }}>
                  📧 Zugangslink per Mail senden
                </button>
              </>
            ) : (
              <div style={{ background: '#E3FAEE', borderRadius: '12px', padding: '14px', textAlign: 'center', marginBottom: '20px', fontSize: '13px', color: '#1a7a45', fontWeight: '700' }}>
                ✓ Zugangslink an {kindEmail} vorbereitet
              </div>
            )}

            <button onClick={() => router.push('/eltern-einblicke')}
              style={{ width: '100%', padding: '14px', background: 'linear-gradient(135deg,#4F7CFF,#8A5CFF)', color: 'white', border: 'none', borderRadius: '14px', fontWeight: '800', cursor: 'pointer' }}>
              Fertig — zum Eltern-Dashboard →
            </button>
          </>
        )}
      </div>
    </div>
  )
}
