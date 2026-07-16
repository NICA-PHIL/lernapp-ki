'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { theme } from '@/lib/theme'
import { LivingAvatar } from '@/components/LivingAvatar'

interface Lektion {
  id: string
  titel: string
  beschreibung: string
  level: 'Anfänger' | 'Fortgeschritten'
  dauer: string
}

const AKKORDE_GRUNDLAGEN: Lektion[] = [
  { id: 'g1', titel: 'Die ersten 3 Akkorde', beschreibung: 'Em, C und G — der Start für fast jeden Song', level: 'Anfänger', dauer: '15 Min' },
  { id: 'g2', titel: 'Akkordwechsel üben', beschreibung: 'Flüssig zwischen Akkorden wechseln ohne zu stoppen', level: 'Anfänger', dauer: '15 Min' },
  { id: 'g3', titel: 'Anschlagmuster', beschreibung: 'Der einfache Down-Up Rhythmus für Songs', level: 'Anfänger', dauer: '15 Min' },
  { id: 'g4', titel: 'D und A dazu lernen', beschreibung: 'Erweitere dein Akkord-Repertoire', level: 'Fortgeschritten', dauer: '20 Min' },
  { id: 'g5', titel: 'Barré-Grundlagen', beschreibung: 'Der erste Schritt zu F-Dur und mehr', level: 'Fortgeschritten', dauer: '20 Min' },
  { id: 'g6', titel: 'Fingerpicking Basics', beschreibung: 'Statt schrammeln — einzelne Saiten zupfen', level: 'Fortgeschritten', dauer: '20 Min' },
]

const SONGS_ANFAENGER = [
  { titel: 'Someone Like You', künstler: 'Adele', akkorde: 'A, E, F#m, D', sprache: '🇬🇧' },
  { titel: '99 Luftballons', künstler: 'Nena', akkorde: 'Em, C, G, D', sprache: '🇩🇪' },
  { titel: 'Wonderwall', künstler: 'Oasis', akkorde: 'Em7, G, Dsus4, A7sus4', sprache: '🇬🇧' },
  { titel: 'Perfect', künstler: 'Ed Sheeran', akkorde: 'G, Em, C, D', sprache: '🇬🇧' },
]

export default function GitarrePage() {
  const router = useRouter()
  const [childName, setChildName] = useState('')
  const [completedLektionen, setCompletedLektionen] = useState<string[]>([])

  useEffect(() => {
    setChildName(localStorage.getItem('np_child_name') || 'Entdecker')
    const saved = localStorage.getItem('np_gitarre_progress')
    if (saved) setCompletedLektionen(JSON.parse(saved))
  }, [])

  function toggleLektion(id: string) {
    const neu = completedLektionen.includes(id) ? completedLektionen.filter(l => l !== id) : [...completedLektionen, id]
    setCompletedLektionen(neu)
    localStorage.setItem('np_gitarre_progress', JSON.stringify(neu))
  }

  const avatar = '/avatars/phil-solo.png'
  const farbe = '#FF8C42'
  const bg = '#FFF0E6'

  return (
    <div style={{ minHeight: '100vh', background: theme.bg, fontFamily: 'var(--font-body), system-ui, sans-serif', paddingBottom: '60px' }}>

      <div style={{ background: 'linear-gradient(135deg, #FF8C42, #FFB648)', padding: '32px 24px 60px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '16px', right: '24px', fontSize: '54px', opacity: 0.2 }}>🎸</div>
        <button onClick={() => router.push('/dashboard')} style={{ background: 'rgba(255,255,255,0.25)', border: 'none', borderRadius: theme.radius.sm, padding: '8px 12px', color: 'white', fontSize: '14px', cursor: 'pointer', marginBottom: '20px' }}>← Zurück</button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <LivingAvatar src={avatar} alt="Phil" character="phil" size={52} />
          <div>
            <h1 style={{ fontSize: '22px', fontWeight: '800', color: 'white', margin: 0 }}>{childName}s Gitarre 🎸</h1>
            <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '13px', margin: '2px 0 0' }}>Von den ersten Akkorden zum ersten Song</p>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '640px', margin: '-32px auto 0', padding: '0 20px' }}>

        {/* Fortschritt */}
        <div style={{ background: 'white', borderRadius: theme.radius.xl, padding: '20px', marginBottom: '20px', boxShadow: theme.shadow.md }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span style={{ fontSize: '13px', fontWeight: '700', color: theme.ink }}>Deine Gitarren-Reise</span>
            <span style={{ fontSize: '13px', fontWeight: '800', color: farbe }}>{completedLektionen.length}/{AKKORDE_GRUNDLAGEN.length}</span>
          </div>
          <div style={{ height: '10px', background: theme.line, borderRadius: theme.radius.full, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${(completedLektionen.length / AKKORDE_GRUNDLAGEN.length) * 100}%`, background: `linear-gradient(90deg, ${farbe}, #FFB648)`, borderRadius: theme.radius.full, transition: 'width 0.6s ease' }} />
          </div>
        </div>

        {/* Lektionen */}
        <div style={{ marginBottom: '10px', fontSize: '15px', fontWeight: '800', color: theme.ink }}>🎼 Deine Lektionen</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '28px' }}>
          {AKKORDE_GRUNDLAGEN.map(l => {
            const done = completedLektionen.includes(l.id)
            return (
              <div key={l.id} style={{ background: 'white', borderRadius: theme.radius.md, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: '12px', border: `1px solid ${theme.line}`, opacity: done ? 0.65 : 1 }}>
                <button onClick={() => toggleLektion(l.id)}
                  style={{ width: '26px', height: '26px', borderRadius: '50%', border: `2px solid ${done ? theme.brand.green : theme.line}`, background: done ? theme.brand.green : 'white', color: 'white', fontSize: '13px', fontWeight: '800', cursor: 'pointer', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {done ? '✓' : ''}
                </button>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '13px', fontWeight: '700', color: theme.ink, textDecoration: done ? 'line-through' : 'none' }}>{l.titel}</div>
                  <div style={{ fontSize: '11px', color: theme.mid }}>{l.beschreibung}</div>
                </div>
                <span style={{ fontSize: '10px', fontWeight: '700', color: farbe, background: bg, padding: '3px 8px', borderRadius: theme.radius.full, whiteSpace: 'nowrap' }}>{l.level}</span>
              </div>
            )
          })}
        </div>

        {/* Song-Vorschläge */}
        <div style={{ marginBottom: '10px', fontSize: '15px', fontWeight: '800', color: theme.ink }}>🎵 Songs zum Üben</div>
        <p style={{ fontSize: '12px', color: theme.mid, marginBottom: '14px' }}>Diese Songs klingen schon nach wenigen Akkorden richtig gut!</p>
        <div style={{ background: 'white', borderRadius: theme.radius.lg, padding: '18px', border: `1px solid ${theme.line}` }}>
          {SONGS_ANFAENGER.map((s, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingBottom: i < SONGS_ANFAENGER.length - 1 ? '12px' : 0, marginBottom: i < SONGS_ANFAENGER.length - 1 ? '12px' : 0, borderBottom: i < SONGS_ANFAENGER.length - 1 ? `1px solid ${theme.line}` : 'none' }}>
              <span style={{ fontSize: '20px' }}>{s.sprache}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '13px', fontWeight: '700', color: theme.ink }}>{s.titel} <span style={{ fontWeight: '400', color: theme.muted }}>— {s.künstler}</span></div>
                <div style={{ fontSize: '11px', color: theme.mid, marginTop: '2px' }}>Akkorde: {s.akkorde}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
