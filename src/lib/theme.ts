// ═══ NICA & PHIL — Zentrales Design-System ═══

export const theme = {
  brand: {
    blue: '#4F7CFF',
    purple: '#8A5CFF',
    pink: '#FF7CB0',
    green: '#37C978',
    teal: '#00C9A7',
    orange: '#FF8C42',
    warn: '#FFB648',
    error: '#FF6B6B',
  },
  soft: {
    blue: '#EAF0FF',
    purple: '#F2EBFF',
    pink: '#FFE8F1',
    green: '#E3FAEE',
    teal: '#E0FAF5',
    orange: '#FFF0E6',
    warn: '#FFF4E0',
    error: '#FFEFEF',
  },
  ink: '#1A1F36',
  mid: '#6B7280',
  muted: '#9CA3AF',
  line: '#E8ECF4',
  bg: '#F3F6FC',
  card: '#FFFFFF',

  gradients: {
    sommer: 'linear-gradient(135deg, #FF8C42, #FF6B9D, #8A5CFF)',
    nicole: 'linear-gradient(135deg, #8A5CFF, #6C8FFF, #FF7CB0)',
    philipp: 'linear-gradient(135deg, #4F7CFF, #00C9A7, #37C978)',
    primary: 'linear-gradient(135deg, #4F7CFF, #8A5CFF)',
    wuensche: 'linear-gradient(135deg, #FF7CB0, #8A5CFF)',
    eltern: 'linear-gradient(135deg, #1A1F36, #2A2F5A)',
  },

  radius: {
    sm: '10px',
    md: '14px',
    lg: '18px',
    xl: '22px',
    full: '100px',
  },

  shadow: {
    sm: '0 2px 8px rgba(0,0,0,0.04)',
    md: '0 8px 24px rgba(79,124,255,0.1)',
    lg: '0 16px 48px rgba(79,124,255,0.15)',
  },
} as const

export const fachFarben: Record<string, { farbe: string; bg: string; avatar: 'nica' | 'phil' }> = {
  mathe: { farbe: theme.brand.blue, bg: theme.soft.blue, avatar: 'phil' },
  deutsch: { farbe: theme.brand.pink, bg: theme.soft.pink, avatar: 'nica' },
  englisch: { farbe: theme.brand.green, bg: theme.soft.green, avatar: 'nica' },
  spanisch: { farbe: theme.brand.warn, bg: theme.soft.warn, avatar: 'nica' },
  sachunterricht: { farbe: theme.brand.purple, bg: theme.soft.purple, avatar: 'phil' },
  gewi: { farbe: theme.brand.purple, bg: theme.soft.purple, avatar: 'phil' },
  nawi: { farbe: theme.brand.teal, bg: theme.soft.teal, avatar: 'phil' },
  biologie: { farbe: theme.brand.teal, bg: theme.soft.teal, avatar: 'phil' },
  chemie: { farbe: theme.brand.purple, bg: theme.soft.purple, avatar: 'phil' },
  physik: { farbe: theme.brand.blue, bg: theme.soft.blue, avatar: 'phil' },
  geschichte: { farbe: theme.brand.orange, bg: theme.soft.orange, avatar: 'nica' },
  geografie: { farbe: theme.brand.green, bg: theme.soft.green, avatar: 'phil' },
  politik: { farbe: '#6C8FFF', bg: theme.soft.blue, avatar: 'nica' },
  musik: { farbe: theme.brand.orange, bg: theme.soft.orange, avatar: 'nica' },
  sport: { farbe: theme.brand.teal, bg: theme.soft.teal, avatar: 'phil' },
}
