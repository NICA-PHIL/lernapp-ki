'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { theme } from '@/lib/theme'

const SCHWERPUNKTE = [
  { id: 'noten', icon: '📈', label: 'Bessere Noten' },
  { id: 'selbststaendig', icon: '🧠', label: 'Selbstständiger lernen' },
  { id: 'motivation', icon: '⚡', label: 'Mehr Motivation' },
  { id: 'konzentration', icon: '🎯', label: 'Bessere Konzentration' },
  { id: 'lesen', icon: '📖', label: 'Lesekompetenz stärken' },
  { id: 'rechtschreibung', icon: '✍️', label: 'Rechtschreibung' },
  { id: 'mathe', icon: '🔢', label: 'Mathe-Grundlagen' },
  { id: 'sprachen', icon: '🌍', label: 'Fremdsprachen' },
  { id: 'selbstvertrauen', icon: '💪', label: 'Selbstvertrauen stärken' },
]

const SORGEN = [
  { id: 'ueberforderung', icon: '😰', label: 'Überforderung' },
  { id: 'lustlos', icon: '😑', label: 'Fehlende Lust am Lernen' },
  { id: 'ablenkung', icon: '📱', label: 'Zu viel Ablenkung' },
  { id: 'druck', icon: '😓', label: 'Zu viel Leistungsdruck' },
  { id: 'schulwechsel', icon: '🏫', label: 'Neue Schule / Umstellung' },
  { id: 'keine', icon: '😊', label: 'Eigentlich keine Sorgen' },
]

export default function ElternWuensche() {
  const router = useRouter()
  const [childName, setChildName] = useState('')
  const [selectedSchwerpunkte, setSelectedSchwerpunkte] = useState<string[]>([])
  const [selectedSorgen, setSelectedSorgen] = useState<string[]>([])
  const [freitext, setFreitext] = useState('')
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    setChildName(localStorage.getItem('np_child_name') || 'Ihr Kind')
    const savedS = localStorage.getItem('np_eltern_schwerpunkte')
    const savedSo = localStorage.getItem('np_eltern_sorgen')
    const savedText = localStorage.getItem('np_eltern_freitext')
    if (savedS) setSelectedSchwerpunkte(JSON.parse(savedS))
    if (savedSo) setSelectedSorgen(JSON.parse(savedSo))
    if (savedText) setFreitext(savedText)
  }, [])

  function toggle(id: string, list: string[], setList: (l: string[]) => void) {
    setList(list.includes(id) ? list.filter(x => x !== id) : [...list, id])
  }

  function handleSave() {
    localStorage.setItem('np_eltern_schwerpunkte', JSON.stringify(selectedSchwerpunkte))
    localStorage.setItem('np_eltern_sorgen', JSON.stringify(selectedSorgen))
    localStorage.setItem('np_eltern_freitext', freitext)
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div style={{ minHeight: '100vh', background: theme.bg, fontFamily: 'var(--font-body), system-ui, sans-serif', paddingBottom: '60px' }}>

      <div style={{ background: theme.gradients.eltern, padding: '32px 24px 60px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '16px', right: '24px', fontSize: '54px', opacity: 0.15 }}>👪</div>
        <button onClick={() => router.push('/dashboard')} style={{ background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: theme.radius.sm, padding: '8px 12px', color: 'white', fontSize: '14px', cursor: 'pointer', marginBottom: '20px' }}>← Zurück</button>
        <h1 style={{ fontSize: '22px', fontWeight: '800', color: 'white', margin: 0 }}>Ihre Wünsche für {childName}</h1>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', margin: '4px 0 0' }}>Das hilft uns, Nica & Phil noch besser auf Ihr Kind einzustellen</p>
      </div>

      <div style={{ maxWidth: '640px', margin: '-32px auto 0', padding: '0 20px' }}>

        {/* Schwerpunkte */}
        <div style={{ background: 'white', borderRadius: theme.radius.xl, padding: '20px', marginBottom: '16px', boxShadow: theme.shadow.md }}>
          <div style={{ fontSize: '14px', fontWeight: '800', color: theme.ink, marginBottom: '4px' }}>🎯 Worauf soll der Fokus liegen?</div>
          <p style={{ fontSize: '12px', color: theme.mid, margin: '0 0 14px' }}>Mehrfachauswahl möglich</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {SCHWERPUNKTE.map(s => {
              const active = selectedSchwerpunkte.includes(s.id)
              return (
                <button key={s.id} onClick={() => toggle(s.id, selectedSchwerpunkte, setSelectedSchwerpunkte)}
                  style={{ padding: '10px 16px', borderRadius: theme.radius.full, border: `2px solid ${active ? theme.brand.blue : theme.line}`, background: active ? theme.soft.blue : 'white', cursor: 'pointer', fontSize: '13px', fontWeight: '700', color: active ? theme.brand.blue : theme.mid, display: 'flex', alignItems: 'center', gap: '6px', transition: 'all 0.15s' }}>
                  <span>{s.icon}</span>{s.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Sorgen */}
        <div style={{ background: 'white', borderRadius: theme.radius.xl, padding: '20px', marginBottom: '16px', boxShadow: theme.shadow.md }}>
          <div style={{ fontSize: '14px', fontWeight: '800', color: theme.ink, marginBottom: '4px' }}>💬 Gibt es aktuell Sorgen?</div>
          <p style={{ fontSize: '12px', color: theme.mid, margin: '0 0 14px' }}>Ganz offen — das bleibt vertraulich</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {SORGEN.map(s => {
              const active = selectedSorgen.includes(s.id)
              return (
                <button key={s.id} onClick={() => toggle(s.id, selectedSorgen, setSelectedSorgen)}
                  style={{ padding: '10px 16px', borderRadius: theme.radius.full, border: `2px solid ${active ? theme.brand.orange : theme.line}`, background: active ? theme.soft.orange : 'white', cursor: 'pointer', fontSize: '13px', fontWeight: '700', color: active ? theme.brand.orange : theme.mid, display: 'flex', alignItems: 'center', gap: '6px', transition: 'all 0.15s' }}>
                  <span>{s.icon}</span>{s.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Freitext */}
        <div style={{ background: 'white', borderRadius: theme.radius.xl, padding: '20px', marginBottom: '20px', boxShadow: theme.shadow.md }}>
          <div style={{ fontSize: '14px', fontWeight: '800', color: theme.ink, marginBottom: '10px' }}>✏️ Möchten Sie uns noch etwas mitteilen?</div>
          <textarea
            value={freitext}
            onChange={e => setFreitext(e.target.value)}
            placeholder="z.B. besondere Lernbedürfnisse, Diagnosen, was bisher gut oder schlecht funktioniert hat..."
            rows={4}
            style={{ width: '100%', padding: '14px', border: `2px solid ${theme.line}`, borderRadius: theme.radius.md, fontSize: '14px', outline: 'none', boxSizing: 'border-box', fontFamily: 'var(--font-body), system-ui', resize: 'none' }}
          />
        </div>

        <button onClick={handleSave}
          style={{ width: '100%', padding: '15px', background: saved ? theme.brand.green : theme.ink, color: 'white', border: 'none', borderRadius: theme.radius.md, fontSize: '15px', fontWeight: '800', cursor: 'pointer', transition: 'all 0.3s' }}>
          {saved ? '✓ Gespeichert!' : 'Speichern 💾'}
        </button>
      </div>
    </div>
  )
}
