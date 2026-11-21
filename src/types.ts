export type PokeType =
  | 'normal' | 'fire' | 'water' | 'grass' | 'electric' | 'ice'
  | 'fighting' | 'poison' | 'ground' | 'flying' | 'psychic' | 'bug'
  | 'rock' | 'ghost' | 'dragon' | 'dark' | 'steel' | 'fairy'

export interface Details {
  name: string // max 20
  description: string // max 30
  // Pokémon theme only
  type: PokeType
  ability1: string // max 15
  ability1Type: PokeType
  ability2: string // max 15
  ability2Type: PokeType
}

export interface Session {
  themeId: string | null
  details: Details
  shots: string[] // data URLs, in capture order
  picked: number[] // index into shots of the chosen photo
  sessionId: string
}

export const emptyDetails = (): Details => ({
  name: '',
  description: '',
  type: 'electric',
  ability1: '',
  ability1Type: 'electric',
  ability2: '',
  ability2Type: 'normal',
})

// Trading card: 2.5 x 3.5 in, 0.125 in corner radius, at 300 DPI.
export const CARD = { w: 750, h: 1050, radius: 38, pageCss: '2.5in 3.5in' }
