'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { theme } from '@/lib/theme'

export default function ZugangTeilen() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [meineEmail, setMeineEmail] = useState('')
  const supabase = createClient()

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setMeineEmail(data.user?.email || ''))
  }, [])

  return (
    <div style={{ minHeight: '100vh', background: theme.bg, fontFamily: 'system-ui, sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: '480px', margin: '0 auto' }}>
        <button onClick={() => router.push('/dashboard')} style={{ background: 'white', border: `1px solid ${theme.line}`, borderRadius: '10px', padding: '8px 14px', fontSize: '13px', cursor: 'pointer', marginBottom: '20px' }}>← Zurück</button>

        <h1 style={{ fontSize: '20px', fontWeight: '800', color: theme.ink, marginBottom: '6px' }}>👪 Zugang teilen</h1>
        <p style={{ fontSize: '13px', color: theme.mid, marginBottom: '24px' }}>Gebt Großeltern, dem zweiten Elternteil oder der Nanny Zugriff auf das Eltern-Dashboard.</p>

        <div style={{ background: 'white', borderRadius: theme.radius.lg, padding: '20px', marginBottom: '16px', border: `1px solid ${theme.line}` }}>
          <div style={{ fontSize: '12px', fontWeight: '700', color: theme.mid, marginBottom: '8px' }}>Dein Account</div>
          <div style={{ fontSize: '14px', fontWeight: '700', color: theme.ink }}>{meineEmail}</div>
        </div>

        <div style={{ background: 'white', borderRadius: theme.radius.lg, padding: '20px', marginBottom: '16px', border: `1px solid ${theme.line}` }}>
          <div style={{ fontSize: '13px', fontWeight: '800', color: theme.ink, marginBottom: '10px' }}>So geht's:</div>
          <ol style={{ margin: 0, paddingLeft: '18px', fontSize: '13px', color: theme.mid, lineHeight: '1.9' }}>
            <li>Die Person registriert sich mit eigener E-Mail unter <strong>nica-phil.com/login</strong></li>
            <li>Sie durchläuft das Onboarding ganz normal</li>
            <li>Bei "In welche Klasse kommst du" einfach den <strong>gleichen Kindernamen</strong> wie ihr verwenden</li>
            <li>So sehen alle die gleichen Fortschritte und Einblicke</li>
          </ol>
        </div>

        <div style={{ background: theme.soft.blue, borderRadius: theme.radius.lg, padding: '16px 20px', display: 'flex', gap: '10px' }}>
          <span style={{ fontSize: '18px' }}>ℹ️</span>
          <p style={{ fontSize: '11.5px', color: theme.brand.blue, margin: 0, lineHeight: '1.6' }}>
            Jeder Erwachsene hat sein eigenes, separates Login — aber alle sehen dieselben Kinddaten, solange der Kindername übereinstimmt. Eine vollständig verknüpfte Familien-Verwaltung mit gemeinsamem Konto folgt in einer späteren Ausbaustufe.
          </p>
        </div>
      </div>
    </div>
  )
}
