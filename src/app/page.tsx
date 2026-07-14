'use client'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { theme } from '@/lib/theme'
import { LivingAvatar } from '@/components/LivingAvatar'

const INK = '#12162B'
const INK_SOFT = '#1E2340'
const INK_SOFTER = '#2A2F52'
const GOLD = '#FFC966'
const PAPER = '#FBF7EF'

const STARS = [
  { top: 8, left: 6, size: 2, delay: 0 }, { top: 14, left: 22, size: 1.5, delay: 0.6 },
  { top: 6, left: 38, size: 2, delay: 1.2 }, { top: 20, left: 52, size: 1.5, delay: 1.8 },
  { top: 10, left: 68, size: 2, delay: 0.3 }, { top: 24, left: 82, size: 1.5, delay: 0.9 },
  { top: 32, left: 12, size: 1.5, delay: 1.5 }, { top: 40, left: 30, size: 2, delay: 2.1 },
  { top: 28, left: 46, size: 1.5, delay: 0.2 }, { top: 44, left: 64, size: 2, delay: 1.0 },
  { top: 36, left: 90, size: 1.5, delay: 1.6 }, { top: 50, left: 8, size: 1.5, delay: 0.5 },
  { top: 55, left: 24, size: 2, delay: 1.4 }, { top: 48, left: 40, size: 1.5, delay: 2.0 },
  { top: 58, left: 58, size: 2, delay: 0.8 }, { top: 52, left: 76, size: 1.5, delay: 1.1 },
]

const FEATURES = [
  { icon: '📖', bg: theme.soft.blue, titel: 'Hausaufgaben-Chat', text: 'Nica und Phil erklären den Weg dahin, nicht die fertige Lösung — abgestimmt auf Fach, Klasse und Tonfall.' },
  { icon: '🗺️', bg: theme.soft.pink, titel: 'Lernreise', text: 'Für jedes Fach ein eigener Pfad mit Stationen, die sich öffnen, wenn die vorherige sitzt.' },
  { icon: '☀️', bg: theme.soft.warn, titel: 'Sommermission', text: 'Kurze tägliche Impulse statt Nachhilfe-Stress — locker startklar fürs neue Schuljahr.' },
  { icon: '🎸', bg: theme.soft.blue, titel: 'Gitarre, Musik & Schach', text: 'Auch für die Talente, die im Zeugnis nicht stehen.' },
  { icon: '👁️', bg: theme.soft.pink, titel: 'Eltern-Einblicke', text: 'Was Ihr Kind von sich erzählt — sichtbar für Eltern, nie heimlich mitgelesen.' },
  { icon: '💬', bg: theme.soft.green, titel: 'Echtes Feedback', text: 'Kinder und Eltern sagen direkt im Chat, was funktioniert und was nicht.' },
]

function FeatureCard({ f, index }: { f: typeof FEATURES[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => { entries.forEach(e => { if (e.isIntersecting) { setVisible(true); io.unobserve(e.target) } }) },
      { threshold: 0.15 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={ref} style={{
      background: 'white', borderRadius: theme.radius.xl, padding: '26px 24px',
      border: `1px solid ${theme.line}`, opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(16px)',
      transition: `opacity 0.6s ease ${index * 70}ms, transform 0.6s ease ${index * 70}ms`,
    }}>
      <div style={{ width: '46px', height: '46px', borderRadius: theme.radius.md, background: f.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', marginBottom: '16px' }}>{f.icon}</div>
      <h3 style={{ fontSize: '1.08rem', fontWeight: 700, margin: '0 0 8px', color: theme.ink }}>{f.titel}</h3>
      <p style={{ color: theme.mid, fontSize: '0.95rem', margin: 0, lineHeight: 1.55 }}>{f.text}</p>
    </div>
  )
}

export default function Home() {
  const router = useRouter()

  return (
    <div style={{ fontFamily: 'var(--font-body), system-ui, sans-serif', overflowX: 'hidden' }}>

      {/* ── HERO (Nacht) ── */}
      <div style={{
        position: 'relative', overflow: 'hidden',
        background: `radial-gradient(ellipse 60% 45% at 18% 8%, rgba(255,111,166,0.16), transparent 60%),
                     radial-gradient(ellipse 55% 50% at 85% 0%, rgba(79,124,255,0.20), transparent 60%),
                     linear-gradient(180deg, ${INK} 0%, ${INK_SOFT} 78%, ${INK_SOFTER} 100%)`,
        color: '#F3F1EA', padding: '28px 0 110px',
      }}>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          {STARS.map((s, i) => (
            <div key={i} style={{
              position: 'absolute', top: `${s.top}%`, left: `${s.left}%`, width: s.size, height: s.size,
              borderRadius: '50%', background: GOLD, boxShadow: `0 0 6px 1px rgba(255,201,102,0.5)`,
              animation: `np-twinkle 3.6s ease-in-out infinite`, animationDelay: `${s.delay}s`,
            }} />
          ))}
        </div>

        <div style={{ maxWidth: '1180px', margin: '0 auto', padding: '0 clamp(20px,5vw,48px)', position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 0 40px' }}>
            <div style={{ fontFamily: 'var(--font-display), sans-serif', fontWeight: 600, fontSize: '1.15rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              Nica <span style={{ color: GOLD }}>&amp;</span> Phil
            </div>
            <button onClick={() => router.push('/login')} style={{
              fontSize: '0.85rem', fontWeight: 700, color: '#F3F1EA', textDecoration: 'none', cursor: 'pointer',
              border: '1.5px solid rgba(243,241,234,0.3)', padding: '9px 18px', borderRadius: theme.radius.full,
              background: 'rgba(255,255,255,0.06)',
            }}>Anmelden</button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '40px', alignItems: 'center' }} className="np-hero-grid">
            <div>
              <span style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.78rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: GOLD }}>KI-LERNBEGLEITER FÜR ZUHAUSE</span>
              <h1 style={{
                fontFamily: 'var(--font-display), sans-serif', fontSize: 'clamp(2.3rem, 4.6vw, 3.9rem)', fontWeight: 600,
                lineHeight: 1.06, letterSpacing: '-0.01em', margin: '14px 0 22px',
              }}>
                Zwei KI-Begleiter,<br />die <span style={{ color: '#9DB6FF' }}>nachfragen</span><br />statt nur zu <span style={{ color: '#FFAECB' }}>antworten</span>.
              </h1>
              <p style={{ fontSize: '1.2rem', lineHeight: 1.6, color: '#A6ABC7', maxWidth: '46ch', margin: 0 }}>
                Nica erklärt mit Herz, Phil fragt logisch nach. Gemeinsam begleiten sie dein Kind durch Hausaufgaben, die Sommermission vor dem neuen Schuljahr und die Fächer, die noch wackeln.
              </p>
              <div style={{ display: 'flex', gap: '14px', marginTop: '32px', flexWrap: 'wrap' }}>
                <button onClick={() => router.push('/onboarding')} style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px', border: 'none', borderRadius: theme.radius.full,
                  padding: '15px 26px', fontWeight: 700, fontSize: '1rem', background: theme.gradients.primary, color: 'white',
                  boxShadow: '0 14px 30px rgba(79,124,255,0.35)', cursor: 'pointer',
                }}>Kostenlos starten →</button>
                <button onClick={() => router.push('/login')} style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'transparent', color: '#F3F1EA',
                  border: '1.5px solid rgba(243,241,234,0.35)', borderRadius: theme.radius.full, padding: '15px 26px',
                  fontWeight: 700, fontSize: '1rem', cursor: 'pointer',
                }}>Für Eltern: So funktioniert&apos;s</button>
              </div>
            </div>

            <div style={{ position: 'relative', height: '360px', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: '18px' }}>
              <span style={{ position: 'absolute', top: '4%', right: '10%', fontSize: '1.7rem', filter: 'drop-shadow(0 6px 10px rgba(0,0,0,0.35))' }}>🎸</span>
              <span style={{ position: 'absolute', top: '30%', left: '2%', fontSize: '1.7rem', filter: 'drop-shadow(0 6px 10px rgba(0,0,0,0.35))' }}>♟️</span>
              <span style={{ position: 'absolute', bottom: '2%', right: '26%', fontSize: '1.7rem', filter: 'drop-shadow(0 6px 10px rgba(0,0,0,0.35))' }}>📖</span>
              <span style={{ position: 'absolute', top: '52%', right: '0%', fontSize: '1.7rem', filter: 'drop-shadow(0 6px 10px rgba(0,0,0,0.35))' }}>☀️</span>
              <LivingAvatar src="/avatars/phil-solo.png" alt="Phil" character="phil" size={190} />
              <LivingAvatar src="/avatars/nica-solo.png" alt="Nica" character="nica" size={172} />
            </div>
          </div>
        </div>

        <svg viewBox="0 0 1440 90" preserveAspectRatio="none" style={{ position: 'absolute', bottom: '-2px', left: 0, width: '100%', height: 'auto', display: 'block' }}>
          <path d="M0,40 C 240,90 480,0 720,30 C 960,60 1200,10 1440,45 L1440,100 L0,100 Z" fill={PAPER} />
        </svg>
      </div>

      {/* ── FEATURES (Papier) ── */}
      <div style={{ background: PAPER, padding: '88px 0' }}>
        <div style={{ maxWidth: '1180px', margin: '0 auto', padding: '0 clamp(20px,5vw,48px)' }}>
          <div style={{ textAlign: 'center', maxWidth: '620px', margin: '0 auto 52px' }}>
            <span style={{ fontWeight: 700, fontSize: '0.78rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: theme.brand.blue }}>WAS NICA &amp; PHIL WIRKLICH KÖNNEN</span>
            <h2 style={{ fontFamily: 'var(--font-display), sans-serif', fontSize: 'clamp(1.7rem, 3vw, 2.4rem)', fontWeight: 600, margin: '12px 0 14px', color: '#2B2A24' }}>Kein Chat-Fenster. Ein ganzes Schuljahr.</h2>
            <p style={{ color: '#7C7566', fontSize: '1.08rem', margin: 0 }}>Jede Funktion ist auf ein echtes Fach, ein echtes Talent oder eine echte Sorge von Eltern zugeschnitten.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
            {FEATURES.map((f, i) => <FeatureCard key={f.titel} f={f} index={i} />)}
          </div>
        </div>
      </div>

      {/* ── DEMO ── */}
      <div style={{ background: PAPER, padding: '0 0 88px' }}>
        <div style={{ maxWidth: '1180px', margin: '0 auto', padding: '0 clamp(20px,5vw,48px)' }}>
          <div style={{ background: INK, color: '#F3F1EA', borderRadius: theme.radius.xl, padding: 'clamp(24px,4vw,44px)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '36px', alignItems: 'center' }} className="np-demo-grid">
            <div>
              <span style={{ fontWeight: 700, fontSize: '0.78rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: GOLD }}>SO FÜHLT ES SICH AN</span>
              <h2 style={{ fontFamily: 'var(--font-display), sans-serif', fontSize: 'clamp(1.5rem, 2.6vw, 2rem)', fontWeight: 600, margin: '12px 0 14px', color: '#F3F1EA' }}>Phil gibt die Lösung nicht vor — er fragt zurück.</h2>
              <p style={{ color: '#A6ABC7', margin: 0, lineHeight: 1.6 }}>Ein echtes Prinzip aus dem Gespräch, keine Behauptung: Jede Antwort führt zum eigenen Denken zurück, in kurzen, klaren Schritten.</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ alignSelf: 'flex-end', padding: '14px 18px', borderRadius: '18px', borderBottomRightRadius: '4px', background: 'rgba(255,255,255,0.1)', maxWidth: '88%', fontSize: '0.95rem', lineHeight: 1.5 }}>
                <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700, color: '#FFAECB', display: 'block', marginBottom: '4px' }}>KIND, KLASSE 7</span>
                Wie viel ist ¾ + ½?
              </div>
              <div style={{ padding: '14px 18px', borderRadius: '18px', borderBottomLeftRadius: '4px', background: theme.soft.blue, color: theme.ink, maxWidth: '88%', fontSize: '0.95rem', lineHeight: 1.5, fontWeight: 600 }}>
                <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700, color: theme.brand.blue, display: 'block', marginBottom: '4px' }}>PHIL</span>
                Gute Frage! Bevor wir addieren — auf welchen gemeinsamen Nenner könnten wir beide Brüche bringen?
              </div>
              <div style={{ alignSelf: 'flex-end', padding: '14px 18px', borderRadius: '18px', borderBottomRightRadius: '4px', background: 'rgba(255,255,255,0.1)', maxWidth: '88%', fontSize: '0.95rem', lineHeight: 1.5 }}>
                Auf 4?
              </div>
              <div style={{ padding: '14px 18px', borderRadius: '18px', borderBottomLeftRadius: '4px', background: theme.soft.blue, color: theme.ink, maxWidth: '88%', fontSize: '0.95rem', lineHeight: 1.5, fontWeight: 600 }}>
                <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700, color: theme.brand.blue, display: 'block', marginBottom: '4px' }}>PHIL</span>
                Genau! Und wie viel ist ½ dann in Vierteln ausgedrückt?
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── SO FUNKTIONIERT'S ── */}
      <div style={{ background: PAPER, padding: '0 0 88px' }}>
        <div style={{ maxWidth: '1180px', margin: '0 auto', padding: '0 clamp(20px,5vw,48px)' }}>
          <div style={{ textAlign: 'center', maxWidth: '620px', margin: '0 auto 52px' }}>
            <span style={{ fontWeight: 700, fontSize: '0.78rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: theme.brand.pink }}>SO FUNKTIONIERT&apos;S</span>
            <h2 style={{ fontFamily: 'var(--font-display), sans-serif', fontSize: 'clamp(1.7rem, 3vw, 2.4rem)', fontWeight: 600, margin: '12px 0 0', color: '#2B2A24' }}>In drei Schritten startklar.</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px' }}>
            {[
              { n: '1', titel: 'Profil anlegen', text: 'Avatar wählen, Name und Klasse eingeben — für jedes Kind einzeln.' },
              { n: '2', titel: 'Kind auswählen oder Code einlösen', text: 'Mehrere Kinder, ein Familien-Zugang. Wechseln geht mit einem Klick.' },
              { n: '3', titel: 'Lernreise oder Sommermission starten', text: 'Nica und Phil übernehmen — Eltern behalten jederzeit den Überblick.' },
            ].map(s => (
              <div key={s.n}>
                <div style={{ fontFamily: 'var(--font-display), sans-serif', fontWeight: 600, fontSize: '2.6rem', color: theme.brand.blue, opacity: 0.35, lineHeight: 1 }}>{s.n}</div>
                <h3 style={{ margin: '10px 0 8px', fontSize: '1.1rem', color: '#2B2A24' }}>{s.titel}</h3>
                <p style={{ color: '#7C7566', fontSize: '0.95rem', margin: 0 }}>{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── FINAL CTA (Nacht) ── */}
      <div style={{ background: `linear-gradient(180deg, ${INK_SOFTER} 0%, ${INK} 100%)`, color: '#F3F1EA', textAlign: 'center', padding: '90px 0 70px' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto', padding: '0 clamp(20px,5vw,48px)' }}>
          <span style={{ fontWeight: 700, fontSize: '0.78rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: GOLD }}>BEREIT?</span>
          <h2 style={{ fontFamily: 'var(--font-display), sans-serif', fontSize: 'clamp(1.9rem, 3.6vw, 2.8rem)', fontWeight: 600, margin: '16px 0' }}>Nica und Phil warten schon.</h2>
          <p style={{ color: '#A6ABC7', maxWidth: '50ch', margin: '0 auto 30px', fontSize: '1.1rem' }}>Kostenlos starten, in zwei Minuten eingerichtet — ohne versteckte Haken.</p>
          <button onClick={() => router.push('/onboarding')} style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px', border: 'none', borderRadius: theme.radius.full,
            padding: '15px 26px', fontWeight: 700, fontSize: '1rem', background: theme.gradients.primary, color: 'white',
            boxShadow: '0 14px 30px rgba(79,124,255,0.35)', cursor: 'pointer',
          }}>Kostenlos starten →</button>
        </div>
      </div>
      <div style={{ textAlign: 'center', padding: '26px 0', color: '#A6ABC7', fontSize: '0.82rem', background: INK }}>
        Nica &amp; Phil — nica-phil.com
      </div>

      <style>{`
        @keyframes np-twinkle { 0%, 100% { opacity: 0.25; } 50% { opacity: 0.9; } }
        @media (max-width: 880px) {
          .np-hero-grid { grid-template-columns: 1fr !important; }
          .np-demo-grid { grid-template-columns: 1fr !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: 0.001ms !important; }
        }
      `}</style>
    </div>
  )
}
