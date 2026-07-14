'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { theme } from '@/lib/theme'

interface Kind { id: string; name: string; klasse: number; avatar_prefs: any }

export default function KindWaehlen() {
  const router = useRouter()
  const [kinder, setKinder] = useState<Kind[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    async function laden() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/login'); return }
      const { data } = await supabase.from('children').select('*').eq('parent_id', user.id)
      setKinder(data || [])
      setLoading(false)
    }
    laden()
  }, [])

  function kindAktivieren(kind: Kind) {
    localStorage.setItem('np_child_name', kind.name)
    localStorage.setItem('np_child_klasse', String(kind.klasse))
    if (kind.avatar_prefs?.type === 'baukasten') {
      localStorage.setItem('np_child_avatar_typ', 'baukasten')
      localStorage.setItem('np_child_avatar_baukasten', JSON.stringify(kind.avatar_prefs))
      localStorage.setItem('np_child_avatar', '')
    }
    router.push('/dashboard')
  }

  return (
    <div style={{ minHeight: '100vh', background: theme.bg, fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: '480px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <img src="/avatars/duo-circle.png" style={{ width: '64px', height: '64px', borderRadius: '50%', marginBottom: '14px' }} />
          <h1 style={{ fontSize: '22px', fontWeight: '800', color: theme.ink, margin: '0 0 6px' }}>Wer lernt heute? 👋</h1>
          <p style={{ color: theme.mid, fontSize: '13px', margin: 0 }}>Wähle dein Profil oder füge ein neues Kind hinzu</p>
        </div>

        {loading ? (
          <p style={{ textAlign: 'center', color: theme.muted }}>Lädt...</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
            {kinder.map(kind => (
              <button key={kind.id} onClick={() => kindAktivieren(kind)}
                style={{ background: 'white', border: `1.5px solid ${theme.line}`, borderRadius: theme.radius.lg, padding: '18px 20px', display: 'flex', alignItems: 'center', gap: '16px', cursor: 'pointer', textAlign: 'left', boxShadow: theme.shadow.sm }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: theme.soft.blue, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px' }}>
                  {kind.avatar_prefs?.gesicht || '🧒'}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: '800', fontSize: '16px', color: theme.ink }}>{kind.name}</div>
                  <div style={{ fontSize: '12px', color: theme.mid }}>Klasse {kind.klasse}</div>
                </div>
                <span style={{ fontSize: '18px', color: theme.brand.blue }}>→</span>
              </button>
            ))}
          </div>
        )}

        <button onClick={() => router.push('/onboarding')}
          style={{ width: '100%', padding: '16px', background: theme.gradients.primary, color: 'white', border: 'none', borderRadius: theme.radius.lg, fontSize: '15px', fontWeight: '800', cursor: 'pointer' }}>
          + Neues Kind hinzufügen
        </button>
      </div>
    </div>
  )
}
