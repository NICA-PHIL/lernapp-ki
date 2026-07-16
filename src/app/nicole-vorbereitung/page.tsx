'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { theme } from '@/lib/theme'
import { LivingAvatar } from '@/components/LivingAvatar'

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
    id: 'mathe', name: 'Mathematik', icon: '📐', neu: false, farbe: theme.brand.blue, avatar: 'phil',
    wasNeu: 'Terme, Gleichungen und negative Zahlen werden zum Alltag. Das Tempo zieht spürbar an.',
    auffrischen: ['Bruchrechnung: Erweitern, Kürzen, alle vier Grundrechenarten', 'Negative Zahlen sicher rechnen', 'Dezimalzahlen ↔ Brüche umwandeln', 'Dreisatz und einfache Prozentrechnung'],
    tipp: 'Wer die Bruchrechnung aus Klasse 6 nicht sicher beherrscht, tut sich mit Termen sehr schwer. Das ist der wichtigste Baustein.',
  },
  {
    id: 'deutsch', name: 'Deutsch', icon: '📝', neu: false, farbe: theme.brand.pink, avatar: 'nica',
    wasNeu: 'Erörterungen und Balladenanalyse kommen neu dazu. Aufsätze werden länger und strukturierter erwartet.',
    auffrischen: ['Rechtschreibstrategien: Groß/Klein, Dehnung, Schärfung', 'Wortarten und Satzglieder sicher bestimmen', 'Einen Text in eigenen Worten zusammenfassen', 'Argumente mit Beispielen belegen'],
    tipp: 'Regelmäßiges Lesen ist der beste Rechtschreib-Trainer — mehr als jede Übung allein.',
  },
  {
    id: 'englisch', name: 'Englisch', icon: '🇬🇧', neu: false, farbe: theme.brand.green, avatar: 'nica',
    wasNeu: 'Present Perfect kommt neu dazu, Texte werden anspruchsvoller, freies Schreiben wird wichtiger.',
    auffrischen: ['Simple Past sicher anwenden', 'Grundwortschatz zu Alltag und Schule', 'Kurze Texte lesen und verstehen', 'Einfache E-Mails auf Englisch schreiben'],
    tipp: 'Englische Serien mit englischen Untertiteln schauen — das trainiert Hören und Lesen gleichzeitig, ganz nebenbei.',
  },
  {
    id: 'spanisch', name: 'Spanisch (2. Fremdsprache)', icon: '🇪🇸', neu: true, farbe: theme.brand.warn, avatar: 'nica',
    wasNeu: 'Komplett neues Fach! Von null auf eine neue Sprache — das ist ungewohnt, aber auch aufregend.',
    auffrischen: ['Keine Vorkenntnisse nötig — ein guter Neustart für alle', 'Aussprache-Grundregeln (anders als Englisch!)', 'Erste Wörter: Begrüßung, Zahlen, Farben'],
    tipp: 'Alle starten bei null — das ist ein Fach ganz ohne Vorwissen-Druck. Perfekt um zu zeigen, wie man eine Sprache von Grund auf lernt.',
  },
  {
    id: 'biologie', name: 'Biologie', icon: '🧬', neu: false, farbe: theme.brand.teal, avatar: 'phil',
    wasNeu: 'Der Zellaufbau und das Mikroskopieren stehen im Fokus — der Blick ins ganz Kleine.',
    auffrischen: ['Aufbau von Pflanze und Tier wiederholen', 'Fachbegriffe sauber lernen (wichtig für Tests)', 'Beschriftungen von Diagrammen üben'],
    tipp: 'Biologie lebt von Skizzen — selbst zeichnen und beschriften hilft mehr als nur lesen.',
  },
  {
    id: 'chemie', name: 'Chemie', icon: '⚗️', neu: true, farbe: theme.brand.purple, avatar: 'phil',
    wasNeu: 'Komplett neues Fach! Stoffe, Trennverfahren und erste Experimente.',
    auffrischen: ['Keine Vorkenntnisse nötig', 'Grundbegriffe: Stoff, Gemisch, Reinstoff', 'Sicherheitsregeln im Chemieraum'],
    tipp: 'Chemie beginnt mit genauem Beobachten — was passiert wirklich, wenn sich zwei Stoffe mischen?',
  },
  {
    id: 'physik', name: 'Physik', icon: '⚡', neu: false, farbe: theme.brand.blue, avatar: 'phil',
    wasNeu: 'Kräfte, Hebel und Reibung — die Welt der Bewegung und des Gleichgewichts.',
    auffrischen: ['Größen und Einheiten (Meter, Sekunde, Kilogramm)', 'Einfache Diagramme lesen', 'Alltagsphänomene beobachten: Warum kippt etwas um?'],
    tipp: 'Physik erklärt den Alltag — Fahrrad fahren, Schaukeln, Wippe: alles ist Physik zum Anfassen.',
  },
  {
    id: 'geschichte', name: 'Geschichte', icon: '🏛️', neu: false, farbe: theme.brand.orange, avatar: 'nica',
    wasNeu: 'Historische Quellen lesen und einordnen wird wichtiger — nicht nur Fakten, sondern Zusammenhänge verstehen.',
    auffrischen: ['Zeitleisten lesen und erstellen', 'Ursache und Wirkung unterscheiden', 'Zwischen Quelle und Meinung unterscheiden'],
    tipp: 'Eine eigene Zeitleiste zu einem Thema basteln macht komplexe Zusammenhänge sofort greifbar.',
  },
  {
    id: 'geografie', name: 'Geografie', icon: '🗺️', neu: false, farbe: theme.brand.green, avatar: 'phil',
    wasNeu: 'Karten lesen, Klimazonen und Landschaftsformen — die Welt im Detail verstehen.',
    auffrischen: ['Himmelsrichtungen und Maßstab', 'Karten lesen und Legenden verstehen', 'Kontinente und Ozeane sicher benennen'],
    tipp: 'Eine echte Weltkarte im Zimmer aufhängen hilft mehr als jede App — täglich draufschauen prägt sich ein.',
  },
  {
    id: 'politik', name: 'Politische Bildung', icon: '⚖️', neu: true, farbe: '#6C8FFF', avatar: 'nica',
    wasNeu: 'Neues Fach! Wie funktioniert unsere Gesellschaft, was bedeutet Demokratie im Alltag?',
    auffrischen: ['Keine Vorkenntnisse nötig', 'Nachrichten für Kinder verfolgen (z.B. logo!)', 'Eigene Meinung mit Argumenten begründen'],
    tipp: 'Gemeinsam kindgerechte Nachrichten schauen und danach kurz besprechen — das reicht völlig als Vorbereitung.',
  },
]

export default function NicoleVorbereitung() {
  const router = useRouter()
  const [expandedFach, setExpandedFach] = useState<string | null>(null)
  const [checkliste, setCheckliste] = useState<string[]>([])

  useEffect(() => {
    const saved = localStorage.getItem('np_nicole_checkliste')
    if (saved) setCheckliste(JSON.parse(saved))
  }, [])

  function toggleCheck(id: string) {
    const neu = checkliste.includes(id) ? checkliste.filter(c => c !== id) : [...checkliste, id]
    setCheckliste(neu)
    localStorage.setItem('np_nicole_checkliste', JSON.stringify(neu))
  }

  const neueFaecher = FAECHER.filter(f => f.neu)
  const bekannteFaecher = FAECHER.filter(f => !f.neu)

  const checklistePunkte = [
    { id: 'c1', text: 'Ranzen & Federmäppchen für die neue Schule bereit' },
    { id: 'c2', text: 'Stundenplan einmal genau angeschaut' },
    { id: 'c3', text: 'Schulweg schon mal abgelaufen oder angeschaut' },
    { id: 'c4', text: 'Mit Nica über die Aufregung vor dem ersten Tag gesprochen' },
    { id: 'c5', text: 'Mathe-Grundlagen (Brüche) sicher aufgefrischt' },
    { id: 'c6', text: 'Erste Wörter auf Spanisch gelernt' },
  ]

  return (
    <div style={{ minHeight: '100vh', background: '#F8F6FF', fontFamily: 'var(--font-body), system-ui, sans-serif', paddingBottom: '60px' }}>

      {/* Hero */}
      <div style={{ background: theme.gradients.nicole, padding: '32px 24px 70px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '16px', right: '24px', fontSize: '54px', opacity: 0.2 }}>🎓</div>
        <button onClick={() => router.push('/dashboard')} style={{ background: 'rgba(255,255,255,0.25)', border: 'none', borderRadius: theme.radius.sm, padding: '8px 12px', color: 'white', fontSize: '14px', cursor: 'pointer', marginBottom: '20px' }}>← Zurück</button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '4px' }}>
          <LivingAvatar src="/avatars/nica-solo.png" alt="Nicole" character="nica" size={56} />
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: '800', color: 'white', margin: 0 }}>Nicole wird startklar 🎓</h1>
            <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '13px', margin: '2px 0 0' }}>Fit für die 7. Klasse Gymnasium — fachlich und mit Selbstvertrauen</p>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '680px', margin: '-40px auto 0', padding: '0 20px' }}>

        {/* Neue Schule Karte — emotionale Vorbereitung */}
        <div style={{ background: 'white', borderRadius: theme.radius.xl, padding: '24px', marginBottom: '24px', boxShadow: '0 8px 28px rgba(138,92,255,0.12)', border: '1px solid #F0EBFF' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
            <span style={{ fontSize: '24px' }}>🌟</span>
            <h2 style={{ fontSize: '17px', fontWeight: '800', color: theme.ink, margin: 0 }}>Neue Schule, neue Chancen</h2>
          </div>
          <p style={{ fontSize: '13px', color: theme.mid, lineHeight: '1.7', marginBottom: '16px' }}>
            Der Wechsel vom Grundschul-Klassenzimmer mit einer Lehrkraft zum Gymnasium mit vielen Fachlehrern ist ein großer Schritt. Das darf aufregend sein — und das ist völlig normal. Hier sind die wichtigsten Punkte für einen selbstbewussten Start:
          </p>
          <div style={{ display: 'grid', gap: '10px' }}>
            {[
              { icon: '👋', text: 'Bei neuen Lehrern reicht ein freundliches "Guten Tag" und Blickkontakt — der Rest kommt von selbst.' },
              { icon: '📓', text: 'Ein eigenes Ordnungssystem pro Fach (Ordner, Hefter) gibt von Anfang an Sicherheit.' },
              { icon: '❓', text: 'Fragen zu stellen ist keine Schwäche — es zeigt, dass man aktiv mitdenkt.' },
              { icon: '🤝', text: 'Die ersten Wochen lernen alle Kinder ihre neuen Mitschüler kennen — niemand ist "hinten dran".' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', background: '#FAFAFF', borderRadius: theme.radius.md, padding: '12px 14px' }}>
                <span style={{ fontSize: '18px', flexShrink: 0 }}>{item.icon}</span>
                <span style={{ fontSize: '12.5px', color: theme.ink, lineHeight: '1.5' }}>{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Neue Fächer */}
        <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '18px' }}>✨</span>
          <h2 style={{ fontSize: '15px', fontWeight: '800', color: theme.ink, margin: 0 }}>Ganz neue Fächer</h2>
          <span style={{ fontSize: '11px', fontWeight: '700', color: theme.brand.purple, background: theme.soft.purple, padding: '3px 10px', borderRadius: theme.radius.full }}>{neueFaecher.length} neu</span>
        </div>
        <p style={{ fontSize: '12px', color: theme.muted, marginBottom: '14px' }}>Hier starten alle bei null — kein Vorwissen nötig, ein fairer Neubeginn für Nicole.</p>

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
        <p style={{ fontSize: '12px', color: theme.muted, marginBottom: '14px' }}>Diese Fächer kennt Nicole schon — jetzt geht es darum, die Grundlagen sicher zu festigen.</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px' }}>
          {bekannteFaecher.map(fach => (
            <FachKarte key={fach.id} fach={fach} expanded={expandedFach === fach.id} onToggle={() => setExpandedFach(expandedFach === fach.id ? null : fach.id)} onStart={() => router.push(`/chat?subject=${fach.id}&avatar=${fach.avatar}&topic=${encodeURIComponent(fach.name)}`)} />
          ))}
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
                  <span style={{ fontSize: '13px', color: theme.ink, textDecoration: done ? 'line-through' : 'none' }}>{p.text}</span>
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
            <p style={{ fontSize: '12.5px', color: theme.ink, margin: 0, lineHeight: '1.55' }}>{fach.wasNeu}</p>
          </div>
          <div style={{ marginBottom: '12px' }}>
            <div style={{ fontSize: '11px', fontWeight: '800', color: theme.muted, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>Vorbereitung</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {fach.auffrischen.map((punkt, i) => (
                <div key={i} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start', fontSize: '12.5px', color: theme.ink }}>
                  <span style={{ color: fach.farbe, flexShrink: 0 }}>•</span>{punkt}
                </div>
              ))}
            </div>
          </div>
          <div style={{ background: '#FFF9E8', borderRadius: theme.radius.md, padding: '10px 14px', marginBottom: '14px', display: 'flex', gap: '8px' }}>
            <span style={{ fontSize: '14px' }}>💡</span>
            <p style={{ fontSize: '11.5px', color: theme.warnText, margin: 0, lineHeight: '1.5' }}>{fach.tipp}</p>
          </div>
          <button onClick={onStart} style={{ width: '100%', padding: '12px', background: fach.farbe, color: 'white', border: 'none', borderRadius: theme.radius.md, fontSize: '13px', fontWeight: '800', cursor: 'pointer' }}>
            Jetzt mit {fach.avatar === 'nica' ? 'Nica' : 'Phil'} üben →
          </button>
        </div>
      )}
    </div>
  )
}
