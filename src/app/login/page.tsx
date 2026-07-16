'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { theme } from '@/lib/theme'
import { LivingAvatar } from '@/components/LivingAvatar'

const INK = '#12162B'
const INK_SOFT = '#1E2340'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [mode, setMode] = useState<'login' | 'signup'>('login')
  const [rolle, setRolle] = useState<'kind' | 'eltern'>('kind')
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
      router.push(rolle === 'kind' ? '/onboarding' : '/eltern-uebersicht')
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
      const { data: alsEltern } = await supabase.from('parent_child_links').select('id').eq('parent_id', user.id).limit(1).maybeSingle()
      if (alsEltern) {
        router.push('/eltern-uebersicht')
        setLoading(false)
        return
      }
    }
    router.push('/rolle-waehlen')
    setLoading(false)
  }

  const accentGradient = rolle === 'kind' ? theme.gradients.wuensche : theme.gradients.eltern

  return (
    <div style={{
      minHeight: '100vh',
      background: `radial-gradient(ellipse 60% 45% at 18% 8%, rgba(255,111,166,0.16), transparent 60%),
                   radial-gradient(ellipse 55% 50% at 85% 0%, rgba(79,124,255,0.2), transparent 60%),
                   linear-gradient(180deg, ${INK} 0%, ${INK_SOFT} 100%)`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'var(--font-body), system-ui, sans-serif', padding: '24px',
    }}>
      <div style={{ width: '100%', maxWidth: '420px' }}>

        <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.55)', fontSize: '12.5px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', margin: '0 0 12px' }}>
          Wer meldet sich an?
        </p>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <button type="button" onClick={() => setRolle('kind')} style={{
            flex: 1, padding: '16px 10px', borderRadius: theme.radius.lg, border: 'none', cursor: 'pointer',
            background: rolle === 'kind' ? theme.gradients.wuensche : 'rgba(255,255,255,0.06)',
            color: 'white', textAlign: 'center', transition: 'background 0.2s, box-shadow 0.2s',
            boxShadow: rolle === 'kind' ? '0 12px 28px rgba(255,124,176,0.35)' : 'none',
          }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '6px' }}>
              <LivingAvatar src="/avatars/nica-solo.png" alt="Nica" character="nica" size={46} tilt />
            </div>
            <div style={{ fontWeight: 800, fontSize: '13.5px' }}>Ich bin ein Kind</div>
          </button>
          <button type="button" onClick={() => setRolle('eltern')} style={{
            flex: 1, padding: '16px 10px', borderRadius: theme.radius.lg, border: 'none', cursor: 'pointer',
            background: rolle === 'eltern' ? theme.gradients.eltern : 'rgba(255,255,255,0.06)',
            color: 'white', textAlign: 'center', transition: 'background 0.2s, box-shadow 0.2s',
            boxShadow: rolle === 'eltern' ? '0 12px 28px rgba(0,0,0,0.4)' : 'none',
          }}>
            <div style={{ fontSize: '30px', marginBottom: '10px', lineHeight: '46px' }}>👪</div>
            <div style={{ fontWeight: 800, fontSize: '13.5px' }}>Ich bin ein Elternteil</div>
          </button>
        </div>

        <div style={{
          background: 'white', borderRadius: theme.radius.xl, padding: '40px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.35)',
        }}>
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <h1 style={{ fontFamily: theme.font.display, fontSize: '22px', fontWeight: 600, color: theme.ink, margin: '0 0 6px' }}>
              Nica &amp; Phil
            </h1>
            <p style={{ color: theme.mid, fontSize: '14px', margin: 0 }}>
              {mode === 'login' ? 'Willkommen zurück!' : rolle === 'kind' ? 'Los geht’s, dein eigenes Konto!' : 'Elternkonto erstellen'}
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: theme.ink, marginBottom: '6px' }}>
                E-Mail
              </label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
                placeholder="deine@email.de"
                style={{ width: '100%', padding: '12px 16px', border: `1.5px solid ${theme.line}`, borderRadius: theme.radius.sm, fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
              />
            </div>
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: theme.ink, marginBottom: '6px' }}>
                Passwort
              </label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} required
                placeholder="••••••••"
                style={{ width: '100%', padding: '12px 16px', border: `1.5px solid ${theme.line}`, borderRadius: theme.radius.sm, fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
              />
            </div>
            {error && (
              <div style={{ background: theme.soft.error, border: `1px solid ${theme.errorBorder}`, borderRadius: theme.radius.sm, padding: '10px 14px', fontSize: '13px', color: theme.errorText, marginBottom: '16px' }}>
                {error}
              </div>
            )}
            <button type="submit" disabled={loading}
              style={{ width: '100%', padding: '14px', background: loading ? theme.muted : accentGradient, color: 'white', border: 'none', borderRadius: theme.radius.md, fontSize: '15px', fontWeight: '700', cursor: loading ? 'not-allowed' : 'pointer', marginBottom: '16px' }}
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
    </div>
  )
}
