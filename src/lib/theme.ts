export const theme = {
  brand: { blue: '#4F7CFF', purple: '#8A5CFF', pink: '#FF7CB0', green: '#37C978', teal: '#00C9A7', orange: '#FF8C42', warn: '#FFB648', error: '#FF6B6B' },
  soft: { blue: '#EAF0FF', purple: '#F2EBFF', pink: '#FFE8F1', green: '#E3FAEE', teal: '#E0FAF5', orange: '#FFF0E6', warn: '#FFF4E0', error: '#FFEFEF' },
  ink: '#1A1F36', mid: '#6B7280', muted: '#9CA3AF', line: '#E8ECF4', bg: '#F3F6FC', card: '#FFFFFF',
  errorText: '#DC2626', errorBorder: '#FECACA', warnText: '#9A5700',
  font: { display: 'var(--font-display)', body: 'var(--font-body)' },
  gradients: {
    sommer: 'linear-gradient(135deg, #FF8C42, #FF6B9D, #8A5CFF)',
    nicole: 'linear-gradient(135deg, #8A5CFF, #6C8FFF, #FF7CB0)',
    philipp: 'linear-gradient(135deg, #4F7CFF, #00C9A7, #37C978)',
    primary: 'linear-gradient(135deg, #4F7CFF, #8A5CFF)',
    wuensche: 'linear-gradient(135deg, #FF7CB0, #8A5CFF)',
    eltern: 'linear-gradient(135deg, #1A1F36, #2A2F5A)',
    dunkel: 'linear-gradient(135deg, #1A1F36, #4F7CFF)',
  },
  radius: { sm: '10px', md: '14px', lg: '18px', xl: '22px', full: '100px' },
  shadow: { sm: '0 2px 8px rgba(0,0,0,0.04)', md: '0 8px 24px rgba(79,124,255,0.1)', lg: '0 16px 48px rgba(79,124,255,0.15)' },
} as const

export const fachFarben: Record<string, { farbe: string; bg: string; avatar: 'nica' | 'phil' }> = {
  mathe: { farbe: theme.brand.blue, bg: theme.soft.blue, avatar: 'phil' },
  deutsch: { farbe: theme.brand.pink, bg: theme.soft.pink, avatar: 'nica' },
  englisch: { farbe: theme.brand.green, bg: theme.soft.green, avatar: 'nica' },
  spanisch: { farbe: theme.brand.warn, bg: theme.soft.warn, avatar: 'nica' },
  sachunterricht: { farbe: theme.brand.purple, bg: theme.soft.purple, avatar: 'phil' },
  gewi: { farbe: theme.brand.purple, bg: theme.soft.purple, avatar: 'phil' },
  nawi: { farbe: theme.brand.teal, bg: theme.soft.teal, avatar: 'phil' },
  physik: { farbe: theme.brand.blue, bg: theme.soft.blue, avatar: 'phil' },
  chemie: { farbe: theme.brand.purple, bg: theme.soft.purple, avatar: 'phil' },
  geschichte: { farbe: theme.brand.orange, bg: theme.soft.orange, avatar: 'nica' },
  sport: { farbe: theme.brand.teal, bg: theme.soft.teal, avatar: 'phil' },
}

export type Reifestufe = 'jung' | 'mittel' | 'reif'
export function getReifestufe(klasse: number): Reifestufe {
  if (klasse <= 4) return 'jung'
  if (klasse <= 7) return 'mittel'
  return 'reif'
}
export const reifeStyles: Record<Reifestufe, { emojiDichte: 'hoch'|'mittel'|'niedrig'; begruessung: (n:string)=>string; fontGroesse:{titel:string;text:string;klein:string}; radius:string; buttonPadding:string; farbSaettigung:'kraeftig'|'gedeckt'; ansprache:string }> = {
  jung: { emojiDichte:'hoch', begruessung:(n)=>`Hallo ${n}! 👋`, fontGroesse:{titel:'26px',text:'14px',klein:'11px'}, radius:'20px', buttonPadding:'18px 20px', farbSaettigung:'kraeftig', ansprache:'Super gemacht! 🎉' },
  mittel: { emojiDichte:'mittel', begruessung:(n)=>`Hi ${n} 👋`, fontGroesse:{titel:'24px',text:'13px',klein:'11px'}, radius:'16px', buttonPadding:'16px 18px', farbSaettigung:'kraeftig', ansprache:'Gut gemacht.' },
  reif: { emojiDichte:'niedrig', begruessung:(n)=>`Hallo ${n}`, fontGroesse:{titel:'22px',text:'13px',klein:'10px'}, radius:'14px', buttonPadding:'14px 16px', farbSaettigung:'gedeckt', ansprache:'Sehr gut.' },
}

// ═══ Schuljahresstart Berlin — bestimmt die Frageform ═══
const SCHULSTART_BERLIN = new Date('2026-08-24')
export function klassenFrage(): { frage: string; hinweis: string } {
  const heute = new Date()
  if (heute < SCHULSTART_BERLIN) {
    return { frage: 'In welche Klasse kommst du nach den Ferien?', hinweis: '☀️ Ferien-Modus: wir bereiten dich schon auf die neue Klasse vor!' }
  }
  return { frage: 'In welcher Klasse bist du?', hinweis: '🎒 Das Schuljahr hat begonnen — viel Erfolg!' }
}

// ═══ KI-Anbieter ═══
export type Provider = 'openai' | 'anthropic' | 'gemini'
export const PROVIDERS: Record<Provider, { label: string; icon: string; keyPrefix: string; whereToGet: string; instructions: string[] }> = {
  openai: {
    label: 'ChatGPT (OpenAI)', icon: '🟢', keyPrefix: 'sk-',
    whereToGet: 'platform.openai.com/api-keys',
    instructions: ['Auf platform.openai.com einloggen (oder Konto erstellen)', 'Oben rechts auf "API Keys" klicken', '"Create new secret key" klicken', 'Key kopieren (beginnt mit sk-...)'],
  },
  anthropic: {
    label: 'Claude (Anthropic)', icon: '🟠', keyPrefix: 'sk-ant-',
    whereToGet: 'console.anthropic.com/settings/keys',
    instructions: ['Auf console.anthropic.com einloggen (oder Konto erstellen)', 'Links auf "API Keys" klicken', '"Create Key" klicken', 'Key kopieren (beginnt mit sk-ant-...)'],
  },
  gemini: {
    label: 'Gemini (Google)', icon: '🔵', keyPrefix: 'AIza',
    whereToGet: 'aistudio.google.com/apikey',
    instructions: ['Auf aistudio.google.com einloggen (Google-Konto)', '"Get API key" klicken', '"Create API key" klicken', 'Key kopieren (beginnt mit AIza...)'],
  },
}
