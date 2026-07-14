'use client'
import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { klassenFrage, PROVIDERS, Provider } from '@/lib/theme'

const GESICHTER = ['😀','😊','🤓','😎','🥳','🤩','😇','🙂','😄','🧑','👧','👦','🧒','👩','👨']
const HAUTTOENE = ['#FFDBB4','#F1C27D','#E0AC69','#C68642','#8D5524','#5C3317']
const HAARFARBEN = ['#2C1B0E','#6B4423','#B87333','#D4A017','#4A4A4A','#8B0000','#4169E1','#800080']
const ACCESSOIRES = ['Keins','🎩','👓','🕶️','🎀','🧢','⭐']

const KLASSEN = [1,2,3,4,5,6,7,8,9,10]

export default function OnboardingPage() {
  const [step, setStep] = useState(1)
  const [childName, setChildName] = useState('')
  const [klasse, setKlasse] = useState(3)
  const [avatarModus, setAvatarModus] = useState<'baukasten' | 'foto'>('baukasten')
  const [gesicht, setGesicht] = useState('😀')
  const [hautton, setHautton] = useState(HAUTTOENE[0])
  const [haarfarbe, setHaarfarbe] = useState(HAARFARBEN[0])
  const [accessoire, setAccessoire] = useState('Keins')
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  const [provider, setProvider] = useState<Provider>('openai')
  const [apiKey, setApiKey] = useState('')
  const [zeigAnleitung, setZeigAnleitung] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)
  const router = useRouter()
  const supabase = createClient()

  const kf = klassenFrage()

  function handlePhoto(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setPhotoPreview(reader.result as string)
    reader.readAsDataURL(file)
    setAvatarModus('foto')
  }

  function avatarSVG() {
    // Einfacher Baukasten-Avatar als Kreis mit Gesicht + Farbring
    return (
      <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: hautton, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '48px', margin: '0 auto', border: `6px solid ${haarfarbe}`, position: 'relative' }}>
        {gesicht}
        {accessoire !== 'Keins' && <span style={{ position: 'absolute', top: '-6px', right: '-6px', fontSize: '24px' }}>{accessoire}</span>}
      </div>
    )
  }

  async function handleFinish() {
    if (!childName.trim()) { setError('Bitte gib deinen Namen ein'); return }
    setLoading(true)

    if (apiKey) {
      localStorage.setItem('np_api_key', apiKey)
      localStorage.setItem('np_provider', provider)
    }

    const avatarValue = photoPreview || JSON.stringify({ typ: 'baukasten', gesicht, hautton, haarfarbe, accessoire })
    localStorage.setItem('np_child_name', childName)
    localStorage.setItem('np_child_avatar_typ', photoPreview ? 'foto' : 'baukasten')
    localStorage.setItem('np_child_avatar', photoPreview || '')
    localStorage.setItem('np_child_avatar_baukasten', JSON.stringify({ gesicht, hautton, haarfarbe, accessoire }))
    localStorage.setItem('np_child_klasse', String(klasse))

    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      const { data: kind } = await supabase.from('children').insert({
        auth_user_id: user.id, selbst_registriert: true, name: childName, klasse,
        avatar_prefs: photoPreview ? { type: 'photo' } : { type: 'baukasten', gesicht, hautton, haarfarbe, accessoire }
      }).select().single()

      if (kind) {
        const einladungsCode = Math.floor(100000 + Math.random() * 900000).toString()
        await supabase.from('family_codes').insert({
          code: einladungsCode, child_id: kind.id, typ: 'kind_laedt_eltern_ein',
        })
        setLoading(false)
        router.push(`/eltern-einladen?code=${einladungsCode}`)
        return
      }
    }

    setLoading(false)
    router.push('/dashboard')
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #EAF0FF, #F2EBFF)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-body), system-ui, sans-serif', padding: '24px' }}>
      <div style={{ background: 'white', borderRadius: '28px', padding: '40px', width: '100%', maxWidth: '480px', boxShadow: '0 16px 48px rgba(79,124,255,0.15)' }}>

        <div style={{ display: 'flex', gap: '8px', marginBottom: '32px' }}>
          {[1,2,3].map(s => (
            <div key={s} style={{ flex: 1, height: '4px', borderRadius: '100px', background: s <= step ? 'linear-gradient(90deg,#4F7CFF,#8A5CFF)' : '#E8ECF4', transition: 'all 0.3s' }} />
          ))}
        </div>

        {/* SCHRITT 1: Name + Klasse (datumsabhängig) */}
        {step === 1 && (
          <div>
            <div style={{ textAlign: 'center', marginBottom: '28px' }}>
              <div style={{ fontSize: '48px', marginBottom: '12px' }}>👋</div>
              <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#1A1F36', margin: '0 0 8px' }}>Wie heißt du?</h2>
              <p style={{ color: '#6B7280', fontSize: '14px', margin: 0 }}>Nica und Phil freuen sich auf dich!</p>
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#374151', marginBottom: '8px' }}>Dein Name</label>
              <input type="text" value={childName} onChange={e => setChildName(e.target.value)} placeholder="z.B. Nicole oder Philipp" autoFocus
                style={{ width: '100%', padding: '14px 16px', border: '2px solid #E8ECF4', borderRadius: '12px', fontSize: '16px', outline: 'none', boxSizing: 'border-box' }} />
            </div>
            <div style={{ marginBottom: '8px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#374151', marginBottom: '4px' }}>{kf.frage}</label>
              <p style={{ fontSize: '11px', color: '#9CA3AF', margin: '0 0 10px' }}>{kf.hinweis}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {KLASSEN.map(k => (
                  <button key={k} onClick={() => setKlasse(k)}
                    style={{ width: '44px', height: '44px', borderRadius: '12px', border: '2px solid', borderColor: klasse === k ? '#4F7CFF' : '#E8ECF4', background: klasse === k ? '#EAF0FF' : 'white', fontWeight: '700', fontSize: '14px', cursor: 'pointer', color: klasse === k ? '#4F7CFF' : '#6B7280' }}>
                    {k}
                  </button>
                ))}
              </div>
            </div>
            {error && <div style={{ color: '#DC2626', fontSize: '13px', margin: '16px 0 0' }}>{error}</div>}
            <button onClick={() => { if (!childName.trim()) { setError('Bitte gib deinen Namen ein'); return }; setError(''); setStep(2) }}
              style={{ width: '100%', padding: '14px', background: 'linear-gradient(135deg,#4F7CFF,#8A5CFF)', color: 'white', border: 'none', borderRadius: '14px', fontSize: '16px', fontWeight: '800', cursor: 'pointer', marginTop: '24px' }}>
              Weiter →
            </button>
          </div>
        )}

        {/* SCHRITT 2: Avatar-Baukasten */}
        {step === 2 && (
          <div>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <div style={{ fontSize: '40px', marginBottom: '8px' }}>🎨</div>
              <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#1A1F36', margin: '0 0 8px' }}>Wähle deinen Avatar</h2>
              <p style={{ color: '#6B7280', fontSize: '14px', margin: 0 }}>Stell dir deinen eigenen Charakter zusammen!</p>
            </div>

            <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', background: '#F3F6FC', padding: '6px', borderRadius: '12px' }}>
              <button onClick={() => setAvatarModus('baukasten')}
                style={{ flex: 1, padding: '9px', borderRadius: '9px', border: 'none', fontWeight: '700', fontSize: '13px', cursor: 'pointer', background: avatarModus === 'baukasten' ? '#1A1F36' : 'transparent', color: avatarModus === 'baukasten' ? 'white' : '#6B7280' }}>
                🎨 Baukasten
              </button>
              <button onClick={() => fileRef.current?.click()}
                style={{ flex: 1, padding: '9px', borderRadius: '9px', border: 'none', fontWeight: '700', fontSize: '13px', cursor: 'pointer', background: avatarModus === 'foto' ? '#1A1F36' : 'transparent', color: avatarModus === 'foto' ? 'white' : '#6B7280' }}>
                📸 Eigenes Foto
              </button>
            </div>
            <input ref={fileRef} type="file" accept="image/*" onChange={handlePhoto} style={{ display: 'none' }} />

            {avatarModus === 'foto' && photoPreview ? (
              <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <img src={photoPreview} style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', margin: '0 auto' }} />
              </div>
            ) : (
              <>
                <div style={{ marginBottom: '20px' }}>{avatarSVG()}</div>

                <div style={{ marginBottom: '14px' }}>
                  <div style={{ fontSize: '12px', fontWeight: '700', color: '#374151', marginBottom: '8px' }}>Gesicht</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {GESICHTER.map(g => (
                      <button key={g} onClick={() => setGesicht(g)}
                        style={{ width: '38px', height: '38px', borderRadius: '10px', border: `2px solid ${gesicht === g ? '#4F7CFF' : '#E8ECF4'}`, background: gesicht === g ? '#EAF0FF' : 'white', fontSize: '18px', cursor: 'pointer' }}>{g}</button>
                    ))}
                  </div>
                </div>

                <div style={{ marginBottom: '14px' }}>
                  <div style={{ fontSize: '12px', fontWeight: '700', color: '#374151', marginBottom: '8px' }}>Hautton</div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {HAUTTOENE.map(h => (
                      <button key={h} onClick={() => setHautton(h)}
                        style={{ width: '30px', height: '30px', borderRadius: '50%', background: h, border: hautton === h ? '3px solid #4F7CFF' : '2px solid #E8ECF4', cursor: 'pointer' }} />
                    ))}
                  </div>
                </div>

                <div style={{ marginBottom: '14px' }}>
                  <div style={{ fontSize: '12px', fontWeight: '700', color: '#374151', marginBottom: '8px' }}>Haar-/Rahmenfarbe</div>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {HAARFARBEN.map(h => (
                      <button key={h} onClick={() => setHaarfarbe(h)}
                        style={{ width: '30px', height: '30px', borderRadius: '50%', background: h, border: haarfarbe === h ? '3px solid #4F7CFF' : '2px solid #E8ECF4', cursor: 'pointer' }} />
                    ))}
                  </div>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <div style={{ fontSize: '12px', fontWeight: '700', color: '#374151', marginBottom: '8px' }}>Accessoire</div>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    {ACCESSOIRES.map(a => (
                      <button key={a} onClick={() => setAccessoire(a)}
                        style={{ padding: '8px 12px', borderRadius: '10px', border: `2px solid ${accessoire === a ? '#4F7CFF' : '#E8ECF4'}`, background: accessoire === a ? '#EAF0FF' : 'white', fontSize: '16px', cursor: 'pointer' }}>{a}</button>
                    ))}
                  </div>
                </div>
              </>
            )}

            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => setStep(1)} style={{ flex: 1, padding: '13px', background: '#F3F4F6', border: 'none', borderRadius: '14px', fontSize: '15px', fontWeight: '700', cursor: 'pointer', color: '#6B7280' }}>← Zurück</button>
              <button onClick={() => setStep(3)}
                style={{ flex: 2, padding: '13px', background: 'linear-gradient(135deg,#4F7CFF,#8A5CFF)', color: 'white', border: 'none', borderRadius: '14px', fontSize: '15px', fontWeight: '800', cursor: 'pointer' }}>
                Weiter →
              </button>
            </div>
          </div>
        )}

        {/* SCHRITT 3: KI-Anbieter + Key (optional) */}
        {step === 3 && (
          <div>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              {avatarModus === 'foto' && photoPreview ? (
                <img src={photoPreview} style={{ width: '72px', height: '72px', borderRadius: '50%', objectFit: 'cover', margin: '0 auto 10px' }} />
              ) : (
                <div style={{ transform: 'scale(0.8)', marginBottom: '-10px' }}>{avatarSVG()}</div>
              )}
              <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#1A1F36', margin: '10px 0 4px' }}>Hallo {childName}! 👋</h2>
              <p style={{ color: '#6B7280', fontSize: '13px', margin: 0 }}>Fast fertig!</p>
            </div>

            <div style={{ background: '#FFF4E0', borderRadius: '16px', padding: '16px', marginBottom: '14px', border: '1px solid #FFE0A0' }}>
              <div style={{ fontSize: '13px', fontWeight: '700', color: '#9A5700', marginBottom: '10px' }}>🔑 Für Eltern: KI-Anbieter wählen</div>

              <div style={{ display: 'flex', gap: '6px', marginBottom: '12px' }}>
                {(Object.keys(PROVIDERS) as Provider[]).map(p => (
                  <button key={p} onClick={() => setProvider(p)}
                    style={{ flex: 1, padding: '10px 6px', borderRadius: '10px', border: `2px solid ${provider === p ? '#FFB648' : '#FFE0A0'}`, background: provider === p ? 'white' : 'transparent', cursor: 'pointer', textAlign: 'center' }}>
                    <div style={{ fontSize: '18px' }}>{PROVIDERS[p].icon}</div>
                    <div style={{ fontSize: '10px', fontWeight: '700', color: '#7A5C00' }}>{PROVIDERS[p].label.split(' ')[0]}</div>
                  </button>
                ))}
              </div>

              <input type="password" value={apiKey} onChange={e => setApiKey(e.target.value)} placeholder={`${PROVIDERS[provider].keyPrefix}...`}
                style={{ width: '100%', padding: '10px 14px', border: '1px solid #FFB648', borderRadius: '10px', fontSize: '13px', fontFamily: 'monospace', outline: 'none', boxSizing: 'border-box', background: 'white', marginBottom: '8px' }} />

              <button onClick={() => setZeigAnleitung(!zeigAnleitung)} style={{ background: 'none', border: 'none', color: '#9A5700', fontSize: '11px', fontWeight: '700', cursor: 'pointer', padding: 0 }}>
                {zeigAnleitung ? '▲ Anleitung ausblenden' : `▼ Wo finde ich den ${PROVIDERS[provider].label}-Key?`}
              </button>

              {zeigAnleitung && (
                <div style={{ marginTop: '10px', background: 'white', borderRadius: '10px', padding: '12px 14px' }}>
                  <div style={{ fontSize: '11px', color: '#7A5C00', marginBottom: '6px', fontWeight: '700' }}>{PROVIDERS[provider].whereToGet}</div>
                  <ol style={{ margin: 0, paddingLeft: '16px', fontSize: '11px', color: '#7A5C00', lineHeight: '1.7' }}>
                    {PROVIDERS[provider].instructions.map((step, i) => <li key={i}>{step}</li>)}
                  </ol>
                </div>
              )}

              <p style={{ fontSize: '11px', color: '#9A5700', margin: '10px 0 0', lineHeight: '1.5' }}>
                Kein Key zur Hand? Kein Problem — du kannst auch ohne starten und ihn später nachtragen. Der Chat mit Nica & Phil funktioniert dann erst, sobald ein Key hinterlegt ist.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => setStep(2)} style={{ flex: 1, padding: '13px', background: '#F3F4F6', border: 'none', borderRadius: '14px', fontSize: '15px', fontWeight: '700', cursor: 'pointer', color: '#6B7280' }}>← Zurück</button>
              <button onClick={handleFinish} disabled={loading}
                style={{ flex: 2, padding: '13px', background: loading ? '#9CA3AF' : 'linear-gradient(135deg,#4F7CFF,#8A5CFF)', color: 'white', border: 'none', borderRadius: '14px', fontSize: '15px', fontWeight: '800', cursor: loading ? 'not-allowed' : 'pointer' }}>
                {loading ? 'Wird gespeichert…' : 'Los geht\u2019s! 🚀'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
