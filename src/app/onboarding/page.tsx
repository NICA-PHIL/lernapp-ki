'use client'
import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

const PRESET_AVATARS = [
  { id: 'nica-solo', src: '/avatars/nica-solo.png', label: 'Nica' },
  { id: 'phil-solo', src: '/avatars/phil-solo.png', label: 'Phil' },
  { id: 'duo-circle', src: '/avatars/duo-circle.png', label: 'Nica & Phil' },
  { id: 'avatar-1', emoji: '🦁', label: 'Löwe' },
  { id: 'avatar-2', emoji: '🐬', label: 'Delfin' },
  { id: 'avatar-3', emoji: '🦊', label: 'Fuchs' },
  { id: 'avatar-4', emoji: '🐉', label: 'Drache' },
  { id: 'avatar-5', emoji: '🦄', label: 'Einhorn' },
  { id: 'avatar-6', emoji: '🐼', label: 'Panda' },
]

const KLASSEN = [1,2,3,4,5,6,7,8,9,10]

export default function OnboardingPage() {
  const [step, setStep] = useState(1)
  const [childName, setChildName] = useState('')
  const [klasse, setKlasse] = useState(4)
  const [avatarType, setAvatarType] = useState<'preset' | 'photo' | null>(null)
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null)
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  const [apiKey, setApiKey] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)
  const router = useRouter()
  const supabase = createClient()

  function handlePhoto(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setPhotoPreview(reader.result as string)
    reader.readAsDataURL(file)
    setAvatarType('photo')
  }

  async function handleFinish() {
    if (!childName.trim()) { setError('Bitte gib deinen Namen ein'); return }
    if (!selectedPreset && !photoPreview) { setError('Bitte wähle einen Avatar'); return }
    setLoading(true)

    // API-Key speichern
    if (apiKey) localStorage.setItem('np_api_key', apiKey)

    // Kind-Profil speichern
    const avatarValue = photoPreview || selectedPreset || 'nica-solo'
    localStorage.setItem('np_child_name', childName)
    localStorage.setItem('np_child_avatar', avatarValue)
    localStorage.setItem('np_child_klasse', String(klasse))

    // In Supabase speichern
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      await supabase.from('children').insert({
        parent_id: user.id,
        name: childName,
        klasse,
        avatar_prefs: { type: photoPreview ? 'photo' : 'preset', value: avatarValue }
      })
    }

    setLoading(false)
    router.push('/dashboard')
  }

  const avatarDisplay = photoPreview || (selectedPreset?.startsWith('/') ? selectedPreset : null)
  const avatarEmoji = !photoPreview && selectedPreset && !selectedPreset.startsWith('/') ? selectedPreset : null

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #EAF0FF, #F2EBFF)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'system-ui, sans-serif', padding: '24px' }}>
      <div style={{ background: 'white', borderRadius: '28px', padding: '40px', width: '100%', maxWidth: '480px', boxShadow: '0 16px 48px rgba(79,124,255,0.15)' }}>

        {/* Progress */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '32px' }}>
          {[1,2,3].map(s => (
            <div key={s} style={{ flex: 1, height: '4px', borderRadius: '100px', background: s <= step ? 'linear-gradient(90deg,#4F7CFF,#8A5CFF)' : '#E8ECF4', transition: 'all 0.3s' }} />
          ))}
        </div>

        {/* SCHRITT 1: Name + Klasse */}
        {step === 1 && (
          <div>
            <div style={{ textAlign: 'center', marginBottom: '28px' }}>
              <div style={{ fontSize: '48px', marginBottom: '12px' }}>👋</div>
              <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#1A1F36', margin: '0 0 8px' }}>Wie heißt du?</h2>
              <p style={{ color: '#6B7280', fontSize: '14px', margin: 0 }}>Nica und Phil freuen sich auf dich!</p>
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#374151', marginBottom: '8px' }}>Dein Name</label>
              <input
                type="text"
                value={childName}
                onChange={e => setChildName(e.target.value)}
                placeholder="z.B. Nicole oder Philipp"
                autoFocus
                style={{ width: '100%', padding: '14px 16px', border: '2px solid #E8ECF4', borderRadius: '12px', fontSize: '16px', outline: 'none', boxSizing: 'border-box', fontFamily: 'system-ui' }}
                onFocus={e => e.target.style.borderColor = '#4F7CFF'}
                onBlur={e => e.target.style.borderColor = '#E8ECF4'}
              />
            </div>
            <div style={{ marginBottom: '28px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#374151', marginBottom: '8px' }}>In welcher Klasse bist du?</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {KLASSEN.map(k => (
                  <button key={k} onClick={() => setKlasse(k)}
                    style={{ width: '44px', height: '44px', borderRadius: '12px', border: '2px solid', borderColor: klasse === k ? '#4F7CFF' : '#E8ECF4', background: klasse === k ? '#EAF0FF' : 'white', fontWeight: '700', fontSize: '14px', cursor: 'pointer', color: klasse === k ? '#4F7CFF' : '#6B7280', transition: 'all 0.15s' }}>
                    {k}
                  </button>
                ))}
              </div>
            </div>
            {error && <div style={{ color: '#DC2626', fontSize: '13px', marginBottom: '12px' }}>{error}</div>}
            <button onClick={() => { if (!childName.trim()) { setError('Bitte gib deinen Namen ein'); return }; setError(''); setStep(2) }}
              style={{ width: '100%', padding: '14px', background: 'linear-gradient(135deg,#4F7CFF,#8A5CFF)', color: 'white', border: 'none', borderRadius: '14px', fontSize: '16px', fontWeight: '800', cursor: 'pointer' }}>
              Weiter →
            </button>
          </div>
        )}

        {/* SCHRITT 2: Avatar */}
        {step === 2 && (
          <div>
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <div style={{ fontSize: '48px', marginBottom: '12px' }}>🎨</div>
              <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#1A1F36', margin: '0 0 8px' }}>Wähle deinen Avatar</h2>
              <p style={{ color: '#6B7280', fontSize: '14px', margin: 0 }}>Wie soll Nica & Phil dich sehen?</p>
            </div>

            {/* Foto hochladen */}
            <div onClick={() => fileRef.current?.click()}
              style={{ border: '2px dashed', borderColor: avatarType === 'photo' ? '#4F7CFF' : '#E8ECF4', borderRadius: '16px', padding: '20px', textAlign: 'center', cursor: 'pointer', marginBottom: '20px', background: avatarType === 'photo' ? '#EAF0FF' : '#FAFAFA', transition: 'all 0.2s' }}>
              {photoPreview ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', justifyContent: 'center' }}>
                  <img src={photoPreview} style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover' }} />
                  <span style={{ fontSize: '14px', fontWeight: '600', color: '#4F7CFF' }}>Foto ausgewählt ✓</span>
                </div>
              ) : (
                <>
                  <div style={{ fontSize: '28px', marginBottom: '8px' }}>📸</div>
                  <div style={{ fontSize: '14px', fontWeight: '600', color: '#374151' }}>Eigenes Foto hochladen</div>
                  <div style={{ fontSize: '12px', color: '#9CA3AF', marginTop: '4px' }}>Tippe hier um ein Foto auszuwählen</div>
                </>
              )}
            </div>
            <input ref={fileRef} type="file" accept="image/*" onChange={handlePhoto} style={{ display: 'none' }} />

            <div style={{ fontSize: '12px', fontWeight: '700', color: '#9CA3AF', textAlign: 'center', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>oder Avatar wählen</div>

            {/* Preset Avatare */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '10px', marginBottom: '24px' }}>
              {PRESET_AVATARS.map(av => (
                <button key={av.id}
                  onClick={() => { setSelectedPreset(av.src || av.emoji || av.id); setAvatarType('preset'); setPhotoPreview(null) }}
                  style={{ padding: '14px 8px', borderRadius: '14px', border: '2px solid', borderColor: selectedPreset === (av.src || av.emoji || av.id) ? '#4F7CFF' : '#E8ECF4', background: selectedPreset === (av.src || av.emoji || av.id) ? '#EAF0FF' : 'white', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', transition: 'all 0.15s' }}>
                  {av.src ? (
                    <img src={av.src} style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ fontSize: '32px', lineHeight: 1 }}>{av.emoji}</div>
                  )}
                  <span style={{ fontSize: '11px', fontWeight: '600', color: '#374151' }}>{av.label}</span>
                </button>
              ))}
            </div>

            {error && <div style={{ color: '#DC2626', fontSize: '13px', marginBottom: '12px' }}>{error}</div>}
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => setStep(1)} style={{ flex: 1, padding: '13px', background: '#F3F4F6', border: 'none', borderRadius: '14px', fontSize: '15px', fontWeight: '700', cursor: 'pointer', color: '#6B7280' }}>← Zurück</button>
              <button onClick={() => { if (!selectedPreset && !photoPreview) { setError('Bitte wähle einen Avatar'); return }; setError(''); setStep(3) }}
                style={{ flex: 2, padding: '13px', background: 'linear-gradient(135deg,#4F7CFF,#8A5CFF)', color: 'white', border: 'none', borderRadius: '14px', fontSize: '15px', fontWeight: '800', cursor: 'pointer' }}>
                Weiter →
              </button>
            </div>
          </div>
        )}

        {/* SCHRITT 3: Bestätigung + API-Key (für Eltern) */}
        {step === 3 && (
          <div>
            <div style={{ textAlign: 'center', marginBottom: '28px' }}>
              {photoPreview ? (
                <img src={photoPreview} style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', margin: '0 auto 12px', display: 'block', border: '4px solid #EAF0FF' }} />
              ) : selectedPreset?.startsWith('/') ? (
                <img src={selectedPreset} style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', margin: '0 auto 12px', display: 'block', border: '4px solid #EAF0FF' }} />
              ) : (
                <div style={{ fontSize: '64px', marginBottom: '12px' }}>{selectedPreset}</div>
              )}
              <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#1A1F36', margin: '0 0 4px' }}>Hallo {childName}! 👋</h2>
              <p style={{ color: '#6B7280', fontSize: '14px', margin: '0 0 4px' }}>Klasse {klasse}</p>
              <p style={{ color: '#6B7280', fontSize: '13px', margin: 0 }}>Nica und Phil freuen sich auf dich!</p>
            </div>

            <div style={{ background: '#FFF4E0', borderRadius: '16px', padding: '16px', marginBottom: '20px', border: '1px solid #FFE0A0' }}>
              <div style={{ fontSize: '13px', fontWeight: '700', color: '#9A5700', marginBottom: '8px' }}>🔑 Für Eltern: OpenAI API-Key</div>
              <input
                type="password"
                value={apiKey}
                onChange={e => setApiKey(e.target.value)}
                placeholder="sk-proj-..."
                style={{ width: '100%', padding: '10px 14px', border: '1px solid #FFB648', borderRadius: '10px', fontSize: '13px', fontFamily: 'monospace', outline: 'none', boxSizing: 'border-box', background: 'white' }}
              />
              <p style={{ fontSize: '11px', color: '#9A5700', margin: '8px 0 0', lineHeight: '1.5' }}>
                Einmalig eingeben — Kinder sehen diesen Key nicht. Auf platform.openai.com erhältlich.
              </p>
            </div>

            {error && <div style={{ color: '#DC2626', fontSize: '13px', marginBottom: '12px' }}>{error}</div>}
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => setStep(2)} style={{ flex: 1, padding: '13px', background: '#F3F4F6', border: 'none', borderRadius: '14px', fontSize: '15px', fontWeight: '700', cursor: 'pointer', color: '#6B7280' }}>← Zurück</button>
              <button onClick={handleFinish} disabled={loading}
                style={{ flex: 2, padding: '13px', background: loading ? '#9CA3AF' : 'linear-gradient(135deg,#4F7CFF,#8A5CFF)', color: 'white', border: 'none', borderRadius: '14px', fontSize: '15px', fontWeight: '800', cursor: loading ? 'not-allowed' : 'pointer' }}>
                {loading ? 'Wird gespeichert…' : 'Los geht\'s! 🚀'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
