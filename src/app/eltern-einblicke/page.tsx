'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { theme } from '@/lib/theme'

const INTERESSEN_LABELS: Record<string, { icon: string; label: string }> = {
  tiere: { icon: '🐾', label: 'Tiere' }, weltraum: { icon: '🚀', label: 'Weltraum' },
  fussball: { icon: '⚽', label: 'Fußball' }, kunst: { icon: '🎨', label: 'Malen & Kunst' },
  musik: { icon: '🎵', label: 'Musik' }, dinos: { icon: '🦕', label: 'Dinosaurier' },
  games: { icon: '🎮', label: 'Games' }, lesen: { icon: '📚', label: 'Lesen' },
  kochen: { icon: '🍳', label: 'Kochen & Backen' }, natur: { icon: '🌳', label: 'Natur & Draußen' },
  technik: { icon: '🔧', label: 'Technik & Bauen' }, tanzen: { icon: '💃', label: 'Tanzen' },
}
const WUNSCH_LABELS: Record<string, { icon: string; label: string }> = {
  spass: { icon: '😄', label: 'Mehr Spaß beim Lernen' }, schneller: { icon: '⚡', label: 'Schneller verstehen' },
  selbstbewusst: { icon: '💪', label: 'Sich sicherer fühlen' }, freunde: { icon: '👫', label: 'Mit Freunden lernen' },
  belohnung: { icon: '🏆', label: 'Mehr Belohnungen' }, ruhig: { icon: '🧘', label: 'In Ruhe lernen können' },
}
const STIL_LABELS: Record<string, string> = { sterne: '⭐ Sterne & Punkte', noten: '📊 Noten', fortschritt: '📈 Nur Fortschritt', worte: '💬 Nur Worte' }

function RingProgress({ value, max, farbe, size = 68 }: { value: number; max: number; farbe: string; size?: number }) {
  const pct = max > 0 ? Math.min(value / max, 1) : 0
  const r = (size - 8) / 2
  const circ = 2 * Math.PI * r
  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#EEF1F6" strokeWidth="6" />
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={farbe} strokeWidth="6" strokeDasharray={circ} strokeDashoffset={circ - pct*circ} strokeLinecap="round" transform={`rotate(-90 ${size/2} ${size/2})`} />
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: `clamp(15px, 1.6vw, 18px)`, fontWeight: '800', color: farbe }}>{value}</div>
    </div>
  )
}

export default function ElternEinblicke() {
  const router = useRouter()
  const [childName, setChildName] = useState('')
  const [childAvatar, setChildAvatar] = useState<string | null>(null)
  const [interessen, setInteressen] = useState<string[]>([])
  const [wuensche, setWuensche] = useState<string[]>([])
  const [kindText, setKindText] = useState('')
  const [belohnungsstil, setBelohnungsstil] = useState<string | null>(null)
  const [skillsProgress, setSkillsProgress] = useState({ gitarre: 0, musik: 0, schach: 0 })
  const [checkPhilipp, setCheckPhilipp] = useState(0)
  const [checkNicole, setCheckNicole] = useState(0)

  useEffect(() => {
    setChildName(localStorage.getItem('np_child_name') || 'Ihr Kind')
    setChildAvatar(localStorage.getItem('np_child_avatar'))
    const ints = localStorage.getItem('np_child_interessen'); if (ints) setInteressen(JSON.parse(ints))
    const wnsch = localStorage.getItem('np_child_wuensche'); if (wnsch) setWuensche(JSON.parse(wnsch))
    const text = localStorage.getItem('np_child_freitext'); if (text) setKindText(text)
    const stil = localStorage.getItem('np_belohnungsstil'); if (stil) setBelohnungsstil(stil)
    const g = JSON.parse(localStorage.getItem('np_gitarre_progress') || '[]')
    const m = JSON.parse(localStorage.getItem('np_musik_progress') || '[]')
    const s = JSON.parse(localStorage.getItem('np_schach_progress') || '[]')
    setSkillsProgress({ gitarre: g.length, musik: m.length, schach: s.length })
    setCheckPhilipp(JSON.parse(localStorage.getItem('np_philipp_checkliste') || '[]').length)
    setCheckNicole(JSON.parse(localStorage.getItem('np_nicole_checkliste') || '[]').length)
  }, [])

  return (
    <div style={{ minHeight: '100vh', background: 'radial-gradient(ellipse 80% 50% at 50% -10%, #F0F4FF 0%, #FAFBFF 60%)', fontFamily: 'var(--font-body), -apple-system, sans-serif', paddingBottom: '60px' }}>

      {/* ── Kompakter Header ── */}
      <div style={{ background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(20px)', padding: '16px clamp(20px,4vw,40px)', display: 'flex', alignItems: 'center', gap: '16px', borderBottom: `1px solid ${theme.line}`, position: 'sticky', top: 0, zIndex: 20 }}>
        <button onClick={() => router.push('/dashboard')} style={{ background: theme.bg, border: 'none', borderRadius: theme.radius.md, padding: '10px 16px', fontSize: 'clamp(13px,1.1vw,15px)', fontWeight: '700', cursor: 'pointer', color: '#374151' }}>← Zurück</button>
        <div>
          <div style={{ fontFamily: theme.font.display, fontWeight: '600', fontSize: 'clamp(16px,1.6vw,19px)', color: theme.ink, letterSpacing: '-0.01em' }}>👁️ Einblicke in {childName}s Welt</div>
          <div style={{ fontSize: 'clamp(11.5px,1vw,13px)', color: theme.muted }}>Was Ihr Kind uns über sich selbst erzählt hat</div>
        </div>
      </div>

      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: 'clamp(20px,3vw,40px)' }}>

        {/* ── Profil-Kopf ── */}
        <div style={{ background: 'white', borderRadius: theme.radius.xl, padding: 'clamp(20px,2.2vw,28px)', marginBottom: '20px', boxShadow: '0 8px 28px rgba(79,124,255,0.08)', display: 'flex', alignItems: 'center', gap: '20px', border: `1px solid ${theme.line}` }}>
          {childAvatar ? (
            <img src={childAvatar} style={{ width: 'clamp(56px,5vw,72px)', height: 'clamp(56px,5vw,72px)', borderRadius: '50%', objectFit: 'cover', border: `3px solid ${theme.soft.blue}`, boxShadow: '0 6px 20px rgba(79,124,255,0.2)' }} />
          ) : (
            <div style={{ width: 'clamp(56px,5vw,72px)', height: 'clamp(56px,5vw,72px)', borderRadius: '50%', background: theme.soft.blue, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 'clamp(24px,2.5vw,32px)' }}>🧒</div>
          )}
          <div>
            <div style={{ fontFamily: theme.font.display, fontWeight: '600', fontSize: 'clamp(19px,2vw,24px)', color: theme.ink, letterSpacing: '-0.01em' }}>{childName}</div>
            <div style={{ fontSize: 'clamp(12.5px,1.1vw,14px)', color: theme.muted, marginTop: '2px' }}>
              Bevorzugtes Feedback: <strong style={{ color: theme.brand.blue }}>{belohnungsstil ? STIL_LABELS[belohnungsstil] : 'noch nicht gewählt'}</strong>
            </div>
          </div>
        </div>

        {/* ── Grid: Interessen + Wünsche ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '16px', marginBottom: '16px' }}>
          <div style={{ background: 'white', borderRadius: theme.radius.xl, padding: 'clamp(18px,2vw,24px)', boxShadow: '0 4px 20px rgba(79,124,255,0.06)', border: `1px solid ${theme.line}` }}>
            <div style={{ fontSize: 'clamp(14px,1.3vw,16px)', fontWeight: '800', color: theme.ink, marginBottom: '4px' }}>🌟 Was {childName} wirklich mag</div>
            <p style={{ fontSize: 'clamp(11.5px,1vw,13px)', color: theme.muted, margin: '0 0 14px' }}>Direkt von Ihrem Kind ausgewählt</p>
            {interessen.length > 0 ? (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {interessen.map(id => { const info = INTERESSEN_LABELS[id]; if (!info) return null; return (
                  <span key={id} style={{ fontSize: 'clamp(12px,1.05vw,13.5px)', fontWeight: '700', padding: '7px 14px', borderRadius: theme.radius.full, background: theme.soft.pink, color: theme.brand.pink }}>{info.icon} {info.label}</span>
                )})}
              </div>
            ) : <p style={{ fontSize: 'clamp(12px,1.05vw,13.5px)', color: '#C4C9D4', fontStyle: 'italic' }}>{childName} hat noch keine Interessen ausgewählt.</p>}
          </div>

          <div style={{ background: 'white', borderRadius: theme.radius.xl, padding: 'clamp(18px,2vw,24px)', boxShadow: '0 4px 20px rgba(79,124,255,0.06)', border: `1px solid ${theme.line}` }}>
            <div style={{ fontSize: 'clamp(14px,1.3vw,16px)', fontWeight: '800', color: theme.ink, marginBottom: '4px' }}>🎯 Lernwünsche</div>
            <p style={{ fontSize: 'clamp(11.5px,1vw,13px)', color: theme.muted, margin: '0 0 14px' }}>Fließt direkt in Nica & Phils Umgang ein</p>
            {wuensche.length > 0 ? (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {wuensche.map(id => { const info = WUNSCH_LABELS[id]; if (!info) return null; return (
                  <span key={id} style={{ fontSize: 'clamp(12px,1.05vw,13.5px)', fontWeight: '700', padding: '7px 14px', borderRadius: theme.radius.full, background: theme.soft.blue, color: theme.brand.blue }}>{info.icon} {info.label}</span>
                )})}
              </div>
            ) : <p style={{ fontSize: 'clamp(12px,1.05vw,13.5px)', color: '#C4C9D4', fontStyle: 'italic' }}>Noch keine Angaben.</p>}
          </div>
        </div>

        {kindText && (
          <div style={{ background: 'linear-gradient(135deg,#FFF9E8,#FFFCF3)', borderRadius: '22px', padding: 'clamp(18px,2vw,24px)', marginBottom: '16px', border: '1px solid #FFE9AE' }}>
            <div style={{ fontSize: 'clamp(14px,1.3vw,16px)', fontWeight: '800', color: '#9A7B00', marginBottom: '10px' }}>💬 In {childName}s eigenen Worten</div>
            <p style={{ fontSize: 'clamp(13px,1.15vw,15px)', color: '#7A5C00', margin: 0, lineHeight: '1.6', fontStyle: 'italic' }}>"{kindText}"</p>
          </div>
        )}

        {/* ── Talente-Fortschritt mit Ringen ── */}
        <div style={{ background: 'white', borderRadius: theme.radius.xl, padding: 'clamp(18px,2vw,24px)', marginBottom: '16px', boxShadow: '0 4px 20px rgba(79,124,255,0.06)', border: `1px solid ${theme.line}` }}>
          <div style={{ fontSize: 'clamp(14px,1.3vw,16px)', fontWeight: '800', color: theme.ink, marginBottom: '16px' }}>🎸 Talente-Fortschritt</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '14px' }}>
            {[{icon:'🎸',label:'Gitarre',val:skillsProgress.gitarre,farbe:theme.brand.orange,bg:theme.soft.orange},{icon:'🎹',label:'Piano/Gesang',val:skillsProgress.musik,farbe:theme.brand.purple,bg:theme.soft.purple},{icon:'♟️',label:'Schach',val:skillsProgress.schach,farbe:theme.brand.blue,bg:theme.soft.blue}].map(t => (
              <div key={t.label} style={{ textAlign: 'center', padding: 'clamp(14px,1.5vw,18px)', background: t.bg, borderRadius: theme.radius.lg, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: 'clamp(20px,2vw,24px)' }}>{t.icon}</span>
                <RingProgress value={t.val} max={10} farbe={t.farbe} />
                <div style={{ fontSize: 'clamp(11px,1vw,12.5px)', fontWeight: '700', color: theme.mid }}>{t.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Startklar-Fortschritt ── */}
        <div style={{ background: 'white', borderRadius: theme.radius.xl, padding: 'clamp(18px,2vw,24px)', marginBottom: '20px', boxShadow: '0 4px 20px rgba(79,124,255,0.06)', border: `1px solid ${theme.line}` }}>
          <div style={{ fontSize: 'clamp(14px,1.3vw,16px)', fontWeight: '800', color: theme.ink, marginBottom: '14px' }}>✅ Vorbereitung neues Schuljahr</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {checkPhilipp > 0 && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ fontSize: 'clamp(12.5px,1.1vw,14px)', color: '#374151', fontWeight: '600' }}>Philipp</span>
                  <span style={{ fontSize: 'clamp(12.5px,1.1vw,14px)', color: theme.brand.blue, fontWeight: '800' }}>{checkPhilipp}/6</span>
                </div>
                <div style={{ height: '8px', background: theme.line, borderRadius: theme.radius.full, overflow: 'hidden' }}><div style={{ height: '100%', width: `${checkPhilipp/6*100}%`, background: theme.brand.blue, borderRadius: theme.radius.full }} /></div>
              </div>
            )}
            {checkNicole > 0 && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ fontSize: 'clamp(12.5px,1.1vw,14px)', color: '#374151', fontWeight: '600' }}>Nicole</span>
                  <span style={{ fontSize: 'clamp(12.5px,1.1vw,14px)', color: theme.brand.pink, fontWeight: '800' }}>{checkNicole}/6</span>
                </div>
                <div style={{ height: '8px', background: theme.line, borderRadius: theme.radius.full, overflow: 'hidden' }}><div style={{ height: '100%', width: `${checkNicole/6*100}%`, background: theme.brand.pink, borderRadius: theme.radius.full }} /></div>
              </div>
            )}
            {checkPhilipp === 0 && checkNicole === 0 && <p style={{ fontSize: 'clamp(12px,1.05vw,13.5px)', color: '#C4C9D4', fontStyle: 'italic' }}>Checkliste noch nicht gestartet.</p>}
          </div>
        </div>

        <div style={{ background: theme.soft.blue, borderRadius: theme.radius.lg, padding: 'clamp(14px,1.5vw,18px) clamp(18px,2vw,22px)', display: 'flex', gap: '12px' }}>
          <span style={{ fontSize: 'clamp(16px,1.5vw,18px)' }}>ℹ️</span>
          <p style={{ fontSize: 'clamp(11.5px,1vw,13px)', color: theme.brand.blue, margin: 0, lineHeight: '1.6' }}>
            Diese Einblicke stammen direkt aus dem, was {childName} selbst in der App angibt — nicht aus Überwachung, sondern aus freiwilligen Angaben.
          </p>
        </div>
      </div>
    </div>
  )
}
