export function formatBirthday(iso: string) {
  if (!iso) return ''
  const [y, m, d] = iso.split('-')
  return `${m}/${d}/${y}`
}

export function today() {
  const d = new Date()
  return d.toLocaleDateString('en-PH', { year: 'numeric', month: 'short', day: 'numeric' })
}

// Shrink text so long entries still fit their box instead of being cut off.
export function fitFont(text: string, base: number, min: number, comfortableChars: number) {
  if (text.length <= comfortableChars) return base
  return Math.max(min, Math.round((base * comfortableChars) / text.length))
}
