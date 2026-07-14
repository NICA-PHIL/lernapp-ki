'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { theme } from '@/lib/theme'

const MOODS = [
  { emoji: '😄', label: 'Super', color: theme.brand.green },
  { emoji: '🙂', label: 'Gut', color: theme.brand.blue },
  { emoji: '😐', label: 'Geht so', color: theme.brand.warn },
  { emoji: '😔', label: 'Müde', color: '#9B8AC4' },
]

const SCHULFAECHER = [
  { id: 'mathe', label: 'Mathe', icon: '📐', desc: 'Rechnen, Geometrie, Logik', farbe: theme.brand.blue, bg: `linear-gradient(135deg,${theme.soft.blue},#F5F8FF)`, avatar: 'phil', fortschritt: 68 },
  { id: 'deutsch', label: 'Deutsch', icon: '📖', desc: 'Lesen, Schreiben, Grammatik', farbe: theme.brand.pink, bg: `linear-gradient(135deg,${theme.soft.pink},#FFF5F9)`, avatar: 'nica', fortschritt: 45 },
  { id: 'englisch', label: 'Englisch', icon: '🌍', desc: 'Vokabeln, Sprechen, Grammatik', farbe: theme.brand.green, bg: `linear-gradient(135deg,${theme.soft.green},#F3FDF7)`, avatar: 'nica', fortschritt: 80 },
  { id: 'sachunterricht', label: 'Sachunterricht', icon: '🔬', desc: 'Natur, Technik, Gesellschaft', farbe: theme.brand.purple, bg: `linear-gradient(135deg,${theme.soft.purple},#F9F6FF)`, avatar: 'phil', fortschritt: 30 },
]

interface QuickLink { id: string; label: string; icon: string; path: string; farbe: string }
const QUICKLINKS: QuickLink[] = [
  { id: 'wuensche', label: 'Meine Wünsche', icon: '💭', path: '/meine-wuensche', farbe: theme.brand.pink },
  { id: 'skills', label: 'Meine Skills', icon: '🚀', path: '/meine-skills', farbe: theme.brand.green },
  { id: 'stil', label: 'Mein Stil', icon: '🎨', path: '/mein-stil', farbe: theme.brand.warn },
  { id: 'freizeit', label: 'Freizeit', icon: '🎡', path: '/freizeit', farbe: theme.brand.purple },
  { id: 'schule', label: 'Meine Schule', icon: '🏫', path: '/meine-schule', farbe: theme.brand.blue },
]

export default function Dashboard() {
  const [mood, setMood] = useState<string | null>(null)
  const [childName, setChildName] = useState('Entdecker')
  const [childAvatar, setChildAvatar] = useState<string | null>(null)
  const [avatarBaukasten, setAvatarBaukasten] = useState<any>(null)
  const [klasse, setKlasse] = useState('3')
  const router = useRouter()

  useEffect(() => {
    setChildName(localStorage.getItem('np_child_name') || 'Entdecker')
    setChildAvatar(localStorage.getItem('np_child_avatar'))
    setKlasse(localStorage.getItem('np_child_klasse') || '3')
    const bk = localStorage.getItem('np_child_avatar_baukasten')
    if (bk) setAvatarBaukasten(JSON.parse(bk))
  }, [])

  const nameKey = childName.toLowerCase()
  const vorbereitungLink = nameKey.includes('nicole') ? '/nicole-vorbereitung' : nameKey.includes('philipp') ? '/philipp-vorbereitung' : null

  function AvatarBubble({ size = 56 }: { size?: number }) {
    if (childAvatar) return <img src={childAvatar} style={{ width: size, height: size, borderRadius: '50%', objectFit: 'cover', border: '3px solid white', boxShadow: '0 4px 16px rgba(79,124,255,0.25)' }} />
    if (avatarBaukasten) return (
      <div style={{ width: size, height: size, borderRadius: '50%', background: avatarBaukasten.hautton || '#FFDBB4', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: size * 0.5, border: `3px solid ${avatarBaukasten.haarfarbe || theme.brand.blue}`, boxShadow: '0 4px 16px rgba(79,124,255,0.25)' }}>
        {avatarBaukasten.gesicht || '🧒'}
      </div>
    )
    return <div style={{ width: size, height: size, borderRadius: '50%', background: theme.soft.blue, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: size * 0.5 }}>🧒</div>
  }

  return (
    <div style={{ minHeight: '100vh', background: 'radial-gradient(ellipse 80% 50% at 50% -10%, #F0F4FF 0%, #FAFBFF 60%)', fontFamily: "'Inter', -apple-system, sans-serif", paddingBottom: '110px' }}>

      {/* ── STICKY HEADER ── */}
      <div style={{ background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(20px)', padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(232,236,244,0.6)', position: 'sticky', top: 0, zIndex: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img src="/avatars/duo-circle.png" alt="Nica & Phil" style={{ width: '34px', height: '34px', borderRadius: '50%', objectFit: 'cover' }} />
          <span style={{ fontWeight: '800', fontSize: '15px', color: theme.ink, letterSpacing: '-0.01em' }}>Nica <span style={{ color: theme.brand.blue }}>&</span> Phil</span>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <div style={{ background: `linear-gradient(135deg,${theme.brand.warn},${theme.brand.orange})`, borderRadius: theme.radius.full, padding: '7px 14px', fontSize: '12.5px', fontWeight: '800', color: 'white', display: 'flex', alignItems: 'center', gap: '5px', boxShadow: '0 4px 12px rgba(255,140,66,0.3)' }}>
            🔥 3
          </div>
          <div style={{ background: theme.gradients.primary, borderRadius: theme.radius.full, padding: '7px 14px', fontSize: '12.5px', fontWeight: '800', color: 'white', display: 'flex', alignItems: 'center', gap: '5px', boxShadow: '0 4px 12px rgba(79,124,255,0.3)' }}>
            💎 120
          </div>
        </div>
      </div>

      <div className="np-dashboard-content" style={{ maxWidth: '780px', margin: '0 auto', padding: '32px 20px 0' }}>

        {/* ── GREETING HERO ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '28px' }}>
          <AvatarBubble size={60} />
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: '800', color: theme.ink, margin: '0 0 3px', letterSpacing: '-0.02em' }}>
              Hallo {childName} <span style={{ display: 'inline-block' }}>👋</span>
            </h1>
            <p style={{ color: theme.muted, fontSize: '13.5px', margin: 0, fontWeight: '500' }}>Klasse {klasse} · Was lernst du heute?</p>
          </div>
        </div>

        {/* ── FEATURED BANNERS (Elevated cards) ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '28px' }}>
          {vorbereitungLink && (
            <button onClick={() => router.push(vorbereitungLink)}
              style={{ position: 'relative', overflow: 'hidden', width: '100%', background: 'linear-gradient(120deg,#FF8C5A,#FF6FA8,#9B6EFF)', border: 'none', borderRadius: theme.radius.xl, padding: '22px 24px', cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '16px', boxShadow: '0 12px 32px rgba(255,111,168,0.28)' }}>
              <div style={{ position: 'absolute', top: '-30px', right: '-20px', fontSize: '100px', opacity: 0.15 }}>🎓</div>
              <div style={{ width: '48px', height: '48px', borderRadius: theme.radius.lg, background: 'rgba(255,255,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', flexShrink: 0, zIndex: 1 }}>🎒</div>
              <div style={{ flex: 1, zIndex: 1 }}>
                <div style={{ fontWeight: '800', fontSize: '15.5px', color: 'white', marginBottom: '2px' }}>Startklar für's neue Schuljahr!</div>
                <div style={{ fontSize: '12.5px', color: 'rgba(255,255,255,0.88)' }}>Deine persönliche Vorbereitung ansehen</div>
              </div>
              <span style={{ color: 'white', fontSize: '20px', zIndex: 1 }}>→</span>
            </button>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <button onClick={() => router.push('/fit-fuer-die-schule')}
              style={{ background: 'white', border: `1px solid ${theme.line}`, borderRadius: theme.radius.xl, padding: '18px 20px', cursor: 'pointer', textAlign: 'left', boxShadow: '0 4px 20px rgba(79,124,255,0.06)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: theme.radius.md, background: theme.gradients.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '19px', boxShadow: '0 6px 16px rgba(79,124,255,0.3)' }}>🎯</div>
              <div>
                <div style={{ fontWeight: '800', fontSize: '13.5px', color: theme.ink }}>Fit für die Klasse</div>
                <div style={{ fontSize: '11px', color: theme.muted }}>Wiederholen · Skills</div>
              </div>
            </button>
            <button onClick={() => router.push('/kalender')}
              style={{ background: 'white', border: `1px solid ${theme.line}`, borderRadius: theme.radius.xl, padding: '18px 20px', cursor: 'pointer', textAlign: 'left', boxShadow: '0 4px 20px rgba(79,124,255,0.06)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: theme.radius.md, background: theme.gradients.eltern, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '19px', boxShadow: '0 6px 16px rgba(26,31,54,0.3)' }}>📅</div>
              <div>
                <div style={{ fontWeight: '800', fontSize: '13.5px', color: theme.ink }}>Kalender</div>
                <div style={{ fontSize: '11px', color: theme.muted }}>Termine & Tests</div>
              </div>
            </button>
          </div>
        </div>

        {/* ── MOOD CHECK ── */}
        <div style={{ background: 'white', borderRadius: theme.radius.xl, padding: '22px 24px', marginBottom: '20px', border: `1px solid ${theme.line}`, boxShadow: '0 4px 20px rgba(79,124,255,0.06)' }}>
          <p style={{ fontSize: '13.5px', fontWeight: '700', color: theme.ink, marginBottom: '14px' }}>Wie fühlst du dich heute?</p>
          <div style={{ display: 'flex', gap: '10px' }}>
            {MOODS.map(m => (
              <button key={m.emoji} onClick={() => setMood(m.emoji)}
                style={{ flex: 1, padding: '12px 6px', borderRadius: theme.radius.lg, border: 'none', background: mood === m.emoji ? `${m.color}18` : theme.bg, cursor: 'pointer', fontSize: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', transition: 'all 0.2s', boxShadow: mood === m.emoji ? `0 0 0 2px ${m.color}` : 'none' }}>
                {m.emoji}
                <span style={{ fontSize: '10.5px', color: mood === m.emoji ? m.color : theme.muted, fontWeight: '700' }}>{m.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ── NICA & PHIL SPEECH CARDS ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '28px' }}>
          <div style={{ background: 'linear-gradient(160deg,#FFF5F9,white)', borderRadius: theme.radius.xl, padding: '18px', border: '1px solid #FFE0EE', display: 'flex', gap: '12px', alignItems: 'center', boxShadow: '0 4px 16px rgba(255,124,176,0.08)' }}>
            <img src="/avatars/nica-solo.png" alt="Nica" style={{ width: '46px', height: '46px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0, boxShadow: '0 3px 10px rgba(255,124,176,0.3)' }} />
            <div>
              <div style={{ fontSize: '10.5px', fontWeight: '800', color: theme.brand.pink, marginBottom: '3px', letterSpacing: '0.03em' }}>NICA</div>
              <p style={{ fontSize: '12px', color: theme.mid, margin: 0, lineHeight: '1.4', fontWeight: '500' }}>
                {mood ? '✨ Ich bin bereit!' : 'Sag mir wie es dir geht 💗'}
              </p>
            </div>
          </div>
          <div style={{ background: 'linear-gradient(160deg,#F5F8FF,white)', borderRadius: theme.radius.xl, padding: '18px', border: '1px solid #DEE8FF', display: 'flex', gap: '12px', alignItems: 'center', boxShadow: '0 4px 16px rgba(79,124,255,0.08)' }}>
            <img src="/avatars/phil-solo.png" alt="Phil" style={{ width: '46px', height: '46px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0, boxShadow: '0 3px 10px rgba(79,124,255,0.3)' }} />
            <div>
              <div style={{ fontSize: '10.5px', fontWeight: '800', color: theme.brand.blue, marginBottom: '3px', letterSpacing: '0.03em' }}>PHIL</div>
              <p style={{ fontSize: '12px', color: theme.mid, margin: 0, lineHeight: '1.4', fontWeight: '500' }}>
                {mood ? '🚀 Los geht\u2019s!' : 'Ich hab was für dich! 🚀'}
              </p>
            </div>
          </div>
        </div>

        {/* ── SCHULFÄCHER — Ring Progress Cards ── */}
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '16px' }}>
          <h2 style={{ fontSize: '17px', fontWeight: '800', color: theme.ink, margin: 0, letterSpacing: '-0.01em' }}>📚 Schulfächer</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '32px' }}>
          {SCHULFAECHER.map(s => {
            const circ = 2 * Math.PI * 20
            const offset = circ - (s.fortschritt / 100) * circ
            return (
              <button key={s.id} onClick={() => router.push(`/chat?subject=${s.id}&avatar=${s.avatar}`)}
                style={{ background: s.bg, border: '1px solid rgba(255,255,255,0.6)', borderRadius: theme.radius.xl, padding: '20px', cursor: 'pointer', textAlign: 'left', boxShadow: '0 6px 24px rgba(79,124,255,0.08)', transition: 'all 0.25s', position: 'relative', overflow: 'hidden' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: theme.radius.md, background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '21px', boxShadow: `0 6px 14px ${s.farbe}33` }}>{s.icon}</div>
                  <div style={{ position: 'relative', width: '46px', height: '46px' }}>
                    <svg width="46" height="46" viewBox="0 0 46 46">
                      <circle cx="23" cy="23" r="20" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="4" />
                      <circle cx="23" cy="23" r="20" fill="none" stroke={s.farbe} strokeWidth="4" strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round" transform="rotate(-90 23 23)" />
                    </svg>
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10.5px', fontWeight: '800', color: s.farbe }}>{s.fortschritt}%</div>
                  </div>
                </div>
                <div style={{ fontWeight: '800', fontSize: '15px', color: theme.ink, marginBottom: '3px' }}>{s.label}</div>
                <div style={{ fontSize: '11.5px', color: theme.mid, fontWeight: '500' }}>{s.desc}</div>
              </button>
            )
          })}
        </div>

        {/* ── QUICK LINKS ── */}
        <h2 style={{ fontSize: '17px', fontWeight: '800', color: theme.ink, marginBottom: '16px', letterSpacing: '-0.01em' }}>⚡ Schnellzugriff</h2>
        <div className="np-quicklinks-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '28px' }}>
          {QUICKLINKS.map(q => (
            <button key={q.id} onClick={() => router.push(q.path)}
              style={{ background: 'white', border: `1px solid ${theme.line}`, borderRadius: theme.radius.lg, padding: '16px 12px', cursor: 'pointer', textAlign: 'center', boxShadow: '0 3px 14px rgba(79,124,255,0.06)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: theme.radius.md, background: `${q.farbe}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>{q.icon}</div>
              <span style={{ fontSize: '11px', fontWeight: '700', color: theme.mid }}>{q.label}</span>
            </button>
          ))}
        </div>

        {/* ── PARENT SECTION ── */}
        <button onClick={() => router.push('/eltern-einblicke')}
          style={{ width: '100%', background: theme.gradients.eltern, border: 'none', borderRadius: theme.radius.xl, padding: '20px 22px', cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '32px', boxShadow: '0 12px 32px rgba(26,31,54,0.25)' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: theme.radius.md, background: 'rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>👁️</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: '800', fontSize: '14px', color: 'white' }}>Für Eltern: Einblicke</div>
            <div style={{ fontSize: '11.5px', color: 'rgba(255,255,255,0.55)' }}>Was {childName} über sich erzählt hat</div>
          </div>
          <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '18px' }}>→</span>
        </button>
      </div>

      {/* ── BOTTOM NAVIGATION (floating pill style) ── */}
      <button onClick={() => router.push('/feedback')} style={{ position: 'fixed', bottom: '100px', right: '20px', width: '56px', height: '56px', borderRadius: '50%', background: theme.gradients.wuensche, border: 'none', boxShadow: '0 8px 24px rgba(255,124,176,0.4)', fontSize: '24px', cursor: 'pointer', zIndex: 20 }}>💬</button>
      <div className="np-floating-nav" style={{ position: 'fixed', bottom: '18px', left: '50%', transform: 'translateX(-50%)', background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(20px)', borderRadius: theme.radius.full, padding: '10px 8px', display: 'flex', gap: '4px', boxShadow: '0 12px 40px rgba(26,31,54,0.15)', border: '1px solid rgba(255,255,255,0.6)', zIndex: 20 }}>
        {[
          { icon: '🏠', label: 'Start', active: true, path: '/dashboard' },
          { icon: '🗺️', label: 'Reise', path: '/lernreise' },
          { icon: '📅', label: 'Kalender', path: '/kalender' },
          { icon: '☀️', label: 'Sommer', path: '/sommermission' },
          { icon: '👤', label: 'Profil', path: '/kind-waehlen' },
        ].map(item => (
          <button key={item.label} onClick={() => router.push(item.path)}
            style={{ background: item.active ? theme.gradients.primary : 'transparent', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px', padding: '9px 14px', borderRadius: theme.radius.full, transition: 'all 0.2s' }}>
            <span style={{ fontSize: '18px' }}>{item.icon}</span>
            <span style={{ fontSize: '9px', fontWeight: '700', color: item.active ? 'white' : theme.muted }}>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
