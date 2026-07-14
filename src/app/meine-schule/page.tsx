'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { theme } from '@/lib/theme'

interface LehrerEintrag {
  id: string
  fach: string
  name: string
}

export default function MeineSchule() {
  const router = useRouter()
  const [childName, setChildName] = useState('')
  const [schulname, setSchulname] = useState('')
  const [stadt, setStadt] = useState('')
  const [bezirk, setBezirk] = useState('')
  const [klassenlehrer, setKlassenlehrer] = useState('')
  const [lehrer, setLehrer] = useState<LehrerEintrag[]>([])
  const [neuFach, setNeuFach] = useState('')
  const [neuName, setNeuName] = useState('')
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    setChildName(localStorage.getItem('np_child_name') || 'Entdecker')
    setSchulname(localStorage.getItem('np_schule_name') || '')
    setStadt(localStorage.getItem('np_schule_stadt') || '')
    setBezirk(localStorage.getItem('np_schule_bezirk') || '')
    setKlassenlehrer(localStorage.getItem('np_klassenlehrer') || '')
    const savedLehrer = localStorage.getItem('np_lehrer_liste')
    if (savedLehrer) setLehrer(JSON.parse(savedLehrer))
  }, [])

  function lehrerHinzufuegen() {
    if (!neuFach || !neuName) return
    const eintrag: LehrerEintrag = { id: Date.now().toString(), fach: neuFach, name: neuName }
    const neu = [...lehrer, eintrag]
    setLehrer(neu)
    localStorage.setItem('np_lehrer_liste', JSON.stringify(neu))
    setNeuFach(''); setNeuName('')
  }

  function lehrerLoeschen(id: string) {
    const neu = lehrer.filter(l => l.id !== id)
    setLehrer(neu)
    localStorage.setItem('np_lehrer_liste', JSON.stringify(neu))
  }

  function speichern() {
    localStorage.setItem('np_schule_name', schulname)
    localStorage.setItem('np_schule_stadt', stadt)
    localStorage.setItem('np_schule_bezirk', bezirk)
    localStorage.setItem('np_klassenlehrer', klassenlehrer)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div style={{ minHeight: '100vh', background: theme.bg, fontFamily: 'var(--font-body), system-ui, sans-serif', paddingBottom: '60px' }}>

      <div style={{ background: 'linear-gradient(135deg, #4F7CFF, #37C978)', padding: '32px 24px 60px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '16px', right: '24px', fontSize: '54px', opacity: 0.2 }}>🏫</div>
        <button onClick={() => router.push('/dashboard')} style={{ background: 'rgba(255,255,255,0.25)', border: 'none', borderRadius: '10px', padding: '8px 12px', color: 'white', fontSize: '14px', cursor: 'pointer', marginBottom: '20px' }}>← Zurück</button>
        <h1 style={{ fontSize: '22px', fontWeight: '800', color: 'white', margin: 0 }}>{childName}s Schule 🏫</h1>
        <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '13px', margin: '4px 0 0' }}>Schule, Stadt und Lehrer eintragen</p>
      </div>

      <div style={{ maxWidth: '600px', margin: '-32px auto 0', padding: '0 20px' }}>

        {saved && (
          <div style={{ background: theme.soft.green, border: `1.5px solid ${theme.brand.green}`, borderRadius: theme.radius.md, padding: '10px 16px', marginBottom: '16px', textAlign: 'center', fontSize: '13px', fontWeight: '700', color: theme.brand.green }}>
            ✓ Gespeichert!
          </div>
        )}

        {/* Schul-Info */}
        <div style={{ background: 'white', borderRadius: theme.radius.xl, padding: '20px', marginBottom: '16px', boxShadow: theme.shadow.md }}>
          <div style={{ fontSize: '13px', fontWeight: '800', color: theme.ink, marginBottom: '14px' }}>🏫 Schulinformationen</div>

          <div style={{ marginBottom: '12px' }}>
            <label style={{ fontSize: '12px', fontWeight: '700', color: theme.mid, display: 'block', marginBottom: '6px' }}>Name der Schule</label>
            <input type="text" value={schulname} onChange={e => setSchulname(e.target.value)} placeholder="z.B. Gymnasium Steglitz"
              style={{ width: '100%', padding: '11px 14px', border: `1.5px solid ${theme.line}`, borderRadius: '10px', fontSize: '14px', boxSizing: 'border-box' }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '12px' }}>
            <div>
              <label style={{ fontSize: '12px', fontWeight: '700', color: theme.mid, display: 'block', marginBottom: '6px' }}>Stadt</label>
              <input type="text" value={stadt} onChange={e => setStadt(e.target.value)} placeholder="z.B. Berlin"
                style={{ width: '100%', padding: '11px 14px', border: `1.5px solid ${theme.line}`, borderRadius: '10px', fontSize: '14px', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ fontSize: '12px', fontWeight: '700', color: theme.mid, display: 'block', marginBottom: '6px' }}>Bezirk</label>
              <input type="text" value={bezirk} onChange={e => setBezirk(e.target.value)} placeholder="z.B. Steglitz-Zehlendorf"
                style={{ width: '100%', padding: '11px 14px', border: `1.5px solid ${theme.line}`, borderRadius: '10px', fontSize: '14px', boxSizing: 'border-box' }} />
            </div>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ fontSize: '12px', fontWeight: '700', color: theme.mid, display: 'block', marginBottom: '6px' }}>Klassenlehrer*in</label>
            <input type="text" value={klassenlehrer} onChange={e => setKlassenlehrer(e.target.value)} placeholder="z.B. Frau Schmidt"
              style={{ width: '100%', padding: '11px 14px', border: `1.5px solid ${theme.line}`, borderRadius: '10px', fontSize: '14px', boxSizing: 'border-box' }} />
          </div>

          <button onClick={speichern}
            style={{ width: '100%', padding: '12px', background: theme.gradients.primary, color: 'white', border: 'none', borderRadius: '10px', fontSize: '14px', fontWeight: '800', cursor: 'pointer' }}>
            Speichern
          </button>
        </div>

        {/* Fachlehrer-Liste */}
        <div style={{ background: 'white', borderRadius: theme.radius.xl, padding: '20px', marginBottom: '16px', boxShadow: theme.shadow.sm }}>
          <div style={{ fontSize: '13px', fontWeight: '800', color: theme.ink, marginBottom: '4px' }}>👩‍🏫 Fachlehrer</div>
          <p style={{ fontSize: '11px', color: theme.mid, margin: '0 0 14px' }}>Besonders am Gymnasium ab Klasse 7 hilfreich — viele Lehrer, viele Fächer</p>

          {lehrer.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '14px' }}>
              {lehrer.map(l => (
                <div key={l.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', background: theme.soft.blue, borderRadius: '10px', padding: '10px 14px' }}>
                  <span style={{ fontSize: '12px', fontWeight: '800', color: theme.brand.blue, minWidth: '80px' }}>{l.fach}</span>
                  <span style={{ fontSize: '13px', color: theme.ink, flex: 1 }}>{l.name}</span>
                  <button onClick={() => lehrerLoeschen(l.id)} style={{ background: 'none', border: 'none', color: theme.muted, cursor: 'pointer', fontSize: '15px' }}>✕</button>
                </div>
              ))}
            </div>
          )}

          <div style={{ display: 'flex', gap: '8px' }}>
            <input type="text" value={neuFach} onChange={e => setNeuFach(e.target.value)} placeholder="Fach"
              style={{ width: '35%', padding: '10px 12px', border: `1.5px solid ${theme.line}`, borderRadius: '10px', fontSize: '13px', boxSizing: 'border-box' }} />
            <input type="text" value={neuName} onChange={e => setNeuName(e.target.value)} placeholder="Name des Lehrers"
              style={{ flex: 1, padding: '10px 12px', border: `1.5px solid ${theme.line}`, borderRadius: '10px', fontSize: '13px', boxSizing: 'border-box' }} />
            <button onClick={lehrerHinzufuegen}
              style={{ padding: '10px 16px', background: theme.brand.green, color: 'white', border: 'none', borderRadius: '10px', fontSize: '13px', fontWeight: '800', cursor: 'pointer' }}>
              +
            </button>
          </div>
        </div>

        <div style={{ background: theme.soft.blue, borderRadius: theme.radius.lg, padding: '14px 18px', display: 'flex', gap: '10px' }}>
          <span style={{ fontSize: '16px' }}>ℹ️</span>
          <p style={{ fontSize: '11px', color: theme.brand.blue, margin: 0, lineHeight: '1.6' }}>
            Diese Informationen helfen Nica & Phil, sich noch besser auf {childName}s konkrete Schulsituation einzustellen — bleiben aber privat und werden nirgends veröffentlicht.
          </p>
        </div>
      </div>
    </div>
  )
}
