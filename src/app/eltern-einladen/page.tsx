'use client'
import { Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { theme } from '@/lib/theme'

function ElternEinladenContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const code = searchParams.get('code') || '------'

  return (
    <div style={{ minHeight: '100vh', background: theme.gradients.wuensche, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-body), system-ui, sans-serif', padding: '24px' }}>
      <div style={{ background: 'white', borderRadius: theme.radius.xl, padding: '40px', maxWidth: '440px', width: '100%', textAlign: 'center', boxShadow: theme.shadow.lg }}>
        <div style={{ fontSize: '48px', marginBottom: '14px' }}>👪</div>
        <h1 style={{ fontFamily: theme.font.display, fontSize: '20px', fontWeight: '600', color: theme.ink, margin: '0 0 8px' }}>Fast geschafft!</h1>
        <p style={{ fontSize: '13px', color: theme.mid, marginBottom: '24px' }}>Gib Mama oder Papa diesen Code — damit sehen sie, was du bei Nica &amp; Phil machst.</p>

        <div style={{ background: theme.soft.pink, borderRadius: theme.radius.lg, padding: '20px', marginBottom: '20px' }}>
          <div style={{ fontSize: '11px', fontWeight: '700', color: theme.brand.pink, marginBottom: '8px', textTransform: 'uppercase' }}>Eltern-Code</div>
          <div style={{ fontSize: '32px', fontWeight: '800', letterSpacing: '6px', color: theme.ink }}>{code}</div>
        </div>

        <p style={{ fontSize: '11.5px', color: theme.muted, marginBottom: '20px' }}>
          Mama oder Papa gibt diesen Code unter <strong>nica-phil.com/eltern-uebersicht</strong> ein. Du kannst aber auch ohne sofort loslegen — der Code bleibt gültig.
        </p>

        <button onClick={() => router.push('/dashboard')} style={{
          width: '100%', padding: '14px', background: theme.gradients.primary, color: 'white', border: 'none',
          borderRadius: theme.radius.md, fontWeight: '800', fontSize: '15px', cursor: 'pointer',
        }}>Los geht&apos;s! 🚀</button>
      </div>
    </div>
  )
}

export default function ElternEinladen() {
  return (
    <Suspense>
      <ElternEinladenContent />
    </Suspense>
  )
}
