import { ThemeLogo } from '../components/ThemeLogo'
import { TypeIcon, typeColor } from '../components/TypeIcon'
import { config } from '../config'
import type { Theme } from '../themes'
import { CARD, type Details } from '../types'
import { fitFont } from './helpers'

// Pokémon cards use Gill Sans. It ships with macOS (and Office on Windows); Cabin is the bundled fallback.
export const cardFont = "'Gill Sans', 'Gill Sans MT', 'Cabin', sans-serif"

// Trading card, 2.5 x 3.5 in at 300 DPI (750 x 1050 px), 0.125 in corners.
// Pokémon theme: name + type, photo, description, 2 abilities with move types.
// Other themes: name + theme logo, photo, description.
export function TradingCard({ theme, photo, details }: { theme: Theme; photo: string; details: Details }) {
  const poke = theme.layout === 'pokemon'
  const tint = typeColor[details.type]
  const ink = poke ? '#1c1c1c' : theme.cardInk
  const rule = poke ? 'rgba(0,0,0,0.18)' : theme.cardRule

  return (
    <div
      style={{
        width: CARD.w,
        height: CARD.h,
        borderRadius: CARD.radius,
        background: poke ? 'linear-gradient(160deg, #fbe46a 0%, #f2c935 100%)' : theme.bg,
        padding: 26,
        boxSizing: 'border-box',
        fontFamily: cardFont,
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          borderRadius: 18,
          background: poke ? `linear-gradient(170deg, #ffffff 0%, ${tint}55 45%, ${tint}99 100%)` : theme.cardPanel,
          border: theme.outline,
          boxSizing: 'border-box',
          padding: '18px 24px 14px',
          display: 'flex',
          flexDirection: 'column',
          color: ink,
        }}
      >
        {/* Name + type / logo */}
        <div style={{ height: 76, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
          <div style={{ fontSize: fitFont(details.name, 50, 32, 13), fontWeight: 700, lineHeight: 1, whiteSpace: 'nowrap', overflow: 'hidden' }}>{details.name || 'Your Name'}</div>
          {poke ? (
            <TypeIcon type={details.type} size={64} />
          ) : (
            <ThemeLogo theme={theme} height={58} plain style={{ maxWidth: 230 }} fallback={<div style={{ fontSize: 24, fontStyle: 'italic', fontWeight: 700 }}>{theme.name}</div>} />
          )}
        </div>

        {/* Photo */}
        <div
          style={{
            marginTop: 8,
            height: 404,
            padding: 7,
            background: poke ? 'linear-gradient(135deg, #d9d9d9, #ffffff 40%, #b8b8b8)' : theme.photoBorder,
            boxShadow: '0 4px 10px rgba(0,0,0,0.25)',
            boxSizing: 'border-box',
          }}
        >
          <img src={photo} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        </div>

        {/* Description */}
        <div style={{ marginTop: 18, fontSize: fitFont(details.description, 32, 24, 26), fontStyle: 'italic', fontWeight: 600, lineHeight: 1.2, minHeight: 78 }}>
          {details.description || ' '}
        </div>

        {poke && (
          <>
            <div style={{ height: 3, background: rule, margin: '10px 0 18px' }} />
            {[
              [details.ability1, details.ability1Type],
              [details.ability2, details.ability2Type],
            ].map(([name, t], i) =>
              name ? (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 22, height: 74 }}>
                  <TypeIcon type={t as Details['type']} size={56} />
                  <div style={{ fontSize: 40, fontWeight: 700 }}>{name}</div>
                </div>
              ) : null,
            )}
          </>
        )}

        {/* Footer */}
        <div style={{ marginTop: 'auto' }}>
          <div style={{ height: 3, background: rule }} />
          <div style={{ textAlign: 'center', fontSize: 24, fontWeight: 700, letterSpacing: 3, paddingTop: 10 }}>{config.boothName}</div>
        </div>
      </div>
    </div>
  )
}
