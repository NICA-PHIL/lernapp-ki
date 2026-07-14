'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { theme } from '@/lib/theme'

const SCHACH_THEMEN = [
  { id: 's1', icon: '♟️', titel: 'Bauern-Strategie', beschreibung: 'Wie Bauern die Kontrolle übers Brett bestimmen', level: 'Grundlagen' },
  { id: 's2', icon: '♞', titel: 'Springer & Läufer nutzen', beschreibung: 'Die Leichtfiguren clever einsetzen', level: 'Grundlagen' },
  { id: 's3', icon: '♜', titel: 'Türme aktivieren', beschreibung: 'Offene Linien finden und nutzen', level: 'Fortgeschritten' },
  { id: 's4', icon: '♛', titel: 'Die Dame sicher spielen', beschreibung: 'Die stärkste Figur nicht zu früh einsetzen', level: 'Fortgeschritten' },
  { id: 's5', icon: '♚', titel: 'Rochade & Königssicherheit', beschreibung: 'Den König frühzeitig in Sicherheit bringen', level: 'Grundlagen' },
  { id: 's6', icon: '🎯', titel: 'Matt in 2 Zügen', beschreibung: 'Erste taktische Kombinationen erkennen', level: 'Fortgeschritten' },
  { id: 's7', icon: '🧩', titel: 'Gabeln & Spieße', beschreibung: 'Zwei Figuren gleichzeitig angreifen', level: 'Fortgeschritten' },
  { id: 's8', icon: '🏆', titel: 'Berühmte Eröffnungen', beschreibung: 'Italienische Partie, Sizilianisch & mehr', level: 'Profi' },
]

export default function SchachPage() {
  const router = useRouter()
  const [childName, setChildName] = useState('')
  const [avatar, setAvatar] = useState<string | null>(null)
  const [completed, setCompleted] = useState<string[]>([])

  useEffect(() => {
    setChildName(localStorage.getItem('np_child_name') || 'Entdecker')
    setAvatar(localStorage.getItem('np_child_avatar'))
    const saved = localStorage.getItem('np_schach_progress')
    if (saved) setCompleted(JSON.parse(saved))
  }, [])

  function toggle(id: string) {
    const neu = completed.includes(id) ? completed.filter(x => x !== id) : [...completed, id]
    setCompleted(neu)
    localStorage.setItem('np_schach_progress', JSON.stringify(neu))
  }

  const farbe = '#1A1F36'
  const bg = '#EAF0FF'

  return (
    <div style={{ minHeight: '100vh', background: theme.bg, fontFamily: 'var(--font-body), system-ui, sans-serif', paddingBottom: '60px' }}>

      <div style={{ background: 'linear-gradient(135deg, #1A1F36, #4F7CFF)', padding: '32px 24px 60px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '16px', right: '24px', fontSize: '54px', opacity: 0.2 }}>♟️</div>
        <button onClick={() => router.push('/dashboard')} style={{ background: 'rgba(255,255,255,0.25)', border: 'none', borderRadius: '10px', padding: '8px 12px', color: 'white', fontSize: '14px', cursor: 'pointer', marginBottom: '20px' }}>← Zurück</button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {avatar && <img src={avatar} style={{ width: '52px', height: '52px', borderRadius: '50%', objectFit: 'cover', border: '3px solid rgba(255,255,255,0.5)' }} />}
          <div>
            <h1 style={{ fontSize: '22px', fontWeight: '800', color: 'white', margin: 0 }}>{childName}s Schach-Reise ♟️</h1>
            <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '13px', margin: '2px 0 0' }}>Vom Grundprinzip zur ersten Taktik</p>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '640px', margin: '-32px auto 0', padding: '0 20px' }}>

        {/* Fortschritt */}
        <div style={{ background: 'white', borderRadius: theme.radius.xl, padding: '20px', marginBottom: '20px', boxShadow: theme.shadow.md }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span style={{ fontSize: '13px', fontWeight: '700', color: theme.ink }}>Dein Schach-Level</span>
            <span style={{ fontSize: '13px', fontWeight: '800', color: farbe }}>{completed.length}/{SCHACH_THEMEN.length}</span>
          </div>
          <div style={{ height: '10px', background: theme.line, borderRadius: theme.radius.full, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${(completed.length / SCHACH_THEMEN.length) * 100}%`, background: `linear-gradient(90deg, ${farbe}, #4F7CFF)`, borderRadius: theme.radius.full, transition: 'width 0.6s ease' }} />
          </div>
        </div>

        <div style={{ background: bg, borderRadius: theme.radius.lg, padding: '14px 18px', marginBottom: '20px', fontSize: '12px', color: theme.mid, lineHeight: '1.6' }}>
          ♟️ Ihr habt dieses Jahr schon Schach gelernt — jetzt geht es darum, die Grundlagen zu vertiefen und erste Taktiken zu meistern!
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {SCHACH_THEMEN.map(t => {
            const done = completed.includes(t.id)
            return (
              <div key={t.id} style={{ background: 'white', borderRadius: theme.radius.md, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: '12px', border: `1px solid ${theme.line}`, opacity: done ? 0.65 : 1 }}>
                <button onClick={() => toggle(t.id)}
                  style={{ width: '26px', height: '26px', borderRadius: '50%', border: `2px solid ${done ? theme.brand.green : theme.line}`, background: done ? theme.brand.green : 'white', color: 'white', fontSize: '13px', fontWeight: '800', cursor: 'pointer', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{done ? '✓' : ''}</button>
                <div style={{ fontSize: '20px', flexShrink: 0 }}>{t.icon}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '13px', fontWeight: '700', color: theme.ink, textDecoration: done ? 'line-through' : 'none' }}>{t.titel}</div>
                  <div style={{ fontSize: '11px', color: theme.mid }}>{t.beschreibung}</div>
                </div>
                <span style={{ fontSize: '10px', fontWeight: '700', color: farbe, background: bg, padding: '3px 8px', borderRadius: theme.radius.full, whiteSpace: 'nowrap' }}>{t.level}</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
