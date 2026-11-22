// Theme looks. Brand logos are NOT bundled: drop the client's licensed logo files into
// public/themes/<id>/logo.png (transparent PNG, about 1000 px wide) and they appear on screen and in prints.
// Using these brands on paid prints needs permission from the brand owners.
export interface Theme {
  id: string
  name: string // shown to customers
  tagline: string
  cardTitle: string
  footerLabel: string
  font: string // display font for the print
  bodyFont: string
  bg: string // main background (any CSS background)
  panel: string // field boxes
  ink: string // text on panels
  onBg: string // text on the background
  accent: string
  accent2: string
  bar: string // header and footer bars
  photoBorder: string
  outline?: string // optional bold outline around boxes
  logoFilter?: string // CSS filter to help the logo stand out on the background
  layout: 'pokemon' | 'standard' // which trading-card structure to use
  cardPanel: string // inner panel of the trading card (standard layout)
  cardInk: string // text colour on the trading card (standard layout)
  cardRule: string // divider lines on the trading card (standard layout)
}

export const logoUrl = (id: string) => `/themes/${id}/logo.png`

export const themes: Theme[] = [
  {
    id: 'pokemon',
    layout: 'pokemon',
    cardPanel: '#fffdf6',
    cardInk: '#1c1c1c',
    cardRule: 'rgba(0,0,0,0.18)',
    name: 'Pokémon',
    tagline: 'Gotta print them all',
    cardTitle: 'TRAINER CARD',
    footerLabel: 'BADGES',
    font: "'Archivo Black', sans-serif",
    bodyFont: "'JetBrains Mono', monospace",
    bg: 'linear-gradient(135deg, #5aa0e6 0%, #3466af 100%)',
    panel: '#eef4fb',
    ink: '#1d3557',
    onBg: '#ffffff',
    accent: '#e3350d',
    accent2: '#ffcb05',
    bar: '#1e3f7a',
    photoBorder: '#ffffff',
    logoFilter: 'drop-shadow(0 0 3px #ffffff) drop-shadow(0 4px 6px rgba(0,0,0,0.3))',
  },
  {
    id: 'cartoon-network',
    layout: 'standard',
    cardPanel: '#ffffff',
    cardInk: '#111111',
    cardRule: '#111111',
    name: 'Cartoon Network',
    tagline: 'Black, white and bold',
    cardTitle: 'TOON CARD',
    footerLabel: 'TOON PASS',
    font: "'Archivo Black', sans-serif",
    bodyFont: "'Space Grotesk', sans-serif",
    bg: 'repeating-conic-gradient(#111111 0% 25%, #ffffff 0% 50%) 0 0 / 64px 64px',
    panel: '#ffffff',
    ink: '#111111',
    onBg: '#111111',
    accent: '#00a8e1',
    accent2: '#ffffff',
    bar: '#111111',
    photoBorder: '#111111',
    outline: '5px solid #111111',
    // white outline so the black logo still shows on the black bars
    logoFilter: 'drop-shadow(2px 0 0 #fff) drop-shadow(-2px 0 0 #fff) drop-shadow(0 2px 0 #fff) drop-shadow(0 -2px 0 #fff)',
  },
  {
    id: 'nickelodeon',
    layout: 'standard',
    cardPanel: '#fff6ec',
    cardInk: '#3a1d00',
    cardRule: 'rgba(245,125,13,0.6)',
    name: 'Nickelodeon',
    tagline: 'Get slimed',
    cardTitle: 'MEMBER CARD',
    footerLabel: 'SLIME LEVEL',
    font: "'Archivo Black', sans-serif",
    bodyFont: "'Space Grotesk', sans-serif",
    bg: 'radial-gradient(circle at 88% 92%, #f57d0d 0 14%, transparent 14.5%), radial-gradient(circle at 8% 12%, #ffffff40 0 9%, transparent 9.5%), linear-gradient(160deg, #a6d84a 0%, #5d9e2a 100%)',
    panel: '#fff6ec',
    ink: '#3a1d00',
    onBg: '#ffffff',
    accent: '#f57d0d',
    accent2: '#f57d0d',
    bar: '#3a1d00',
    logoFilter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.25))',
    photoBorder: '#ffffff',
  },
  {
    id: 'red-horse',
    layout: 'standard',
    cardPanel: '#fff8e7',
    cardInk: '#5a0410',
    cardRule: 'rgba(212,175,55,0.8)',
    name: 'Red Horse',
    tagline: 'Extra strong barkada',
    cardTitle: 'BARKADA PASS',
    footerLabel: 'ROUNDS',
    font: "'Archivo Black', sans-serif",
    bodyFont: "'Space Grotesk', sans-serif",
    bg: 'radial-gradient(circle at 50% 0%, #5a0b16 0%, #1a0a0c 70%)',
    panel: '#fff8e7',
    ink: '#5a0410',
    onBg: '#f5d77a',
    accent: '#d4af37',
    accent2: '#d4af37',
    bar: '#1a0a0c',
    photoBorder: '#d4af37',
    logoFilter: 'drop-shadow(0 0 10px rgba(212,175,55,0.5))',
  },
]

export const themeById = (id: string | null) => themes.find((t) => t.id === id) ?? themes[0]
