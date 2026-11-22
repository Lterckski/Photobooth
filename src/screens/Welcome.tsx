import { motion } from 'motion/react'
import { config } from '../config'
import { Btn, Panel, Shell } from '../components/ui'
import { OutputPreview } from '../components/OutputPreview'
import { samplePhoto } from '../components/samplePhoto'
import { sampleDetails } from '../components/sampleDetails'
import { ThemeLogo } from '../components/ThemeLogo'
import { themes } from '../themes'

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { type: 'spring' as const, stiffness: 260, damping: 20, delay },
})

export function Welcome({ onStart }: { onStart: () => void }) {
  return (
    <Shell>
      <div className="flex w-full max-w-6xl cursor-pointer items-center justify-between gap-12" onClick={onStart}>
        <div className="flex max-w-md flex-col items-start gap-6">
          <Panel className="-rotate-1">
            <p className="font-mono text-lg leading-relaxed font-bold tracking-wide uppercase">
              Turn your photo into your own trading card, in the theme of your choice!
            </p>
          </Panel>
          <motion.div {...rise(0.15)} whileHover={{ rotate: -2, scale: 1.05 }} className="bg-puce px-6 py-3 font-mono text-xl font-bold text-white">
            Only for {config.priceLabel}!
          </motion.div>
          <motion.div {...rise(0.25)}>
            <motion.div animate={{ scale: [1, 1.06, 1] }} transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}>
              <Btn big>Tap to start ▶</Btn>
            </motion.div>
          </motion.div>
          <motion.div {...rise(0.35)} className="mt-4 font-mono text-sm font-bold tracking-widest text-ink/70 uppercase">
            Themes include
          </motion.div>
          <div className="flex gap-3">
            {themes.map((t, i) => (
              <motion.div
                key={t.id}
                {...rise(0.4 + i * 0.08)}
                whileHover={{ y: -8, rotate: i % 2 ? 4 : -4, scale: 1.08 }}
                className="flex w-24 flex-col items-center gap-2 rounded-lg bg-paper p-2 shadow"
              >
                <div className="flex h-14 w-full items-center justify-center p-1">
                  <ThemeLogo theme={t} height={48} plain fallback={<div className="h-full w-full rounded" style={{ background: t.bg }} />} />
                </div>
                <div className="text-center font-mono text-[10px] leading-tight font-bold uppercase">{t.name}</div>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="relative h-[520px] w-[560px]">
          <motion.div
            className="absolute top-0 left-6 rounded-[16px] shadow-2xl"
            initial={{ opacity: 0, y: -200, rotate: 20 }}
            animate={{ opacity: 1, y: [0, -14, 0], rotate: 6 }}
            transition={{ opacity: { duration: 0.4 }, rotate: { type: 'spring', stiffness: 80, damping: 10 }, y: { repeat: Infinity, duration: 4, ease: 'easeInOut' } }}
          >
            <OutputPreview theme={themes[1]} photo={samplePhoto(20)} details={sampleDetails} maxW={300} maxH={420} />
          </motion.div>
          <motion.div
            className="absolute right-4 bottom-0 rounded-[16px] shadow-2xl"
            initial={{ opacity: 0, x: 200, rotate: -25 }}
            animate={{ opacity: 1, x: 0, y: [0, 10, 0], rotate: -3 }}
            transition={{ opacity: { duration: 0.4, delay: 0.2 }, x: { type: 'spring', stiffness: 90, damping: 12, delay: 0.2 }, rotate: { type: 'spring', stiffness: 90, damping: 10, delay: 0.2 }, y: { repeat: Infinity, duration: 3.4, ease: 'easeInOut' } }}
          >
            <OutputPreview theme={themes[0]} photo={samplePhoto(210)} details={sampleDetails} maxW={300} maxH={420} />
          </motion.div>
        </div>
      </div>
    </Shell>
  )
}
