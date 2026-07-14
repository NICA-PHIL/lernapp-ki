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

const STIL_LABELS: Record<string, string> = {
  sterne: '⭐ Sterne & Punkte', noten: '📊 Noten', fortschritt: '📈 Nur Fortschritt', worte: '💬 Nur Worte',
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

    const ints = localStorage.getItem('np_child_interessen')
    const wnsch = localStorage.getItem('np_child_wuensche')
    const text = localStorage.getItem('np_child_freitext')
    const stil = localStorage.getItem('np_belohnungsstil')

    if (ints) setInteressen(JSON.parse(ints))
    if (wnsch) setWuensche(JSON.parse(wnsch))
    if (text) setKindText(text)
    if (stil) setBelohnungsstil(stil)

    const g = JSON.parse(localStorage.getItem('np_gitarre_progress') || '[]')
    const m = JSON.parse(localStorage.getItem('np_musik_progress') || '[]')
    const s = JSON.parse(localStorage.getItem('np_schach_progress') || '[]')
    setSkillsProgress({ gitarre: g.length, musik: m.length, schach: s.length })

    const cp = JSON.parse(localStorage.getItem('np_philipp_checkliste') || '[]')
    const cn = JSON.parse(localStorage.getItem('np_nicole_checkliste') || '[]')
    setCheckPhilipp(cp.length)
    setCheckNicole(cn.length)
  }, [])

  return (
    <div style={{ minHeight: '100vh', background: theme.bg, fontFamily: 'system-ui, sans-serif', paddingBottom: '60px' }}>

      <div style={{ background: theme.gradients.eltern, padding: '32px 24px 60px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '16px', right: '24px', fontSize: '54px', opacity: 0.15 }}>👁️</div>
        <button onClick={() => router.push('/dashboard')} style={{ background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: '10px', padding: '8px 12px', color: 'white', fontSize: '14px', cursor: 'pointer', marginBottom: '20px' }}>← Zurück</button>
        <h1 style={{ fontSize: '22px', fontWeight: '800', color: 'white', margin: 0 }}>Einblicke in {childName}s Welt</h1>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', margin: '4px 0 0' }}>Was Ihr Kind uns über sich selbst erzählt hat</p>
      </div>

      <div style={{ maxWidth: '640px', margin: '-32px auto 0', padding: '0 20px' }}>

        {/* Profil-Kopf */}
        <div style={{ background: 'white', borderRadius: theme.radius.xl, padding: '20px', marginBottom: '16px', boxShadow: theme.shadow.md, display: 'flex', alignItems: 'center', gap: '16px' }}>
          {childAvatar && <img src={childAvatar} style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover', border: `3px solid ${theme.soft.blue}` }} />}
          <div>
            <div style={{ fontWeight: '800', fontSize: '16px', color: theme.ink }}>{childName}</div>
            <div style={{ fontSize: '12px', color: theme.mid }}>
              Bevorzugtes Feedback: {belohnungsstil ? STIL_LABELS[belohnungsstil] : 'noch nicht gewählt'}
            </div>
          </div>
        </div>

        {/* Interessen */}
        <div style={{ background: 'white', borderRadius: theme.radius.xl, padding: '20px', marginBottom: '16px', boxShadow: theme.shadow.sm }}>
          <div style={{ fontSize: '13px', fontWeight: '800', color: theme.ink, marginBottom: '4px' }}>🌟 Was {childName} wirklich mag</div>
          <p style={{ fontSize: '11px', color: theme.mid, margin: '0 0 12px' }}>Direkt von Ihrem Kind ausgewählt — nicht von uns vermutet</p>
          {interessen.length > 0 ? (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {interessen.map(id => {
                const info = INTERESSEN_LABELS[id]
                if (!info) return null
                return (
                  <span key={id} style={{ fontSize: '12px', fontWeight: '700', padding: '6px 12px', borderRadius: theme.radius.full, background: theme.soft.pink, color: theme.brand.pink }}>
                    {info.icon} {info.label}
                  </span>
                )
              })}
            </div>
          ) : (
            <p style={{ fontSize: '12px', color: theme.muted, fontStyle: 'italic' }}>{childName} hat noch keine Interessen ausgewählt.</p>
          )}
        </div>

        {/* Lernwünsche */}
        <div style={{ background: 'white', borderRadius: theme.radius.xl, padding: '20px', marginBottom: '16px', boxShadow: theme.shadow.sm }}>
          <div style={{ fontSize: '13px', fontWeight: '800', color: theme.ink, marginBottom: '4px' }}>🎯 Was sich {childName} beim Lernen wünscht</div>
          <p style={{ fontSize: '11px', color: theme.mid, margin: '0 0 12px' }}>Diese Wünsche fließen direkt in Nica & Phils Umgang mit Ihrem Kind ein</p>
          {wuensche.length > 0 ? (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {wuensche.map(id => {
                const info = WUNSCH_LABELS[id]
                if (!info) return null
                return (
                  <span key={id} style={{ fontSize: '12px', fontWeight: '700', padding: '6px 12px', borderRadius: theme.radius.full, background: theme.soft.blue, color: theme.brand.blue }}>
                    {info.icon} {info.label}
                  </span>
                )
              })}
            </div>
          ) : (
            <p style={{ fontSize: '12px', color: theme.muted, fontStyle: 'italic' }}>Noch keine Angaben.</p>
          )}
        </div>

        {/* Freitext vom Kind — besonders wertvoll */}
        {kindText && (
          <div style={{ background: theme.soft.warn, borderRadius: theme.radius.xl, padding: '20px', marginBottom: '16px', border: `1.5px solid #FFE0A0` }}>
            <div style={{ fontSize: '13px', fontWeight: '800', color: '#9A5700', marginBottom: '10px' }}>💬 In {childName}s eigenen Worten</div>
            <p style={{ fontSize: '13px', color: '#7A5C00', margin: 0, lineHeight: '1.6', fontStyle: 'italic' }}>"{kindText}"</p>
          </div>
        )}

        {/* Talente-Fortschritt */}
        <div style={{ background: 'white', borderRadius: theme.radius.xl, padding: '20px', marginBottom: '16px', boxShadow: theme.shadow.sm }}>
          <div style={{ fontSize: '13px', fontWeight: '800', color: theme.ink, marginBottom: '12px' }}>🎸 Talente-Fortschritt</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
            <div style={{ textAlign: 'center', padding: '12px', background: theme.soft.orange, borderRadius: theme.radius.md }}>
              <div style={{ fontSize: '20px' }}>🎸</div>
              <div style={{ fontSize: '16px', fontWeight: '800', color: theme.brand.orange }}>{skillsProgress.gitarre}</div>
              <div style={{ fontSize: '10px', color: theme.mid }}>Gitarre</div>
            </div>
            <div style={{ textAlign: 'center', padding: '12px', background: theme.soft.purple, borderRadius: theme.radius.md }}>
              <div style={{ fontSize: '20px' }}>🎹</div>
              <div style={{ fontSize: '16px', fontWeight: '800', color: theme.brand.purple }}>{skillsProgress.musik}</div>
              <div style={{ fontSize: '10px', color: theme.mid }}>Piano/Gesang</div>
            </div>
            <div style={{ textAlign: 'center', padding: '12px', background: theme.soft.blue, borderRadius: theme.radius.md }}>
              <div style={{ fontSize: '20px' }}>♟️</div>
              <div style={{ fontSize: '16px', fontWeight: '800', color: theme.brand.blue }}>{skillsProgress.schach}</div>
              <div style={{ fontSize: '10px', color: theme.mid }}>Schach</div>
            </div>
          </div>
        </div>

        {/* Startklar-Fortschritt */}
        <div style={{ background: 'white', borderRadius: theme.radius.xl, padding: '20px', marginBottom: '16px', boxShadow: theme.shadow.sm }}>
          <div style={{ fontSize: '13px', fontWeight: '800', color: theme.ink, marginBottom: '12px' }}>✅ Vorbereitung neues Schuljahr</div>
          {checkPhilipp > 0 && <div style={{ fontSize: '12px', color: theme.mid, marginBottom: '4px' }}>Philipp: {checkPhilipp}/6 Punkte erledigt</div>}
          {checkNicole > 0 && <div style={{ fontSize: '12px', color: theme.mid }}>Nicole: {checkNicole}/6 Punkte erledigt</div>}
          {checkPhilipp === 0 && checkNicole === 0 && <p style={{ fontSize: '12px', color: theme.muted, fontStyle: 'italic' }}>Checkliste noch nicht gestartet.</p>}
        </div>

        {/* Hinweis zur Datengrundlage */}
        <div style={{ background: theme.soft.blue, borderRadius: theme.radius.lg, padding: '14px 18px', display: 'flex', gap: '10px' }}>
          <span style={{ fontSize: '16px' }}>ℹ️</span>
          <p style={{ fontSize: '11px', color: theme.brand.blue, margin: 0, lineHeight: '1.6' }}>
            Diese Einblicke stammen direkt aus dem, was {childName || 'Ihr Kind'} selbst in der App angibt — nicht aus Überwachung, sondern aus freiwilligen Angaben. So verstehen Sie Ihr Kind besser, ohne dass es sich beobachtet fühlt.
          </p>
        </div>
      </div>
    </div>
  )
}
