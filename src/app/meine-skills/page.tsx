'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { theme } from '@/lib/theme'

interface Skill {
  id: string
  icon: string
  titel: string
  beschreibung: string
  level: number
  maxLevel: number
  farbe: string
  bg: string
  uebung: string
}

const SKILLS: Skill[] = [
  {
    id: 'planen', icon: '📋', titel: 'Selbst planen',
    beschreibung: 'Eine Aufgabe in kleine Schritte aufteilen, bevor du anfängst.',
    level: 2, maxLevel: 5, farbe: theme.brand.blue, bg: theme.soft.blue,
    uebung: 'Schreib dir vor der nächsten Hausaufgabe 3 Schritte auf, bevor du loslegst.',
  },
  {
    id: 'durchhalten', icon: '💪', titel: 'Dranbleiben',
    beschreibung: 'Auch bei schwierigen Aufgaben nicht sofort aufgeben.',
    level: 3, maxLevel: 5, farbe: theme.brand.orange, bg: theme.soft.orange,
    uebung: 'Wenn es schwer wird: 3x tief durchatmen und einen neuen Versuch starten.',
  },
  {
    id: 'fragen', icon: '❓', titel: 'Gute Fragen stellen',
    beschreibung: 'Genau sagen können, was du nicht verstehst.',
    level: 1, maxLevel: 5, farbe: theme.brand.purple, bg: theme.soft.purple,
    uebung: 'Statt "Ich verstehe das nicht" versuch: "Ich verstehe nicht, warum..."',
  },
  {
    id: 'selbstkontrolle', icon: '🔍', titel: 'Eigene Fehler finden',
    beschreibung: 'Deine Arbeit selbst nochmal durchschauen, bevor du fertig bist.',
    level: 2, maxLevel: 5, farbe: theme.brand.green, bg: theme.soft.green,
    uebung: 'Lies deine Antwort einmal laut vor — Fehler hörst du oft besser als du sie siehst.',
  },
  {
    id: 'zeitmanagement', icon: '⏰', titel: 'Zeit einteilen',
    beschreibung: 'Wissen, wie lange eine Aufgabe ungefähr dauert.',
    level: 1, maxLevel: 5, farbe: theme.brand.pink, bg: theme.soft.pink,
    uebung: 'Stell dir einen Timer für 15 Minuten und schau, wie weit du kommst.',
  },
  {
    id: 'neugier', icon: '🔦', titel: 'Neugierig bleiben',
    beschreibung: 'Selbst weiterfragen, warum etwas so ist, wie es ist.',
    level: 3, maxLevel: 5, farbe: theme.brand.teal, bg: theme.soft.teal,
    uebung: 'Frag dir heute einmal selbst "Warum ist das so?" — und such die Antwort.',
  },
]

export default function MeineSkills() {
  const router = useRouter()
  const [childName, setChildName] = useState('')
  const [expandedSkill, setExpandedSkill] = useState<string | null>(null)

  useEffect(() => {
    setChildName(localStorage.getItem('np_child_name') || 'Entdecker')
  }, [])

  const gesamtLevel = SKILLS.reduce((sum, s) => sum + s.level, 0)
  const maxGesamt = SKILLS.reduce((sum, s) => sum + s.maxLevel, 0)

  return (
    <div style={{ minHeight: '100vh', background: theme.bg, fontFamily: 'system-ui, sans-serif', paddingBottom: '60px' }}>

      <div style={{ background: 'linear-gradient(135deg, #37C978, #00C9A7, #4F7CFF)', padding: '32px 24px 60px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '16px', right: '24px', fontSize: '54px', opacity: 0.2 }}>🚀</div>
        <button onClick={() => router.push('/dashboard')} style={{ background: 'rgba(255,255,255,0.25)', border: 'none', borderRadius: '10px', padding: '8px 12px', color: 'white', fontSize: '14px', cursor: 'pointer', marginBottom: '20px' }}>← Zurück</button>
        <h1 style={{ fontSize: '22px', fontWeight: '800', color: 'white', margin: 0 }}>{childName}s Superkräfte 🚀</h1>
        <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '13px', margin: '4px 0 0' }}>Fähigkeiten, die dir dein ganzes Leben helfen</p>
      </div>

      <div style={{ maxWidth: '640px', margin: '-32px auto 0', padding: '0 20px' }}>

        {/* Gesamt-Fortschritt */}
        <div style={{ background: 'white', borderRadius: theme.radius.xl, padding: '20px', marginBottom: '20px', boxShadow: theme.shadow.md }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span style={{ fontSize: '13px', fontWeight: '700', color: theme.ink }}>Deine Gesamt-Superkraft</span>
            <span style={{ fontSize: '13px', fontWeight: '800', color: theme.brand.green }}>{gesamtLevel}/{maxGesamt}</span>
          </div>
          <div style={{ height: '12px', background: theme.line, borderRadius: theme.radius.full, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${(gesamtLevel / maxGesamt) * 100}%`, background: 'linear-gradient(90deg, #37C978, #00C9A7)', borderRadius: theme.radius.full, transition: 'width 0.6s ease' }} />
          </div>
        </div>

        <p style={{ fontSize: '12px', color: theme.mid, marginBottom: '14px', textAlign: 'center' }}>
          Diese Fähigkeiten wachsen mit jeder Übung — genau wie ein Muskel! 💪
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {SKILLS.map(skill => {
            const expanded = expandedSkill === skill.id
            return (
              <div key={skill.id} style={{ background: 'white', borderRadius: theme.radius.lg, border: `2px solid ${expanded ? skill.farbe : theme.line}`, overflow: 'hidden', transition: 'all 0.2s' }}>
                <button onClick={() => setExpandedSkill(expanded ? null : skill.id)}
                  style={{ width: '100%', padding: '16px 18px', display: 'flex', alignItems: 'center', gap: '14px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: theme.radius.md, background: skill.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0 }}>{skill.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: '800', fontSize: '14px', color: theme.ink, marginBottom: '4px' }}>{skill.titel}</div>
                    <div style={{ display: 'flex', gap: '3px' }}>
                      {Array.from({ length: skill.maxLevel }).map((_, i) => (
                        <div key={i} style={{ width: '18px', height: '5px', borderRadius: '100px', background: i < skill.level ? skill.farbe : theme.line }} />
                      ))}
                    </div>
                  </div>
                  <span style={{ fontSize: '16px', color: theme.muted, transform: expanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>⌄</span>
                </button>
                {expanded && (
                  <div style={{ padding: '0 18px 18px' }}>
                    <p style={{ fontSize: '13px', color: theme.mid, margin: '0 0 12px', lineHeight: '1.55' }}>{skill.beschreibung}</p>
                    <div style={{ background: skill.bg, borderRadius: theme.radius.md, padding: '12px 14px', display: 'flex', gap: '8px' }}>
                      <span style={{ fontSize: '16px' }}>🎯</span>
                      <p style={{ fontSize: '12px', color: skill.farbe, margin: 0, fontWeight: '600', lineHeight: '1.5' }}>{skill.uebung}</p>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
