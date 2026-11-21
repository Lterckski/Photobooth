export type Product = 'card' | 'sticker' | 'strip'

export interface Details {
  name: string
  birthday: string // YYYY-MM-DD from the date input
  note: string
}

export interface Session {
  product: Product | null
  themeId: string | null
  details: Details
  shots: string[] // data URLs, in capture order
  picked: number[] // indexes into shots, in the order chosen
  sessionId: string
}

export const productInfo: Record<Product, { name: string; blurb: string; paper: string; picks: number }> = {
  card: { name: 'Custom PVC Card', blurb: 'Your own ID card with your name and photo', paper: 'Printed on PVC, 85.6 x 54 mm', picks: 1 },
  sticker: { name: 'Sticker', blurb: 'One big sticker plus four mini ones', paper: 'Sticker paper, 4 x 6 in', picks: 1 },
  strip: { name: 'Photo Strip', blurb: 'Classic 4-photo booth strip, two copies', paper: 'Photo paper, 4 x 6 in (cut into 2 strips)', picks: 4 },
}

// Output sizes in pixels at 300 DPI.
export const printSize: Record<Product, { w: number; h: number; pageCss: string }> = {
  card: { w: 1011, h: 638, pageCss: '85.6mm 54mm' },
  sticker: { w: 1200, h: 1800, pageCss: '4in 6in' },
  strip: { w: 1200, h: 1800, pageCss: '4in 6in' },
}
