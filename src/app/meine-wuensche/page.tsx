'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { theme } from '@/lib/theme'

const INTERESSEN = [
  { id: 'tiere', icon: '🐾', label: 'Tiere' },
  { id: 'weltraum', icon: '🚀', label: 'Weltraum' },
  { id: 'fussball', icon: '⚽', label: 'Fußball' },
  { id: 'kunst', icon: '🎨', label: 'Malen & Kunst' },
  { id: 'musik', icon: '🎵', label: 'Musik' },
  { id: 'dinos', icon: '🦕', label: 'Dinosaurier' },
  { id: 'games', icon: '🎮', label: 'Games' },
  { id: 'lesen', icon: '📚', label: 'Lesen' },
  { id: 'kochen', icon: '🍳', label: 'Kochen & Backen' },
  { id: 'natur', icon: '🌳', label: 'Natur & Draußen' },
  { id: 'technik', icon: '🔧', label: 'Technik & Bauen' },
  { id: 'tanzen', icon: '💃', label: 'Tanzen' },
]

const LERNWUENSCHE = [
  { id: 'spass', icon: '😄', label: 'Mehr Spaß beim Lernen' },
  { id: 'schneller', icon: '⚡', label: 'Schneller verstehen' },
  { id: 'selbstbewusst', icon: '💪', label: 'Mich sicherer fühlen' },
  { id: 'freunde', icon: '👫', label: 'Mit Freunden lernen' },
  { id: 'belohnung', icon: '🏆', label: 'Mehr Belohnungen' },
  { id: 'ruhig', icon: '🧘', label: 'In Ruhe lernen können' },
]

export default function MeineWuensche() {
  const router = useRouter()
  const [childName, setChildName] = useState('')
  const [avatar, setAvatar] = useState<string | null>(null)
  const [selectedInteressen, setSelectedInteressen] = useState<string[]>([])
  const [selectedWuensche, setSelectedWuensche] = useState<string[]>([])
  const [freitext, setFreitext] = useState('')
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    setChildName(localStorage.getItem('np_child_name') || 'Entdecker')
    setAvatar(localStorage.getItem('np_child_avatar'))
    const savedInteressen = localStorage.getItem('np_child_interessen')
    const savedWuensche = localStorage.getItem('np_child_wuensche')
    const savedText = localStorage.getItem('np_child_freitext')
    if (savedInteressen) setSelectedInteressen(JSON.parse(savedInteressen))
    if (savedWuensche) setSelectedWuensche(JSON.parse(savedWuensche))
    if (savedText) setFreitext(savedText)
  }, [])

  function toggle(id: string, list: string[], setList: (l: string[]) => void) {
    setList(list.includes(id) ? list.filter(x => x !== id) : [...list, id])
  }

  function handleSave() {
    localStorage.setItem('np_child_interessen', JSON.stringify(selectedInteressen))
    localStorage.setItem('np_child_wuensche', JSON.stringify(selectedWuensche))
    localStorage.setItem('np_child_freitext', freitext)
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div style={{ minHeight: '100vh', background: theme.bg, fontFamily: 'var(--font-body), system-ui, sans-serif', paddingBottom: '60px' }}>

      <div style={{ background: 'linear-gradient(135deg, #FF7CB0, #8A5CFF)', padding: '32px 24px 60px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '16px', right: '24px', fontSize: '54px', opacity: 0.2 }}>💭</div>
        <button onClick={() => router.push('/dashboard')} style={{ background: 'rgba(255,255,255,0.25)', border: 'none', borderRadius: '10px', padding: '8px 12px', color: 'white', fontSize: '14px', cursor: 'pointer', marginBottom: '20px' }}>← Zurück</button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {avatar && <img src={avatar} style={{ width: '52px', height: '52px', borderRadius: '50%', objectFit: 'cover', border: '3px solid rgba(255,255,255,0.5)' }} />}
          <div>
            <h1 style={{ fontSize: '22px', fontWeight: '800', color: 'white', margin: 0 }}>Was magst du, {childName}?</h1>
            <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '13px', margin: '2px 0 0' }}>Das hilft Nica & Phil, dich besser zu verstehen</p>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '640px', margin: '-32px auto 0', padding: '0 20px' }}>

        {/* Interessen */}
        <div style={{ background: 'white', borderRadius: '20px', padding: '20px', marginBottom: '16px', boxShadow: theme.shadow.md }}>
          <div style={{ fontSize: '14px', fontWeight: '800', color: theme.ink, marginBottom: '4px' }}>🌟 Das mag ich!</div>
          <p style={{ fontSize: '12px', color: theme.mid, margin: '0 0 14px' }}>Wähl so viele aus, wie du magst</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {INTERESSEN.map(i => {
              const active = selectedInteressen.includes(i.id)
              return (
                <button key={i.id} onClick={() => toggle(i.id, selectedInteressen, setSelectedInteressen)}
                  style={{ padding: '10px 16px', borderRadius: theme.radius.full, border: `2px solid ${active ? theme.brand.pink : theme.line}`, background: active ? theme.soft.pink : 'white', cursor: 'pointer', fontSize: '13px', fontWeight: '700', color: active ? theme.brand.pink : theme.mid, display: 'flex', alignItems: 'center', gap: '6px', transition: 'all 0.15s' }}>
                  <span>{i.icon}</span>{i.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Lernwünsche */}
        <div style={{ background: 'white', borderRadius: '20px', padding: '20px', marginBottom: '16px', boxShadow: theme.shadow.md }}>
          <div style={{ fontSize: '14px', fontWeight: '800', color: theme.ink, marginBottom: '4px' }}>🎯 Das wünsche ich mir beim Lernen</div>
          <p style={{ fontSize: '12px', color: theme.mid, margin: '0 0 14px' }}>Was ist dir wichtig?</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {LERNWUENSCHE.map(w => {
              const active = selectedWuensche.includes(w.id)
              return (
                <button key={w.id} onClick={() => toggle(w.id, selectedWuensche, setSelectedWuensche)}
                  style={{ padding: '10px 16px', borderRadius: theme.radius.full, border: `2px solid ${active ? theme.brand.blue : theme.line}`, background: active ? theme.soft.blue : 'white', cursor: 'pointer', fontSize: '13px', fontWeight: '700', color: active ? theme.brand.blue : theme.mid, display: 'flex', alignItems: 'center', gap: '6px', transition: 'all 0.15s' }}>
                  <span>{w.icon}</span>{w.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Freitext */}
        <div style={{ background: 'white', borderRadius: '20px', padding: '20px', marginBottom: '20px', boxShadow: theme.shadow.md }}>
          <div style={{ fontSize: '14px', fontWeight: '800', color: theme.ink, marginBottom: '10px' }}>✏️ Willst du Nica & Phil noch etwas sagen?</div>
          <textarea
            value={freitext}
            onChange={e => setFreitext(e.target.value)}
            placeholder="z.B. Ich mag es nicht, wenn es zu schnell geht... oder: Ich liebe Rätsel!"
            rows={4}
            style={{ width: '100%', padding: '14px', border: `2px solid ${theme.line}`, borderRadius: theme.radius.md, fontSize: '14px', outline: 'none', boxSizing: 'border-box', fontFamily: 'var(--font-body), system-ui', resize: 'none' }}
          />
        </div>

        <button onClick={handleSave}
          style={{ width: '100%', padding: '15px', background: saved ? theme.brand.green : theme.gradients.primary, color: 'white', border: 'none', borderRadius: theme.radius.md, fontSize: '15px', fontWeight: '800', cursor: 'pointer', transition: 'all 0.3s' }}>
          {saved ? '✓ Gespeichert!' : 'Speichern 💾'}
        </button>
      </div>
    </div>
  )
}
