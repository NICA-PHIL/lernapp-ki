interface GalleryAvatarProps {
  avatarId?: string
  size?: number
  boxShadow?: string
  ringColor?: string
}

export function GalleryAvatar({ avatarId, size = 100, boxShadow, ringColor = 'white' }: GalleryAvatarProps) {
  const id = avatarId || '01'
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%', overflow: 'hidden', flexShrink: 0,
      border: `${Math.max(2, Math.round(size * 0.04))}px solid ${ringColor}`,
      boxShadow, background: '#F3F6FC',
    }}>
      <img src={`/avatars/gallery/${id}.svg`} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
    </div>
  )
}
