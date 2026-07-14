'use client'
import { theme } from '@/lib/theme'

interface LivingAvatarProps {
  src: string
  alt: string
  character: 'phil' | 'nica'
  size?: number
  onClick?: () => void
}

const ACCENT: Record<'phil' | 'nica', string> = { phil: theme.brand.blue, nica: theme.brand.pink }

export function LivingAvatar({ src, alt, character, size = 96, onClick }: LivingAvatarProps) {
  const accent = ACCENT[character]
  const delay = character === 'nica' ? '-1.2s' : '0s'
  return (
    <div
      onClick={onClick}
      style={{
        width: size, height: size, borderRadius: '50%', cursor: onClick ? 'pointer' : 'default',
        animation: `np-breathe-${character} ${character === 'nica' ? '4s' : '3.6s'} ease-in-out infinite`,
        animationDelay: delay, transformOrigin: '50% 85%',
      }}
      className={`np-living-avatar np-living-avatar-${character}`}
    >
      <img src={src} alt={alt} style={{
        width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover',
        border: '3px solid white', boxShadow: `0 14px 26px -8px ${accent}66`,
        animation: `np-shadow-pulse ${character === 'nica' ? '4s' : '3.6s'} ease-in-out infinite`,
        animationDelay: delay, display: 'block',
      }} />
      <style>{`
        @keyframes np-breathe-phil {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-3px) rotate(-1deg); }
        }
        @keyframes np-breathe-nica {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-4px) rotate(1.1deg); }
        }
        @keyframes np-shadow-pulse {
          0%, 100% { filter: brightness(1); }
          50% { filter: brightness(1.03); }
        }
        .np-living-avatar:hover img { transform: scale(1.05); transition: transform 0.3s cubic-bezier(.34,1.56,.64,1); }
        @media (prefers-reduced-motion: reduce) {
          .np-living-avatar, .np-living-avatar img { animation: none !important; }
        }
      `}</style>
    </div>
  )
}
