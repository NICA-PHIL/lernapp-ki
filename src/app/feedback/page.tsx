'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

const STIMMUNGEN = [
  { id: 'liebe_es', emoji: '🤩', label: 'Liebe ich!', farbe: '#37C978', bg: '#E3FAEE' },
  { id: 'gut', emoji: '😊', label: 'Gut', farbe: '#4F7CFF', bg: '#EAF0FF' },
  { id: 'okay', emoji: '😐', label: 'Geht so', farbe: '#FFB648', bg: '#FFF4E0' },
  { id: 'nicht_gut', emoji: '😕', label: 'Nicht so toll', farbe: '#FF6B6B', bg: '#FFEFEF' },
]

const BEREICHE = [
  'Dashboard (Start)', 'Chat mit Nica/Phil', 'Lernreise', 'Kalender', 'Sommermission',
  'Meine Wünsche', 'Meine Skills', 'Mein Stil', 'Avatar-Erstellung', 'Anmeldung/Login',
  'Gitarre/Musik', 'Schach', 'Entspannung', 'Etwas anderes',
]

export default function FeedbackPage() {
  const router = useRouter()
  const supabase = createClient()
  const [wer, setWer] = useState<'kind' | 'eltern' | null>(null)
  const [name, setName] = useState('')
  const [stimmung, setStimmung] = useState<string | null>(null)
  const [bereich, setBereich] = useState<string | null>(null)
  const [gefaellt, setGefaellt] = useState('')
  const [gefaelltNicht, setGefaelltNicht] = useState('')
  const [wunsch, setWunsch] = useState('')
  const [gesendet, setGesendet] = useState(false)
  const [meineFeedbacks, setMeineFeedbacks] = useState<any[]>([])

  useEffect(() => {
    const childName = localStorage.getItem('np_child_name')
    if (childName) setName(childName)
    ladeFeedback()
  }, [])

  async function ladeFeedback() {
    const { data } = await supabase.from('feedback').select('*').order('erstellt_am', { ascending: false }).limit(20)
    if (data) setMeineFeedbacks(data)
  }

  async function senden() {
    if (!stimmung || !wer) return
    await supabase.from('feedback').insert({
      wer, name: name || 'Anonym', stimmung, bereich, gefaellt, gefaellt_nicht: gefaelltNicht, wunsch,
    })
    setGesendet(true)
    setTimeout(() => {
      setStimmung(null); setBereich(null); setGefaellt(''); setGefaelltNicht(''); setWunsch(''); setGesendet(false)
      ladeFeedback()
    }, 2000)
  }

  if (!wer) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg,#4F7CFF,#8A5CFF)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'system-ui', padding: '24px' }}>
        <div style={{ background: 'white', borderRadius: '28px', padding: '36px', maxWidth: '420px', width: '100%', textAlign: 'center', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
          <div style={{ fontSize: '48px', marginBottom: '14px' }}>💬</div>
          <h1 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '8px', color: '#1A1F36' }}>Sag uns deine Meinung!</h1>
          <p style={{ fontSize: '13px', color: '#6B7280', marginBottom: '24px' }}>Was gefällt dir? Was nicht? Wir hören zu!</p>
          <button onClick={() => setWer('kind')} style={{ width: '100%', padding: '16px', background: 'linear-gradient(135deg,#FF7CB0,#8A5CFF)', color: 'white', border: 'none', borderRadius: '16px', fontWeight: '800', fontSize: '15px', cursor: 'pointer', marginBottom: '10px' }}>
            🧒 Ich bin ein Kind
          </button>
          <button onClick={() => setWer('eltern')} style={{ width: '100%', padding: '16px', background: '#1A1F36', color: 'white', border: 'none', borderRadius: '16px', fontWeight: '800', fontSize: '15px', cursor: 'pointer' }}>
            👪 Ich bin ein Elternteil
          </button>
          <button onClick={() => router.push('/dashboard')} style={{ marginTop: '16px', background: 'none', border: 'none', color: '#9CA3AF', fontSize: '13px', cursor: 'pointer' }}>← Zurück zum Dashboard</button>
        </div>
      </div>
    )
  }

  if (gesendet) {
    return (
      <div style={{ minHeight: '100vh', background: '#F3F6FC', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'system-ui' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '64px', marginBottom: '16px' }}>🎉</div>
          <h1 style={{ fontSize: '22px', fontWeight: '800', color: '#1A1F36' }}>Danke für dein Feedback!</h1>
          <p style={{ color: '#6B7280', marginTop: '8px' }}>Das hilft uns wirklich weiter.</p>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: '#F3F6FC', fontFamily: 'system-ui', paddingBottom: '60px' }}>
      <div style={{ background: wer === 'kind' ? 'linear-gradient(135deg,#FF7CB0,#8A5CFF)' : 'linear-gradient(135deg,#1A1F36,#2E3560)', padding: '28px 24px 40px' }}>
        <button onClick={() => setWer(null)} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '10px', padding: '8px 12px', color: 'white', fontSize: '13px', cursor: 'pointer', marginBottom: '16px' }}>← Zurück</button>
        <h1 style={{ fontSize: '20px', fontWeight: '800', color: 'white', margin: 0 }}>{wer === 'kind' ? '🧒 Deine Meinung zählt!' : '👪 Ihr Feedback'}</h1>
      </div>

      <div style={{ maxWidth: '520px', margin: '-20px auto 0', padding: '0 20px' }}>
        <div style={{ background: 'white', borderRadius: '22px', padding: '24px', boxShadow: '0 8px 32px rgba(0,0,0,0.08)' }}>

          {wer === 'kind' && !localStorage.getItem('np_child_name') && (
            <div style={{ marginBottom: '18px' }}>
              <label style={{ fontSize: '12px', fontWeight: '700', color: '#374151', display: 'block', marginBottom: '6px' }}>Wie heißt du?</label>
              <input value={name} onChange={e => setName(e.target.value)} placeholder="Dein Name"
                style={{ width: '100%', padding: '10px 14px', border: '2px solid #E8ECF4', borderRadius: '10px', boxSizing: 'border-box' }} />
            </div>
          )}

          <label style={{ fontSize: '13px', fontWeight: '700', color: '#374151', display: 'block', marginBottom: '10px' }}>
            {wer === 'kind' ? 'Wie findest du Nica & Phil?' : 'Wie ist Ihr Gesamteindruck?'}
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '8px', marginBottom: '20px' }}>
            {STIMMUNGEN.map(s => (
              <button key={s.id} onClick={() => setStimmung(s.id)}
                style={{ padding: '12px 4px', borderRadius: '14px', border: `2px solid ${stimmung === s.id ? s.farbe : '#EEF1F6'}`, background: stimmung === s.id ? s.bg : 'white', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                <span style={{ fontSize: '24px' }}>{s.emoji}</span>
                <span style={{ fontSize: '9.5px', fontWeight: '700', color: stimmung === s.id ? s.farbe : '#9CA3AF', textAlign: 'center' }}>{s.label}</span>
              </button>
            ))}
          </div>

          <label style={{ fontSize: '13px', fontWeight: '700', color: '#374151', display: 'block', marginBottom: '10px' }}>Worum geht's? (optional)</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
            {BEREICHE.map(b => (
              <button key={b} onClick={() => setBereich(bereich === b ? null : b)}
                style={{ padding: '7px 12px', borderRadius: '100px', border: `1.5px solid ${bereich === b ? '#4F7CFF' : '#EEF1F6'}`, background: bereich === b ? '#EAF0FF' : 'white', color: bereich === b ? '#4F7CFF' : '#6B7280', fontSize: '11.5px', fontWeight: '600', cursor: 'pointer' }}>
                {b}
              </button>
            ))}
          </div>

          <label style={{ fontSize: '13px', fontWeight: '700', color: '#37C978', display: 'block', marginBottom: '8px' }}>👍 Was gefällt dir?</label>
          <textarea value={gefaellt} onChange={e => setGefaellt(e.target.value)} rows={2} placeholder="Erzähl uns, was gut ist..."
            style={{ width: '100%', padding: '12px 14px', border: '2px solid #E8ECF4', borderRadius: '12px', marginBottom: '16px', boxSizing: 'border-box', fontFamily: 'inherit', fontSize: '13px', resize: 'none' }} />

          <label style={{ fontSize: '13px', fontWeight: '700', color: '#FF6B6B', display: 'block', marginBottom: '8px' }}>👎 Was gefällt dir nicht?</label>
          <textarea value={gefaelltNicht} onChange={e => setGefaelltNicht(e.target.value)} rows={2} placeholder="Was stört dich oder funktioniert nicht?"
            style={{ width: '100%', padding: '12px 14px', border: '2px solid #E8ECF4', borderRadius: '12px', marginBottom: '16px', boxSizing: 'border-box', fontFamily: 'inherit', fontSize: '13px', resize: 'none' }} />

          <label style={{ fontSize: '13px', fontWeight: '700', color: '#4F7CFF', display: 'block', marginBottom: '8px' }}>💡 Was wünschst du dir noch?</label>
          <textarea value={wunsch} onChange={e => setWunsch(e.target.value)} rows={2} placeholder="Eine Idee, ein Wunsch..."
            style={{ width: '100%', padding: '12px 14px', border: '2px solid #E8ECF4', borderRadius: '12px', marginBottom: '24px', boxSizing: 'border-box', fontFamily: 'inherit', fontSize: '13px', resize: 'none' }} />

          <button onClick={senden} disabled={!stimmung}
            style={{ width: '100%', padding: '15px', background: stimmung ? 'linear-gradient(135deg,#4F7CFF,#8A5CFF)' : '#E8ECF4', color: 'white', border: 'none', borderRadius: '14px', fontWeight: '800', fontSize: '14px', cursor: stimmung ? 'pointer' : 'default' }}>
            Feedback senden 🚀
          </button>
        </div>
      </div>
    </div>
  )
}
