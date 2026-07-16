'use client'
import { useRouter } from 'next/navigation'
import { theme } from '@/lib/theme'

const AKTIVITAETEN = [
  { icon: '🎬', titel: 'Kino', desc: 'Familienfilme in Berlin — als Belohnung nach einer guten Lernwoche', farbe: theme.brand.purple, bg: theme.soft.purple },
  { icon: '🏛️', titel: 'Museen', desc: 'Naturkundemuseum, Technikmuseum — Wissen zum Anfassen', farbe: theme.brand.blue, bg: theme.soft.blue },
  { icon: '🌳', titel: 'Outdoor-Spielplätze', desc: 'Berlins schönste Spielplätze in der Nähe entdecken', farbe: theme.brand.green, bg: theme.soft.green },
  { icon: '🏠', titel: 'Indoor-Spielplätze', desc: 'Perfekt für Regentage — Toben ohne Wetter-Sorgen', farbe: theme.brand.orange, bg: theme.soft.orange },
  { icon: '🎳', titel: 'Bowling & Trampolin', desc: 'Aktive Belohnung für harte Lernwochen', farbe: theme.brand.pink, bg: theme.soft.pink },
  { icon: '📚', titel: 'Buchläden & Bibliotheken', desc: 'Neue Bücher entdecken, die zur Leseliste passen', farbe: theme.brand.teal, bg: theme.soft.teal },
]

export default function Freizeit() {
  const router = useRouter()
  return (
    <div style={{ minHeight: '100vh', background: theme.bg, fontFamily: 'var(--font-body), system-ui, sans-serif', paddingBottom: '60px' }}>
      <div style={{ background: 'linear-gradient(135deg, #FF8C42, #FF7CB0, #8A5CFF)', padding: '32px 24px 60px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '16px', right: '24px', fontSize: '54px', opacity: 0.2 }}>🎡</div>
        <button onClick={() => router.push('/dashboard')} style={{ background: 'rgba(255,255,255,0.25)', border: 'none', borderRadius: theme.radius.sm, padding: '8px 12px', color: 'white', fontSize: '14px', cursor: 'pointer', marginBottom: '20px' }}>← Zurück</button>
        <h1 style={{ fontSize: '22px', fontWeight: '800', color: 'white', margin: 0 }}>Freizeit-Ideen 🎡</h1>
        <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '13px', margin: '4px 0 0' }}>Lernen und Spaß gehören zusammen — Ideen für Berlin</p>
      </div>
      <div style={{ maxWidth: '640px', margin: '-32px auto 0', padding: '0 20px' }}>
        <div style={{ background: 'white', borderRadius: theme.radius.lg, padding: '16px 20px', marginBottom: '20px', border: `1px solid ${theme.line}`, fontSize: '12px', color: theme.mid, lineHeight: '1.6' }}>
          🚧 Dieser Bereich wächst noch — bald mit echten Adressen, Öffnungszeiten und Empfehlungen speziell für Berlin und Klosterneuburg.
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          {AKTIVITAETEN.map(a => (
            <div key={a.titel} style={{ background: 'white', borderRadius: theme.radius.lg, padding: '18px', border: `1.5px solid ${theme.line}` }}>
              <div style={{ width: '44px', height: '44px', borderRadius: theme.radius.md, background: a.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', marginBottom: '10px' }}>{a.icon}</div>
              <div style={{ fontWeight: '800', fontSize: '14px', color: theme.ink, marginBottom: '4px' }}>{a.titel}</div>
              <div style={{ fontSize: '11px', color: theme.mid, lineHeight: '1.5' }}>{a.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
