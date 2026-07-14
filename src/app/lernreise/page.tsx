'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

const LERNPFADE: Record<string, { titel: string; fach: string; icon: string; farbe: string; bg: string; avatar: 'nica'|'phil'; stationen: { id: string; titel: string; thema: string; status: 'done'|'active'|'locked' }[] }[]> = {
  '3': [
    { titel: 'Mathe-Abenteuer', fach: 'mathe', icon: '🔢', farbe: '#4F7CFF', bg: 'linear-gradient(135deg,#EAF0FF,#F5F8FF)', avatar: 'phil', stationen: [
      { id: 'm1', titel: 'Zahlen bis 1000', thema: 'Zahlenraum erweitern', status: 'done' },
      { id: 'm2', titel: 'Einmaleins-Meister', thema: 'Das kleine 1x1 sicher können', status: 'done' },
      { id: 'm3', titel: 'Schriftlich rechnen', thema: 'Addition & Subtraktion untereinander', status: 'active' },
      { id: 'm4', titel: 'Formen-Detektiv', thema: 'Rechteck, Quadrat, Symmetrie', status: 'locked' },
      { id: 'm5', titel: 'Geld & Zeit', thema: 'Euro, Cent, Uhrzeiten', status: 'locked' },
    ]},
    { titel: 'Deutsch-Reise', fach: 'deutsch', icon: '📖', farbe: '#FF7CB0', bg: 'linear-gradient(135deg,#FFE8F1,#FFF5F9)', avatar: 'nica', stationen: [
      { id: 'd1', titel: 'Rechtschreib-Tricks', thema: 'Strategien: verlängern, ableiten', status: 'done' },
      { id: 'd2', titel: 'Wortarten-Zoo', thema: 'Nomen, Verben, Adjektive', status: 'active' },
      { id: 'd3', titel: 'Geschichten schreiben', thema: 'Erlebniserzählung', status: 'locked' },
    ]},
    { titel: 'English Start', fach: 'englisch', icon: '🌍', farbe: '#37C978', bg: 'linear-gradient(135deg,#E3FAEE,#F3FDF7)', avatar: 'nica', stationen: [
      { id: 'e1', titel: 'Hello & Numbers', thema: 'Begrüßung, Zahlen 1-20', status: 'active' },
      { id: 'e2', titel: 'My Family', thema: 'Familie vorstellen', status: 'locked' },
    ]},
  ],
  '7': [
    { titel: 'Mathematik', fach: 'mathe', icon: '📐', farbe: '#4F7CFF', bg: 'linear-gradient(135deg,#EAF0FF,#F5F8FF)', avatar: 'phil', stationen: [
      { id: 'm1', titel: 'Rationale Zahlen', thema: 'Negative Zahlen, Brüche', status: 'done' },
      { id: 'm2', titel: 'Terme & Gleichungen', thema: 'Vereinfachen, Lösen', status: 'active' },
      { id: 'm3', titel: 'Prozent & Zinsen', thema: 'Grundwert, Zinsrechnung', status: 'locked' },
      { id: 'm4', titel: 'Dreiecke & Winkel', thema: 'Konstruktion, Winkelsummen', status: 'locked' },
    ]},
    { titel: 'Deutsch', fach: 'deutsch', icon: '✍️', farbe: '#FF7CB0', bg: 'linear-gradient(135deg,#FFE8F1,#FFF5F9)', avatar: 'nica', stationen: [
      { id: 'd1', titel: 'Argumentieren', thema: 'These, Argument, Beispiel', status: 'active' },
      { id: 'd2', titel: 'Balladen', thema: 'Analyse, Merkmale', status: 'locked' },
    ]},
    { titel: 'Englisch', fach: 'englisch', icon: '🇬🇧', farbe: '#37C978', bg: 'linear-gradient(135deg,#E3FAEE,#F3FDF7)', avatar: 'nica', stationen: [
      { id: 'e1', titel: 'Tenses Mastery', thema: 'Present Perfect vs Simple Past', status: 'done' },
      { id: 'e2', titel: 'Writing Skills', thema: 'Emails, Berichte schreiben', status: 'active' },
    ]},
    { titel: 'Spanisch', fach: 'spanisch', icon: '🇪🇸', farbe: '#FFB648', bg: 'linear-gradient(135deg,#FFF4E0,#FFFAF0)', avatar: 'nica', stationen: [
      { id: 's1', titel: '¡Hola!', thema: 'Erste Wörter, Begrüßung', status: 'active' },
    ]},
  ],
}

export default function LernreisePage() {
  const router = useRouter()
  const [childName, setChildName] = useState('')
  const [klasse, setKlasse] = useState('3')
  const [activePath, setActivePath] = useState(0)

  useEffect(() => {
    setChildName(localStorage.getItem('np_child_name') || 'Entdecker')
    const k = localStorage.getItem('np_child_klasse') || '3'
    setKlasse(parseInt(k) >= 5 ? '7' : '3')
  }, [])

  const pfade = LERNPFADE[klasse] || LERNPFADE['3']
  const pfad = pfade[activePath] || pfade[0]
  const done = pfad.stationen.filter(s => s.status === 'done').length

  return (
    <div style={{ minHeight: '100vh', background: '#F3F6FC', fontFamily: 'system-ui, sans-serif', paddingBottom: '100px' }}>
      <div style={{ background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(20px)', padding: '16px 24px', display: 'flex', alignItems: 'center', gap: '14px', borderBottom: '1px solid #EEF1F6', position: 'sticky', top: 0, zIndex: 10 }}>
        <button onClick={() => router.push('/dashboard')} style={{ background: '#F3F6FC', border: 'none', borderRadius: '10px', padding: '8px 12px', fontSize: '14px', cursor: 'pointer' }}>← Zurück</button>
        <div>
          <div style={{ fontWeight: '800', fontSize: '15px', color: '#1A1F36' }}>{childName}s Lernreise 🗺️</div>
          <div style={{ fontSize: '11.5px', color: '#8B92A5' }}>Klasse {klasse} · Berliner Lehrplan</div>
        </div>
      </div>

      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '24px 20px' }}>

        <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', overflowX: 'auto', paddingBottom: '4px' }}>
          {pfade.map((p, i) => (
            <button key={p.fach} onClick={() => setActivePath(i)}
              style={{ padding: '10px 18px', borderRadius: '100px', border: 'none', fontWeight: '700', fontSize: '13px', cursor: 'pointer', whiteSpace: 'nowrap', background: activePath === i ? 'linear-gradient(135deg,#4F7CFF,#8A5CFF)' : 'white', color: activePath === i ? 'white' : '#6B7280', boxShadow: activePath === i ? '0 6px 16px rgba(79,124,255,0.3)' : '0 2px 8px rgba(0,0,0,0.04)' }}>
              {p.icon} {p.titel}
            </button>
          ))}
        </div>

        <div style={{ background: 'white', borderRadius: '20px', padding: '18px', marginBottom: '20px', boxShadow: '0 4px 20px rgba(79,124,255,0.06)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span style={{ fontSize: '13px', fontWeight: '700', color: '#1A1F36' }}>{pfad.titel} — Fortschritt</span>
            <span style={{ fontSize: '13px', fontWeight: '800', color: pfad.farbe }}>{done}/{pfad.stationen.length}</span>
          </div>
          <div style={{ height: '10px', background: '#EEF1F6', borderRadius: '100px', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${(done/pfad.stationen.length)*100}%`, background: `linear-gradient(90deg,${pfad.farbe},#8A5CFF)`, borderRadius: '100px', transition: 'width 0.6s ease' }} />
          </div>
        </div>

        <div style={{ position: 'relative', paddingLeft: '28px' }}>
          <div style={{ position: 'absolute', left: '13px', top: '24px', bottom: '24px', width: '3px', background: '#EEF1F6', borderRadius: '100px' }} />
          {pfad.stationen.map(station => {
            const isDone = station.status === 'done', isActive = station.status === 'active', isLocked = station.status === 'locked'
            return (
              <div key={station.id} style={{ position: 'relative', marginBottom: '14px' }}>
                <div style={{ position: 'absolute', left: '-28px', top: '22px', width: '26px', height: '26px', borderRadius: '50%', background: isDone ? '#37C978' : isActive ? pfad.farbe : 'white', border: `3px solid ${isDone ? '#37C978' : isActive ? pfad.farbe : '#EEF1F6'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', color: 'white', zIndex: 2, boxShadow: isActive ? `0 0 0 5px ${pfad.farbe}22` : 'none' }}>
                  {isDone ? '✓' : isActive ? '★' : '🔒'}
                </div>
                <button onClick={() => !isLocked && router.push(`/chat?subject=${pfad.fach}&avatar=${pfad.avatar}&topic=${encodeURIComponent(station.titel)}`)}
                  disabled={isLocked}
                  style={{ width: '100%', textAlign: 'left', background: 'white', border: `2px solid ${isActive ? pfad.farbe : '#EEF1F6'}`, borderRadius: '16px', padding: '16px 18px', cursor: isLocked ? 'default' : 'pointer', opacity: isLocked ? 0.5 : 1, boxShadow: isActive ? `0 8px 20px ${pfad.farbe}22` : '0 2px 8px rgba(0,0,0,0.03)' }}>
                  <div style={{ fontWeight: '800', fontSize: '14px', color: '#1A1F36', marginBottom: '3px' }}>{station.titel}</div>
                  <div style={{ fontSize: '11.5px', color: '#8B92A5' }}>{station.thema}</div>
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
