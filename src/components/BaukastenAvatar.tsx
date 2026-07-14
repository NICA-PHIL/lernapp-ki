const KOPF_ACCESSOIRES = new Set(['🎩', '🧢'])
const AUGEN_ACCESSOIRES = new Set(['👓', '🕶️'])

interface BaukastenAvatarProps {
  gesicht?: string
  hautton?: string
  haarfarbe?: string
  accessoire?: string
  size?: number
  boxShadow?: string
}

export function BaukastenAvatar({ gesicht, hautton, haarfarbe, accessoire, size = 100, boxShadow }: BaukastenAvatarProps) {
  const istKopfAccessoire = !!accessoire && KOPF_ACCESSOIRES.has(accessoire)
  const istAugenAccessoire = !!accessoire && AUGEN_ACCESSOIRES.has(accessoire)
  const istBadgeAccessoire = !!accessoire && accessoire !== 'Keins' && !istKopfAccessoire && !istAugenAccessoire

  return (
    <div style={{
      width: size, height: size, borderRadius: '50%', background: hautton || '#FFDBB4',
      display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: size * 0.48,
      margin: '0 auto', border: `${Math.max(2, Math.round(size * 0.06))}px solid ${haarfarbe || '#4F7CFF'}`,
      position: 'relative', flexShrink: 0, boxShadow,
    }}>
      {gesicht || '🧒'}
      {istKopfAccessoire && (
        <span style={{ position: 'absolute', top: -size * 0.24, left: '50%', transform: 'translateX(-50%)', fontSize: size * 0.36 }}>{accessoire}</span>
      )}
      {istAugenAccessoire && (
        <span style={{ position: 'absolute', top: '36%', left: '50%', transform: 'translateX(-50%)', fontSize: size * 0.32 }}>{accessoire}</span>
      )}
      {istBadgeAccessoire && (
        <span style={{ position: 'absolute', top: -size * 0.06, right: -size * 0.06, fontSize: size * 0.24 }}>{accessoire}</span>
      )}
    </div>
  )
}
