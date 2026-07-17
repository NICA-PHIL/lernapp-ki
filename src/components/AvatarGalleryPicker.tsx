import { theme } from '@/lib/theme'
import { GalleryAvatar } from './GalleryAvatar'

const AVATAR_IDS = Array.from({ length: 16 }, (_, i) => String(i + 1).padStart(2, '0'))

interface AvatarGalleryPickerProps {
  value: string
  onChange: (id: string) => void
}

export function AvatarGalleryPicker({ value, onChange }: AvatarGalleryPickerProps) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
      {AVATAR_IDS.map(id => (
        <button key={id} type="button" onClick={() => onChange(id)}
          style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>
          <GalleryAvatar avatarId={id} size={64} ringColor={value === id ? theme.brand.blue : theme.line} />
        </button>
      ))}
    </div>
  )
}
