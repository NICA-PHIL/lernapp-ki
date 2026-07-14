'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { theme } from '@/lib/theme'

const PIANO_LEKTIONEN = [
  { id: 'p1', titel: 'Handhaltung & Fingersätze', beschreibung: 'Die Grundlage für alles Weitere', dauer: '15 Min' },
  { id: 'p2', titel: 'C-Dur Tonleiter', beschreibung: 'Die wichtigste Tonleiter zum Einstieg', dauer: '15 Min' },
  { id: 'p3', titel: 'Einfache Akkorde', beschreibung: 'C, F, G — die Basis für viele Popsongs', dauer: '20 Min' },
  { id: 'p4', titel: 'Beide Hände zusammen', beschreibung: 'Melodie und Begleitung kombinieren', dauer: '20 Min' },
  { id: 'p5', titel: 'Vom-Blatt-Spielen üben', beschreibung: 'Noten direkt beim Ansehen spielen', dauer: '20 Min' },
]

const GESANG_UEBUNGEN = [
  { id: 'v1', titel: 'Atemtechnik', beschreibung: 'Die Basis für einen starken, kontrollierten Ton', dauer: '10 Min' },
  { id: 'v2', titel: 'Stimmumfang finden', beschreibung: 'Deine höchsten und tiefsten Töne entdecken', dauer: '15 Min' },
  { id: 'v3', titel: 'Aufwärmübungen', beschreibung: 'Kurze Übungen vor jedem Singen', dauer: '10 Min' },
  { id: 'v4', titel: 'Auf Englisch aussprechen', beschreibung: 'Songtexte klar und sicher aussprechen', dauer: '15 Min' },
]

// Aktuelle, altersgerechte Songs für Teenager — DE / EN / RU
const SONGS_TEEN = [
  { titel: 'Vois sur ton chemin', hinweis: 'Ruhiger Einstieg, tolle Melodie', sprache: '🇩🇪 Deutsch', kategorie: 'Balladen' },
  { titel: 'Perfect', künstler: 'Ed Sheeran', hinweis: 'Beliebter Klassiker, gut für Piano+Gesang', sprache: '🇬🇧 Englisch', kategorie: 'Pop-Ballade' },
  { titel: 'Someone You Loved', künstler: 'Lewis Capaldi', hinweis: 'Emotionale Ballade, mittlerer Schwierigkeitsgrad', sprache: '🇬🇧 Englisch', kategorie: 'Pop-Ballade' },
  { titel: '505', künstler: 'Arctic Monkeys', hinweis: 'Für Fortgeschrittene, tolles Gefühl', sprache: '🇬🇧 Englisch', kategorie: 'Indie' },
  { titel: 'Komm, gib mir deine Hand', hinweis: 'Deutsche Popklassiker zum Üben', sprache: '🇩🇪 Deutsch', kategorie: 'Pop' },
  { titel: 'Между нами тает лёд', künstler: 'Грибы', hinweis: 'Bekannter russischer Popsong', sprache: '🇷🇺 Russisch', kategorie: 'Pop' },
  { titel: 'Я свободен', künstler: 'Кипелов', hinweis: 'Kraftvoller Rock-Klassiker', sprache: '🇷🇺 Russisch', kategorie: 'Rock' },
  { titel: 'Розовое вино', künstler: 'Element Fam & Feduk', hinweis: 'Moderner, entspannter Sommer-Hit', sprache: '🇷🇺 Russisch', kategorie: 'Pop' },
]

export default function PianoGesang() {
  const router = useRouter()
  const [childName, setChildName] = useState('')
  const [activeTab, setActiveTab] = useState<'piano' | 'gesang' | 'songs'>('piano')
  const [completed, setCompleted] = useState<string[]>([])

  useEffect(() => {
    setChildName(localStorage.getItem('np_child_name') || 'Nicole')
    const saved = localStorage.getItem('np_musik_progress')
    if (saved) setCompleted(JSON.parse(saved))
  }, [])

  function toggle(id: string) {
    const neu = completed.includes(id) ? completed.filter(x => x !== id) : [...completed, id]
    setCompleted(neu)
    localStorage.setItem('np_musik_progress', JSON.stringify(neu))
  }

  const farbe = '#8A5CFF'
  const bg = '#F2EBFF'

  return (
    <div style={{ minHeight: '100vh', background: theme.bg, fontFamily: 'system-ui, sans-serif', paddingBottom: '60px' }}>

      <div style={{ background: 'linear-gradient(135deg, #8A5CFF, #FF7CB0)', padding: '32px 24px 60px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '16px', right: '24px', fontSize: '54px', opacity: 0.2 }}>🎹</div>
        <button onClick={() => router.push('/dashboard')} style={{ background: 'rgba(255,255,255,0.25)', border: 'none', borderRadius: '10px', padding: '8px 12px', color: 'white', fontSize: '14px', cursor: 'pointer', marginBottom: '20px' }}>← Zurück</button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <img src="/avatars/nica-solo.png" style={{ width: '52px', height: '52px', borderRadius: '50%', objectFit: 'cover', border: '3px solid rgba(255,255,255,0.5)' }} />
          <div>
            <h1 style={{ fontSize: '22px', fontWeight: '800', color: 'white', margin: 0 }}>{childName}s Piano & Gesang 🎹🎤</h1>
            <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '13px', margin: '2px 0 0' }}>Songs auf Deutsch, Englisch & Russisch</p>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '640px', margin: '-32px auto 0', padding: '0 20px' }}>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '6px', marginBottom: '20px', background: 'white', padding: '6px', borderRadius: theme.radius.md, boxShadow: theme.shadow.md }}>
          {[
            { id: 'piano', label: '🎹 Piano' },
            { id: 'gesang', label: '🎤 Gesang' },
            { id: 'songs', label: '🎵 Songs' },
          ].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id as typeof activeTab)}
              style={{ flex: 1, padding: '10px', borderRadius: theme.radius.sm, border: 'none', fontWeight: '700', fontSize: '13px', cursor: 'pointer', background: activeTab === tab.id ? farbe : 'transparent', color: activeTab === tab.id ? 'white' : theme.mid, transition: 'all 0.2s' }}>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Piano Lektionen */}
        {activeTab === 'piano' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {PIANO_LEKTIONEN.map(l => {
              const done = completed.includes(l.id)
              return (
                <div key={l.id} style={{ background: 'white', borderRadius: theme.radius.md, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: '12px', border: `1px solid ${theme.line}`, opacity: done ? 0.65 : 1 }}>
                  <button onClick={() => toggle(l.id)}
                    style={{ width: '26px', height: '26px', borderRadius: '50%', border: `2px solid ${done ? theme.brand.green : theme.line}`, background: done ? theme.brand.green : 'white', color: 'white', fontSize: '13px', fontWeight: '800', cursor: 'pointer', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{done ? '✓' : ''}</button>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '13px', fontWeight: '700', color: theme.ink, textDecoration: done ? 'line-through' : 'none' }}>{l.titel}</div>
                    <div style={{ fontSize: '11px', color: theme.mid }}>{l.beschreibung}</div>
                  </div>
                  <span style={{ fontSize: '10px', fontWeight: '700', color: farbe, background: bg, padding: '3px 8px', borderRadius: theme.radius.full }}>{l.dauer}</span>
                </div>
              )
            })}
          </div>
        )}

        {/* Gesang Übungen */}
        {activeTab === 'gesang' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {GESANG_UEBUNGEN.map(l => {
              const done = completed.includes(l.id)
              return (
                <div key={l.id} style={{ background: 'white', borderRadius: theme.radius.md, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: '12px', border: `1px solid ${theme.line}`, opacity: done ? 0.65 : 1 }}>
                  <button onClick={() => toggle(l.id)}
                    style={{ width: '26px', height: '26px', borderRadius: '50%', border: `2px solid ${done ? theme.brand.green : theme.line}`, background: done ? theme.brand.green : 'white', color: 'white', fontSize: '13px', fontWeight: '800', cursor: 'pointer', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{done ? '✓' : ''}</button>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '13px', fontWeight: '700', color: theme.ink, textDecoration: done ? 'line-through' : 'none' }}>{l.titel}</div>
                    <div style={{ fontSize: '11px', color: theme.mid }}>{l.beschreibung}</div>
                  </div>
                  <span style={{ fontSize: '10px', fontWeight: '700', color: farbe, background: bg, padding: '3px 8px', borderRadius: theme.radius.full }}>{l.dauer}</span>
                </div>
              )
            })}
          </div>
        )}

        {/* Songs */}
        {activeTab === 'songs' && (
          <div>
            <p style={{ fontSize: '12px', color: theme.mid, marginBottom: '14px' }}>Aktuelle und beliebte Songs für Piano & Gesang — sortiert nach Sprache</p>
            {['🇩🇪 Deutsch', '🇬🇧 Englisch', '🇷🇺 Russisch'].map(sprache => (
              <div key={sprache} style={{ marginBottom: '16px' }}>
                <div style={{ fontSize: '12px', fontWeight: '800', color: farbe, marginBottom: '8px' }}>{sprache}</div>
                <div style={{ background: 'white', borderRadius: theme.radius.lg, padding: '14px', border: `1px solid ${theme.line}` }}>
                  {SONGS_TEEN.filter(s => s.sprache === sprache).map((s, i, arr) => (
                    <div key={i} style={{ paddingBottom: i < arr.length - 1 ? '10px' : 0, marginBottom: i < arr.length - 1 ? '10px' : 0, borderBottom: i < arr.length - 1 ? `1px solid ${theme.line}` : 'none' }}>
                      <div style={{ fontSize: '13px', fontWeight: '700', color: theme.ink }}>{s.titel} {s.künstler && <span style={{ fontWeight: '400', color: theme.muted }}>— {s.künstler}</span>}</div>
                      <div style={{ fontSize: '11px', color: theme.mid, marginTop: '2px' }}>{s.hinweis} · {s.kategorie}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
