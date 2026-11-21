import { forwardRef, type ReactNode } from 'react'

// Shows a full-size print layout scaled down to fit a box. The inner node keeps its real pixel size for export.
export const Scaled = forwardRef<HTMLDivElement, { w: number; h: number; maxW: number; maxH: number; children: ReactNode; className?: string }>(
  ({ w, h, maxW, maxH, children, className = '' }, ref) => {
    const s = Math.min(maxW / w, maxH / h)
    return (
      <div className={className} style={{ width: w * s, height: h * s, overflow: 'hidden', flexShrink: 0 }}>
        <div style={{ transform: `scale(${s})`, transformOrigin: 'top left', width: w, height: h }}>
          <div ref={ref} style={{ width: w, height: h }}>
            {children}
          </div>
        </div>
      </div>
    )
  },
)
