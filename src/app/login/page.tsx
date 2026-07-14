'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { theme } from '@/lib/theme'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [mode, setMode] = useState<'login' | 'signup'>('login')
  const router = useRouter()
  const supabase = createClient()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (mode === 'signup') {
      const { error } = await supabase.auth.signUp({ email, password })
      setLoading(false)
      if (error) { setError(error.message); return }
      router.push('/rolle-waehlen')
      return
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) { setError(error.message); setLoading(false); return }

    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      const { data: alsKind } = await supabase.from('children').select('id, name, klasse, avatar_prefs').eq('auth_user_id', user.id).maybeSingle()
      if (alsKind) {
        localStorage.setItem('np_child_name', alsKind.name)
        localStorage.setItem('np_child_klasse', String(alsKind.klasse))
        router.push('/dashboard')
        setLoading(false)
        return
      }
      const { data: alsEltern } = await supabase.from('children').select('id').eq('parent_id', user.id).limit(1).maybeSingle()
      if (alsEltern) {
        router.push('/eltern-uebersicht')
        setLoading(false)
        return
      }
    }
    router.push('/rolle-waehlen')
    setLoading(false)
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: `linear-gradient(135deg, ${theme.soft.blue} 0%, ${theme.soft.purple} 100%)`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'var(--font-body), system-ui, sans-serif', padding: '24px'
    }}>
      <div style={{
        background: 'white', borderRadius: theme.radius.xl, padding: '48px',
        width: '100%', maxWidth: '420px',
        boxShadow: '0 8px 32px rgba(79,124,255,0.12)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ fontSize: '48px', marginBottom: '12px' }}>👧👦</div>
          <h1 style={{ fontSize: '24px', fontWeight: '700', color: theme.ink, margin: '0 0 8px' }}>
            Nica & Phil
          </h1>
          <p style={{ color: theme.mid, fontSize: '14px', margin: 0 }}>
            {mode === 'login' ? 'Willkommen zurück!' : 'Konto erstellen'}
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>
              E-Mail
            </label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
              placeholder="deine@email.de"
              style={{ width: '100%', padding: '12px 16px', border: `1.5px solid ${theme.line}`, borderRadius: theme.radius.sm, fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
            />
          </div>
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>
              Passwort
            </label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required
              placeholder="••••••••"
              style={{ width: '100%', padding: '12px 16px', border: `1.5px solid ${theme.line}`, borderRadius: theme.radius.sm, fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
            />
          </div>
          {error && (
            <div style={{ background: theme.soft.error, border: '1px solid #FECACA', borderRadius: theme.radius.sm, padding: '10px 14px', fontSize: '13px', color: '#DC2626', marginBottom: '16px' }}>
              {error}
            </div>
          )}
          <button type="submit" disabled={loading}
            style={{ width: '100%', padding: '14px', background: loading ? theme.muted : theme.gradients.primary, color: 'white', border: 'none', borderRadius: theme.radius.md, fontSize: '15px', fontWeight: '700', cursor: loading ? 'not-allowed' : 'pointer', marginBottom: '16px' }}
          >
            {loading ? 'Bitte warten…' : mode === 'login' ? 'Anmelden' : 'Konto erstellen'}
          </button>
          <p style={{ textAlign: 'center', fontSize: '13px', color: theme.mid }}>
            {mode === 'login' ? 'Noch kein Konto? ' : 'Bereits registriert? '}
            <button type="button" onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
              style={{ background: 'none', border: 'none', color: theme.brand.blue, fontWeight: '600', cursor: 'pointer', fontSize: '13px' }}
            >
              {mode === 'login' ? 'Registrieren' : 'Anmelden'}
            </button>
          </p>
        </form>
      </div>
    </div>
  )
}
