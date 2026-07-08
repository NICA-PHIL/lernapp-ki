'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const MOODS = [
  { emoji: '😄', label: 'Super' },
  { emoji: '🙂', label: 'Gut' },
  { emoji: '😐', label: 'Geht so' },
  { emoji: '😔', label: 'Müde' },
]

const SUBJECTS = [
  { id: 'mathe', label: 'Mathe', icon: '📐', color: '#4F7CFF', bg: '#EAF0FF', avatar: 'phil' },
  { id: 'deutsch', label: 'Deutsch', icon: '📖', color: '#FF7CB0', bg: '#FFE8F1', avatar: 'nica' },
  { id: 'englisch', label: 'Englisch', icon: '🌍', color: '#37C978', bg: '#E3FAEE', avatar: 'nica' },
]

export default function Dashboard() {
  const [mood, setMood] = useState<string | null>(null)
  const [childName] = useState('Nicole')
  const router = useRouter()

  return (
    <div style={{
      minHeight: '100vh',
      background: '#F3F6FC',
      fontFamily: 'system-ui, sans-serif',
      paddingBottom: '100px'
    }}>

      {/* Header */}
      <div style={{
        background: 'white',
        padding: '20px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 1px 0 #E8ECF4'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img src="/avatars/duo-circle.png" alt="Nica & Phil"
            style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
          <span style={{ fontWeight: '700', fontSize: '16px', color: '#1A1F36' }}>Nica & Phil</span>
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <div style={{ background: '#FFF4E0', borderRadius: '100px', padding: '6px 12px', fontSize: '13px', fontWeight: '600', color: '#9A5700' }}>
            🔥 3 Tage
          </div>
          <div style={{ background: '#EAF0FF', borderRadius: '100px', padding: '6px 12px', fontSize: '13px', fontWeight: '600', color: '#4F7CFF' }}>
            💎 120 Punkte
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '680px', margin: '0 auto', padding: '24px 20px' }}>

        {/* Begrüßung */}
        <div style={{ marginBottom: '24px' }}>
          <h1 style={{ fontSize: '26px', fontWeight: '800', color: '#1A1F36', margin: '0 0 4px' }}>
            Hallo {childName}! 👋
          </h1>
          <p style={{ color: '#6B7280', fontSize: '14px', margin: 0 }}>
            Schön, dass du da bist. Was lernst du heute?
          </p>
        </div>

        {/* Stimmung */}
        <div style={{
          background: 'white', borderRadius: '20px', padding: '20px 24px',
          marginBottom: '20px', border: '1px solid #E8ECF4'
        }}>
          <p style={{ fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '14px' }}>
            Wie fühlst du dich heute?
          </p>
          <div style={{ display: 'flex', gap: '10px' }}>
            {MOODS.map(m => (
              <button key={m.emoji}
                onClick={() => setMood(m.emoji)}
                style={{
                  flex: 1, padding: '12px 8px', borderRadius: '14px', border: '2px solid',
                  borderColor: mood === m.emoji ? '#4F7CFF' : '#E8ECF4',
                  background: mood === m.emoji ? '#EAF0FF' : 'white',
                  cursor: 'pointer', fontSize: '24px', display: 'flex',
                  flexDirection: 'column', alignItems: 'center', gap: '4px',
                  transition: 'all 0.15s'
                }}>
                {m.emoji}
                <span style={{ fontSize: '11px', color: '#6B7280', fontWeight: '500' }}>{m.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Nica Nachricht */}
        <div style={{
          background: 'linear-gradient(135deg, #FFE8F1, #fff)',
          borderRadius: '20px', padding: '20px 24px',
          marginBottom: '20px', border: '1px solid #FFD0E8',
          display: 'flex', gap: '16px', alignItems: 'center'
        }}>
          <img src="/avatars/nica-solo.png" alt="Nica"
            style={{ width: '72px', height: '72px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
          <div>
            <div style={{ fontSize: '12px', fontWeight: '700', color: '#FF7CB0', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Nica
            </div>
            <p style={{ fontSize: '14px', color: '#1A1F36', margin: 0, lineHeight: '1.5' }}>
              {mood
                ? mood === '😄' || mood === '🙂'
                  ? 'Wunderbar! Du strahlst heute richtig. Bereit für etwas Neues? 🌟'
                  : 'Kein Problem — wir starten ganz sanft. Ich bin bei dir! 💗'
                : 'Sag mir zuerst wie es dir geht — dann können wir loslegen! 💗'}
            </p>
          </div>
        </div>

        {/* Phil Nachricht */}
        <div style={{
          background: 'linear-gradient(135deg, #EAF0FF, #fff)',
          borderRadius: '20px', padding: '20px 24px',
          marginBottom: '24px', border: '1px solid #C7D9FF',
          display: 'flex', gap: '16px', alignItems: 'center'
        }}>
          <img src="/avatars/phil-solo.png" alt="Phil"
            style={{ width: '72px', height: '72px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
          <div>
            <div style={{ fontSize: '12px', fontWeight: '700', color: '#4F7CFF', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Phil
            </div>
            <p style={{ fontSize: '14px', color: '#1A1F36', margin: 0, lineHeight: '1.5' }}>
              Hey! Ich hab heute eine knifflige Mathe-Challenge für dich vorbereitet. Traust du dich? 🚀
            </p>
          </div>
        </div>

        {/* Fächer */}
        <div style={{ marginBottom: '8px' }}>
          <p style={{ fontSize: '14px', fontWeight: '700', color: '#374151', marginBottom: '14px' }}>
            Womit möchtest du starten?
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {SUBJECTS.map(s => (
              <button key={s.id}
                onClick={() => router.push(`/chat?subject=${s.id}&avatar=${s.avatar}`)}
                style={{
                  background: 'white', border: '1.5px solid #E8ECF4',
                  borderRadius: '18px', padding: '20px 24px',
                  display: 'flex', alignItems: 'center', gap: '16px',
                  cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
                }}
                onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-2px)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}>
                <div style={{
                  width: '52px', height: '52px', borderRadius: '16px',
                  background: s.bg, display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontSize: '24px', flexShrink: 0
                }}>
                  {s.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: '700', fontSize: '16px', color: '#1A1F36', marginBottom: '2px' }}>
                    {s.label}
                  </div>
                  <div style={{ fontSize: '12px', color: '#6B7280' }}>
                    mit {s.avatar === 'nica' ? 'Nica' : 'Phil'} · Berliner Lehrplan
                  </div>
                </div>
                <div style={{
                  width: '36px', height: '36px', borderRadius: '50%',
                  background: s.bg, display: 'flex', alignItems: 'center',
                  justifyContent: 'center', color: s.color, fontSize: '18px'
                }}>
                  →
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0,
        background: 'white', borderTop: '1px solid #E8ECF4',
        display: 'flex', justifyContent: 'space-around',
        padding: '10px 0 20px'
      }}>
        {[
          { icon: '🏠', label: 'Start', active: true },
          { icon: '📖', label: 'Lernen' },
          { icon: '🏆', label: 'Erfolge' },
          { icon: '👤', label: 'Profil' },
        ].map(item => (
          <button key={item.label} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px'
          }}>
            <span style={{ fontSize: '22px' }}>{item.icon}</span>
            <span style={{ fontSize: '10px', fontWeight: '600', color: item.active ? '#4F7CFF' : '#9CA3AF' }}>
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
