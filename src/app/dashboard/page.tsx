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
  { id: 'mathe', label: 'Mathe', icon: '📐', color: '#4F7CFF', bg: '#EAF0FF', avatar: 'phil', desc: 'Rechnen, Geometrie, Logik' },
  { id: 'deutsch', label: 'Deutsch', icon: '📖', color: '#FF7CB0', bg: '#FFE8F1', avatar: 'nica', desc: 'Lesen, Schreiben, Grammatik' },
  { id: 'englisch', label: 'Englisch', icon: '🌍', color: '#37C978', bg: '#E3FAEE', avatar: 'nica', desc: 'Vokabeln, Sprechen, Grammatik' },
  { id: 'sachunterricht', label: 'Sachunterricht', icon: '🔬', color: '#8A5CFF', bg: '#F2EBFF', avatar: 'phil', desc: 'Natur, Technik, Gesellschaft' },
  { id: 'musik', label: 'Musik', icon: '🎵', color: '#FF8C42', bg: '#FFF0E6', avatar: 'nica', desc: 'Piano, Gitarre, Noten, Rhythmus' },
  { id: 'sport', label: 'Sport', icon: '⚽', color: '#00C9A7', bg: '#E0FAF5', avatar: 'phil', desc: 'Fußball, Taekwondo, Karate' },
]

export default function Dashboard() {
  const [mood, setMood] = useState<string | null>(null)
  const [childName] = useState('Nicole')
  const [activeTab, setActiveTab] = useState<'schule' | 'talente'>('schule')
  const router = useRouter()

  const schulfaecher = SUBJECTS.filter(s => ['mathe','deutsch','englisch','sachunterricht'].includes(s.id))
  const talente = SUBJECTS.filter(s => ['musik','sport'].includes(s.id))

  return (
    <div style={{ minHeight: '100vh', background: '#F3F6FC', fontFamily: 'system-ui, sans-serif', paddingBottom: '100px' }}>

      {/* Header */}
      <div style={{ background: 'white', padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 1px 0 #E8ECF4', position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img src="/avatars/duo-circle.png" alt="Nica & Phil" style={{ width: '38px', height: '38px', borderRadius: '50%', objectFit: 'cover' }} />
          <span style={{ fontWeight: '800', fontSize: '16px', color: '#1A1F36' }}>Nica & Phil</span>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <div style={{ background: '#FFF4E0', borderRadius: '100px', padding: '6px 14px', fontSize: '13px', fontWeight: '700', color: '#9A5700' }}>🔥 3 Tage</div>
          <div style={{ background: '#EAF0FF', borderRadius: '100px', padding: '6px 14px', fontSize: '13px', fontWeight: '700', color: '#4F7CFF' }}>💎 120 Punkte</div>
        </div>
      </div>

      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '24px 20px' }}>

        {/* Begrüßung */}
        <div style={{ marginBottom: '20px' }}>
          <h1 style={{ fontSize: '26px', fontWeight: '800', color: '#1A1F36', margin: '0 0 4px' }}>Hallo {childName}! 👋</h1>
          <p style={{ color: '#6B7280', fontSize: '14px', margin: 0 }}>Was lernst du heute?</p>
        </div>

        {/* Stimmung */}
        <div style={{ background: 'white', borderRadius: '20px', padding: '18px 20px', marginBottom: '16px', border: '1px solid #E8ECF4' }}>
          <p style={{ fontSize: '13px', fontWeight: '700', color: '#374151', marginBottom: '12px' }}>Wie fühlst du dich heute?</p>
          <div style={{ display: 'flex', gap: '8px' }}>
            {MOODS.map(m => (
              <button key={m.emoji} onClick={() => setMood(m.emoji)}
                style={{ flex: 1, padding: '10px 6px', borderRadius: '12px', border: '2px solid', borderColor: mood === m.emoji ? '#4F7CFF' : '#E8ECF4', background: mood === m.emoji ? '#EAF0FF' : 'white', cursor: 'pointer', fontSize: '22px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', transition: 'all 0.15s' }}>
                {m.emoji}
                <span style={{ fontSize: '11px', color: '#6B7280', fontWeight: '600' }}>{m.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Nica & Phil Nachrichten */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
          <div style={{ background: 'linear-gradient(135deg, #FFE8F1, #fff)', borderRadius: '16px', padding: '16px', border: '1px solid #FFD0E8', display: 'flex', gap: '12px', alignItems: 'center' }}>
            <img src="/avatars/nica-solo.png" alt="Nica" style={{ width: '52px', height: '52px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
            <div>
              <div style={{ fontSize: '11px', fontWeight: '700', color: '#FF7CB0', marginBottom: '3px' }}>NICA</div>
              <p style={{ fontSize: '12px', color: '#1A1F36', margin: 0, lineHeight: '1.45' }}>
                {mood ? '✨ Ich bin bereit!' : 'Wie geht es dir heute? 💗'}
              </p>
            </div>
          </div>
          <div style={{ background: 'linear-gradient(135deg, #EAF0FF, #fff)', borderRadius: '16px', padding: '16px', border: '1px solid #C7D9FF', display: 'flex', gap: '12px', alignItems: 'center' }}>
            <img src="/avatars/phil-solo.png" alt="Phil" style={{ width: '52px', height: '52px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
            <div>
              <div style={{ fontSize: '11px', fontWeight: '700', color: '#4F7CFF', marginBottom: '3px' }}>PHIL</div>
              <p style={{ fontSize: '12px', color: '#1A1F36', margin: 0, lineHeight: '1.45' }}>
                {mood ? '🚀 Los geht\'s!' : 'Ich hab was für dich! 🚀'}
              </p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', background: 'white', padding: '6px', borderRadius: '14px', border: '1px solid #E8ECF4' }}>
          <button onClick={() => setActiveTab('schule')}
            style={{ flex: 1, padding: '10px', borderRadius: '10px', border: 'none', fontWeight: '700', fontSize: '14px', cursor: 'pointer', background: activeTab === 'schule' ? '#1A1F36' : 'transparent', color: activeTab === 'schule' ? 'white' : '#6B7280', transition: 'all 0.2s' }}>
            📚 Schulfächer
          </button>
          <button onClick={() => setActiveTab('talente')}
            style={{ flex: 1, padding: '10px', borderRadius: '10px', border: 'none', fontWeight: '700', fontSize: '14px', cursor: 'pointer', background: activeTab === 'talente' ? '#1A1F36' : 'transparent', color: activeTab === 'talente' ? 'white' : '#6B7280', transition: 'all 0.2s' }}>
            🌟 Talente & Hobbys
          </button>
        </div>

        {/* Fächer Liste */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {(activeTab === 'schule' ? schulfaecher : talente).map(s => (
            <button key={s.id}
              onClick={() => router.push(`/chat?subject=${s.id}&avatar=${s.avatar}`)}
              style={{ background: 'white', border: '1.5px solid #E8ECF4', borderRadius: '18px', padding: '18px 20px', display: 'flex', alignItems: 'center', gap: '16px', cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.borderColor = s.color }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = '#E8ECF4' }}>
              <div style={{ width: '52px', height: '52px', borderRadius: '16px', background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '26px', flexShrink: 0 }}>
                {s.icon}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: '800', fontSize: '16px', color: '#1A1F36', marginBottom: '2px' }}>{s.label}</div>
                <div style={{ fontSize: '12px', color: '#6B7280' }}>{s.desc} · mit {s.avatar === 'nica' ? 'Nica' : 'Phil'}</div>
              </div>
              <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: s.color, fontSize: '16px', fontWeight: '700' }}>→</div>
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: 'white', borderTop: '1px solid #E8ECF4', display: 'flex', justifyContent: 'space-around', padding: '10px 0 20px' }}>
        {[
          { icon: '🏠', label: 'Start', active: true },
          { icon: '📖', label: 'Lernen' },
          { icon: '🏆', label: 'Erfolge' },
          { icon: '👤', label: 'Profil' },
        ].map(item => (
          <button key={item.label} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px' }}>
            <span style={{ fontSize: '22px' }}>{item.icon}</span>
            <span style={{ fontSize: '10px', fontWeight: '700', color: item.active ? '#4F7CFF' : '#9CA3AF' }}>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
