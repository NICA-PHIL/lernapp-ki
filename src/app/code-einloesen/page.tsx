'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

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
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg,#EAF0FF,#F2EBFF)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'system-ui', padding: '24px' }}>
      <div style={{ background: 'white', borderRadius: '28px', padding: '40px', maxWidth: '400px', width: '100%', textAlign: 'center', boxShadow: '0 16px 48px rgba(79,124,255,0.15)' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔑</div>
        <h1 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '8px' }}>Hast du einen Code?</h1>
        <p style={{ fontSize: '13px', color: '#6B7280', marginBottom: '24px' }}>Frag Mama oder Papa nach deinem 6-stelligen Code!</p>
        <input value={code} onChange={e => setCode(e.target.value.replace(/\D/g,'').slice(0,6))} placeholder="000000"
          style={{ width: '100%', padding: '16px', fontSize: '28px', textAlign: 'center', letterSpacing: '8px', border: '2px solid #E8ECF4', borderRadius: '14px', marginBottom: '16px', boxSizing: 'border-box', fontFamily: 'monospace' }} />
        {error && <p style={{ color: '#DC2626', fontSize: '13px', marginBottom: '12px' }}>{error}</p>}
        <button onClick={einloesen} disabled={code.length !== 6 || loading}
          style={{ width: '100%', padding: '14px', background: code.length === 6 ? 'linear-gradient(135deg,#4F7CFF,#8A5CFF)' : '#E8ECF4', color: 'white', border: 'none', borderRadius: '14px', fontWeight: '800', cursor: code.length === 6 ? 'pointer' : 'default' }}>
          {loading ? 'Prüfe...' : 'Los geht\u2019s! 🚀'}
        </button>
      </div>
    </div>
  )
}
