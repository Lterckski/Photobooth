import type { ReactNode } from 'react'
import { motion } from 'motion/react'
import { config } from '../config'

export function Shell({ children, step, totalSteps }: { children: ReactNode; step?: number; totalSteps?: number }) {
  return (
    <div className="flex h-full flex-col">
      <motion.header initial={{ y: -80 }} animate={{ y: 0 }} transition={{ type: 'spring', stiffness: 200, damping: 24 }} className="flex items-end justify-between bg-paper/95 px-10 pt-5 pb-4 shadow-md">
        <div>
          <div className="font-mono text-xs tracking-[0.3em] text-ink/60 uppercase">{config.outletName}</div>
          <div className="font-display text-4xl tracking-tight uppercase">{config.boothName}</div>
        </div>
        {step && totalSteps ? (
          <div className="flex items-center gap-2 pb-1" aria-label={`Step ${step} of ${totalSteps}`}>
            {Array.from({ length: totalSteps }, (_, i) => (
              <motion.div key={i} animate={{ width: i < step ? 40 : 12, scale: i === step - 1 ? [1, 1.25, 1] : 1 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }} className={`h-3 rounded-full ${i < step ? 'bg-auburn' : 'bg-ink/20'}`} />
            ))}
            <span className="ml-2 font-mono text-sm text-ink/60">
              {step}/{totalSteps}
            </span>
          </div>
        ) : null}
      </motion.header>
      <main className="flex min-h-0 flex-1 flex-col items-center justify-center p-8">{children}</main>
    </div>
  )
}

export function Panel({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      className={`rounded-xl bg-paper p-8 shadow-[0_6px_0_rgba(0,0,0,0.12)] ${className}`}
    >
      {children}
    </motion.div>
  )
}

// Card-like tappable tile: staggered entrance, lift on hover, squash on tap.
export function Tile({ children, onClick, index = 0, selected, className = '' }: { children: ReactNode; onClick?: () => void; index?: number; selected?: boolean; className?: string }) {
  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, y: 40, scale: 0.92 }}
      animate={{ opacity: 1, y: selected ? -8 : 0, scale: selected ? 1.03 : 1 }}
      transition={{ type: 'spring', stiffness: 320, damping: 22, delay: index * 0.07 }}
      whileHover={{ y: -10, scale: 1.04, rotate: index % 2 ? 0.8 : -0.8 }}
      whileTap={{ scale: 0.95, y: 0 }}
      className={`relative rounded-xl bg-paper shadow-[0_6px_0_rgba(0,0,0,0.12)] transition-shadow hover:shadow-[0_16px_30px_rgba(0,0,0,0.18)] ${selected ? 'ring-8 ring-hunyadi' : ''} ${className}`}
    >
      {children}
      {selected && (
        <motion.div
          initial={{ scale: 0, rotate: -90 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 500, damping: 15 }}
          className="absolute -top-4 -right-4 flex h-12 w-12 items-center justify-center rounded-full bg-hunyadi font-mono text-2xl font-bold text-puce shadow-lg"
        >
          ✓
        </motion.div>
      )}
    </motion.button>
  )
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -16, rotate: -2 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 18 }}
      className="mb-6 inline-block bg-puce px-6 py-3 font-mono text-sm font-bold tracking-[0.2em] text-white uppercase"
    >
      {children}
    </motion.div>
  )
}

type BtnKind = 'go' | 'plain' | 'steel'
export function Btn({
  children,
  onClick,
  kind = 'go',
  disabled,
  big,
}: {
  children: ReactNode
  onClick?: () => void
  kind?: BtnKind
  disabled?: boolean
  big?: boolean
}) {
  const color = { go: 'bg-auburn text-white', plain: 'bg-[#f3e4b0] text-ink', steel: 'bg-police text-white' }[kind]
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileHover={disabled ? undefined : { scale: 1.05, y: -3 }}
      whileTap={disabled ? undefined : { scale: 0.94, y: 2 }}
      transition={{ type: 'spring', stiffness: 500, damping: 22 }}
      className={`${color} ${big ? 'px-12 py-6 text-2xl' : 'px-8 py-4 text-lg'} group relative overflow-hidden rounded-lg font-mono font-bold tracking-wider uppercase shadow-[0_4px_0_rgba(0,0,0,0.2)] transition-[filter,box-shadow,opacity] hover:shadow-[0_8px_0_rgba(0,0,0,0.18)] hover:brightness-110 active:shadow-none disabled:opacity-40`}
    >
      {/* shine sweep on hover */}
      <span className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-white/30 opacity-0 transition-all duration-500 group-hover:left-[120%] group-hover:opacity-100" />
      <span className="relative">{children}</span>
    </motion.button>
  )
}
