import { useRef, useState } from 'react'
import { motion } from 'motion/react'
import { Btn, Tag } from '../components/ui'
import { OutputPreview } from '../components/OutputPreview'
import { downloadImage, printImage, renderPng } from '../print/output'
import type { Theme } from '../themes'
import { CARD, type Details } from '../types'

export function Preview({ theme, photo, details, cardId, onPrinted, onBack }: { theme: Theme; photo: string; details: Details; cardId: string; onPrinted: () => void; onBack: () => void }) {
  const ref = useRef<HTMLDivElement>(null)
  const [busy, setBusy] = useState(false)

  const render = async () => {
    setBusy(true)
    try {
      return await renderPng(ref.current!, CARD.w, CARD.h)
    } finally {
      setBusy(false)
    }
  }

  const print = async () => {
    const png = await render()
    printImage(png, CARD.pageCss)
    onPrinted()
  }

  const save = async () => downloadImage(await render(), `card-${theme.id}-${cardId}.png`)

  return (
    <div className="flex w-full max-w-6xl flex-col items-center">
      <Tag>This is exactly what prints</Tag>
      <div className="flex w-full items-center justify-center gap-12">
        <motion.div initial={{ opacity: 0, y: 60, rotate: -6, scale: 0.85 }} animate={{ opacity: 1, y: 0, rotate: 0, scale: 1 }} transition={{ type: 'spring', stiffness: 180, damping: 16 }} whileHover={{ rotate: 1.5, scale: 1.03 }}>
          <OutputPreview ref={ref} theme={theme} photo={photo} details={details} maxW={420} maxH={588} className="shadow-2xl" />
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="flex flex-col gap-4">
          <div className="font-mono text-sm text-ink/70">
            {theme.name} trading card
            <br />
            2.5 x 3.5 in, rounded corners
            <br />
            {CARD.w} x {CARD.h} px at 300 DPI
          </div>
          <Btn big onClick={print} disabled={busy}>
            {busy ? 'Preparing…' : '🖨 Print'}
          </Btn>
          <Btn kind="steel" onClick={save} disabled={busy}>
            Save PNG
          </Btn>
          <Btn kind="plain" onClick={onBack} disabled={busy}>
            ◀ Back
          </Btn>
        </motion.div>
      </div>
    </div>
  )
}
