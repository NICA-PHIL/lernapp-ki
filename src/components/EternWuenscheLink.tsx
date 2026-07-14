'use client'
import { useRouter } from 'next/navigation'
import { theme } from '@/lib/theme'

export function ElternWuenscheLink({ childName }: { childName: string }) {
  const router = useRouter()
  return (
    <button onClick={() => router.push('/eltern-wuensche')}
      style={{ width: '100%', background: theme.gradients.eltern, border: 'none', borderRadius: theme.radius.lg, padding: '18px 20px', display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer', textAlign: 'left' }}>
      <span style={{ fontSize: '24px' }}>👪</span>
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: '800', fontSize: '14px', color: 'white' }}>Ihre Wünsche für {childName}</div>
        <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)' }}>Schwerpunkte und Anliegen mitteilen</div>
      </div>
      <span style={{ color: 'white', fontSize: '18px' }}>→</span>
    </button>
  )
}
