import { forwardRef } from 'react'
import { TradingCard } from '../print/TradingCard'
import type { Theme } from '../themes'
import { CARD, type Details } from '../types'
import { Scaled } from './Scaled'

interface Props {
  theme: Theme
  photo: string
  details: Details
  maxW: number
  maxH: number
  className?: string
}

// The trading card at its real 300 DPI size, scaled down to fit the screen.
export const OutputPreview = forwardRef<HTMLDivElement, Props>(({ theme, photo, details, maxW, maxH, className }, ref) => (
  <Scaled ref={ref} w={CARD.w} h={CARD.h} maxW={maxW} maxH={maxH} className={className}>
    <TradingCard theme={theme} photo={photo} details={details} />
  </Scaled>
))
