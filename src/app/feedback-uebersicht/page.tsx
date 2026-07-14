'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

const STIMMUNG_ICON: Record<string, string> = { liebe_es: '🤩', gut: '😊', okay: '😐', nicht_gut: '😕' }
const STIMMUNG_FARBE: Record<string, string> = { liebe_es: '#37C978', gut: '#4F7CFF', okay: '#FFB648', nicht_gut: '#FF6B6B' }

export default function FeedbackUebersicht() {
  const router = useRouter()
  const supabase = createClient()
  const [feedbacks, setFeedbacks] = useState<any[]>([])
  const [filter, setFilter] = useState<'alle' | 'kind' | 'eltern'>('alle')

  useEffect(() => { laden() }, [])
  async function laden() {
    const { data } = await supabase.from('feedback').select('*').order('erstellt_am', { ascending: false })
    if (data) setFeedbacks(data)
  }

  const gefiltert = filter === 'alle' ? feedbacks : feedbacks.filter(f => f.wer === filter)

  return (
    <div style={{ minHeight: '100vh', background: '#F3F6FC', fontFamily: 'system-ui', paddingBottom: '60px' }}>
      <div style={{ background: 'linear-gradient(135deg,#1A1F36,#2E3560)', padding: '28px 24px 32px' }}>
        <button onClick={() => router.push('/dashboard')} style={{ background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: '10px', padding: '8px 12px', color: 'white', fontSize: '13px', cursor: 'pointer', marginBottom: '16px' }}>← Zurück</button>
        <h1 style={{ fontSize: '20px', fontWeight: '800', color: 'white', margin: 0 }}>💬 Alles Feedback</h1>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12.5px', marginTop: '4px' }}>{feedbacks.length} Einträge gesamt</p>
      </div>

      <div style={{ maxWidth: '640px', margin: '0 auto', padding: '20px' }}>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
          {[{id:'alle',label:'Alle'},{id:'kind',label:'🧒 Kinder'},{id:'eltern',label:'👪 Eltern'}].map(f => (
            <button key={f.id} onClick={() => setFilter(f.id as typeof filter)}
              style={{ padding: '8px 16px', borderRadius: '100px', border: 'none', fontWeight: '700', fontSize: '12.5px', cursor: 'pointer', background: filter === f.id ? '#1A1F36' : 'white', color: filter === f.id ? 'white' : '#6B7280', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
              {f.label}
            </button>
          ))}
        </div>

        {gefiltert.length === 0 && <p style={{ textAlign: 'center', color: '#9CA3AF', fontSize: '13px', marginTop: '40px' }}>Noch kein Feedback vorhanden.</p>}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {gefiltert.map(f => (
            <div key={f.id} style={{ background: 'white', borderRadius: '18px', padding: '18px', boxShadow: '0 4px 16px rgba(0,0,0,0.05)', borderLeft: `4px solid ${STIMMUNG_FARBE[f.stimmung]}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '20px' }}>{STIMMUNG_ICON[f.stimmung]}</span>
                  <span style={{ fontWeight: '800', fontSize: '13.5px', color: '#1A1F36' }}>{f.name}</span>
                  <span style={{ fontSize: '10px', fontWeight: '700', color: f.wer === 'kind' ? '#FF7CB0' : '#1A1F36', background: f.wer === 'kind' ? '#FFE8F1' : '#F3F6FC', padding: '2px 8px', borderRadius: '100px' }}>
                    {f.wer === 'kind' ? '🧒 Kind' : '👪 Eltern'}
                  </span>
                </div>
                <span style={{ fontSize: '10.5px', color: '#9CA3AF' }}>{new Date(f.erstellt_am).toLocaleDateString('de-DE')}</span>
              </div>
              {f.bereich && <div style={{ fontSize: '11px', fontWeight: '700', color: '#4F7CFF', marginBottom: '8px' }}>📍 {f.bereich}</div>}
              {f.gefaellt && <div style={{ fontSize: '12.5px', color: '#374151', marginBottom: '6px' }}>👍 {f.gefaellt}</div>}
              {f.gefaellt_nicht && <div style={{ fontSize: '12.5px', color: '#374151', marginBottom: '6px' }}>👎 {f.gefaellt_nicht}</div>}
              {f.wunsch && <div style={{ fontSize: '12.5px', color: '#374151' }}>💡 {f.wunsch}</div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
