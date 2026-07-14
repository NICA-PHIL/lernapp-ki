'use client'
import { useState, useRef, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { theme } from '@/lib/theme'
import { LivingAvatar } from '@/components/LivingAvatar'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const SUBJECT_LABELS: Record<string, string> = {
  mathe: 'Mathe',
  deutsch: 'Deutsch',
  englisch: 'Englisch',
}

function ChatContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const subject = searchParams.get('subject') || 'mathe'
  const avatar = searchParams.get('avatar') || 'phil'
  const isNica = avatar === 'nica'

  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: isNica
        ? `Hallo! Ich bin Nica 💗 Ich helfe dir heute bei ${SUBJECT_LABELS[subject]}. Was möchtest du üben oder verstehen?`
        : `Hey! Ich bin Phil 🚀 Bereit für ${SUBJECT_LABELS[subject]}? Zeig mir was du heute hast — ich helfe dir Schritt für Schritt!`
    }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [apiKey, setApiKey] = useState('')
  const [showKeyInput, setShowKeyInput] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    const saved = localStorage.getItem('np_api_key')
    if (saved) setApiKey(saved)
    else setShowKeyInput(true)
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  async function sendMessage() {
    if (!input.trim() || loading) return
    if (!apiKey) { setShowKeyInput(true); return }

    const userMsg: Message = { role: 'user', content: input.trim() }
    const newMessages = [...messages, userMsg]
    setMessages(newMessages)
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages,
          avatar,
          subject,
          klasse: parseInt(localStorage.getItem('np_child_klasse') || '4'),
          apiKey,
        }),
      })

      const data = await res.json()
      if (data.message) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.message }])
      } else if (data.error) {
        setMessages(prev => [...prev, { role: 'assistant', content: '⚠️ Fehler: ' + data.error }])
      }
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: '⚠️ Verbindungsfehler. Bitte prüfe deinen API-Key.' }])
    }
    setLoading(false)
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const accentColor = isNica ? theme.brand.pink : theme.brand.blue
  const accentBg = isNica ? theme.soft.pink : theme.soft.blue
  const avatarImg = isNica ? '/avatars/nica-solo.png' : '/avatars/phil-solo.png'

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', background: theme.bg, fontFamily: 'var(--font-body), system-ui, sans-serif' }}>

      {/* Header */}
      <div style={{ background: 'white', padding: '14px 20px', display: 'flex', alignItems: 'center', gap: '12px', boxShadow: `0 1px 0 ${theme.line}`, flexShrink: 0 }}>
        <button onClick={() => router.push('/dashboard')}
          style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', padding: '4px' }}>
          ←
        </button>
        <LivingAvatar src={avatarImg} alt={avatar} character={isNica ? 'nica' : 'phil'} size={40} />
        <div>
          <div style={{ fontWeight: '700', fontSize: '15px', color: theme.ink }}>
            {isNica ? 'Nica' : 'Phil'}
          </div>
          <div style={{ fontSize: '12px', color: accentColor, fontWeight: '600' }}>
            {SUBJECT_LABELS[subject]} · Berliner Lehrplan
          </div>
        </div>
        <div style={{ marginLeft: 'auto', width: '10px', height: '10px', borderRadius: '50%', background: theme.brand.green }} />
      </div>

      {/* API Key Banner */}
      {showKeyInput && (
        <div style={{ background: theme.soft.warn, borderBottom: `1px solid ${theme.brand.warn}`, padding: '12px 20px', display: 'flex', gap: '10px', alignItems: 'center', flexShrink: 0 }}>
          <span style={{ fontSize: '13px', color: '#9A5700', fontWeight: '600' }}>🔑 OpenAI API-Key eingeben:</span>
          <input
            type="password"
            placeholder="sk-..."
            value={apiKey}
            onChange={e => setApiKey(e.target.value)}
            style={{ flex: 1, padding: '8px 12px', border: `1px solid ${theme.brand.warn}`, borderRadius: theme.radius.sm, fontSize: '13px', fontFamily: 'monospace' }}
          />
          <button onClick={() => { localStorage.setItem('np_api_key', apiKey); setShowKeyInput(false) }}
            style={{ background: theme.brand.warn, border: 'none', borderRadius: theme.radius.sm, padding: '8px 16px', fontSize: '13px', fontWeight: '700', cursor: 'pointer' }}>
            Speichern
          </button>
        </div>
      )}

      {/* Nachrichten */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ display: 'flex', gap: '10px', flexDirection: msg.role === 'user' ? 'row-reverse' : 'row', alignItems: 'flex-end' }}>
            {msg.role === 'assistant' && (
              <img src={avatarImg} alt={avatar}
                style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
            )}
            <div style={{
              maxWidth: '72%',
              padding: '12px 16px',
              borderRadius: msg.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
              background: msg.role === 'user' ? theme.ink : 'white',
              color: msg.role === 'user' ? 'white' : theme.ink,
              fontSize: '14px',
              lineHeight: '1.55',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              border: msg.role === 'assistant' ? `1.5px solid ${accentBg}` : 'none',
            }}>
              {msg.content}
            </div>
          </div>
        ))}

        {loading && (
          <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-end' }}>
            <img src={avatarImg} alt={avatar}
              style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }} />
            <div style={{ background: 'white', borderRadius: '18px 18px 18px 4px', padding: '14px 18px', border: `1.5px solid ${accentBg}`, display: 'flex', gap: '5px', alignItems: 'center' }}>
              {[0, 1, 2].map(i => (
                <div key={i} style={{
                  width: '7px', height: '7px', borderRadius: '50%', background: accentColor,
                  animation: 'bounce 1.2s infinite', animationDelay: `${i * 0.2}s`
                }} />
              ))}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Eingabe */}
      <div style={{ background: 'white', padding: '12px 16px', borderTop: `1px solid ${theme.line}`, display: 'flex', gap: '10px', alignItems: 'flex-end', flexShrink: 0 }}>
        <textarea
          ref={inputRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder={`Frag ${isNica ? 'Nica' : 'Phil'} etwas…`}
          rows={1}
          style={{
            flex: 1, border: `1.5px solid ${theme.line}`, borderRadius: theme.radius.md,
            padding: '12px 16px', fontSize: '14px', resize: 'none',
            outline: 'none', fontFamily: 'var(--font-body), system-ui', lineHeight: '1.4',
            maxHeight: '120px', overflow: 'auto'
          }}
        />
        <button onClick={sendMessage} disabled={loading || !input.trim()}
          style={{
            width: '44px', height: '44px', borderRadius: '50%', border: 'none',
            background: loading || !input.trim() ? theme.line : `linear-gradient(135deg, ${accentColor}, ${isNica ? '#FF4FA0' : theme.brand.purple})`,
            color: 'white', fontSize: '18px', cursor: loading || !input.trim() ? 'not-allowed' : 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
          }}>
          ↑
        </button>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-6px); }
        }
      `}</style>
    </div>
  )
}

export default function ChatPage() {
  return (
    <Suspense>
      <ChatContent />
    </Suspense>
  )
}
