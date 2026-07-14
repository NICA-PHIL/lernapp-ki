'use client'
import { useRouter } from 'next/navigation'
import { theme } from '@/lib/theme'

export default function RolleWaehlen() {
  const router = useRouter()

  return (
    <div style={{ minHeight: '100vh', background: theme.gradients.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-body), system-ui, sans-serif', padding: '24px' }}>
      <div style={{ background: 'white', borderRadius: theme.radius.xl, padding: '40px', maxWidth: '440px', width: '100%', textAlign: 'center', boxShadow: theme.shadow.lg }}>
        <div style={{ fontSize: '48px', marginBottom: '14px' }}>👋</div>
        <h1 style={{ fontFamily: theme.font.display, fontSize: '22px', fontWeight: '600', color: theme.ink, margin: '0 0 8px' }}>Willkommen bei Nica &amp; Phil!</h1>
        <p style={{ fontSize: '14px', color: theme.mid, marginBottom: '28px' }}>Damit alles richtig eingerichtet wird: Wer bist du?</p>

        <button onClick={() => router.push('/onboarding')} style={{
          width: '100%', padding: '18px', background: theme.gradients.wuensche, color: 'white', border: 'none',
          borderRadius: theme.radius.lg, fontWeight: '800', fontSize: '15px', cursor: 'pointer', marginBottom: '12px',
          display: 'flex', alignItems: 'center', gap: '12px', textAlign: 'left',
        }}>
          <span style={{ fontSize: '26px' }}>🧒</span>
          <span>
            <span style={{ display: 'block' }}>Ich bin ein Kind</span>
            <span style={{ display: 'block', fontWeight: '500', fontSize: '12px', opacity: 0.85 }}>Ich richte mein eigenes Profil ein</span>
          </span>
        </button>

        <button onClick={() => router.push('/eltern-uebersicht')} style={{
          width: '100%', padding: '18px', background: theme.gradients.eltern, color: 'white', border: 'none',
          borderRadius: theme.radius.lg, fontWeight: '800', fontSize: '15px', cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: '12px', textAlign: 'left',
        }}>
          <span style={{ fontSize: '26px' }}>👪</span>
          <span>
            <span style={{ display: 'block' }}>Ich bin ein Elternteil</span>
            <span style={{ display: 'block', fontWeight: '500', fontSize: '12px', opacity: 0.7 }}>Ich richte ein Kind ein oder verwalte den Zugang</span>
          </span>
        </button>
      </div>
    </div>
  )
}
