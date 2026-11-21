import type { PokeType } from '../types'

// Simple original type badges: a coloured circle with a white glyph.
export const typeColor: Record<PokeType, string> = {
  normal: '#9fa19f', fire: '#f08030', water: '#4f8fe6', grass: '#5fbd58', electric: '#f4d23c', ice: '#74cec0',
  fighting: '#ce416b', poison: '#ab6ac8', ground: '#d97845', flying: '#8fa8dd', psychic: '#fa7179', bug: '#90c12c',
  rock: '#c5b78c', ghost: '#5269ad', dragon: '#0b6dc3', dark: '#5a5465', steel: '#5a8ea2', fairy: '#ec8fe6',
}

export const typeNames = Object.keys(typeColor) as PokeType[]

const glyph: Record<PokeType, string> = {
  normal: 'M50 22a28 28 0 1 0 0.01 0zM50 38a12 12 0 1 1-0.01 0z',
  fire: 'M50 18c4 14 22 22 22 42a22 22 0 0 1-44 0c0-10 6-16 10-20 0 8 4 12 8 12-2-12 0-24 4-34z',
  water: 'M50 16c10 16 22 30 22 44a22 22 0 0 1-44 0c0-14 12-28 22-44z',
  grass: 'M24 76C24 44 44 24 78 22c0 34-20 54-50 54l26-28-4-4-26 28z',
  electric: 'M58 14 26 56h20l-6 30 34-44H54z',
  ice: 'M47 16h6v26l18-12 3 5-19 13 19 13-3 5-18-12v26h-6V54L29 66l-3-5 19-13-19-13 3-5 18 12z',
  fighting: 'M28 40h44v30a8 8 0 0 1-8 8H36a8 8 0 0 1-8-8zM28 26h10v12H28zM40 22h10v16H40zM52 22h10v16H52zM64 26h8v12h-8z',
  poison: 'M50 20a24 22 0 1 1-0.01 0zM38 64h24v14H38z',
  ground: 'M20 74 38 30h40L64 74z',
  flying: 'M20 60c20 0 40-14 58-36-2 22-14 42-34 50 10 0 18-2 26-8-10 14-30 16-50-6z',
  psychic: 'M50 22a28 28 0 1 1-28 28h10a18 18 0 1 0 18-18 9 9 0 1 0 9 9h8a17 17 0 1 1-17-19z',
  bug: 'M50 30c14 0 22 12 22 26s-8 22-22 22-22-8-22-22 8-26 22-26zM40 18l6 10M60 18l-6 10',
  rock: 'M30 30 56 22l20 22-8 30H34L22 52z',
  ghost: 'M26 78V48a24 24 0 0 1 48 0v30l-8-6-8 6-8-6-8 6-8-6z',
  dragon: 'M50 16 76 50 50 84 24 50zM50 34 40 50l10 16 10-16z',
  dark: 'M60 18a32 32 0 1 0 22 46A26 26 0 0 1 60 18z',
  steel: 'M50 18 78 34v32L50 82 22 66V34zM50 36a14 14 0 1 0 0.01 0z',
  fairy: 'M50 14l9 26 27 1-21 17 8 26-23-15-23 15 8-26-21-17 27-1z',
}

export function TypeIcon({ type, size }: { type: PokeType; size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" style={{ display: 'block', flexShrink: 0 }}>
      <circle cx="50" cy="50" r="48" fill={typeColor[type]} stroke="#ffffff" strokeWidth="4" />
      <path d={glyph[type]} fill="#ffffff" fillRule="evenodd" stroke={type === 'bug' ? '#ffffff' : 'none'} strokeWidth="5" strokeLinecap="round" transform="translate(50 50) scale(0.78) translate(-50 -50)" />
    </svg>
  )
}
