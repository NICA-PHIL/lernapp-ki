'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { theme } from '@/lib/theme'

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
    woche: 1, titel: 'Schreibschrift-Werkstatt', farbe: theme.brand.orange,
    tage: [
      { tag: 1, fach: 'Deutsch', icon: '✍️', titel: 'Buchstaben-Boxen', fokus: 'Schwierige Buchstaben einzeln üben', dauer: '15 Min', avatar: 'nica' },
      { tag: 2, fach: 'Deutsch', icon: '✍️', titel: 'Wörter verbinden', fokus: 'Buchstaben flüssig aneinanderreihen', dauer: '15 Min', avatar: 'nica' },
      { tag: 3, fach: 'Mathe', icon: '🔢', titel: 'Zahlenraum-Check', fokus: 'Wiederholung: Zahlenraum bis 100', dauer: '15 Min', avatar: 'phil' },
    ]
  },
  {
    woche: 2, titel: 'Hallo Englisch!', farbe: theme.brand.green,
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
    const childName = localStorage.getItem('np_child_name')?.toLowerCase() || ''
    const erkanntesKind: 'philipp' | 'nicole' = childName.includes('nicole') ? 'nicole' : childName.includes('philipp') ? 'philipp' : 'philipp'
    setActiveChild(erkanntesKind)
    const saved = localStorage.getItem(`np_sommer_progress_${erkanntesKind}`)
    setCompletedTage(saved ? JSON.parse(saved) : [])
  }, [])

  function kindWechseln(kind: 'philipp' | 'nicole') {
    setActiveChild(kind)
    const saved = localStorage.getItem(`np_sommer_progress_${kind}`)
    setCompletedTage(saved ? JSON.parse(saved) : [])
  }

  const plan = activeChild === 'philipp' ? PHILIPP_PLAN : NICOLE_PLAN
  const childInfo = activeChild === 'philipp'
    ? { name: 'Philipp', klasse: '3', avatar: '/avatars/phil-solo.png', color: theme.brand.blue, bg: theme.soft.blue }
    : { name: 'Nicole', klasse: '7 (Gymnasium)', avatar: '/avatars/nica-solo.png', color: theme.brand.pink, bg: theme.soft.pink }

  const totalTage = plan.reduce((sum, w) => sum + w.tage.length, 0)
  const doneTage = plan.reduce((sum, w) => sum + w.tage.filter(t => completedTage.includes(t.tag)).length, 0)

  function toggleTag(tag: number) {
    const newCompleted = completedTage.includes(tag)
      ? completedTage.filter(t => t !== tag)
      : [...completedTage, tag]
    setCompletedTage(newCompleted)
    localStorage.setItem(`np_sommer_progress_${activeChild}`, JSON.stringify(newCompleted))
  }

  return (
    <div style={{ minHeight: '100vh', background: theme.bg, fontFamily: 'var(--font-body), system-ui, sans-serif', paddingBottom: '60px' }}>
      <div style={{ background: theme.gradients.sommer, padding: '32px 24px 60px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '20px', right: '30px', fontSize: '60px', opacity: 0.25 }}>☀️</div>
        <button onClick={() => router.push('/dashboard')} style={{ background: 'rgba(255,255,255,0.25)', border: 'none', borderRadius: theme.radius.sm, padding: '8px 12px', color: 'white', fontSize: '14px', cursor: 'pointer', marginBottom: '16px' }}>← Zurück</button>
        <h1 style={{ fontSize: '28px', fontWeight: '800', color: 'white', margin: '0 0 6px' }}>☀️ Sommermission 2026</h1>
        <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '14px', margin: 0 }}>Fit werden für das neue Schuljahr</p>
      </div>

      <div style={{ maxWidth: '640px', margin: '-36px auto 0', padding: '0 20px' }}>
        <div style={{ background: 'white', borderRadius: theme.radius.xl, padding: '8px', display: 'flex', gap: '6px', boxShadow: theme.shadow.md, marginBottom: '20px' }}>
          <button onClick={() => kindWechseln('philipp')}
            style={{ flex: 1, padding: '14px', borderRadius: theme.radius.md, border: 'none', cursor: 'pointer', background: activeChild === 'philipp' ? theme.soft.blue : 'transparent', display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'center' }}>
            <img src="/avatars/phil-solo.png" style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }} />
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '13px', fontWeight: '800', color: activeChild === 'philipp' ? theme.brand.blue : theme.ink }}>Philipp</div>
              <div style={{ fontSize: '10px', color: theme.muted }}>→ Klasse 3</div>
            </div>
          </button>
          <button onClick={() => kindWechseln('nicole')}
            style={{ flex: 1, padding: '14px', borderRadius: theme.radius.md, border: 'none', cursor: 'pointer', background: activeChild === 'nicole' ? theme.soft.pink : 'transparent', display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'center' }}>
            <img src="/avatars/nica-solo.png" style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }} />
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '13px', fontWeight: '800', color: activeChild === 'nicole' ? theme.brand.pink : theme.ink }}>Nicole</div>
              <div style={{ fontSize: '10px', color: theme.muted }}>→ Klasse 7 Gymn.</div>
            </div>
          </button>
        </div>

        <div style={{ background: childInfo.bg, borderRadius: theme.radius.xl, padding: '20px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <img src={childInfo.avatar} style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover', border: '3px solid white' }} />
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: '800', fontSize: '16px', color: theme.ink }}>{childInfo.name}s Sommerplan</div>
            <div style={{ fontSize: '12px', color: theme.mid, marginBottom: '8px' }}>{doneTage} von {totalTage} Tagen geschafft</div>
            <div style={{ height: '8px', background: 'rgba(255,255,255,0.6)', borderRadius: theme.radius.full, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${(doneTage / totalTage) * 100}%`, background: childInfo.color, borderRadius: theme.radius.full, transition: 'width 0.5s ease' }} />
            </div>
          </div>
        </div>

        {plan.map((woche, wi) => {
          const isExpanded = expandedWoche === wi
          const wocheDone = woche.tage.filter(t => completedTage.includes(t.tag)).length
          return (
            <div key={woche.woche} style={{ marginBottom: '14px' }}>
              <button onClick={() => setExpandedWoche(isExpanded ? -1 : wi)}
                style={{ width: '100%', background: 'white', border: `2px solid ${isExpanded ? woche.farbe : theme.line}`, borderRadius: theme.radius.lg, padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: theme.radius.md, background: `${woche.farbe}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', color: woche.farbe, fontSize: '16px' }}>
                    {woche.woche}
                  </div>
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontWeight: '800', fontSize: '14px', color: theme.ink }}>Woche {woche.woche}: {woche.titel}</div>
                    <div style={{ fontSize: '11px', color: theme.muted }}>{wocheDone}/{woche.tage.length} Tage erledigt</div>
                  </div>
                </div>
                <span style={{ fontSize: '18px', color: theme.muted, transform: isExpanded ? 'rotate(180deg)' : 'none' }}>⌄</span>
              </button>

              {isExpanded && (
                <div style={{ marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {woche.tage.map(tag => {
                    const done = completedTage.includes(tag.tag)
                    return (
                      <div key={tag.tag} style={{ background: 'white', borderRadius: theme.radius.md, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: '12px', border: `1px solid ${theme.line}`, opacity: done ? 0.65 : 1 }}>
                        <button onClick={() => toggleTag(tag.tag)}
                          style={{ width: '26px', height: '26px', borderRadius: '50%', border: `2px solid ${done ? theme.brand.green : theme.line}`, background: done ? theme.brand.green : 'white', color: 'white', fontSize: '13px', fontWeight: '800', cursor: 'pointer', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          {done ? '✓' : ''}
                        </button>
                        <div style={{ fontSize: '20px', flexShrink: 0 }}>{tag.icon}</div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: '13px', fontWeight: '700', color: theme.ink, textDecoration: done ? 'line-through' : 'none' }}>{tag.titel}</div>
                          <div style={{ fontSize: '11px', color: theme.muted }}>{tag.fach} · {tag.fokus}</div>
                        </div>
                        <button onClick={() => router.push(`/chat?subject=${tag.fach.toLowerCase()}&avatar=${tag.avatar}&topic=${encodeURIComponent(tag.titel)}`)}
                          style={{ background: childInfo.bg, color: childInfo.color, border: 'none', borderRadius: theme.radius.sm, padding: '8px 14px', fontSize: '11px', fontWeight: '800', cursor: 'pointer', flexShrink: 0, whiteSpace: 'nowrap' }}>
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
