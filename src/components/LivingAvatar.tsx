'use client'
import { useRef, useState } from 'react'
import { theme } from '@/lib/theme'

interface LivingAvatarProps {
  src: string
  alt: string
  character: 'phil' | 'nica'
  size?: number
  onClick?: () => void
  tilt?: boolean
}

const ACCENT: Record<'phil' | 'nica', string> = { phil: theme.brand.blue, nica: theme.brand.pink }

export function LivingAvatar({ src, alt, character, size = 96, onClick, tilt = false }: LivingAvatarProps) {
  const accent = ACCENT[character]
  const delay = character === 'nica' ? '-1.2s' : '0s'
  const wrapRef = useRef<HTMLDivElement>(null)
  const [pointerTilt, setPointerTilt] = useState({ rx: 0, ry: 0 })
  const hovering = pointerTilt.rx !== 0 || pointerTilt.ry !== 0

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!tilt || !wrapRef.current) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const rect = wrapRef.current.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    setPointerTilt({ rx: py * -16, ry: px * 16 })
  }
  function handleLeave() {
    if (!tilt) return
    setPointerTilt({ rx: 0, ry: 0 })
  }

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
      <div
        ref={wrapRef}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className={tilt ? 'np-tilt-auto' : undefined}
        style={{ width: '100%', height: '100%', borderRadius: '50%', perspective: tilt ? '600px' : undefined }}
      >
        <img src={src} alt={alt} style={{
          width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover',
          border: '3px solid white', boxShadow: `0 14px 26px -8px ${accent}66`,
          animation: `np-shadow-pulse ${character === 'nica' ? '4s' : '3.6s'} ease-in-out infinite`,
          animationDelay: delay, display: 'block',
          ...(tilt ? {
            transform: `rotateX(${pointerTilt.rx}deg) rotateY(${pointerTilt.ry}deg) scale(${hovering ? 1.04 : 1})`,
            transition: 'transform 0.25s cubic-bezier(.22,1,.36,1)',
          } : {}),
        }} />
      </div>
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
        @keyframes np-tilt-idle {
          0%, 100% { transform: perspective(600px) rotateY(-6deg) rotateX(1.5deg); }
          50% { transform: perspective(600px) rotateY(6deg) rotateX(-1.5deg); }
        }
        .np-tilt-auto { animation: np-tilt-idle 6s ease-in-out infinite; }
        .np-tilt-auto:hover { animation-play-state: paused; }
        .np-living-avatar:hover img { transform: scale(1.05); transition: transform 0.3s cubic-bezier(.34,1.56,.64,1); }
        @media (prefers-reduced-motion: reduce) {
          .np-living-avatar, .np-living-avatar img, .np-tilt-auto { animation: none !important; }
        }
      `}</style>
    </div>
  )
}
