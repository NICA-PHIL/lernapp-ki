'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { theme } from '@/lib/theme'

export default function CodeEinloesen() {
  const router = useRouter()
  const supabase = createClient()
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function einloesen() {
    setLoading(true); setError('')
    const { data: gefunden } = await supabase.from('family_codes')
      .select('*, children(*)').eq('code', code).eq('eingeloest', false).single()

    if (!gefunden) { setError('Code nicht gefunden oder schon verwendet'); setLoading(false); return }

    await supabase.from('family_codes').update({ eingeloest: true }).eq('id', gefunden.id)

    const kind = gefunden.children as any
    localStorage.setItem('np_child_name', kind.name)
    localStorage.setItem('np_child_klasse', String(kind.klasse))
    router.push('/dashboard')
  }

  return (
    <div style={{ minHeight: '100vh', background: `linear-gradient(135deg,${theme.soft.blue},${theme.soft.purple})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-body), system-ui', padding: '24px' }}>
      <div style={{ background: 'white', borderRadius: theme.radius.xl, padding: '40px', maxWidth: '400px', width: '100%', textAlign: 'center', boxShadow: theme.shadow.lg }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔑</div>
        <h1 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '8px' }}>Hast du einen Code?</h1>
        <p style={{ fontSize: '13px', color: theme.mid, marginBottom: '24px' }}>Frag Mama oder Papa nach deinem 6-stelligen Code!</p>
        <input value={code} onChange={e => setCode(e.target.value.replace(/\D/g,'').slice(0,6))} placeholder="000000"
          style={{ width: '100%', padding: '16px', fontSize: '28px', textAlign: 'center', letterSpacing: '8px', border: `2px solid ${theme.line}`, borderRadius: theme.radius.md, marginBottom: '16px', boxSizing: 'border-box', fontFamily: 'monospace' }} />
        {error && <p style={{ color: '#DC2626', fontSize: '13px', marginBottom: '12px' }}>{error}</p>}
        <button onClick={einloesen} disabled={code.length !== 6 || loading}
          style={{ width: '100%', padding: '14px', background: code.length === 6 ? theme.gradients.primary : theme.line, color: 'white', border: 'none', borderRadius: theme.radius.md, fontWeight: '800', cursor: code.length === 6 ? 'pointer' : 'default' }}>
          {loading ? 'Prüfe...' : 'Los geht\u2019s! 🚀'}
        </button>
      </div>
    </div>
  )
}
