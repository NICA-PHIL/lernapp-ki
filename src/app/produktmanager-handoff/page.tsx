'use client'
import { useState } from 'react'
import { theme } from '@/lib/theme'

const STUB = '#C9A46A'
const STUB_SOFT = '#FBF3E4'

const TABS = [
  { id: 'karte', label: 'Produktkarte' },
  { id: 'fluss', label: 'Nutzerfluss' },
  { id: 'screens', label: 'Screen-Aufbau' },
  { id: 'scan', label: 'Scan-System' },
  { id: 'regeln', label: 'Produktregeln' },
  { id: 'dev', label: 'Dev-Handoff' },
  { id: 'design', label: 'Design & Mockups' },
] as const

type TabId = typeof TABS[number]['id']

function Card({ children, dashed = false, style = {} }: { children: React.ReactNode; dashed?: boolean; style?: React.CSSProperties }) {
  return (
    <div style={{ background: 'white', border: `1px ${dashed ? 'dashed' : 'solid'} ${theme.line}`, borderRadius: theme.radius.lg, padding: '16px', ...style }}>
      {children}
    </div>
  )
}

function RoleTag({ children, bg, fg }: { children: React.ReactNode; bg: string; fg: string }) {
  return <span style={{ display: 'inline-block', fontSize: '10.5px', fontWeight: 800, padding: '3px 9px', borderRadius: theme.radius.full, marginBottom: '10px', background: bg, color: fg }}>{children}</span>
}

function FlowStep({ n, title, text }: { n: string; title: string; text: string }) {
  return (
    <Card>
      <span style={{ display: 'inline-block', fontSize: '10.5px', fontWeight: 800, background: theme.soft.blue, color: theme.brand.blue, padding: '3px 8px', borderRadius: theme.radius.full, marginBottom: '8px', fontVariantNumeric: 'tabular-nums' }}>{n}</span>
      <h4 style={{ fontSize: '13.5px', margin: '0 0 4px', color: theme.ink }}>{title}</h4>
      <p style={{ fontSize: '12px', color: theme.mid, margin: 0, lineHeight: 1.5 }}>{text}</p>
    </Card>
  )
}

function ScreenItem({ path, desc, planned = false }: { path: string; desc: string; planned?: boolean }) {
  return (
    <div style={{ background: 'white', border: `1px solid ${theme.line}`, borderRadius: theme.radius.md, padding: '11px 14px', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
      <span style={{ fontFamily: 'monospace', fontSize: '10.5px', color: planned ? STUB : theme.brand.blue, background: planned ? STUB_SOFT : theme.soft.blue, padding: '2px 6px', borderRadius: '6px', flexShrink: 0, whiteSpace: 'nowrap' }}>{path}</span>
      <span style={{ fontSize: '12px', color: theme.mid, lineHeight: 1.5 }}>{desc}</span>
    </div>
  )
}

function RuleRow({ rule, meaning }: { rule: string; meaning: string }) {
  return (
    <tr>
      <td style={{ padding: '12px', borderBottom: `1px solid ${theme.line}`, color: theme.ink, fontWeight: 700, whiteSpace: 'nowrap', verticalAlign: 'top' }}>{rule}</td>
      <td style={{ padding: '12px', borderBottom: `1px solid ${theme.line}`, color: theme.mid, verticalAlign: 'top' }}>{meaning}</td>
    </tr>
  )
}

function Phone({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ width: '250px', flexShrink: 0, borderRadius: '28px', background: '#0c0e18', padding: '9px', boxShadow: '0 16px 40px rgba(0,0,0,0.18)' }}>
      <div style={{ width: '100%', height: '460px', borderRadius: '20px', overflow: 'hidden', position: 'relative', background: theme.bg, fontFamily: 'var(--font-body), system-ui, sans-serif' }}>
        <div style={{ overflowY: 'auto', height: '100%' }}>{children}</div>
      </div>
    </div>
  )
}

function MockRow({ phone, caption }: { phone: React.ReactNode; caption: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', alignItems: 'flex-start', marginBottom: '28px' }}>
      <Phone>{phone}</Phone>
      <div style={{ maxWidth: '320px', paddingTop: '6px' }}>{caption}</div>
    </div>
  )
}

function MockHeader({ title }: { title: string }) {
  return (
    <div style={{ background: 'rgba(255,255,255,0.85)', padding: '12px 14px', display: 'flex', alignItems: 'center', gap: '8px', borderBottom: `1px solid ${theme.line}`, position: 'sticky', top: 0 }}>
      <img src="/avatars/nica-solo.png" alt="" style={{ width: '22px', height: '22px', borderRadius: '50%', objectFit: 'cover' }} />
      <span style={{ fontWeight: 800, fontSize: '12px', color: theme.ink }}>{title}</span>
    </div>
  )
}

function Caption({ title, items }: { title: string; items: string[] }) {
  return (
    <>
      <h3 style={{ fontFamily: theme.font.display, fontSize: '14.5px', margin: '0 0 8px', color: theme.ink, fontWeight: 600 }}>{title}</h3>
      <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '12px', lineHeight: 1.7, color: theme.mid }}>
        {items.map((it, i) => <li key={i}>{it}</li>)}
      </ul>
    </>
  )
}

function DevCard({ title, items }: { title: string; items: string[] }) {
  return (
    <Card>
      <h4 style={{ fontSize: '13.5px', margin: '0 0 10px', color: theme.ink }}>{title}</h4>
      <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '12px', lineHeight: 1.8, color: theme.mid }}>
        {items.map((it, i) => <li key={i} dangerouslySetInnerHTML={{ __html: it.replace(/`([^`]+)`/g, `<code style="background:${theme.soft.blue};color:${theme.brand.blue};padding:1px 5px;border-radius:4px;font-size:11px">$1</code>`) }} />)}
      </ul>
    </Card>
  )
}

export default function ProduktmanagerHandoff() {
  const [tab, setTab] = useState<TabId>('karte')

  return (
    <div style={{ minHeight: '100vh', background: theme.bg, fontFamily: 'var(--font-body), system-ui, sans-serif', paddingBottom: '60px' }}>
      <div style={{ maxWidth: '1080px', margin: '0 auto', padding: '32px 24px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
          <span style={{ fontSize: '22px' }}>📘</span>
          <h1 style={{ fontFamily: theme.font.display, fontWeight: 600, fontSize: '21px', margin: 0, color: theme.ink }}>Nica &amp; Phil – Produktmanager-Handoff</h1>
        </div>

        <div style={{ background: theme.soft.blue, borderLeft: `3px solid ${theme.brand.blue}`, borderRadius: theme.radius.md, padding: '16px 18px', marginBottom: '20px' }}>
          <b style={{ fontSize: '13px', display: 'block', marginBottom: '4px', color: theme.ink }}>Ziel dieses Dokuments</b>
          <p style={{ fontSize: '13px', color: theme.mid, margin: 0, lineHeight: 1.6 }}>Übersetzt die Produktidee in konkrete Nutzerabläufe, Screens, Komponenten, Geschäftsregeln und technische Anforderungen. Lehrer- und Admin-Rolle sind bewusst nur skizziert — Fokus bleibt auf dem, was für Kind und Eltern als Nächstes gebaut wird.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', marginBottom: '22px' }}>
          {[
            { label: 'HAUPTROLLEN', num: '4', sub: 'Kind · Eltern voll · Lehrer/Admin skizziert' },
            { label: 'KERNABLÄUFE', num: '6', sub: 'Vom Onboarding bis Elternbericht' },
            { label: 'SCREENS', num: '18', sub: '14 gebaut · 4 geplant' },
            { label: 'ERSTE ZIELGRUPPE', num: 'Klasse 1–13', sub: 'Berlin-Schuljahr hinterlegt' },
          ].map(s => (
            <Card key={s.label} style={{ padding: '14px 16px' }}>
              <div style={{ fontSize: '11.5px', color: theme.muted, fontWeight: 700 }}>{s.label}</div>
              <div style={{ fontFamily: theme.font.display, fontSize: '26px', fontWeight: 600, margin: '2px 0', color: theme.ink }}>{s.num}</div>
              <div style={{ fontSize: '11.5px', color: theme.mid }}>{s.sub}</div>
            </Card>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px', position: 'sticky', top: 0, background: theme.bg, padding: '12px 0', zIndex: 5 }}>
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              border: `1px solid ${theme.line}`, background: tab === t.id ? theme.brand.blue : 'white', color: tab === t.id ? 'white' : theme.mid,
              fontWeight: 700, fontSize: '13px', padding: '9px 16px', borderRadius: theme.radius.full, cursor: 'pointer', borderColor: tab === t.id ? theme.brand.blue : theme.line,
            }}>{t.label}</button>
          ))}
        </div>

        {tab === 'karte' && (
          <div>
            <h2 style={{ fontFamily: theme.font.display, fontSize: '18px', fontWeight: 600, margin: '0 0 6px', color: theme.ink }}>Gesamte Produktkarte</h2>
            <p style={{ fontSize: '13.5px', color: theme.mid, margin: '0 0 20px', maxWidth: '70ch', lineHeight: 1.6 }}>Vier Oberflächen auf einem gemeinsamen Lernprofil (<code>children</code> + <code>parent_child_links</code>). Kind und Eltern sind vollständig ausgearbeitet und real gebaut; Lehrer und Admin sind als Ausbaustufe erkennbar, aber bewusst nicht im MVP.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
              <Card>
                <RoleTag bg={theme.soft.blue} fg={theme.brand.blue}>KIND</RoleTag>
                <h3 style={{ fontSize: '15.5px', margin: '0 0 10px', color: theme.ink }}>Lern-App</h3>
                <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '12.5px', lineHeight: 1.8, color: theme.mid }}>
                  <li>Dashboard (altersabhängiges Design)</li><li>Sommermission &amp; Lernreise</li><li>Chat mit Nica/Phil (sokratisch)</li>
                  <li>Aufgabe/Lösung fotografieren</li><li>Lesen &amp; Schreiben (Tagebuch, Bücher)</li><li>Avatar-Baukasten</li>
                </ul>
              </Card>
              <Card>
                <RoleTag bg={theme.soft.pink} fg="#C23875">ELTERN</RoleTag>
                <h3 style={{ fontSize: '15.5px', margin: '0 0 10px', color: theme.ink }}>Familien-Dashboard</h3>
                <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '12.5px', lineHeight: 1.8, color: theme.mid }}>
                  <li>Mehrere Kinder, mehrere Eltern pro Kind</li><li>Eltern-Einblicke (nur was Kind freigibt)</li>
                  <li>Zugang teilen (Einladungscode)</li><li>Elternberichte in eigener Sprache</li><li>Padlet-Pinnwand lesen (Lehrer-Posts)</li>
                </ul>
              </Card>
              <Card dashed>
                <RoleTag bg={STUB_SOFT} fg="#8A6A2E">LEHRER · Ausbaustufe</RoleTag>
                <h3 style={{ fontSize: '15.5px', margin: '0 0 10px', color: theme.ink }}>Klassenraum</h3>
                <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '12.5px', lineHeight: 1.8, color: theme.mid }}>
                  <li>Padlet-Pinnwand posten (einseitig)</li><li>Themen, Hausaufgaben ankündigen</li><li>Klassenarbeiten-Termine</li>
                </ul>
                <div style={{ fontSize: '11px', color: STUB, fontWeight: 700, marginTop: '10px' }}>Grob skizziert, nicht im aktuellen MVP</div>
              </Card>
              <Card dashed>
                <RoleTag bg={theme.soft.purple} fg={theme.brand.purple}>ADMIN · Ausbaustufe</RoleTag>
                <h3 style={{ fontSize: '15.5px', margin: '0 0 10px', color: theme.ink }}>Steuerung</h3>
                <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '12.5px', lineHeight: 1.8, color: theme.mid }}>
                  <li>Schulen &amp; Klassen anlegen</li><li>Lehrer-Rollen vergeben</li><li>Moderation, Auswertung</li>
                </ul>
                <div style={{ fontSize: '11px', color: STUB, fontWeight: 700, marginTop: '10px' }}>Grob skizziert, nicht im aktuellen MVP</div>
              </Card>
            </div>
          </div>
        )}

        {tab === 'fluss' && (
          <div>
            <h2 style={{ fontFamily: theme.font.display, fontSize: '18px', fontWeight: 600, margin: '0 0 6px', color: theme.ink }}>Haupt-Nutzerfluss</h2>
            <p style={{ fontSize: '13.5px', color: theme.mid, margin: '0 0 20px', maxWidth: '70ch', lineHeight: 1.6 }}>End-to-End-Prozess, wie er im echten Produkt läuft — beide Registrierungsrichtungen sind möglich.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '12px', marginBottom: '24px' }}>
              <FlowStep n="01" title="Registrierung — Kind oder Elternteil zuerst" text="Beide Richtungen möglich: Kind registriert sich selbst und lädt Eltern per Code ein, oder Elternteil legt zuerst ein Kind-Profil an." />
              <FlowStep n="02" title="Rolle wählen" text={'„Bist du ein Kind oder ein Elternteil?" – steuert, welche Oberfläche als Nächstes kommt.'} />
              <FlowStep n="03" title="Profil anlegen" text="Name, Klasse (1–13), Avatar-Baukasten oder eigenes Foto. Bestimmt sofort die Alters-Design-Stufe." />
              <FlowStep n="04" title="Erstes Dashboard" text="Grundschule: rund, kräftig, viel Emoji. Oberstufe: kompakt, gedeckt, sachlich. Gleiches Layout-Skelett." />
              <FlowStep n="05" title="Modul wählen oder Aufgabe scannen" text="Sommermission, Lernreise, Chat, Lesen & Schreiben — oder direkt eine Hausaufgabe fotografieren." />
              <FlowStep n="06" title="Nica/Phil antworten sokratisch" text="Nie die fertige Lösung, immer der nächste Denkschritt — Kernregel des Produkts." />
              <FlowStep n="07" title="Eltern-Einblick, übersetzt" text="Was das Kind freiwillig geteilt hat, erscheint im Elternbereich — automatisch in die gewählte Elternsprache übersetzt." />
              <FlowStep n="08" title="Weiterer Elternteil dazu" text={'„Zugang teilen" erzeugt einen Code, mit dem z.B. Oma oder der zweite Elternteil sich mit demselben Kind verknüpft.'} />
              <FlowStep n="09" title="Laufender Rhythmus" text="Tägliche Tagebuch-Frage, Bücher-Fortschritt, Sommermission-Impulse — ohne Streak-Zwang oder Zeitdruck." />
            </div>
            <div style={{ background: theme.soft.warn, borderLeft: `3px solid ${theme.brand.warn}`, borderRadius: theme.radius.md, padding: '14px 16px', fontSize: '12.5px', color: '#8A5D00' }}>
              <b>Kernschleife:</b> Schritte 05–07 wiederholen sich beliebig oft pro Tag — das ist die eigentliche tägliche Nutzung, nicht ein einmaliger Durchlauf.
            </div>
          </div>
        )}

        {tab === 'screens' && (
          <div>
            <h2 style={{ fontFamily: theme.font.display, fontSize: '18px', fontWeight: 600, margin: '0 0 6px', color: theme.ink }}>Screen-Aufbau</h2>
            <p style={{ fontSize: '13.5px', color: theme.mid, margin: '0 0 20px', maxWidth: '70ch', lineHeight: 1.6 }}>Bereits gebaute Screens (blau) und geplante Ergänzungen (gelb) aus den vorigen Planungsrunden.</p>

            {[
              { title: 'Registrierung & Rollen', items: [
                ['/login', 'An-/Abmelden, leitet je nach Rolle weiter'],
                ['/rolle-waehlen', 'Kind oder Elternteil?'],
                ['/onboarding', 'Kind legt eigenes Profil an, erzeugt Eltern-Einladungscode'],
                ['/kind-erstellen', 'Elternteil legt Kind-Profil an'],
                ['/eltern-einladen', 'Zeigt den Code, den das Kind an Eltern weitergibt'],
                ['/zugang-teilen', 'Weiterer Erwachsener wird mit Kind verknüpft'],
              ]},
              { title: 'Kind-Bereich', items: [
                ['/dashboard', 'Zentrale Übersicht, Alters-Design greift hier'],
                ['/chat', 'Sokratischer Chat mit Nica/Phil je Fach'],
                ['/sommermission', 'Tägliche Ferien-Impulse'],
                ['/lernreise', 'Fach-Pfade mit Stationen'],
                ['/kind-waehlen', 'Profil wechseln bei mehreren Kindern'],
                ['/lesen-schreiben', 'Geplant: Tagebuch- und Bücher-Tab', true],
                ['/scan', 'Geplant: Aufgabe oder Lösung fotografieren', true],
              ]},
              { title: 'Eltern-Bereich', items: [
                ['/eltern-uebersicht', 'Alle verknüpften Kinder, Code einlösen'],
                ['/eltern-einblicke', 'Was das Kind freiwillig geteilt hat'],
                ['/feedback-uebersicht', 'Rückmeldungen von Kind und Eltern'],
                ['/eltern-sprache', 'Geplant: Sprachwahl für Oberfläche & Berichte', true],
                ['/klassen-pinnwand', 'Geplant: Padlet-Ansicht, nur lesend', true],
              ]},
            ].map(group => (
              <div key={group.title} style={{ marginBottom: '22px' }}>
                <h3 style={{ fontSize: '13.5px', fontWeight: 800, color: theme.mid, textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 10px' }}>{group.title}</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px,1fr))', gap: '10px' }}>
                  {group.items.map(([path, desc, planned]) => <ScreenItem key={path as string} path={path as string} desc={desc as string} planned={!!planned} />)}
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'scan' && (
          <div>
            <h2 style={{ fontFamily: theme.font.display, fontSize: '18px', fontWeight: 600, margin: '0 0 6px', color: theme.ink }}>Scan-System</h2>
            <p style={{ fontSize: '13.5px', color: theme.mid, margin: '0 0 20px', maxWidth: '70ch', lineHeight: 1.6 }}>Zwei getrennte Einsatzzwecke, gleicher technischer Unterbau (Foto → Bilderkennung über den bereits hinterlegten KI-Schlüssel der Familie).</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px,1fr))', gap: '16px', marginBottom: '22px' }}>
              <Card>
                <span style={{ fontFamily: theme.font.display, fontSize: '22px', fontWeight: 600, color: theme.brand.blue }}>A</span>
                <h4 style={{ fontSize: '14.5px', margin: '8px 0 6px', color: theme.ink }}>Aufgabenstellung fotografieren</h4>
                <p style={{ fontSize: '12.5px', color: theme.mid, lineHeight: 1.6, margin: 0 }}>Kind fotografiert die Hausaufgabe aus dem Schulheft. Die KI erkennt Fach und Fragestellung und startet den Chat direkt mit der richtigen Aufgabe — sokratisch, nie mit fertiger Lösung.</p>
              </Card>
              <Card>
                <span style={{ fontFamily: theme.font.display, fontSize: '22px', fontWeight: 600, color: theme.brand.blue }}>B</span>
                <h4 style={{ fontSize: '14.5px', margin: '8px 0 6px', color: theme.ink }}>Eigene Lösung/Notizen fotografieren</h4>
                <p style={{ fontSize: '12.5px', color: theme.mid, lineHeight: 1.6, margin: 0 }}>Kind fotografiert seine handschriftliche Lösung. Die KI gibt Feedback zum Denkweg — keine Bewertung/Note, kein Ersatz für die Lehrkraft-Korrektur.</p>
              </Card>
            </div>
            <h2 style={{ fontSize: '15px', color: theme.ink, fontFamily: theme.font.display }}>Zustände (beide Zwecke gleich)</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '6px', margin: '14px 0' }}>
              <span style={{ fontSize: '11.5px', fontWeight: 700, padding: '7px 13px', borderRadius: theme.radius.full, background: 'white', border: `1px solid ${theme.line}` }}>Foto aufnehmen</span>
              <span style={{ color: theme.muted }}>→</span>
              <span style={{ fontSize: '11.5px', fontWeight: 700, padding: '7px 13px', borderRadius: theme.radius.full, background: 'white', border: `1px solid ${theme.line}` }}>Wird analysiert …</span>
              <span style={{ color: theme.muted }}>→</span>
              <span style={{ fontSize: '11.5px', fontWeight: 700, padding: '7px 13px', borderRadius: theme.radius.full, background: theme.soft.green, color: '#1a7a45' }}>Erkannt — zur Bestätigung</span>
              <span style={{ color: theme.muted }}>→</span>
              <span style={{ fontSize: '11.5px', fontWeight: 700, padding: '7px 13px', borderRadius: theme.radius.full, background: theme.soft.green, color: '#1a7a45' }}>Chat startet vorausgefüllt</span>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '6px', marginBottom: '20px' }}>
              <span style={{ fontSize: '11.5px', fontWeight: 700, padding: '7px 13px', borderRadius: theme.radius.full, background: theme.soft.pink, color: '#C23875' }}>Fehler: unscharf/unlesbar</span>
              <span style={{ color: theme.muted }}>→</span>
              <span style={{ fontSize: '11.5px', fontWeight: 700, padding: '7px 13px', borderRadius: theme.radius.full, background: 'white', border: `1px solid ${theme.line}` }}>Erneut fotografieren oder manuell eintippen</span>
            </div>
            <div style={{ background: theme.soft.pink, borderRadius: theme.radius.md, padding: '14px 16px', fontSize: '12.5px', color: '#C23875' }}>
              <b>Datenschutzregel:</b> Fotos werden nur für die Erkennung verarbeitet und danach nicht dauerhaft gespeichert.
            </div>
          </div>
        )}

        {tab === 'regeln' && (
          <div>
            <h2 style={{ fontFamily: theme.font.display, fontSize: '18px', fontWeight: 600, margin: '0 0 6px', color: theme.ink }}>Produktregeln</h2>
            <p style={{ fontSize: '13.5px', color: theme.mid, margin: '0 0 20px', maxWidth: '70ch', lineHeight: 1.6 }}>Geschäftsregeln, die Design und Code gleichermaßen einhalten müssen.</p>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12.5px' }}>
                <thead><tr>
                  <th style={{ textAlign: 'left', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', color: theme.muted, padding: '8px 12px', borderBottom: `1px solid ${theme.line}` }}>Regel</th>
                  <th style={{ textAlign: 'left', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', color: theme.muted, padding: '8px 12px', borderBottom: `1px solid ${theme.line}` }}>Bedeutung</th>
                </tr></thead>
                <tbody>
                  <RuleRow rule="Mehrfach-Verknüpfung" meaning="Ein Kind kann mehrere Eltern haben (Mutter, Vater, Oma, Nanny), ein Elternteil mehrere Kinder — über parent_child_links, nicht über eine einzelne parent_id-Spalte." />
                  <RuleRow rule="Sokratische Antwort" meaning="Nica/Phil geben nie die fertige Lösung vor, sondern den nächsten Denkschritt — gilt für Chat, Scan-Feedback und alle Module gleichermaßen." />
                  <RuleRow rule="Tagebuch-Privatsphäre" meaning="Einträge sind standardmäßig privat. Eltern sehen nur, was das Kind aktiv über den Augen-Schalter freigibt." />
                  <RuleRow rule="Bücherliste kuratiert" meaning="Empfehlungen kommen aus einer gepflegten Liste nach Klasse/Interesse — die KI erfindet keine Buchtitel." />
                  <RuleRow rule="Kein Suchtdesign" meaning="Kein Streak-Zwang, keine Auto-Play-Schleifen. Hört das Kind auf, wird es nicht mit Druck zurückgeholt." />
                  <RuleRow rule="Alters-Design" meaning="Drei Stufen (jung/mittel/reif) über Klasse 1–13, steuern Rundung, Schriftgröße, Farbsättigung, Emoji-Dichte, Ansprache — gleiches Layout-Skelett für alle Stufen." />
                  <RuleRow rule="Elternsprache" meaning="Eltern-Oberfläche und Elternberichte werden in die gewählte Sprache übersetzt; die Kind-Oberfläche bleibt deutsch." />
                  <RuleRow rule="Padlet einseitig" meaning="Nur Lehrer veröffentlichen Beiträge. Eltern lesen, ohne Rückkanal — kein Moderationsaufwand für Lehrkräfte im MVP." />
                  <RuleRow rule="Scan-Fotos vergänglich" meaning="Fotos werden nur zur Erkennung verarbeitet, nicht dauerhaft gespeichert." />
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === 'dev' && (
          <div>
            <h2 style={{ fontFamily: theme.font.display, fontSize: '18px', fontWeight: 600, margin: '0 0 6px', color: theme.ink }}>Dev-Handoff</h2>
            <p style={{ fontSize: '13.5px', color: theme.mid, margin: '0 0 20px', maxWidth: '70ch', lineHeight: 1.6 }}>Technischer Zuschnitt auf die bestehende Architektur (Next.js App Router, Supabase Postgres/Auth/RLS, Vercel).</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px,1fr))', gap: '16px' }}>
              <DevCard title="Neue Tabellen" items={[
                '`diary_entries` (child_id, text, geteilt_mit_eltern, erstellt_am)',
                '`book_catalog` (titel, autor, klassenbereich, interessen[])',
                '`book_status` (child_id, book_id, status)',
                '`teacher_posts` (Padlet-Beiträge, einseitig lesbar)',
              ]} />
              <DevCard title="RLS-Muster" items={[
                'Gleiches Muster wie `parent_child_links`: Zugriff über Join, nicht über direkte Fremdschlüssel-Spalte',
                '`diary_entries`: Eltern-Policy nur WHERE geteilt_mit_eltern = true',
                '`teacher_posts`: Eltern nur SELECT, kein INSERT/UPDATE',
              ]} />
              <DevCard title="Scan-Funktion" items={[
                'Erweiterung von `/api/chat` um Bild-Input (Vision), nutzt den bereits hinterlegten Familien-KI-Key',
                'Foto nur im Request, keine Persistenz — kein Storage-Bucket nötig',
              ]} />
              <DevCard title="Mehrsprachigkeit" items={[
                'Übersetzung nur im Eltern-Bereich, z.B. über `next-intl` für Oberfläche',
                'Elternberichte: Übersetzung serverseitig vor Anzeige, Rohtext bleibt deutsch gespeichert',
              ]} />
              <DevCard title="Alters-Design" items={[
                '`getReifestufe()` + `reifeStyles` aus theme.ts in einen Hook heben, den Dashboard + Module lesen',
                'Klassenwähler in Onboarding/Kind-Erstellen auf 1–13 erweitern',
              ]} />
              <DevCard title="Lehrer/Admin (später)" items={[
                'Noch keine role-Spalte nötig für MVP',
                'Bei Umsetzung: eigene Auth-Rolle + schools/classes-Tabellen, RLS analog zum bestehenden Muster',
              ]} />
            </div>
          </div>
        )}

        {tab === 'design' && (
          <div>
            <h2 style={{ fontFamily: theme.font.display, fontSize: '18px', fontWeight: 600, margin: '0 0 6px', color: theme.ink }}>Design &amp; Mockups</h2>
            <p style={{ fontSize: '13.5px', color: theme.mid, margin: '0 0 20px', maxWidth: '70ch', lineHeight: 1.6 }}>Visuelle Konzepte aus der KinderGPT-Analyse und der Konkurrenz-Recherche zum Eltern-Dashboard — freigegeben, als Referenz für Design und Umsetzung.</p>

            <h3 style={{ fontFamily: theme.font.display, fontSize: '15px', margin: '0 0 12px', color: theme.ink }}>Prinzipien aus der KinderGPT-Analyse</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '12px', marginBottom: '30px' }}>
              <Card><RoleTag bg={theme.soft.blue} fg={theme.brand.blue}>VERTRAUEN ZEIGEN</RoleTag><p style={{ fontSize: '12.5px', color: theme.mid, margin: 0, lineHeight: 1.6 }}>Ein „Was Nica &amp; Phil NICHT sind"-Block mit echten Beispiel-Dialogen macht Sicherheit konkret statt zu behaupten.</p></Card>
              <Card><RoleTag bg={theme.soft.green} fg="#1a7a45">FORTSCHRITT OHNE DRUCK</RoleTag><p style={{ fontSize: '12.5px', color: theme.mid, margin: 0, lineHeight: 1.6 }}>Lese-Tracker ohne Streak-Zwang — bewusst gegen die Duolingo-Falle (Aktivität ≠ echtes Können).</p></Card>
              <Card><RoleTag bg={theme.soft.purple} fg={theme.brand.purple}>EIGENE BILDSPRACHE</RoleTag><p style={{ fontSize: '12.5px', color: theme.mid, margin: 0, lineHeight: 1.6 }}>Dunkler „Nacht"-Hero mit Gold-Sternen und lebendige Tilt-Avatare bleiben markanter als ein rein weißer Auftritt.</p></Card>
              <Card><RoleTag bg={theme.soft.warn} fg="#8A5D00">KLARHEIT VOR DEKORATION</RoleTag><p style={{ fontSize: '12.5px', color: theme.mid, margin: 0, lineHeight: 1.6 }}>Pill-Buttons, ruhige Kartenraster, ein Akzent-Blau als Führung — konsequent auf neue Screens angewendet.</p></Card>
            </div>

            <h3 style={{ fontFamily: theme.font.display, fontSize: '15px', margin: '0 0 12px', color: theme.ink }}>Dashboard mit neuem Modul „Lesen &amp; Schreiben"</h3>
            <MockRow
              phone={<>
                <MockHeader title="Nica & Phil" />
                <div style={{ padding: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                    <img src="/avatars/nica-solo.png" style={{ width: '38px', height: '38px', borderRadius: '50%', objectFit: 'cover', border: '2px solid white', boxShadow: '0 4px 14px rgba(79,124,255,0.25)' }} />
                    <div><div style={{ fontFamily: theme.font.display, fontSize: '15px', fontWeight: 600, color: theme.ink }}>Hallo Nicole 👋</div><div style={{ fontSize: '10.5px', color: theme.muted, fontWeight: 600 }}>Klasse 7 · Was lernst du heute?</div></div>
                  </div>
                  <div style={{ fontFamily: theme.font.display, fontSize: '12px', fontWeight: 600, color: theme.ink, marginBottom: '8px' }}>⚡ Schnellzugriff</div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '6px' }}>
                    {['💭 Wünsche', '🚀 Skills', '📔 Lesen'].map((l, i) => (
                      <div key={l} style={{ background: 'white', border: i === 2 ? `1.5px dashed ${theme.brand.pink}` : `1px solid ${theme.line}`, borderRadius: theme.radius.md, padding: '10px 6px', textAlign: 'center', fontSize: '9px', fontWeight: 700, color: theme.mid }}>{l}</div>
                    ))}
                  </div>
                </div>
              </>}
              caption={<Caption title="Ein Kästchen mehr" items={[
                'Reiht sich zwischen bestehende Felder ein, gleiche Kartenoptik',
                'NEU-Markierung nur bei Einführung, verschwindet danach',
              ]} />}
            />

            <h3 style={{ fontFamily: theme.font.display, fontSize: '15px', margin: '0 0 12px', color: theme.ink }}>Lesen &amp; Schreiben — Tagebuch &amp; Bücher</h3>
            <MockRow
              phone={<>
                <MockHeader title="Lesen & Schreiben" />
                <div style={{ padding: '14px' }}>
                  <div style={{ display: 'flex', gap: '6px', background: theme.bg, padding: '4px', borderRadius: theme.radius.md, marginBottom: '12px' }}>
                    <div style={{ flex: 1, textAlign: 'center', padding: '7px', borderRadius: '9px', background: theme.ink, color: 'white', fontSize: '11px', fontWeight: 700 }}>📔 Tagebuch</div>
                    <div style={{ flex: 1, textAlign: 'center', padding: '7px', borderRadius: '9px', color: theme.mid, fontSize: '11px', fontWeight: 700 }}>📚 Bücher</div>
                  </div>
                  <div style={{ background: `linear-gradient(160deg,${theme.soft.pink},white)`, border: '1px solid #FFE0EE', borderRadius: theme.radius.lg, padding: '12px', display: 'flex', gap: '8px', marginBottom: '10px' }}>
                    <img src="/avatars/nica-solo.png" style={{ width: '30px', height: '30px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
                    <div><div style={{ fontSize: '9px', fontWeight: 800, color: theme.brand.pink }}>NICA FRAGT HEUTE</div><div style={{ fontSize: '11.5px', color: theme.ink, fontWeight: 600 }}>Was hat dich heute zum Lachen gebracht?</div></div>
                  </div>
                  <div style={{ border: `1.5px solid ${theme.line}`, borderRadius: theme.radius.md, padding: '10px', fontSize: '11px', color: theme.muted, minHeight: '40px' }}>Schreib, was du magst …</div>
                </div>
              </>}
              caption={<Caption title="Freies + geführtes Schreiben" items={[
                'Tagesfrage von Nica, jederzeit überspringbar',
                '🔒 privat (Standard) · 👁️ vom Kind für Eltern freigegeben',
                'Design-Themen sind reine Optik, kein Content-Fork nach Geschlecht',
              ]} />}
            />
            <MockRow
              phone={<>
                <MockHeader title="Lesen & Schreiben" />
                <div style={{ padding: '14px' }}>
                  <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', marginBottom: '12px' }}>
                    {['Klasse 7', 'Abenteuer', 'Freundschaft'].map((c, i) => (
                      <div key={c} style={{ flexShrink: 0, padding: '6px 11px', borderRadius: theme.radius.full, fontSize: '10px', fontWeight: 700, border: `1.5px solid ${i === 0 ? theme.brand.blue : theme.line}`, background: i === 0 ? theme.soft.blue : 'white', color: i === 0 ? theme.brand.blue : theme.mid }}>{c}</div>
                    ))}
                  </div>
                  <div style={{ display: 'flex', gap: '10px', background: 'white', border: `1px solid ${theme.line}`, borderRadius: theme.radius.md, padding: '10px' }}>
                    <div style={{ width: '36px', height: '48px', borderRadius: '5px', background: `linear-gradient(160deg,${theme.brand.purple},${theme.brand.blue})`, flexShrink: 0 }} />
                    <div><div style={{ fontSize: '11.5px', fontWeight: 800, color: theme.ink }}>Rico, Oskar und die Tieferschatten</div><div style={{ fontSize: '9.5px', color: theme.muted, marginBottom: '4px' }}>Andreas Steinhöfel</div><span style={{ fontSize: '8.5px', fontWeight: 700, padding: '3px 6px', borderRadius: theme.radius.full, background: theme.soft.green, color: '#1a7a45' }}>Lese ich gerade</span></div>
                  </div>
                </div>
              </>}
              caption={<Caption title="Empfehlung statt Feed" items={[
                'Filter nach Klasse (vorbelegt) + Interesse, kein endloser Scroll',
                'Status-Wechsel löst kurze Nica/Phil-Reaktion im Chat aus',
                'Buchdaten aus gepflegter Liste, nicht von der KI erfunden',
              ]} />}
            />

            <h3 style={{ fontFamily: theme.font.display, fontSize: '15px', margin: '0 0 12px', color: theme.ink }}>Design wächst mit dem Alter</h3>
            <MockRow
              phone={<>
                <MockHeader title="Nica & Phil" />
                <div style={{ padding: '16px' }}>
                  <div style={{ fontFamily: theme.font.display, fontSize: '19px', fontWeight: 600, color: theme.ink }}>Hallo Mia 👋🎉</div>
                  <div style={{ fontSize: '11px', color: theme.muted, marginBottom: '14px' }}>Klasse 2 · Super, dass du da bist!</div>
                  <div style={{ background: 'white', borderRadius: '20px', padding: '16px', boxShadow: theme.shadow.sm }}>
                    <div style={{ fontWeight: 800, fontSize: '13.5px', color: theme.ink }}>🎉 Mathe: 68% geschafft!</div>
                    <div style={{ fontSize: '11px', color: theme.mid, marginTop: '4px' }}>Weiter so, du machst das super! 🌟</div>
                  </div>
                </div>
              </>}
              caption={<Caption title="Grundschule (jung · Klasse 2)" items={[
                'Radius 20px, größere Touch-Flächen und Typo',
                'Kräftige Farben, hohe Emoji-Dichte',
                'Überschwängliche Ansprache: „Super gemacht! 🎉"',
              ]} />}
            />
            <MockRow
              phone={<>
                <MockHeader title="Nica & Phil" />
                <div style={{ padding: '16px' }}>
                  <div style={{ fontFamily: theme.font.display, fontSize: '15px', fontWeight: 600, color: theme.ink }}>Hallo Mia</div>
                  <div style={{ fontSize: '10px', color: theme.muted, marginBottom: '14px' }}>Klasse 12 · Alles im Blick.</div>
                  <div style={{ background: 'white', borderRadius: '12px', padding: '12px', filter: 'saturate(0.55)' }}>
                    <div style={{ fontWeight: 700, fontSize: '12px', color: theme.ink }}>Mathe — 68%</div>
                    <div style={{ fontSize: '10px', color: theme.mid, marginTop: '3px' }}>Sehr gut. Weiter im Plan.</div>
                  </div>
                </div>
              </>}
              caption={<Caption title="Oberstufe (reif · Klasse 12)" items={[
                'Radius 12–14px, kompakter, kleinere Typo',
                'Gedeckte Farbsättigung, kaum Emoji',
                'Sachliche Ansprache: „Sehr gut." — gleiches Layout-Skelett wie Grundschule',
              ]} />}
            />

            <h3 style={{ fontFamily: theme.font.display, fontSize: '15px', margin: '0 0 12px', color: theme.ink }}>Eltern-Übersicht als Wochen-Digest, mehrsprachig</h3>
            <p style={{ fontSize: '12.5px', color: theme.mid, margin: '0 0 16px', maxWidth: '68ch', lineHeight: 1.6 }}>Aus der Konkurrenz-Recherche: ClassDojo übersetzt automatisch in 35+ Sprachen — wichtig, da einige Eltern kein Deutsch sprechen. Kein tägliches Monitoring (wirkt wie Misstrauen), sondern ein Wochen-Digest mit echtem Verständnis-Signal statt reiner Prozentzahl.</p>
            <MockRow
              phone={<>
                <div style={{ background: 'rgba(255,255,255,0.85)', padding: '10px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${theme.line}` }}>
                  <span style={{ fontWeight: 800, fontSize: '11.5px', color: theme.ink }}>Eltern-Übersicht</span>
                  <span style={{ fontSize: '10px', fontWeight: 800, color: theme.ink, background: theme.bg, padding: '5px 9px', borderRadius: theme.radius.full, border: `1px solid ${theme.line}` }}>🇩🇪 Deutsch ▾</span>
                </div>
                <div style={{ padding: '14px' }}>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: theme.ink, marginBottom: '8px' }}>Diese Woche · Nicole</div>
                  <div style={{ background: `linear-gradient(160deg,${theme.soft.blue},white)`, border: '1px solid #DEE8FF', borderRadius: theme.radius.lg, padding: '12px' }}>
                    <div style={{ fontWeight: 800, fontSize: '12.5px', color: theme.ink, marginBottom: '5px' }}>📐 Brüche sitzen jetzt sicher</div>
                    <div style={{ fontSize: '10px', color: theme.mid, marginBottom: '10px' }}>4× Chat-Hilfe · 2 Kapitel Lernreise</div>
                    <div style={{ background: 'white', borderRadius: '9px', padding: '8px 10px', fontSize: '10px', color: theme.brand.blue, fontWeight: 600 }}>💡 Frag sie nach ⅓ vs. ⅔ — genau das hat sie geübt.</div>
                  </div>
                </div>
              </>}
              caption={<Caption title="Deutsch — Standardansicht" items={[
                'Wochen-Digest statt Live-Feed pro Kind',
                'Überschrift ist Verständnis-Signal, keine Prozentzahl',
                'Genau ein konkreter Tipp, keine Rohdaten-Tabelle',
              ]} />}
            />
            <MockRow
              phone={<>
                <div style={{ background: 'rgba(255,255,255,0.85)', padding: '10px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${theme.line}` }}>
                  <span style={{ fontWeight: 800, fontSize: '11.5px', color: theme.ink }}>Eltern-Übersicht</span>
                  <span style={{ fontSize: '10px', fontWeight: 800, color: theme.ink, background: theme.soft.blue, padding: '5px 9px', borderRadius: theme.radius.full, border: `1px solid ${theme.brand.blue}` }}>🇹🇷 Türkçe ▾</span>
                </div>
                <div style={{ padding: '14px' }}>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: theme.ink, marginBottom: '8px' }}>Bu hafta · Nicole</div>
                  <div style={{ background: `linear-gradient(160deg,${theme.soft.blue},white)`, border: '1px solid #DEE8FF', borderRadius: theme.radius.lg, padding: '12px', marginBottom: '10px' }}>
                    <div style={{ fontWeight: 800, fontSize: '12.5px', color: theme.ink, marginBottom: '5px' }}>📐 Artık kesirlerde çok rahat</div>
                    <div style={{ fontSize: '10px', color: theme.mid, marginBottom: '10px' }}>4× sohbet · 2 bölüm Öğrenme Yolu</div>
                    <div style={{ background: 'white', borderRadius: '9px', padding: '8px 10px', fontSize: '10px', color: theme.brand.blue, fontWeight: 600 }}>💡 Ona ⅓ ile ⅔ farkını sor.</div>
                  </div>
                  <div style={{ background: theme.soft.warn, borderRadius: '9px', padding: '8px 10px', fontSize: '9.5px', color: '#8A5D00' }}>ℹ️ Otomatik çevrilmiştir. Almanca orijinali her zaman görebilirsin.</div>
                </div>
              </>}
              caption={<Caption title="Gleicher Inhalt, andere Sprache" items={[
                'Kompletter Wochenbericht übersetzt, nicht nur Menüs',
                'Transparenter Hinweis „automatisch übersetzt", Original abrufbar',
                'Start-Sprachen Berlin-Pilot: Türkisch, Arabisch, Englisch, Ukrainisch, Polnisch',
              ]} />}
            />
          </div>
        )}
      </div>
    </div>
  )
}
