'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { theme } from '@/lib/theme'

interface Klang {
  id: string
  icon: string
  titel: string
  beschreibung: string
  farbe: string
  bg: string
}

const KLAENGE: Klang[] = [
  { id: 'regen', icon: '🌧️', titel: 'Sanfter Regen', beschreibung: 'Gleichmäßiges Regengeräusch zum Entspannen', farbe: '#5B8FD1', bg: '#EAF2FB' },
  { id: 'wald', icon: '🌳', titel: 'Wald & Vögel', beschreibung: 'Vogelgezwitscher und raschelnde Blätter', farbe: '#6FA678', bg: '#EEF7EF' },
  { id: 'meer', icon: '🌊', titel: 'Meereswellen', beschreibung: 'Ruhiges Rauschen der Wellen', farbe: '#4A9FB5', bg: '#E8F5F7' },
  { id: 'kamin', icon: '🔥', titel: 'Knisterndes Kaminfeuer', beschreibung: 'Warmes, gemütliches Knistern', farbe: '#C88A5B', bg: '#FAF0E8' },
  { id: 'klavier', icon: '🎹', titel: 'Sanftes Klavier', beschreibung: 'Ruhige, langsame Klaviermusik ohne Text', farbe: '#9B8AC4', bg: '#F3F0FA' },
  { id: 'stille', icon: '🤍', titel: 'Einfach Stille', beschreibung: 'Manchmal ist gar kein Geräusch das Beste', farbe: '#8B92A0', bg: '#F2F3F5' },
]

const ATEMUEBUNG_SCHRITTE = [
  { text: 'Einatmen', dauer: 4 },
  { text: 'Halten', dauer: 4 },
  { text: 'Ausatmen', dauer: 6 },
]

export default function Entspannung() {
  const router = useRouter()
  const [childName, setChildName] = useState('')
  const [ausgewaehlterKlang, setAusgewaehlterKlang] = useState<string | null>(null)
  const [atemModus, setAtemModus] = useState(false)
  const [atemSchritt, setAtemSchritt] = useState(0)
  const [atemSkalierung, setAtemSkalierung] = useState(1)

  useEffect(() => {
    setChildName(localStorage.getItem('np_child_name') || '')
  }, [])

  useEffect(() => {
    if (!atemModus) return
    const schritt = ATEMUEBUNG_SCHRITTE[atemSchritt]
    setAtemSkalierung(schritt.text === 'Einatmen' ? 1.4 : schritt.text === 'Ausatmen' ? 0.8 : atemSkalierung)
    const timer = setTimeout(() => {
      setAtemSchritt((prev) => (prev + 1) % ATEMUEBUNG_SCHRITTE.length)
    }, schritt.dauer * 1000)
    return () => clearTimeout(timer)
  }, [atemModus, atemSchritt])

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #F0F4FA 0%, #E8EEF7 100%)',
      fontFamily: 'var(--font-body), system-ui, sans-serif',
      paddingBottom: '60px',
      transition: 'background 1.2s ease'
    }}>

      {/* Ruhiger Header — kein knalliger Farbverlauf, kein Punkte-System sichtbar */}
      <div style={{ padding: '32px 24px 40px', textAlign: 'center' }}>
        <button onClick={() => router.push('/dashboard')}
          style={{ position: 'absolute', left: '20px', top: '24px', background: 'rgba(255,255,255,0.6)', border: 'none', borderRadius: theme.radius.sm, padding: '8px 14px', color: '#5B6577', fontSize: '13px', cursor: 'pointer' }}>
          ← Zurück
        </button>
        <div style={{ fontSize: '40px', marginBottom: '10px', animation: 'sanftSchweben 4s ease-in-out infinite' }}>🌙</div>
        <h1 style={{ fontSize: '20px', fontWeight: '700', color: '#3D4759', margin: '0 0 6px' }}>
          {childName ? `Eine ruhige Minute, ${childName}` : 'Eine ruhige Minute'}
        </h1>
        <p style={{ color: '#7D8598', fontSize: '13px', margin: 0 }}>Kein Druck, keine Punkte — nur Ruhe</p>
      </div>

      <div style={{ maxWidth: '520px', margin: '0 auto', padding: '0 20px' }}>

        {/* Atemübung */}
        <div style={{ background: 'white', borderRadius: theme.radius.xl, padding: '28px 20px', marginBottom: '20px', textAlign: 'center', boxShadow: '0 4px 20px rgba(91,143,209,0.08)' }}>
          <div style={{ fontSize: '13px', fontWeight: '700', color: '#5B6577', marginBottom: '20px' }}>Atemübung</div>

          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
            <div style={{
              width: '100px', height: '100px', borderRadius: '50%',
              background: 'linear-gradient(135deg, #A8C5E8, #C4B8E8)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transform: atemModus ? `scale(${atemSkalierung})` : 'scale(1)',
              transition: 'transform 3.5s ease-in-out',
              boxShadow: '0 8px 32px rgba(168,197,232,0.4)'
            }}>
              <span style={{ color: 'white', fontSize: '13px', fontWeight: '700' }}>
                {atemModus ? ATEMUEBUNG_SCHRITTE[atemSchritt].text : '🤍'}
              </span>
            </div>
          </div>

          <p style={{ fontSize: '12px', color: '#8B92A0', marginBottom: '18px', lineHeight: '1.6', maxWidth: '320px', margin: '0 auto 18px' }}>
            {atemModus
              ? 'Folge einfach dem Kreis — einatmen, halten, ausatmen.'
              : '4 Sekunden einatmen, 4 Sekunden halten, 6 Sekunden ausatmen. Das beruhigt Körper und Kopf.'}
          </p>

          <button onClick={() => { setAtemModus(!atemModus); setAtemSchritt(0) }}
            style={{
              padding: '12px 28px', borderRadius: theme.radius.full, border: 'none',
              background: atemModus ? theme.line : 'linear-gradient(135deg, #A8C5E8, #C4B8E8)',
              color: atemModus ? '#5B6577' : 'white', fontSize: '13px', fontWeight: '700', cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}>
            {atemModus ? 'Beenden' : 'Starten'}
          </button>
        </div>

        {/* Klänge */}
        <div style={{ marginBottom: '12px', fontSize: '13px', fontWeight: '700', color: '#5B6577', textAlign: 'center' }}>
          Wähle einen beruhigenden Klang
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '24px' }}>
          {KLAENGE.map(k => {
            const aktiv = ausgewaehlterKlang === k.id
            return (
              <button key={k.id} onClick={() => setAusgewaehlterKlang(aktiv ? null : k.id)}
                style={{
                  background: aktiv ? k.bg : 'white',
                  border: `2px solid ${aktiv ? k.farbe : '#EEF1F6'}`,
                  borderRadius: theme.radius.lg, padding: '18px 14px', cursor: 'pointer', textAlign: 'center',
                  transition: 'all 0.3s ease',
                  transform: aktiv ? 'scale(1.02)' : 'scale(1)'
                }}>
                <div style={{ fontSize: '26px', marginBottom: '8px', filter: aktiv ? 'none' : 'grayscale(20%)' }}>{k.icon}</div>
                <div style={{ fontSize: '12.5px', fontWeight: '700', color: aktiv ? k.farbe : '#3D4759', marginBottom: '4px' }}>{k.titel}</div>
                <div style={{ fontSize: '10.5px', color: '#9BA3B0', lineHeight: '1.4' }}>{k.beschreibung}</div>
                {aktiv && (
                  <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'center', gap: '3px' }}>
                    {[0, 1, 2].map(i => (
                      <div key={i} style={{
                        width: '3px', height: '12px', borderRadius: theme.radius.full, background: k.farbe,
                        animation: `wellenBalken 1.2s ease-in-out infinite`,
                        animationDelay: `${i * 0.15}s`
                      }} />
                    ))}
                  </div>
                )}
              </button>
            )
          })}
        </div>

        {/* Sanfter Hinweistext */}
        <div style={{ background: 'rgba(255,255,255,0.7)', borderRadius: theme.radius.lg, padding: '16px 20px', textAlign: 'center' }}>
          <p style={{ fontSize: '11.5px', color: '#8B92A0', margin: 0, lineHeight: '1.7' }}>
            Manchmal braucht der Kopf einfach eine Pause — vor dem Lernen, danach, oder wenn es zu viel wird. Das ist völlig in Ordnung. 🤍
          </p>
        </div>
      </div>

      <style>{`
        @keyframes sanftSchweben {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        @keyframes wellenBalken {
          0%, 100% { height: 6px; opacity: 0.5; }
          50% { height: 14px; opacity: 1; }
        }
      `}</style>
    </div>
  )
}
