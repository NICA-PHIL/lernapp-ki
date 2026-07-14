'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { theme } from '@/lib/theme'

interface Fach {
  id: string
  name: string
  icon: string
  neu: boolean
  farbe: string
  wasNeu: string
  auffrischen: string[]
  tipp: string
  avatar: 'nica' | 'phil'
}

const FAECHER: Fach[] = [
  {
    id: 'deutsch', name: 'Deutsch', icon: '✍️', neu: false, farbe: theme.brand.pink, avatar: 'nica',
    wasNeu: 'Die Schreibschrift wird jetzt richtig wichtig — Diktate, längere Texte und eine saubere, flüssige Handschrift werden erwartet.',
    auffrischen: ['Schreibschrift-Buchstaben sicher verbinden', 'Kurze Diktate flüssig mitschreiben', 'Wörter richtig abschreiben ohne Buchstaben zu verlieren', 'Eine kleine Geschichte mit Anfang, Mitte und Schluss erzählen'],
    tipp: 'Täglich nur 10 Minuten schreiben bringt mehr als einmal pro Woche eine ganze Stunde — kurze, regelmäßige Übung prägt die Handbewegung ein.',
  },
  {
    id: 'mathe', name: 'Mathematik', icon: '🔢', neu: false, farbe: theme.brand.blue, avatar: 'phil',
    wasNeu: 'Der Zahlenraum wächst auf 1000, schriftliches Rechnen kommt neu dazu — die Rechenverfahren werden anspruchsvoller.',
    auffrischen: ['Das kleine Einmaleins blitzschnell abrufen können', 'Zahlenraum bis 100 sicher beherrschen', 'Einfache Sachaufgaben verstehen und lösen', 'Uhrzeiten und Geldbeträge sicher lesen'],
    tipp: 'Das Einmaleins wie ein Spiel üben — mit Karten, beim Autofahren, überall im Alltag zählen.',
  },
  {
    id: 'englisch', name: 'Englisch', icon: '🇬🇧', neu: true, farbe: theme.brand.green, avatar: 'nica',
    wasNeu: 'Komplett neues Fach! Ab Klasse 3 startet Englisch — spielerisch mit Liedern, Farben, Zahlen und ersten Sätzen.',
    auffrischen: ['Keine Vorkenntnisse nötig — ein toller Neustart', 'Begrüßungen: Hello, Goodbye, How are you?', 'Zahlen 1-20 und Grundfarben'],
    tipp: 'Englische Kinderlieder gemeinsam singen ist der einfachste Einstieg — der Rhythmus hilft beim Merken.',
  },
  {
    id: 'gewi', name: 'GEWI (Gesellschaftswissenschaften)', icon: '🌍', neu: true, farbe: theme.brand.purple, avatar: 'phil',
    wasNeu: 'Neues Fach! Löst einen Teil des Sachunterrichts ab — es geht um Menschen, Zeit, unsere Stadt und Zusammenleben.',
    auffrischen: ['Keine Vorkenntnisse nötig', 'Über die eigene Familie und Nachbarschaft sprechen', 'Einfache Zeitleisten verstehen (früher – heute)'],
    tipp: 'Gemeinsam einen Berliner Kiez erkunden und darüber sprechen, was sich verändert hat — das ist die beste Vorbereitung.',
  },
  {
    id: 'nawi', name: 'NAWI (Naturwissenschaften)', icon: '🔬', neu: true, farbe: theme.brand.teal, avatar: 'phil',
    wasNeu: 'Neues Fach! Der andere Teil des Sachunterrichts — hier geht es um Experimente, Tiere, Pflanzen und Technik.',
    auffrischen: ['Keine Vorkenntnisse nötig', 'Neugier auf einfache Experimente wecken', 'Beobachten und beschreiben üben: Was siehst du genau?'],
    tipp: 'Kleine Küchen-Experimente zusammen machen (schwimmt es? löst es sich auf?) — das ist schon echte Wissenschaft.',
  },
  {
    id: 'kunst', name: 'Kunst & Musik', icon: '🎨', neu: false, farbe: theme.brand.orange, avatar: 'nica',
    wasNeu: 'Feinmotorik und Ausdruck werden weiter gefördert — passt gut zur Schreibschrift-Übung.',
    auffrischen: ['Mit verschiedenen Materialien experimentieren', 'Eigene Ideen zu Papier bringen'],
    tipp: 'Malen und Basteln trainiert genau die Handmuskulatur, die auch für die Schreibschrift gebraucht wird.',
  },
]

const BUECHER_DEUTSCH = [
  { titel: 'Die Schule der magischen Tiere', autor: 'Margit Auer', beschreibung: 'Ein sprechendes Tier für jedes Kind — witzig und leicht zu lesen.', level: 'Perfekt zum Einstieg' },
  { titel: 'Das Vamperl', autor: 'Renate Welsh', beschreibung: 'Ein kleines Fledermauswesen sorgt für Chaos und Herzenswärme.', level: 'Beliebter Klassiker' },
  { titel: 'Petronella Apfelmus', autor: 'Sabine Städing', beschreibung: 'Eine Garten-Elfe mit Zaubertricks — spannend und lustig.', level: 'Für Mädchen & Jungen' },
  { titel: 'Der Grüffelo', autor: 'Julia Donaldson', beschreibung: 'Gereimt und clever — auch nochmal toll zum lauten Vorlesen üben.', level: 'Kurz & lehrreich' },
]

const BUECHER_ENGLISCH = [
  { titel: 'Usborne First Reading Series', autor: 'Usborne', beschreibung: 'Speziell für Englisch-Anfänger gemacht, mit Bildern und kurzen Sätzen.', level: 'Ideal für Klasse 3' },
  { titel: 'Oxford Reading Tree', autor: 'Oxford', beschreibung: 'Die Biff, Chip & Kipper Geschichten — der Klassiker zum Englischlernen.', level: 'Schulstandard' },
  { titel: 'The Very Hungry Caterpillar', autor: 'Eric Carle', beschreibung: 'Einfache Sätze, tolle Bilder — auch für den Wortschatz-Einstieg.', level: 'Einfach & bekannt' },
]

export default function PhilippVorbereitung() {
  const router = useRouter()
  const [expandedFach, setExpandedFach] = useState<string | null>(null)
  const [checkliste, setCheckliste] = useState<string[]>([])

  useEffect(() => {
    const saved = localStorage.getItem('np_philipp_checkliste')
    if (saved) setCheckliste(JSON.parse(saved))
  }, [])

  function toggleCheck(id: string) {
    const neu = checkliste.includes(id) ? checkliste.filter(c => c !== id) : [...checkliste, id]
    setCheckliste(neu)
    localStorage.setItem('np_philipp_checkliste', JSON.stringify(neu))
  }

  const neueFaecher = FAECHER.filter(f => f.neu)
  const bekannteFaecher = FAECHER.filter(f => !f.neu)

  const checklistePunkte = [
    { id: 'c1', text: 'Ranzen & Federmäppchen für die neue Klasse bereit' },
    { id: 'c2', text: 'Erstes eigenes Wörterheft für Englisch angelegt' },
    { id: 'c3', text: 'Mit Phil über die Aufregung vor dem ersten Schultag gesprochen' },
    { id: 'c4', text: 'Schreibschrift täglich 10 Minuten geübt' },
    { id: 'c5', text: 'Einmaleins sicher abrufbar' },
    { id: 'c6', text: 'Erstes Buch aus der Leseliste angefangen' },
  ]

  return (
    <div style={{ minHeight: '100vh', background: '#F0FAFF', fontFamily: 'system-ui, sans-serif', paddingBottom: '60px' }}>

      {/* Hero */}
      <div style={{ background: theme.gradients.philipp, padding: '32px 24px 70px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '16px', right: '24px', fontSize: '54px', opacity: 0.2 }}>🎒</div>
        <button onClick={() => router.push('/dashboard')} style={{ background: 'rgba(255,255,255,0.25)', border: 'none', borderRadius: theme.radius.sm, padding: '8px 12px', color: 'white', fontSize: '14px', cursor: 'pointer', marginBottom: '20px' }}>← Zurück</button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '4px' }}>
          <img src="/avatars/phil-solo.png" style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover', border: '3px solid rgba(255,255,255,0.5)' }} />
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: '800', color: 'white', margin: 0 }}>Philipp wird startklar 🎒</h1>
            <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '13px', margin: '2px 0 0' }}>Fit für die 3. Klasse — fachlich und mit Selbstvertrauen</p>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '680px', margin: '-40px auto 0', padding: '0 20px' }}>

        {/* Neue Klasse Karte — emotionale Vorbereitung */}
        <div style={{ background: 'white', borderRadius: theme.radius.xl, padding: '24px', marginBottom: '24px', boxShadow: '0 8px 28px rgba(79,124,255,0.12)', border: '1px solid #EAF6FF' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
            <span style={{ fontSize: '24px' }}>🌟</span>
            <h2 style={{ fontSize: '17px', fontWeight: '800', color: theme.ink, margin: 0 }}>Die 3. Klasse wird spannend</h2>
          </div>
          <p style={{ fontSize: '13px', color: theme.mid, lineHeight: '1.7', marginBottom: '16px' }}>
            Drei neue Fächer auf einmal — das klingt nach viel, ist aber vor allem eins: aufregend! Alle Kinder starten hier bei null. Hier sind die wichtigsten Punkte für einen selbstbewussten Start:
          </p>
          <div style={{ display: 'grid', gap: '10px' }}>
            {[
              { icon: '📚', text: 'Neue Fächer bedeuten neue Abenteuer — niemand kennt Englisch, GEWI oder NAWI schon vorher.' },
              { icon: '✋', text: 'Wenn etwas unklar ist, einfach die Hand heben und fragen — das machen alle Kinder.' },
              { icon: '✍️', text: 'Schreibschrift braucht Übung wie Fahrradfahren — anfangs wackelig, dann klappt es immer besser.' },
              { icon: '🎉', text: 'Jeder Fehler beim Üben ist ein Schritt näher zum Können — Phil freut sich über jeden Versuch.' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', background: '#F5FCFF', borderRadius: theme.radius.md, padding: '12px 14px' }}>
                <span style={{ fontSize: '18px', flexShrink: 0 }}>{item.icon}</span>
                <span style={{ fontSize: '12.5px', color: '#374151', lineHeight: '1.5' }}>{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Neue Fächer */}
        <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '18px' }}>✨</span>
          <h2 style={{ fontSize: '15px', fontWeight: '800', color: theme.ink, margin: 0 }}>Ganz neue Fächer</h2>
          <span style={{ fontSize: '11px', fontWeight: '700', color: theme.brand.green, background: theme.soft.green, padding: '3px 10px', borderRadius: theme.radius.full }}>{neueFaecher.length} neu</span>
        </div>
        <p style={{ fontSize: '12px', color: theme.muted, marginBottom: '14px' }}>Hier starten alle bei null — ein fairer, aufregender Neubeginn für Philipp.</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px' }}>
          {neueFaecher.map(fach => (
            <FachKarte key={fach.id} fach={fach} expanded={expandedFach === fach.id} onToggle={() => setExpandedFach(expandedFach === fach.id ? null : fach.id)} onStart={() => router.push(`/chat?subject=${fach.id}&avatar=${fach.avatar}&topic=${encodeURIComponent(fach.name)}`)} />
          ))}
        </div>

        {/* Bekannte Fächer auffrischen */}
        <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '18px' }}>🔄</span>
          <h2 style={{ fontSize: '15px', fontWeight: '800', color: theme.ink, margin: 0 }}>Bekannte Fächer auffrischen</h2>
        </div>
        <p style={{ fontSize: '12px', color: theme.muted, marginBottom: '14px' }}>Diese Fächer kennt Philipp schon — jetzt geht es darum, sicherer zu werden.</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px' }}>
          {bekannteFaecher.map(fach => (
            <FachKarte key={fach.id} fach={fach} expanded={expandedFach === fach.id} onToggle={() => setExpandedFach(expandedFach === fach.id ? null : fach.id)} onStart={() => router.push(`/chat?subject=${fach.id}&avatar=${fach.avatar}&topic=${encodeURIComponent(fach.name)}`)} />
          ))}
        </div>

        {/* Lese-Ecke */}
        <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '18px' }}>📚</span>
          <h2 style={{ fontSize: '15px', fontWeight: '800', color: theme.ink, margin: 0 }}>Philipps Leseliste</h2>
        </div>
        <p style={{ fontSize: '12px', color: theme.muted, marginBottom: '14px' }}>Lesen trainiert nebenbei Rechtschreibung, Wortschatz und Konzentration — hier sind spannende Bücher für den Sommer.</p>

        <div style={{ background: 'white', borderRadius: theme.radius.lg, padding: '18px', marginBottom: '16px', border: `1px solid ${theme.line}` }}>
          <div style={{ fontSize: '12px', fontWeight: '800', color: theme.brand.pink, marginBottom: '10px' }}>🇩🇪 Deutsch lesen</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {BUECHER_DEUTSCH.map((buch, i) => (
              <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', paddingBottom: i < BUECHER_DEUTSCH.length - 1 ? '10px' : 0, borderBottom: i < BUECHER_DEUTSCH.length - 1 ? '1px solid #F3F4F6' : 'none' }}>
                <span style={{ fontSize: '18px' }}>📖</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '13px', fontWeight: '700', color: theme.ink }}>{buch.titel} <span style={{ fontWeight: '400', color: theme.muted }}>— {buch.autor}</span></div>
                  <div style={{ fontSize: '11.5px', color: theme.mid, marginTop: '2px' }}>{buch.beschreibung}</div>
                  <span style={{ fontSize: '10px', fontWeight: '700', color: theme.brand.pink, background: theme.soft.pink, padding: '2px 8px', borderRadius: theme.radius.full, marginTop: '4px', display: 'inline-block' }}>{buch.level}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: 'white', borderRadius: theme.radius.lg, padding: '18px', marginBottom: '28px', border: `1px solid ${theme.line}` }}>
          <div style={{ fontSize: '12px', fontWeight: '800', color: theme.brand.green, marginBottom: '10px' }}>🇬🇧 Englisch lesen</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {BUECHER_ENGLISCH.map((buch, i) => (
              <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', paddingBottom: i < BUECHER_ENGLISCH.length - 1 ? '10px' : 0, borderBottom: i < BUECHER_ENGLISCH.length - 1 ? '1px solid #F3F4F6' : 'none' }}>
                <span style={{ fontSize: '18px' }}>📖</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '13px', fontWeight: '700', color: theme.ink }}>{buch.titel} <span style={{ fontWeight: '400', color: theme.muted }}>— {buch.autor}</span></div>
                  <div style={{ fontSize: '11.5px', color: theme.mid, marginTop: '2px' }}>{buch.beschreibung}</div>
                  <span style={{ fontSize: '10px', fontWeight: '700', color: theme.brand.green, background: theme.soft.green, padding: '2px 8px', borderRadius: theme.radius.full, marginTop: '4px', display: 'inline-block' }}>{buch.level}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Checkliste */}
        <div style={{ background: 'white', borderRadius: theme.radius.xl, padding: '22px', border: `1px solid ${theme.line}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
            <span style={{ fontSize: '20px' }}>✅</span>
            <h2 style={{ fontSize: '16px', fontWeight: '800', color: theme.ink, margin: 0 }}>Startklar-Checkliste</h2>
          </div>
          <p style={{ fontSize: '12px', color: theme.muted, margin: '0 0 16px' }}>{checkliste.length}/{checklistePunkte.length} erledigt</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {checklistePunkte.map(p => {
              const done = checkliste.includes(p.id)
              return (
                <button key={p.id} onClick={() => toggleCheck(p.id)}
                  style={{ display: 'flex', alignItems: 'center', gap: '12px', background: done ? '#F0FFF8' : '#FAFAFA', border: `1.5px solid ${done ? theme.brand.green : theme.line}`, borderRadius: theme.radius.md, padding: '12px 14px', cursor: 'pointer', textAlign: 'left', width: '100%' }}>
                  <span style={{ width: '22px', height: '22px', borderRadius: '50%', background: done ? theme.brand.green : 'white', border: `2px solid ${done ? theme.brand.green : '#D1D5DB'}`, color: 'white', fontSize: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{done ? '✓' : ''}</span>
                  <span style={{ fontSize: '13px', color: '#374151', textDecoration: done ? 'line-through' : 'none' }}>{p.text}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

function FachKarte({ fach, expanded, onToggle, onStart }: { fach: Fach; expanded: boolean; onToggle: () => void; onStart: () => void }) {
  return (
    <div style={{ background: 'white', borderRadius: theme.radius.lg, border: `2px solid ${expanded ? fach.farbe : theme.line}`, overflow: 'hidden', transition: 'all 0.2s' }}>
      <button onClick={onToggle} style={{ width: '100%', padding: '16px 18px', display: 'flex', alignItems: 'center', gap: '14px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
        <div style={{ width: '42px', height: '42px', borderRadius: theme.radius.md, background: `${fach.farbe}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0 }}>{fach.icon}</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: '800', fontSize: '14px', color: theme.ink }}>{fach.name}</div>
          <div style={{ fontSize: '11px', color: theme.muted }}>{fach.neu ? 'Neues Fach' : 'Bekanntes Fach'} · mit {fach.avatar === 'nica' ? 'Nica' : 'Phil'}</div>
        </div>
        <span style={{ fontSize: '16px', color: theme.muted, transform: expanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>⌄</span>
      </button>
      {expanded && (
        <div style={{ padding: '0 18px 18px' }}>
          <div style={{ background: `${fach.farbe}0D`, borderRadius: theme.radius.md, padding: '12px 14px', marginBottom: '12px' }}>
            <div style={{ fontSize: '11px', fontWeight: '800', color: fach.farbe, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>Was ist neu?</div>
            <p style={{ fontSize: '12.5px', color: '#374151', margin: 0, lineHeight: '1.55' }}>{fach.wasNeu}</p>
          </div>
          <div style={{ marginBottom: '12px' }}>
            <div style={{ fontSize: '11px', fontWeight: '800', color: theme.muted, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>Vorbereitung</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {fach.auffrischen.map((punkt, i) => (
                <div key={i} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start', fontSize: '12.5px', color: '#374151' }}>
                  <span style={{ color: fach.farbe, flexShrink: 0 }}>•</span>{punkt}
                </div>
              ))}
            </div>
          </div>
          <div style={{ background: '#FFF9E8', borderRadius: theme.radius.md, padding: '10px 14px', marginBottom: '14px', display: 'flex', gap: '8px' }}>
            <span style={{ fontSize: '14px' }}>💡</span>
            <p style={{ fontSize: '11.5px', color: '#7A5C00', margin: 0, lineHeight: '1.5' }}>{fach.tipp}</p>
          </div>
          <button onClick={onStart} style={{ width: '100%', padding: '12px', background: fach.farbe, color: 'white', border: 'none', borderRadius: theme.radius.md, fontSize: '13px', fontWeight: '800', cursor: 'pointer' }}>
            Jetzt mit {fach.avatar === 'nica' ? 'Nica' : 'Phil'} üben →
          </button>
        </div>
      )}
    </div>
  )
}
