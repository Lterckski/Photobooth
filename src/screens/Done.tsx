import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { config } from '../config'
import { Btn, Panel } from '../components/ui'

export function Done({ onReset }: { onReset: () => void }) {
  const [left, setLeft] = useState(config.doneResetSeconds)
  useEffect(() => {
    if (left <= 0) return onReset()
    const t = setTimeout(() => setLeft((l) => l - 1), 1000)
    return () => clearTimeout(t)
  }, [left, onReset])
  return (
    <Panel className="flex max-w-xl flex-col items-center gap-6 text-center">
      <motion.div initial={{ scale: 0.3, rotate: -10 }} animate={{ scale: [0.3, 1.15, 1], rotate: [-10, 4, 0] }} transition={{ duration: 0.6 }} className="font-display text-5xl uppercase">
        Thank you!
      </motion.div>
      <div className="relative h-24 w-40 overflow-hidden">
        {/* print sliding out of a printer slot */}
        <div className="absolute inset-x-0 top-0 z-10 h-6 rounded bg-puce" />
        <motion.div initial={{ y: -70 }} animate={{ y: 0 }} transition={{ duration: 1.6, ease: 'easeOut', delay: 0.3 }} className="absolute inset-x-6 top-4 h-20 rounded-b bg-gradient-to-b from-hunyadi to-auburn shadow-lg" />
      </div>
      <p className="text-xl">Your print is on its way. Please collect it from the tray.</p>
      <Btn onClick={onReset}>Done ({left})</Btn>
    </Panel>
  )
}
