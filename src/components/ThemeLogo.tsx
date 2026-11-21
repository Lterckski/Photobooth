import { useState, type CSSProperties, type ReactNode } from 'react'
import { logoUrl, type Theme } from '../themes'

// Shows the theme's logo file if it exists, otherwise the fallback (usually the theme name in text).
// `plain` skips the theme's logo filter (outline/glow), for light UI tiles where it isn't needed.
export function ThemeLogo({ theme, height, fallback, style, plain }: { theme: Theme; height: number; fallback: ReactNode; style?: CSSProperties; plain?: boolean }) {
  const [missingId, setMissingId] = useState<string | null>(null)
  const [loadedId, setLoadedId] = useState<string | null>(null)
  if (missingId === theme.id) return <>{fallback}</>
  return (
    <img
      src={logoUrl(theme.id)}
      alt={theme.name}
      onError={() => setMissingId(theme.id)}
      onLoad={() => setLoadedId(theme.id)}
      style={{ height, width: 'auto', maxWidth: '100%', objectFit: 'contain', display: 'block', visibility: loadedId === theme.id ? 'visible' : 'hidden', filter: plain ? undefined : theme.logoFilter, ...style }}
    />
  )
}
