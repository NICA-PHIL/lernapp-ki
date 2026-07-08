'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

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
    const { error } = mode === 'login'
      ? await supabase.auth.signInWithPassword({ email, password })
      : await supabase.auth.signUp({ email, password })
    if (error) {
      setError(error.message)
    } else {
      router.push('/dashboard')
    }
    setLoading(false)
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #EAF0FF 0%, #F2EBFF 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'system-ui, sans-serif', padding: '24px'
    }}>
      <div style={{
        background: 'white', borderRadius: '24px', padding: '48px',
        width: '100%', maxWidth: '420px',
        boxShadow: '0 8px 32px rgba(79,124,255,0.12)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ fontSize: '48px', marginBottom: '12px' }}>👧👦</div>
          <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#1A1F36', margin: '0 0 8px' }}>
            Nica & Phil
          </h1>
          <p style={{ color: '#6B7280', fontSize: '14px', margin: 0 }}>
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
              style={{ width: '100%', padding: '12px 16px', border: '1.5px solid #E5E7EB', borderRadius: '10px', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
            />
          </div>
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>
              Passwort
            </label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required
              placeholder="••••••••"
              style={{ width: '100%', padding: '12px 16px', border: '1.5px solid #E5E7EB', borderRadius: '10px', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
            />
          </div>
          {error && (
            <div style={{ background: '#FFEFEF', border: '1px solid #FECACA', borderRadius: '8px', padding: '10px 14px', fontSize: '13px', color: '#DC2626', marginBottom: '16px' }}>
              {error}
            </div>
          )}
          <button type="submit" disabled={loading}
            style={{ width: '100%', padding: '14px', background: loading ? '#9CA3AF' : 'linear-gradient(135deg, #4F7CFF, #8A5CFF)', color: 'white', border: 'none', borderRadius: '12px', fontSize: '15px', fontWeight: '700', cursor: loading ? 'not-allowed' : 'pointer', marginBottom: '16px' }}
          >
            {loading ? 'Bitte warten…' : mode === 'login' ? 'Anmelden' : 'Konto erstellen'}
          </button>
          <p style={{ textAlign: 'center', fontSize: '13px', color: '#6B7280' }}>
            {mode === 'login' ? 'Noch kein Konto? ' : 'Bereits registriert? '}
            <button type="button" onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
              style={{ background: 'none', border: 'none', color: '#4F7CFF', fontWeight: '600', cursor: 'pointer', fontSize: '13px' }}
            >
              {mode === 'login' ? 'Registrieren' : 'Anmelden'}
            </button>
          </p>
        </form>
      </div>
    </div>
  )
}
