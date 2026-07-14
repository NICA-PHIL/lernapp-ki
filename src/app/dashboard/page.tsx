'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { theme, fachFarben, getReifestufe, reifeStyles } from '@/lib/theme'

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

interface TalentKarte {
  id: string; label: string; icon: string; desc: string; path: string; farbe: string; bg: string; nurFuer?: string
}

const TALENTE: TalentKarte[] = [
  { id: 'gitarre', label: 'Gitarre', icon: '🎸', desc: 'Akkorde, Songs, erste Melodien', path: '/gitarre', farbe: theme.brand.orange, bg: theme.soft.orange },
  { id: 'piano-gesang', label: 'Piano & Gesang', icon: '🎹', desc: 'Songs auf DE, EN & RU', path: '/piano-gesang', farbe: theme.brand.purple, bg: theme.soft.purple, nurFuer: 'nicole' },
  { id: 'schach', label: 'Schach', icon: '♟️', desc: 'Taktiken und Strategien vertiefen', path: '/schach', farbe: theme.ink, bg: theme.soft.blue },
  { id: 'sport', label: 'Sport', icon: '⚽', desc: 'Fußball, Taekwondo, Karate', path: '/chat?subject=sport&avatar=phil', farbe: theme.brand.teal, bg: theme.soft.teal },
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

  const klasseNum = parseInt(klasse)
  const reife = getReifestufe(klasseNum)
  const rs = reifeStyles[reife]
  const nameKey = childName.toLowerCase()
  const vorbereitungLink = nameKey.includes('nicole') ? '/nicole-vorbereitung'
    : nameKey.includes('philipp') ? '/philipp-vorbereitung' : null

  const sichtbareTalente = TALENTE.filter(t => !t.nurFuer || nameKey.includes(t.nurFuer))

  // Bei "reif" (Klasse 8+) reduzierter Hintergrund, weniger verspielt
  const bgStyle = reife === 'reif' ? '#F7F8FA' : theme.bg

  return (
    <div style={{ minHeight: '100vh', background: bgStyle, fontFamily: 'system-ui, sans-serif', paddingBottom: '100px' }}>

      {/* Header */}
      <div style={{ background: theme.card, padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: `0 1px 0 ${theme.line}`, position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img src="/avatars/duo-circle.png" alt="Nica & Phil" style={{ width: '38px', height: '38px', borderRadius: '50%', objectFit: 'cover' }} />
          <span style={{ fontWeight: '800', fontSize: '16px', color: theme.ink }}>Nica & Phil</span>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <div style={{ background: theme.soft.warn, borderRadius: theme.radius.full, padding: '6px 14px', fontSize: '13px', fontWeight: '700', color: '#9A5700' }}>
            {rs.emojiDichte === 'hoch' ? '🔥 3 Tage' : '3 Tage Serie'}
          </div>
          <div style={{ background: theme.soft.blue, borderRadius: theme.radius.full, padding: '6px 14px', fontSize: '13px', fontWeight: '700', color: theme.brand.blue }}>
            {rs.emojiDichte === 'hoch' ? '💎 120 Punkte' : '120 Punkte'}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '24px 20px' }}>

        {/* Begrüßung — passt sich der Reifestufe an */}
        <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '14px' }}>
          {childAvatar && (
            <img src={childAvatar} alt={childName} style={{ width: reife === 'jung' ? '52px' : '46px', height: reife === 'jung' ? '52px' : '46px', borderRadius: '50%', objectFit: 'cover', border: `3px solid ${theme.soft.blue}` }} />
          )}
          <div>
            <h1 style={{ fontSize: rs.fontGroesse.titel, fontWeight: '800', color: theme.ink, margin: '0 0 2px' }}>{rs.begruessung(childName)}</h1>
            <p style={{ color: theme.mid, fontSize: rs.fontGroesse.klein, margin: 0 }}>
              {reife === 'jung' ? `Klasse ${klasse} · Was lernst du heute?` : reife === 'mittel' ? `Klasse ${klasse} · Bereit?` : `Klasse ${klasse}`}
            </p>
          </div>
        </div>

        {/* Vorbereitungs-Banner */}
        {vorbereitungLink && (
          <button onClick={() => router.push(vorbereitungLink)}
            style={{ width: '100%', background: theme.gradients.sommer, border: 'none', borderRadius: theme.radius.lg, padding: rs.buttonPadding, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer', textAlign: 'left' }}>
            <span style={{ fontSize: '26px' }}>{reife === 'jung' ? '🎒' : '📋'}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: '800', fontSize: '14px', color: 'white' }}>
                {reife === 'jung' ? "Startklar für's neue Schuljahr!" : 'Vorbereitung neues Schuljahr'}
              </div>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.9)' }}>Deine persönliche Vorbereitung ansehen</div>
            </div>
            <span style={{ color: 'white', fontSize: '18px' }}>→</span>
          </button>
        )}

        {/* Quick-Access Kacheln */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '20px' }}>
          <button onClick={() => router.push('/meine-wuensche')}
            style={{ background: theme.gradients.wuensche, border: 'none', borderRadius: theme.radius.md, padding: '14px 16px', cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '18px' }}>{reife === 'jung' ? '💭' : '📝'}</span>
            <span style={{ fontSize: '12px', fontWeight: '800', color: 'white' }}>Meine Wünsche</span>
          </button>
          <button onClick={() => router.push('/meine-skills')}
            style={{ background: 'linear-gradient(135deg, #37C978, #00C9A7)', border: 'none', borderRadius: theme.radius.md, padding: '14px 16px', cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '18px' }}>{reife === 'jung' ? '🚀' : '📊'}</span>
            <span style={{ fontSize: '12px', fontWeight: '800', color: 'white' }}>Meine Skills</span>
          </button>
          <button onClick={() => router.push('/mein-stil')}
            style={{ background: 'linear-gradient(135deg, #FFB648, #FF7CB0)', border: 'none', borderRadius: theme.radius.md, padding: '14px 16px', cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '18px' }}>🎨</span>
            <span style={{ fontSize: '12px', fontWeight: '800', color: 'white' }}>Mein Stil</span>
          </button>
          <button onClick={() => router.push('/freizeit')}
            style={{ background: 'linear-gradient(135deg, #FF8C42, #8A5CFF)', border: 'none', borderRadius: theme.radius.md, padding: '14px 16px', cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '18px' }}>{reife === 'jung' ? '🎡' : '🗺️'}</span>
            <span style={{ fontSize: '12px', fontWeight: '800', color: 'white' }}>Freizeit-Ideen</span>
          </button>
        </div>

        {/* Stimmung */}
        <div style={{ background: theme.card, borderRadius: theme.radius.xl, padding: '18px 20px', marginBottom: '16px', border: `1px solid ${theme.line}` }}>
          <p style={{ fontSize: '13px', fontWeight: '700', color: '#374151', marginBottom: '12px' }}>
            {reife === 'jung' ? 'Wie fühlst du dich heute?' : reife === 'mittel' ? 'Wie geht\'s dir heute?' : 'Stimmung heute'}
          </p>
          <div style={{ display: 'flex', gap: '8px' }}>
            {MOODS.map(m => (
              <button key={m.emoji} onClick={() => setMood(m.emoji)}
                style={{ flex: 1, padding: '10px 6px', borderRadius: theme.radius.sm, border: '2px solid', borderColor: mood === m.emoji ? theme.brand.blue : theme.line, background: mood === m.emoji ? theme.soft.blue : 'white', cursor: 'pointer', fontSize: reife === 'jung' ? '22px' : '19px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', transition: 'all 0.15s' }}>
                {m.emoji}
                {reife !== 'reif' && <span style={{ fontSize: '11px', color: theme.mid, fontWeight: '600' }}>{m.label}</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Nica & Phil Nachrichten — Ton passt sich an */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
          <div style={{ background: `linear-gradient(135deg, ${theme.soft.pink}, #fff)`, borderRadius: theme.radius.md, padding: '16px', border: '1px solid #FFD0E8', display: 'flex', gap: '12px', alignItems: 'center' }}>
            <img src="/avatars/nica-solo.png" alt="Nica" style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
            <div>
              <div style={{ fontSize: '11px', fontWeight: '700', color: theme.brand.pink, marginBottom: '3px' }}>NICA</div>
              <p style={{ fontSize: '12px', color: theme.ink, margin: 0, lineHeight: '1.45' }}>
                {reife === 'jung'
                  ? (mood ? '✨ Ich bin bereit!' : 'Wie geht es dir heute? 💗')
                  : (mood ? 'Bereit, wenn du es bist.' : 'Sag mir, wie's dir geht.')}
              </p>
            </div>
          </div>
          <div style={{ background: `linear-gradient(135deg, ${theme.soft.blue}, #fff)`, borderRadius: theme.radius.md, padding: '16px', border: '1px solid #C7D9FF', display: 'flex', gap: '12px', alignItems: 'center' }}>
            <img src="/avatars/phil-solo.png" alt="Phil" style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
            <div>
              <div style={{ fontSize: '11px', fontWeight: '700', color: theme.brand.blue, marginBottom: '3px' }}>PHIL</div>
              <p style={{ fontSize: '12px', color: theme.ink, margin: 0, lineHeight: '1.45' }}>
                {reife === 'jung'
                  ? (mood ? '🚀 Los geht\'s!' : 'Ich hab was für dich! 🚀')
                  : (mood ? 'Los geht\'s.' : 'Ich hab heute was Interessantes für dich.')}
              </p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', background: theme.card, padding: '6px', borderRadius: theme.radius.md, border: `1px solid ${theme.line}` }}>
          <button onClick={() => setActiveTab('schule')}
            style={{ flex: 1, padding: '10px', borderRadius: theme.radius.sm, border: 'none', fontWeight: '700', fontSize: '14px', cursor: 'pointer', background: activeTab === 'schule' ? theme.ink : 'transparent', color: activeTab === 'schule' ? 'white' : theme.mid, transition: 'all 0.2s' }}>
            {reife === 'jung' ? '📚 Schulfächer' : 'Schulfächer'}
          </button>
          <button onClick={() => setActiveTab('talente')}
            style={{ flex: 1, padding: '10px', borderRadius: theme.radius.sm, border: 'none', fontWeight: '700', fontSize: '14px', cursor: 'pointer', background: activeTab === 'talente' ? theme.ink : 'transparent', color: activeTab === 'talente' ? 'white' : theme.mid, transition: 'all 0.2s' }}>
            {reife === 'jung' ? '🌟 Talente & Hobbys' : 'Talente & Hobbys'}
          </button>
        </div>

        {/* Schulfächer */}
        {activeTab === 'schule' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {SCHULFAECHER.map(s => {
              const fc = fachFarben[s.id] || { farbe: theme.brand.blue, bg: theme.soft.blue, avatar: 'phil' as const }
              return (
                <button key={s.id}
                  onClick={() => router.push(`/chat?subject=${s.id}&avatar=${fc.avatar}`)}
                  style={{ background: theme.card, border: `1.5px solid ${theme.line}`, borderRadius: theme.radius.lg, padding: rs.buttonPadding, display: 'flex', alignItems: 'center', gap: '16px', cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s', boxShadow: theme.shadow.sm }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.borderColor = fc.farbe }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = theme.line }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: theme.radius.md, background: fc.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', flexShrink: 0 }}>
                    {s.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: '800', fontSize: '15px', color: theme.ink, marginBottom: '2px' }}>{s.label}</div>
                    <div style={{ fontSize: '12px', color: theme.mid }}>{s.desc} · mit {fc.avatar === 'nica' ? 'Nica' : 'Phil'}</div>
                  </div>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: fc.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: fc.farbe, fontSize: '15px', fontWeight: '700' }}>→</div>
                </button>
              )
            })}
          </div>
        )}

        {/* Talente */}
        {activeTab === 'talente' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {sichtbareTalente.map(t => (
              <button key={t.id}
                onClick={() => router.push(t.path)}
                style={{ background: theme.card, border: `1.5px solid ${theme.line}`, borderRadius: theme.radius.lg, padding: rs.buttonPadding, display: 'flex', alignItems: 'center', gap: '16px', cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s', boxShadow: theme.shadow.sm }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.borderColor = t.farbe }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = theme.line }}>
                <div style={{ width: '48px', height: '48px', borderRadius: theme.radius.md, background: t.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', flexShrink: 0 }}>
                  {t.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: '800', fontSize: '15px', color: theme.ink, marginBottom: '2px' }}>{t.label}</div>
                  <div style={{ fontSize: '12px', color: theme.mid }}>{t.desc}</div>
                </div>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: t.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: t.farbe, fontSize: '15px', fontWeight: '700' }}>→</div>
              </button>
            ))}
          </div>
        )}
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
