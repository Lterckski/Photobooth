import { AnimatePresence, motion } from 'motion/react'
import { Btn, Tag } from '../components/ui'

export function PickShots({ shots, picks, picked, onChange, onNext, onBack }: { shots: string[]; picks: number; picked: number[]; onChange: (p: number[]) => void; onNext: () => void; onBack: () => void }) {
  const toggle = (i: number) => {
    if (picks === 1) return onChange([i])
    if (picked.includes(i)) return onChange(picked.filter((x) => x !== i))
    if (picked.length < picks) onChange([...picked, i])
  }
  return (
    <div className="flex w-full max-w-5xl flex-col items-center">
      <Tag>{picks === 1 ? 'Tap your best shot' : `Tap ${picks} shots in the order you want them`}</Tag>
      <div className="grid w-full grid-cols-3 gap-5">
        {shots.map((s, i) => {
          const pos = picked.indexOf(i)
          return (
            <motion.button
              key={i}
              onClick={() => toggle(i)}
              initial={{ opacity: 0, scale: 0.8, rotate: i % 2 ? 3 : -3 }}
              animate={{ opacity: 1, scale: pos >= 0 ? 1.03 : picked.length === picks ? 0.96 : 1, rotate: 0, filter: pos < 0 && picked.length === picks ? 'saturate(0.4)' : 'saturate(1)' }}
              transition={{ type: 'spring', stiffness: 320, damping: 20, delay: i * 0.05 }}
              whileHover={{ scale: 1.05, y: -6 }}
              whileTap={{ scale: 0.93 }}
              className={`relative aspect-[4/3] overflow-hidden rounded-lg border-8 shadow-lg transition-colors ${pos >= 0 ? 'border-hunyadi' : 'border-paper'}`}
            >
              <img src={s} className="h-full w-full object-cover" />
              <AnimatePresence>
                {pos >= 0 && (
                  <motion.div
                    initial={{ scale: 0, rotate: -120 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                    className="absolute top-2 right-2 flex h-12 w-12 items-center justify-center rounded-full bg-hunyadi font-mono text-2xl font-bold text-puce shadow-lg"
                  >
                    {picks === 1 ? '✓' : pos + 1}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          )
        })}
      </div>
      <div className="mt-8 flex w-full justify-between">
        <Btn kind="plain" onClick={onBack}>
          ◀ Retake
        </Btn>
        <Btn onClick={onNext} disabled={picked.length !== picks}>
          Preview ▶
        </Btn>
      </div>
    </div>
  )
}
