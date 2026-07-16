'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { theme } from '@/lib/theme'

const STILE = [
  {
    id: 'sterne', icon: '⭐', titel: 'Sterne & Punkte',
    beschreibung: 'Sammle Sterne und Punkte für jede Aufgabe — wie ein kleines Spiel!',
    beispiel: '"3 von 3 Sternen! 🌟🌟🌟"',
    farbe: theme.brand.warn, bg: theme.soft.warn,
  },
  {
    id: 'noten', icon: '📊', titel: 'Noten',
    beschreibung: 'Bekomme richtige Schulnoten für deine Übungen — wie ein Test.',
    beispiel: '"Note: 2 — gut gemacht!"',
    farbe: theme.brand.blue, bg: theme.soft.blue,
  },
  {
    id: 'fortschritt', icon: '📈', titel: 'Nur Fortschritt',
    beschreibung: 'Kein Punktesystem — du siehst nur, wie viel du schon gelernt hast.',
    beispiel: '"Du hast 8 von 10 Themen geschafft"',
    farbe: theme.brand.green, bg: theme.soft.green,
  },
  {
    id: 'worte', icon: '💬', titel: 'Nur Worte',
    beschreibung: 'Nica & Phil sagen dir einfach ehrlich, wie es lief — ganz ohne Zahlen.',
    beispiel: '"Das hast du richtig gut verstanden!"',
    farbe: theme.brand.pink, bg: theme.soft.pink,
  },
]

export default function MeinStil() {
  const router = useRouter()
  const [childName, setChildName] = useState('')
  const [selected, setSelected] = useState<string | null>(null)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    setChildName(localStorage.getItem('np_child_name') || 'Entdecker')
    const s = localStorage.getItem('np_belohnungsstil')
    if (s) setSelected(s)
  }, [])

  function handleSelect(id: string) {
    setSelected(id)
    localStorage.setItem('np_belohnungsstil', id)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div style={{ minHeight: '100vh', background: theme.bg, fontFamily: 'var(--font-body), system-ui, sans-serif', paddingBottom: '60px' }}>

      <div style={{ background: 'linear-gradient(135deg, #FFB648, #FF7CB0)', padding: '32px 24px 60px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '16px', right: '24px', fontSize: '54px', opacity: 0.2 }}>🎨</div>
        <button onClick={() => router.push('/dashboard')} style={{ background: 'rgba(255,255,255,0.25)', border: 'none', borderRadius: theme.radius.sm, padding: '8px 12px', color: 'white', fontSize: '14px', cursor: 'pointer', marginBottom: '20px' }}>← Zurück</button>
        <h1 style={{ fontSize: '22px', fontWeight: '800', color: 'white', margin: 0 }}>Wie willst du dein Ergebnis sehen, {childName}?</h1>
        <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '13px', margin: '4px 0 0' }}>Probier es aus — du kannst es jederzeit ändern!</p>
      </div>

      <div style={{ maxWidth: '640px', margin: '-32px auto 0', padding: '0 20px' }}>

        {saved && (
          <div style={{ background: theme.soft.green, border: `1.5px solid ${theme.brand.green}`, borderRadius: theme.radius.md, padding: '12px 16px', marginBottom: '16px', textAlign: 'center', fontSize: '13px', fontWeight: '700', color: theme.brand.green }}>
            ✓ Gespeichert! Ab jetzt siehst du deine Ergebnisse so.
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
          {STILE.map(stil => {
            const active = selected === stil.id
            return (
              <button key={stil.id} onClick={() => handleSelect(stil.id)}
                style={{ background: 'white', border: `2.5px solid ${active ? stil.farbe : theme.line}`, borderRadius: theme.radius.lg, padding: '20px 16px', cursor: 'pointer', textAlign: 'left', boxShadow: active ? `0 8px 24px ${stil.farbe}33` : theme.shadow.sm, transition: 'all 0.2s', position: 'relative' }}>
                {active && (
                  <div style={{ position: 'absolute', top: '12px', right: '12px', width: '24px', height: '24px', borderRadius: '50%', background: stil.farbe, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: '800' }}>✓</div>
                )}
                <div style={{ width: '48px', height: '48px', borderRadius: theme.radius.md, background: stil.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', marginBottom: '12px' }}>{stil.icon}</div>
                <div style={{ fontWeight: '800', fontSize: '15px', color: theme.ink, marginBottom: '6px' }}>{stil.titel}</div>
                <p style={{ fontSize: '12px', color: theme.mid, lineHeight: '1.5', margin: '0 0 10px' }}>{stil.beschreibung}</p>
                <div style={{ background: stil.bg, borderRadius: theme.radius.sm, padding: '8px 10px', fontSize: '11px', fontWeight: '600', color: stil.farbe }}>{stil.beispiel}</div>
              </button>
            )
          })}
        </div>

        <div style={{ background: 'white', borderRadius: theme.radius.lg, padding: '16px 20px', marginTop: '20px', border: `1px solid ${theme.line}`, display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
          <span style={{ fontSize: '18px' }}>💡</span>
          <p style={{ fontSize: '12px', color: theme.mid, margin: 0, lineHeight: '1.6' }}>
            Probier ruhig verschiedene Stile aus! Manche Kinder mögen Sterne, andere lieber ehrliche Worte. Du kannst das jederzeit hier ändern.
          </p>
        </div>
      </div>
    </div>
  )
}
