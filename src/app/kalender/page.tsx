'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { theme } from '@/lib/theme'

interface Termin {
  id: string
  datum: string
  titel: string
  typ: 'klassenarbeit' | 'pruefung' | 'test' | 'geburtstag' | 'veranstaltung'
  fach?: string
  kind?: string
}

const TYP_INFO: Record<Termin['typ'], { icon: string; label: string; farbe: string; bg: string }> = {
  klassenarbeit: { icon: '📝', label: 'Klassenarbeit', farbe: '#DC2626', bg: '#FFEFEF' },
  pruefung: { icon: '🎓', label: 'Prüfung', farbe: '#8A5CFF', bg: '#F2EBFF' },
  test: { icon: '✏️', label: 'Test', farbe: '#4F7CFF', bg: '#EAF0FF' },
  geburtstag: { icon: '🎂', label: 'Geburtstag', farbe: '#FF7CB0', bg: '#FFE8F1' },
  veranstaltung: { icon: '🎉', label: 'Veranstaltung', farbe: '#37C978', bg: '#E3FAEE' },
}

export default function Kalender() {
  const router = useRouter()
  const [termine, setTermine] = useState<Termin[]>([])
  const [zeigeForm, setZeigeForm] = useState(false)
  const [neuDatum, setNeuDatum] = useState('')
  const [neuTitel, setNeuTitel] = useState('')
  const [neuTyp, setNeuTyp] = useState<Termin['typ']>('klassenarbeit')
  const [neuFach, setNeuFach] = useState('')
  const [neuKind, setNeuKind] = useState('')

  useEffect(() => {
    const saved = localStorage.getItem('np_termine')
    if (saved) setTermine(JSON.parse(saved))
  }, [])

  function speichern(liste: Termin[]) {
    setTermine(liste)
    localStorage.setItem('np_termine', JSON.stringify(liste))
  }

  function hinzufuegen() {
    if (!neuDatum || !neuTitel) return
    const termin: Termin = {
      id: Date.now().toString(),
      datum: neuDatum,
      titel: neuTitel,
      typ: neuTyp,
      fach: neuFach || undefined,
      kind: neuKind || undefined,
    }
    speichern([...termine, termin].sort((a, b) => a.datum.localeCompare(b.datum)))
    setNeuDatum(''); setNeuTitel(''); setNeuFach(''); setNeuKind(''); setZeigeForm(false)
  }

  function loeschen(id: string) {
    speichern(termine.filter(t => t.id !== id))
  }

  const heute = new Date().toISOString().slice(0, 10)
  const kommend = termine.filter(t => t.datum >= heute)
  const vergangen = termine.filter(t => t.datum < heute)

  function formatDatum(d: string) {
    const date = new Date(d)
    return date.toLocaleDateString('de-DE', { weekday: 'short', day: '2-digit', month: 'long' })
  }

  function tageBis(d: string) {
    const diff = Math.ceil((new Date(d).getTime() - new Date(heute).getTime()) / 86400000)
    if (diff === 0) return 'Heute'
    if (diff === 1) return 'Morgen'
    if (diff > 0) return `in ${diff} Tagen`
    return ''
  }

  return (
    <div style={{ minHeight: '100vh', background: theme.bg, fontFamily: 'var(--font-body), system-ui, sans-serif', paddingBottom: '60px' }}>

      <div style={{ background: 'linear-gradient(135deg, #1A1F36, #4F7CFF)', padding: '32px 24px 40px' }}>
        <button onClick={() => router.push('/dashboard')} style={{ background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: '10px', padding: '8px 12px', color: 'white', fontSize: '14px', cursor: 'pointer', marginBottom: '20px' }}>← Zurück</button>
        <h1 style={{ fontSize: '22px', fontWeight: '800', color: 'white', margin: 0 }}>📅 Kalender</h1>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', margin: '4px 0 0' }}>Klassenarbeiten, Prüfungen, Geburtstage & Termine</p>
      </div>

      <div style={{ maxWidth: '640px', margin: '-20px auto 0', padding: '0 20px' }}>

        <button onClick={() => setZeigeForm(!zeigeForm)}
          style={{ width: '100%', padding: '14px', background: zeigeForm ? theme.line : theme.gradients.primary, color: zeigeForm ? theme.ink : 'white', border: 'none', borderRadius: theme.radius.md, fontSize: '14px', fontWeight: '800', cursor: 'pointer', marginBottom: '16px', boxShadow: theme.shadow.md }}>
          {zeigeForm ? '✕ Schließen' : '+ Neuen Termin eintragen'}
        </button>

        {zeigeForm && (
          <div style={{ background: 'white', borderRadius: theme.radius.lg, padding: '20px', marginBottom: '20px', boxShadow: theme.shadow.md }}>
            <div style={{ marginBottom: '12px' }}>
              <label style={{ fontSize: '12px', fontWeight: '700', color: theme.mid, display: 'block', marginBottom: '6px' }}>Datum</label>
              <input type="date" value={neuDatum} onChange={e => setNeuDatum(e.target.value)}
                style={{ width: '100%', padding: '10px 12px', border: `1.5px solid ${theme.line}`, borderRadius: '10px', fontSize: '14px', boxSizing: 'border-box' }} />
            </div>
            <div style={{ marginBottom: '12px' }}>
              <label style={{ fontSize: '12px', fontWeight: '700', color: theme.mid, display: 'block', marginBottom: '6px' }}>Was steht an?</label>
              <input type="text" value={neuTitel} onChange={e => setNeuTitel(e.target.value)} placeholder="z.B. Matheklassenarbeit Brüche"
                style={{ width: '100%', padding: '10px 12px', border: `1.5px solid ${theme.line}`, borderRadius: '10px', fontSize: '14px', boxSizing: 'border-box' }} />
            </div>
            <div style={{ marginBottom: '12px' }}>
              <label style={{ fontSize: '12px', fontWeight: '700', color: theme.mid, display: 'block', marginBottom: '6px' }}>Art</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {(Object.keys(TYP_INFO) as Termin['typ'][]).map(typ => (
                  <button key={typ} onClick={() => setNeuTyp(typ)}
                    style={{ padding: '8px 12px', borderRadius: theme.radius.full, border: `2px solid ${neuTyp === typ ? TYP_INFO[typ].farbe : theme.line}`, background: neuTyp === typ ? TYP_INFO[typ].bg : 'white', fontSize: '12px', fontWeight: '700', color: neuTyp === typ ? TYP_INFO[typ].farbe : theme.mid, cursor: 'pointer' }}>
                    {TYP_INFO[typ].icon} {TYP_INFO[typ].label}
                  </button>
                ))}
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '16px' }}>
              <input type="text" value={neuKind} onChange={e => setNeuKind(e.target.value)} placeholder="Kind (optional)"
                style={{ padding: '10px 12px', border: `1.5px solid ${theme.line}`, borderRadius: '10px', fontSize: '13px', boxSizing: 'border-box' }} />
              <input type="text" value={neuFach} onChange={e => setNeuFach(e.target.value)} placeholder="Fach (optional)"
                style={{ padding: '10px 12px', border: `1.5px solid ${theme.line}`, borderRadius: '10px', fontSize: '13px', boxSizing: 'border-box' }} />
            </div>
            <button onClick={hinzufuegen}
              style={{ width: '100%', padding: '12px', background: theme.brand.green, color: 'white', border: 'none', borderRadius: '10px', fontSize: '14px', fontWeight: '800', cursor: 'pointer' }}>
              Termin speichern
            </button>
          </div>
        )}

        <div style={{ marginBottom: '10px', fontSize: '14px', fontWeight: '800', color: theme.ink }}>Kommende Termine</div>
        {kommend.length === 0 && (
          <p style={{ fontSize: '12px', color: theme.muted, fontStyle: 'italic', marginBottom: '20px' }}>Noch keine Termine eingetragen.</p>
        )}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '28px' }}>
          {kommend.map(t => {
            const info = TYP_INFO[t.typ]
            return (
              <div key={t.id} style={{ background: 'white', borderRadius: theme.radius.md, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: '12px', border: `1.5px solid ${info.bg}`, borderLeft: `4px solid ${info.farbe}` }}>
                <div style={{ fontSize: '20px' }}>{info.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '13px', fontWeight: '700', color: theme.ink }}>{t.titel}</div>
                  <div style={{ fontSize: '11px', color: theme.mid, marginTop: '2px' }}>
                    {formatDatum(t.datum)} {t.fach && `· ${t.fach}`} {t.kind && `· ${t.kind}`}
                  </div>
                </div>
                <span style={{ fontSize: '10px', fontWeight: '800', color: info.farbe, background: info.bg, padding: '4px 10px', borderRadius: theme.radius.full, whiteSpace: 'nowrap' }}>
                  {tageBis(t.datum)}
                </span>
                <button onClick={() => loeschen(t.id)} style={{ background: 'none', border: 'none', color: theme.muted, fontSize: '16px', cursor: 'pointer', padding: '4px' }}>✕</button>
              </div>
            )
          })}
        </div>

        {vergangen.length > 0 && (
          <>
            <div style={{ marginBottom: '10px', fontSize: '13px', fontWeight: '700', color: theme.muted }}>Vergangen</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', opacity: 0.5 }}>
              {vergangen.slice(-5).map(t => {
                const info = TYP_INFO[t.typ]
                return (
                  <div key={t.id} style={{ background: 'white', borderRadius: theme.radius.sm, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px' }}>
                    <span>{info.icon}</span>
                    <span style={{ flex: 1, color: theme.mid }}>{t.titel}</span>
                    <span style={{ color: theme.muted, fontSize: '11px' }}>{formatDatum(t.datum)}</span>
                  </div>
                )
              })}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
