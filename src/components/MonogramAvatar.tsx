import clsx from 'clsx'

interface MonogramAvatarProps {
  name: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

const SIZE_CLASSES = {
  sm: 'w-10 h-10 text-sm',
  md: 'w-16 h-16 text-lg',
  lg: 'w-24 h-24 text-2xl',
  xl: 'w-40 h-40 text-5xl',
}

const GRADIENTS = [
  'from-brand-coral to-brand-gold',
  'from-brand-navy to-brand-coral',
  'from-brand-gold to-brand-coral',
  'from-brand-coral to-brand-navy',
  'from-brand-navy to-brand-gold',
  'from-brand-gold to-brand-navy',
]

function pickGradient(name: string) {
  const hash = [...name].reduce((sum, c) => sum + c.charCodeAt(0), 0)
  return GRADIENTS[hash % GRADIENTS.length]
}

function initials(name: string) {
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

export function MonogramAvatar({ name, size = 'md', className }: MonogramAvatarProps) {
  return (
    <div
      role="img"
      aria-label={`Avatar for ${name}`}
      className={clsx(
        'rounded-full bg-gradient-to-br',
        pickGradient(name),
        'flex items-center justify-center text-white font-serif font-bold border-2 border-brand-navy shadow-heritage',
        SIZE_CLASSES[size],
        className,
      )}
    >
      {initials(name)}
    </div>
  )
}
