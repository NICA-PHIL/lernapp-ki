'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface Tag {
  tag: number
  fach: string
  icon: string
  titel: string
  fokus: string
  dauer: string
  avatar: 'nica' | 'phil'
}

const PHILIPP_PLAN: { woche: number; titel: string; farbe: string; tage: Tag[] }[] = [
  {
    woche: 1, titel: 'Schreibschrift-Werkstatt', farbe: '#FF8C42',
    tage: [
      { tag: 1, fach: 'Deutsch', icon: '✍️', titel: 'Buchstaben-Boxen', fokus: 'Schwierige Buchstaben einzeln üben', dauer: '15 Min', avatar: 'nica' },
      { tag: 2, fach: 'Deutsch', icon: '✍️', titel: 'Wörter verbinden', fokus: 'Buchstaben flüssig aneinanderreihen', dauer: '15 Min', avatar: 'nica' },
      { tag: 3, fach: 'Mathe', icon: '🔢', titel: 'Zahlenraum-Check', fokus: 'Wiederholung: Zahlenraum bis 100', dauer: '15 Min', avatar: 'phil' },
    ]
  },
  {
    woche: 2, titel: 'Hallo Englisch!', farbe: '#37C978',
    tage: [
      { tag: 4, fach: 'Englisch', icon: '🌍', titel: 'Hello, my name is...', fokus: 'Sich vorstellen auf Englisch', dauer: '15 Min', avatar: 'nica' },
      { tag: 5, fach: 'Deutsch', icon: '✍️', titel: 'Diktat-Training', fokus: 'Kurzes Diktat, häufige Fehlerwörter', dauer: '15 Min', avatar: 'nica' },
    ]
  },
]

const NICOLE_PLAN: { woche: number; titel: string; farbe: string; tage: Tag[] }[] = [
  {
    woche: 1, titel: 'Mathe-Fundament', farbe: '#6C8FFF',
    tage: [
      { tag: 1, fach: 'Mathe', icon: '📐', titel: 'Bruchrechnung Reset', fokus: 'Erweitern, Kürzen, Grundrechenarten', dauer: '20 Min', avatar: 'phil' },
      { tag: 2, fach: 'Deutsch', icon: '📝', titel: 'Grammatik-Check', fokus: 'Satzglieder, Wortarten wiederholen', dauer: '15 Min', avatar: 'nica' },
      { tag: 3, fach: 'Spanisch', icon: '🇪🇸', titel: '¡Hola! Erste Wörter', fokus: 'Begrüßung, Zahlen 1-20', dauer: '15 Min', avatar: 'nica' },
    ]
  },
]

export default function SommermissionPage() {
  const router = useRouter()
  const [activeChild, setActiveChild] = useState<'philipp' | 'nicole'>('philipp')
  const [expandedWoche, setExpandedWoche] = useState(0)
  const [completedTage, setCompletedTage] = useState<number[]>([])

  useEffect(() => {
    const saved = localStorage.getItem('np_sommer_progress')
    if (saved) setCompletedTage(JSON.parse(saved))
  }, [])

  const plan = activeChild === 'philipp' ? PHILIPP_PLAN : NICOLE_PLAN
  const childInfo = activeChild === 'philipp'
    ? { name: 'Philipp', klasse: '3', avatar: '/avatars/phil-solo.png', color: '#4F7CFF', bg: '#EAF0FF' }
    : { name: 'Nicole', klasse: '7 (Gymnasium)', avatar: '/avatars/nica-solo.png', color: '#FF7CB0', bg: '#FFE8F1' }

  const totalTage = plan.reduce((sum, w) => sum + w.tage.length, 0)
  const doneTage = plan.reduce((sum, w) => sum + w.tage.filter(t => completedTage.includes(t.tag)).length, 0)

  function toggleTag(tag: number) {
    const newCompleted = completedTage.includes(tag)
      ? completedTage.filter(t => t !== tag)
      : [...completedTage, tag]
    setCompletedTage(newCompleted)
    localStorage.setItem('np_sommer_progress', JSON.stringify(newCompleted))
  }

  return (
    <div style={{ minHeight: '100vh', background: '#F3F6FC', fontFamily: 'system-ui, sans-serif', paddingBottom: '60px' }}>
      <div style={{ background: 'linear-gradient(135deg, #FF8C42, #FF6B9D, #8A5CFF)', padding: '32px 24px 60px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '20px', right: '30px', fontSize: '60px', opacity: 0.25 }}>☀️</div>
        <button onClick={() => router.push('/dashboard')} style={{ background: 'rgba(255,255,255,0.25)', border: 'none', borderRadius: '10px', padding: '8px 12px', color: 'white', fontSize: '14px', cursor: 'pointer', marginBottom: '16px' }}>← Zurück</button>
        <h1 style={{ fontSize: '28px', fontWeight: '800', color: 'white', margin: '0 0 6px' }}>☀️ Sommermission 2026</h1>
        <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '14px', margin: 0 }}>Fit werden für das neue Schuljahr</p>
      </div>

      <div style={{ maxWidth: '640px', margin: '-36px auto 0', padding: '0 20px' }}>
        <div style={{ background: 'white', borderRadius: '20px', padding: '8px', display: 'flex', gap: '6px', boxShadow: '0 8px 24px rgba(0,0,0,0.1)', marginBottom: '20px' }}>
          <button onClick={() => setActiveChild('philipp')}
            style={{ flex: 1, padding: '14px', borderRadius: '14px', border: 'none', cursor: 'pointer', background: activeChild === 'philipp' ? '#EAF0FF' : 'transparent', display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'center' }}>
            <img src="/avatars/phil-solo.png" style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }} />
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '13px', fontWeight: '800', color: activeChild === 'philipp' ? '#4F7CFF' : '#1A1F36' }}>Philipp</div>
              <div style={{ fontSize: '10px', color: '#9CA3AF' }}>→ Klasse 3</div>
            </div>
          </button>
          <button onClick={() => setActiveChild('nicole')}
            style={{ flex: 1, padding: '14px', borderRadius: '14px', border: 'none', cursor: 'pointer', background: activeChild === 'nicole' ? '#FFE8F1' : 'transparent', display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'center' }}>
            <img src="/avatars/nica-solo.png" style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }} />
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '13px', fontWeight: '800', color: activeChild === 'nicole' ? '#FF7CB0' : '#1A1F36' }}>Nicole</div>
              <div style={{ fontSize: '10px', color: '#9CA3AF' }}>→ Klasse 7 Gymn.</div>
            </div>
          </button>
        </div>

        <div style={{ background: childInfo.bg, borderRadius: '20px', padding: '20px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <img src={childInfo.avatar} style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover', border: '3px solid white' }} />
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: '800', fontSize: '16px', color: '#1A1F36' }}>{childInfo.name}s Sommerplan</div>
            <div style={{ fontSize: '12px', color: '#6B7280', marginBottom: '8px' }}>{doneTage} von {totalTage} Tagen geschafft</div>
            <div style={{ height: '8px', background: 'rgba(255,255,255,0.6)', borderRadius: '100px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${(doneTage / totalTage) * 100}%`, background: childInfo.color, borderRadius: '100px', transition: 'width 0.5s ease' }} />
            </div>
          </div>
        </div>

        {plan.map((woche, wi) => {
          const isExpanded = expandedWoche === wi
          const wocheDone = woche.tage.filter(t => completedTage.includes(t.tag)).length
          return (
            <div key={woche.woche} style={{ marginBottom: '14px' }}>
              <button onClick={() => setExpandedWoche(isExpanded ? -1 : wi)}
                style={{ width: '100%', background: 'white', border: `2px solid ${isExpanded ? woche.farbe : '#E8ECF4'}`, borderRadius: '16px', padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: `${woche.farbe}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', color: woche.farbe, fontSize: '16px' }}>
                    {woche.woche}
                  </div>
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontWeight: '800', fontSize: '14px', color: '#1A1F36' }}>Woche {woche.woche}: {woche.titel}</div>
                    <div style={{ fontSize: '11px', color: '#9CA3AF' }}>{wocheDone}/{woche.tage.length} Tage erledigt</div>
                  </div>
                </div>
                <span style={{ fontSize: '18px', color: '#9CA3AF', transform: isExpanded ? 'rotate(180deg)' : 'none' }}>⌄</span>
              </button>

              {isExpanded && (
                <div style={{ marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {woche.tage.map(tag => {
                    const done = completedTage.includes(tag.tag)
                    return (
                      <div key={tag.tag} style={{ background: 'white', borderRadius: '14px', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: '12px', border: '1px solid #E8ECF4', opacity: done ? 0.65 : 1 }}>
                        <button onClick={() => toggleTag(tag.tag)}
                          style={{ width: '26px', height: '26px', borderRadius: '50%', border: `2px solid ${done ? '#37C978' : '#E8ECF4'}`, background: done ? '#37C978' : 'white', color: 'white', fontSize: '13px', fontWeight: '800', cursor: 'pointer', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          {done ? '✓' : ''}
                        </button>
                        <div style={{ fontSize: '20px', flexShrink: 0 }}>{tag.icon}</div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: '13px', fontWeight: '700', color: '#1A1F36', textDecoration: done ? 'line-through' : 'none' }}>{tag.titel}</div>
                          <div style={{ fontSize: '11px', color: '#9CA3AF' }}>{tag.fach} · {tag.fokus}</div>
                        </div>
                        <button onClick={() => router.push(`/chat?subject=${tag.fach.toLowerCase()}&avatar=${tag.avatar}&topic=${encodeURIComponent(tag.titel)}`)}
                          style={{ background: childInfo.bg, color: childInfo.color, border: 'none', borderRadius: '10px', padding: '8px 14px', fontSize: '11px', fontWeight: '800', cursor: 'pointer', flexShrink: 0, whiteSpace: 'nowrap' }}>
                          {tag.dauer} →
                        </button>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
