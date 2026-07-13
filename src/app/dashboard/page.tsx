'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { theme, fachFarben } from '@/lib/theme'

const MOODS = [
  { emoji: '😄', label: 'Super' },
  { emoji: '🙂', label: 'Gut' },
  { emoji: '😐', label: 'Geht so' },
  { emoji: '😔', label: 'Müde' },
]

const SCHULFAECHER = [
  { id: 'mathe', label: 'Mathe', icon: '📐', desc: 'Rechnen, Geometrie, Logik' },
  { id: 'deutsch', label: 'Deutsch', icon: '📖', desc: 'Lesen, Schreiben, Grammatik' },
  { id: 'englisch', label: 'Englisch', icon: '🌍', desc: 'Vokabeln, Sprechen, Grammatik' },
  { id: 'sachunterricht', label: 'Sachunterricht', icon: '🔬', desc: 'Natur, Technik, Gesellschaft' },
]

const TALENTE = [
  { id: 'musik', label: 'Musik', icon: '🎵', desc: 'Piano, Gitarre, Noten, Rhythmus' },
  { id: 'sport', label: 'Sport', icon: '⚽', desc: 'Fußball, Taekwondo, Karate' },
]

export default function Dashboard() {
  const [mood, setMood] = useState<string | null>(null)
  const [childName, setChildName] = useState('Entdecker')
  const [childAvatar, setChildAvatar] = useState<string | null>(null)
  const [klasse, setKlasse] = useState('3')
  const [activeTab, setActiveTab] = useState<'schule' | 'talente'>('schule')
  const router = useRouter()

  useEffect(() => {
    setChildName(localStorage.getItem('np_child_name') || 'Entdecker')
    setChildAvatar(localStorage.getItem('np_child_avatar'))
    setKlasse(localStorage.getItem('np_child_klasse') || '3')
  }, [])

  const isTeen = parseInt(klasse) >= 5
  const vorbereitungLink = childName.toLowerCase().includes('nicole') ? '/nicole-vorbereitung'
    : childName.toLowerCase().includes('philipp') ? '/philipp-vorbereitung' : null

  return (
    <div style={{ minHeight: '100vh', background: theme.bg, fontFamily: 'system-ui, sans-serif', paddingBottom: '100px' }}>

      {/* Header */}
      <div style={{ background: theme.card, padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: `0 1px 0 ${theme.line}`, position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img src="/avatars/duo-circle.png" alt="Nica & Phil" style={{ width: '38px', height: '38px', borderRadius: '50%', objectFit: 'cover' }} />
          <span style={{ fontWeight: '800', fontSize: '16px', color: theme.ink }}>Nica & Phil</span>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <div style={{ background: theme.soft.warn, borderRadius: theme.radius.full, padding: '6px 14px', fontSize: '13px', fontWeight: '700', color: '#9A5700' }}>🔥 3 Tage</div>
          <div style={{ background: theme.soft.blue, borderRadius: theme.radius.full, padding: '6px 14px', fontSize: '13px', fontWeight: '700', color: theme.brand.blue }}>💎 120 Punkte</div>
        </div>
      </div>

      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '24px 20px' }}>

        {/* Begrüßung */}
        <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '14px' }}>
          {childAvatar && (
            <img src={childAvatar} alt={childName} style={{ width: '52px', height: '52px', borderRadius: '50%', objectFit: 'cover', border: `3px solid ${theme.soft.blue}` }} />
          )}
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: '800', color: theme.ink, margin: '0 0 2px' }}>Hallo {childName}! 👋</h1>
            <p style={{ color: theme.mid, fontSize: '13px', margin: 0 }}>Klasse {klasse} · Was lernst du heute?</p>
          </div>
        </div>

        {/* Vorbereitungs-Banner (nur wenn zutreffend) */}
        {vorbereitungLink && (
          <button onClick={() => router.push(vorbereitungLink)}
            style={{ width: '100%', background: theme.gradients.sommer, border: 'none', borderRadius: theme.radius.lg, padding: '18px 20px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer', textAlign: 'left' }}>
            <span style={{ fontSize: '28px' }}>🎒</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: '800', fontSize: '14px', color: 'white' }}>Startklar für's neue Schuljahr!</div>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.9)' }}>Deine persönliche Vorbereitung ansehen</div>
            </div>
            <span style={{ color: 'white', fontSize: '18px' }}>→</span>
          </button>
        )}

        {/* Stimmung */}
        <div style={{ background: theme.card, borderRadius: theme.radius.xl, padding: '18px 20px', marginBottom: '16px', border: `1px solid ${theme.line}` }}>
          <p style={{ fontSize: '13px', fontWeight: '700', color: '#374151', marginBottom: '12px' }}>Wie fühlst du dich heute?</p>
          <div style={{ display: 'flex', gap: '8px' }}>
            {MOODS.map(m => (
              <button key={m.emoji} onClick={() => setMood(m.emoji)}
                style={{ flex: 1, padding: '10px 6px', borderRadius: theme.radius.sm, border: '2px solid', borderColor: mood === m.emoji ? theme.brand.blue : theme.line, background: mood === m.emoji ? theme.soft.blue : 'white', cursor: 'pointer', fontSize: '22px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', transition: 'all 0.15s' }}>
                {m.emoji}
                <span style={{ fontSize: '11px', color: theme.mid, fontWeight: '600' }}>{m.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Nica & Phil Nachrichten */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
          <div style={{ background: `linear-gradient(135deg, ${theme.soft.pink}, #fff)`, borderRadius: theme.radius.md, padding: '16px', border: '1px solid #FFD0E8', display: 'flex', gap: '12px', alignItems: 'center' }}>
            <img src="/avatars/nica-solo.png" alt="Nica" style={{ width: '52px', height: '52px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
            <div>
              <div style={{ fontSize: '11px', fontWeight: '700', color: theme.brand.pink, marginBottom: '3px' }}>NICA</div>
              <p style={{ fontSize: '12px', color: theme.ink, margin: 0, lineHeight: '1.45' }}>
                {mood ? '✨ Ich bin bereit!' : 'Wie geht es dir heute? 💗'}
              </p>
            </div>
          </div>
          <div style={{ background: `linear-gradient(135deg, ${theme.soft.blue}, #fff)`, borderRadius: theme.radius.md, padding: '16px', border: '1px solid #C7D9FF', display: 'flex', gap: '12px', alignItems: 'center' }}>
            <img src="/avatars/phil-solo.png" alt="Phil" style={{ width: '52px', height: '52px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
            <div>
              <div style={{ fontSize: '11px', fontWeight: '700', color: theme.brand.blue, marginBottom: '3px' }}>PHIL</div>
              <p style={{ fontSize: '12px', color: theme.ink, margin: 0, lineHeight: '1.45' }}>
                {mood ? '🚀 Los geht\'s!' : 'Ich hab was für dich! 🚀'}
              </p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', background: theme.card, padding: '6px', borderRadius: theme.radius.md, border: `1px solid ${theme.line}` }}>
          <button onClick={() => setActiveTab('schule')}
            style={{ flex: 1, padding: '10px', borderRadius: theme.radius.sm, border: 'none', fontWeight: '700', fontSize: '14px', cursor: 'pointer', background: activeTab === 'schule' ? theme.ink : 'transparent', color: activeTab === 'schule' ? 'white' : theme.mid, transition: 'all 0.2s' }}>
            📚 Schulfächer
          </button>
          <button onClick={() => setActiveTab('talente')}
            style={{ flex: 1, padding: '10px', borderRadius: theme.radius.sm, border: 'none', fontWeight: '700', fontSize: '14px', cursor: 'pointer', background: activeTab === 'talente' ? theme.ink : 'transparent', color: activeTab === 'talente' ? 'white' : theme.mid, transition: 'all 0.2s' }}>
            🌟 Talente & Hobbys
          </button>
        </div>

        {/* Fächer Liste */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {(activeTab === 'schule' ? SCHULFAECHER : TALENTE).map(s => {
            const fc = fachFarben[s.id] || { farbe: theme.brand.blue, bg: theme.soft.blue, avatar: 'phil' as const }
            return (
              <button key={s.id}
                onClick={() => router.push(`/chat?subject=${s.id}&avatar=${fc.avatar}`)}
                style={{ background: theme.card, border: `1.5px solid ${theme.line}`, borderRadius: theme.radius.lg, padding: '18px 20px', display: 'flex', alignItems: 'center', gap: '16px', cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s', boxShadow: theme.shadow.sm }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.borderColor = fc.farbe }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = theme.line }}>
                <div style={{ width: '52px', height: '52px', borderRadius: theme.radius.md, background: fc.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '26px', flexShrink: 0 }}>
                  {s.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: '800', fontSize: '16px', color: theme.ink, marginBottom: '2px' }}>{s.label}</div>
                  <div style={{ fontSize: '12px', color: theme.mid }}>{s.desc} · mit {fc.avatar === 'nica' ? 'Nica' : 'Phil'}</div>
                </div>
                <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: fc.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: fc.farbe, fontSize: '16px', fontWeight: '700' }}>→</div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: theme.card, borderTop: `1px solid ${theme.line}`, display: 'flex', justifyContent: 'space-around', padding: '10px 0 20px' }}>
        {[
          { icon: '🏠', label: 'Start', active: true, path: '/dashboard' },
          { icon: '🗺️', label: 'Lernreise', path: '/lernreise' },
          { icon: '☀️', label: 'Sommer', path: '/sommermission' },
          { icon: '👤', label: 'Profil', path: '/onboarding' },
        ].map(item => (
          <button key={item.label} onClick={() => router.push(item.path)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px' }}>
            <span style={{ fontSize: '22px' }}>{item.icon}</span>
            <span style={{ fontSize: '10px', fontWeight: '700', color: item.active ? theme.brand.blue : theme.muted }}>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
