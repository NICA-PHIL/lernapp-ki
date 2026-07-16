'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { theme, getReifestufe } from '@/lib/theme'

interface SkillKategorie {
  id: string
  icon: string
  titel: string
  beschreibung: string
  farbe: string
  bg: string
  themen: { titel: string; beispiel: string }[]
}

const SOZIALE_SKILLS: SkillKategorie[] = [
  {
    id: 'kontakte', icon: '🤝', titel: 'Neue Bekanntschaften knüpfen', farbe: theme.brand.pink, bg: theme.soft.pink,
    beschreibung: 'Wie man in einer neuen Klasse oder Gruppe leicht ins Gespräch kommt',
    themen: [
      { titel: 'Der erste Satz', beispiel: '"Hey, darf ich mich neben dich setzen?" — einfach und offen' },
      { titel: 'Gemeinsamkeiten finden', beispiel: 'Frag nach Hobbys, Lieblingsserien oder Sport — das öffnet Türen' },
      { titel: 'Aktiv zuhören', beispiel: 'Nachfragen zeigt echtes Interesse: "Was magst du daran am meisten?"' },
      { titel: 'Gruppen ansprechen', beispiel: 'In der Pause: "Kann ich mitspielen?" ist völlig normal zu fragen' },
    ],
  },
  {
    id: 'kommunikation', icon: '💬', titel: 'Klar kommunizieren', farbe: theme.brand.blue, bg: theme.soft.blue,
    beschreibung: 'Sich verständlich ausdrücken — im Unterricht und mit Freunden',
    themen: [
      { titel: 'Meinung sagen', beispiel: '"Ich finde..., weil..." — Meinung + Begründung' },
      { titel: 'Höflich widersprechen', beispiel: '"Ich sehe das anders, weil..." statt einfach "Nein"' },
      { titel: 'Um Hilfe bitten', beispiel: '"Ich verstehe diesen Teil nicht — kannst du mir helfen?"' },
      { titel: 'Vor der Klasse sprechen', beispiel: 'Langsam sprechen, Blickkontakt halten, kurze Sätze' },
    ],
  },
]

const LERN_SKILLS: SkillKategorie[] = [
  {
    id: 'analyse', icon: '🔍', titel: 'Analysieren & Verstehen', farbe: theme.brand.purple, bg: theme.soft.purple,
    beschreibung: 'Texte, Aufgaben und Probleme systematisch durchdringen',
    themen: [
      { titel: 'Die Kernfrage finden', beispiel: 'Was wird eigentlich gefragt? Erst das herausfinden, dann rechnen/schreiben' },
      { titel: 'In Teile zerlegen', beispiel: 'Große Aufgabe → kleine Schritte, die einzeln lösbar sind' },
      { titel: 'Muster erkennen', beispiel: 'Ähnelt diese Aufgabe einer, die ich schon kenne?' },
      { titel: 'Wichtig von unwichtig trennen', beispiel: 'Beim Lesen: was ist die Hauptidee, was ist nur Beispiel?' },
    ],
  },
  {
    id: 'schwierige-aufgaben', icon: '🧩', titel: 'Schwierige Aufgaben lösen', farbe: theme.brand.orange, bg: theme.soft.orange,
    beschreibung: 'Nicht aufgeben, wenn es kompliziert wird',
    themen: [
      { titel: 'Erstmal ausprobieren', beispiel: 'Auch eine falsche erste Idee bringt dich näher an die Lösung' },
      { titel: 'Rückwärts denken', beispiel: 'Was müsste am Ende rauskommen? Von dort aus zurückarbeiten' },
      { titel: 'Pause machen', beispiel: 'Manchmal hilft 5 Minuten weggehen mehr als 20 Minuten verbissen grübeln' },
      { titel: 'Ähnliches googeln', beispiel: 'Nach dem eigenen Versuch: wie haben andere ein ähnliches Problem gelöst?' },
    ],
  },
]

export default function FitFuerDieSchule() {
  const router = useRouter()
  const [childName, setChildName] = useState('')
  const [klasse, setKlasse] = useState('3')
  const [expandedKat, setExpandedKat] = useState<string | null>(null)
  const [aktiveGruppe, setAktiveGruppe] = useState<'zeitplan' | 'sozial' | 'lernen'>('zeitplan')

  useEffect(() => {
    setChildName(localStorage.getItem('np_child_name') || 'Entdecker')
    setKlasse(localStorage.getItem('np_child_klasse') || '3')
  }, [])

  const reife = getReifestufe(parseInt(klasse))
  const isJung = reife === 'jung'

  return (
    <div style={{ minHeight: '100vh', background: theme.bg, fontFamily: 'var(--font-body), system-ui, sans-serif', paddingBottom: '60px' }}>

      <div style={{ background: 'linear-gradient(135deg, #4F7CFF, #8A5CFF, #FF7CB0)', padding: '32px 24px 60px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '16px', right: '24px', fontSize: '54px', opacity: 0.2 }}>🎯</div>
        <button onClick={() => router.push('/dashboard')} style={{ background: 'rgba(255,255,255,0.25)', border: 'none', borderRadius: theme.radius.sm, padding: '8px 12px', color: 'white', fontSize: '14px', cursor: 'pointer', marginBottom: '20px' }}>← Zurück</button>
        <h1 style={{ fontSize: '22px', fontWeight: '800', color: 'white', margin: 0 }}>Fit für die neue Klasse 🎯</h1>
        <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '13px', margin: '4px 0 0' }}>Stoff wiederholen, vorarbeiten und dich sicher fühlen</p>
      </div>

      <div style={{ maxWidth: '680px', margin: '-32px auto 0', padding: '0 20px' }}>

        {/* Erklär-Karte: Die 3 Säulen */}
        <div style={{ background: 'white', borderRadius: theme.radius.xl, padding: '20px', marginBottom: '20px', boxShadow: theme.shadow.md }}>
          <div style={{ fontSize: '13px', fontWeight: '800', color: theme.ink, marginBottom: '12px' }}>So bereiten wir dich vor:</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '16px' }}>🔄</span>
              <div>
                <span style={{ fontSize: '12.5px', fontWeight: '700', color: theme.ink }}>Wiederholen</span>
                <span style={{ fontSize: '12px', color: theme.mid }}> — regelmäßig, damit nichts vergessen wird</span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '16px' }}>⏩</span>
              <div>
                <span style={{ fontSize: '12.5px', fontWeight: '700', color: theme.ink }}>Vorarbeiten</span>
                <span style={{ fontSize: '12px', color: theme.mid }}> — neue Themen schon mal kennenlernen</span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '16px' }}>🌟</span>
              <div>
                <span style={{ fontSize: '12.5px', fontWeight: '700', color: theme.ink }}>Skills stärken</span>
                <span style={{ fontSize: '12px', color: theme.mid }}> — analysieren, kommunizieren, dranbleiben</span>
              </div>
            </div>
          </div>
        </div>

        {/* Gruppen-Auswahl */}
        <div style={{ display: 'flex', gap: '6px', marginBottom: '20px', background: 'white', padding: '6px', borderRadius: theme.radius.md, boxShadow: theme.shadow.sm }}>
          {[
            { id: 'zeitplan', label: '🔄 Wiederholplan' },
            { id: 'sozial', label: '🤝 Soziale Skills' },
            { id: 'lernen', label: '🧩 Lern-Skills' },
          ].map(tab => (
            <button key={tab.id} onClick={() => setAktiveGruppe(tab.id as typeof aktiveGruppe)}
              style={{ flex: 1, padding: '10px 6px', borderRadius: theme.radius.sm, border: 'none', fontWeight: '700', fontSize: '12px', cursor: 'pointer', background: aktiveGruppe === tab.id ? theme.ink : 'transparent', color: aktiveGruppe === tab.id ? 'white' : theme.mid, transition: 'all 0.2s' }}>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Wiederholplan */}
        {aktiveGruppe === 'zeitplan' && (
          <div>
            <p style={{ fontSize: '12px', color: theme.mid, marginBottom: '16px', lineHeight: '1.6' }}>
              Wissenschaftlich belegt: Wiederholen in Abständen (heute → morgen → in 3 Tagen → in 1 Woche) verankert Wissen viel besser als einmaliges Pauken.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { intervall: 'Täglich', beschreibung: '10-15 Min: Vokabeln, Einmaleins, aktuelle Themen aus deiner Lernreise', icon: '📅', farbe: theme.brand.blue, bg: theme.soft.blue },
                { intervall: 'Alle 3 Tage', beschreibung: 'Themen der letzten Woche nochmal kurz durchgehen', icon: '🔁', farbe: theme.brand.green, bg: theme.soft.green },
                { intervall: 'Wöchentlich', beschreibung: 'Größerer Check: was sitzt schon sicher, wo gibt es noch Lücken?', icon: '📊', farbe: theme.brand.purple, bg: theme.soft.purple },
                { intervall: 'Vor Schulstart', beschreibung: 'Generalprobe: alle Fächer einmal komplett durchgehen', icon: '🎓', farbe: theme.brand.orange, bg: theme.soft.orange },
              ].map((item, i) => (
                <div key={i} style={{ background: 'white', borderRadius: theme.radius.lg, padding: '16px 18px', display: 'flex', gap: '14px', alignItems: 'center', border: `1px solid ${theme.line}` }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: theme.radius.md, background: item.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0 }}>{item.icon}</div>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: '800', color: item.farbe }}>{item.intervall}</div>
                    <div style={{ fontSize: '12px', color: theme.mid, marginTop: '2px' }}>{item.beschreibung}</div>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={() => router.push('/sommermission')}
              style={{ width: '100%', marginTop: '16px', padding: '14px', background: theme.gradients.primary, color: 'white', border: 'none', borderRadius: theme.radius.md, fontSize: '14px', fontWeight: '800', cursor: 'pointer' }}>
              Zu deinem Sommerplan →
            </button>
          </div>
        )}

        {/* Soziale Skills */}
        {aktiveGruppe === 'sozial' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {SOZIALE_SKILLS.map(kat => (
              <SkillKarte key={kat.id} kat={kat} expanded={expandedKat === kat.id} onToggle={() => setExpandedKat(expandedKat === kat.id ? null : kat.id)} isJung={isJung} />
            ))}
          </div>
        )}

        {/* Lern-Skills */}
        {aktiveGruppe === 'lernen' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {LERN_SKILLS.map(kat => (
              <SkillKarte key={kat.id} kat={kat} expanded={expandedKat === kat.id} onToggle={() => setExpandedKat(expandedKat === kat.id ? null : kat.id)} isJung={isJung} />
            ))}
            <button onClick={() => router.push('/meine-skills')}
              style={{ width: '100%', marginTop: '6px', padding: '14px', background: 'linear-gradient(135deg, #37C978, #00C9A7)', color: 'white', border: 'none', borderRadius: theme.radius.md, fontSize: '14px', fontWeight: '800', cursor: 'pointer' }}>
              Meinen Skill-Fortschritt ansehen →
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

function SkillKarte({ kat, expanded, onToggle, isJung }: { kat: SkillKategorie; expanded: boolean; onToggle: () => void; isJung: boolean }) {
  return (
    <div style={{ background: 'white', borderRadius: theme.radius.lg, border: `2px solid ${expanded ? kat.farbe : theme.line}`, overflow: 'hidden', transition: 'all 0.2s' }}>
      <button onClick={onToggle} style={{ width: '100%', padding: '16px 18px', display: 'flex', alignItems: 'center', gap: '14px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
        <div style={{ width: '42px', height: '42px', borderRadius: theme.radius.md, background: kat.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0 }}>{kat.icon}</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: '800', fontSize: '14px', color: theme.ink }}>{kat.titel}</div>
          <div style={{ fontSize: '11px', color: theme.mid, marginTop: '2px' }}>{kat.beschreibung}</div>
        </div>
        <span style={{ fontSize: '16px', color: theme.muted, transform: expanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>⌄</span>
      </button>
      {expanded && (
        <div style={{ padding: '0 18px 18px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {kat.themen.map((thema, i) => (
            <div key={i} style={{ background: kat.bg, borderRadius: theme.radius.sm, padding: '10px 14px' }}>
              <div style={{ fontSize: '12.5px', fontWeight: '700', color: theme.ink, marginBottom: '3px' }}>{thema.titel}</div>
              <div style={{ fontSize: '11.5px', color: theme.mid, fontStyle: 'italic' }}>{thema.beispiel}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
