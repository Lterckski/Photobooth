import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { config } from '../config'
import { Btn, Tag } from '../components/ui'
import { samplePhoto } from '../components/samplePhoto'

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms))

export function Camera({ shots, onShots, onNext, onBack }: { shots: string[]; onShots: (s: string[]) => void; onNext: () => void; onBack: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [error, setError] = useState<string | null>(null)
  const [count, setCount] = useState<number | null>(null)
  const [flash, setFlash] = useState(0)
  const [running, setRunning] = useState(false)
  const cancelled = useRef(false)

  useEffect(() => {
    let stream: MediaStream | null = null
    cancelled.current = false
    navigator.mediaDevices
      ?.getUserMedia({ video: { width: { ideal: 1920 }, height: { ideal: 1080 }, facingMode: 'user' }, audio: false })
      .then((s) => {
        stream = s
        if (videoRef.current) videoRef.current.srcObject = s
      })
      .catch((e) => setError(e?.name === 'NotAllowedError' ? 'Camera permission was denied.' : 'No camera found.'))
    if (!navigator.mediaDevices) setError('Camera needs a secure page (https or localhost).')
    return () => {
      cancelled.current = true
      stream?.getTracks().forEach((t) => t.stop())
    }
  }, [])

  const capture = () => {
    const v = videoRef.current!
    const c = document.createElement('canvas')
    c.width = v.videoWidth
    c.height = v.videoHeight
    // Saved un-mirrored so text and backgrounds read correctly on the print.
    c.getContext('2d')!.drawImage(v, 0, 0)
    return c.toDataURL('image/jpeg', 0.92)
  }

  const run = async () => {
    setRunning(true)
    const taken: string[] = []
    onShots([])
    for (let i = 0; i < config.shotsPerSession; i++) {
      for (let n = config.countdownSeconds; n > 0; n--) {
        if (cancelled.current) return
        setCount(n)
        await wait(1000)
      }
      setCount(null)
      taken.push(capture())
      onShots([...taken])
      setFlash((f) => f + 1)
      await wait(700)
    }
    setRunning(false)
  }

  const useSamples = () => onShots(Array.from({ length: config.shotsPerSession }, (_, i) => samplePhoto(i * 55, `shot ${i + 1}`)))

  const done = shots.length === config.shotsPerSession && !running

  return (
    <div className="flex w-full max-w-6xl flex-col items-center">
      <Tag>
        Smile! {config.shotsPerSession} shots, {config.countdownSeconds}-second countdown each
      </Tag>
      <div className="flex w-full items-start gap-8">
        <motion.div initial={{ opacity: 0, scale: 0.9, rotate: -1.5 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ type: 'spring', stiffness: 220, damping: 20 }} className={`relative aspect-[4/3] w-[58%] overflow-hidden rounded-xl border-[10px] bg-black shadow-xl transition-colors ${running ? 'border-auburn' : 'border-paper'}`}>
          {error ? (
            <div className="flex h-full flex-col items-center justify-center gap-4 p-8 text-center text-white">
              <div className="font-mono text-lg">{error}</div>
              <Btn kind="steel" onClick={useSamples}>
                Use sample photos (demo)
              </Btn>
            </div>
          ) : (
            <video ref={videoRef} autoPlay playsInline muted className="h-full w-full -scale-x-100 object-cover" />
          )}
          {count !== null && (
            <div key={`count-${count}`} className="pop absolute inset-0 flex items-center justify-center font-display text-[180px] text-white drop-shadow-[0_6px_0_rgba(0,0,0,0.5)]">
              {count}
            </div>
          )}
          {flash > 0 && <div key={`flash-${flash}`} className="flash pointer-events-none absolute inset-0 bg-white" />}
          {running && <motion.div animate={{ opacity: [1, 0.2, 1] }} transition={{ repeat: Infinity, duration: 1 }} className="absolute top-4 left-4 flex items-center gap-2 rounded-full bg-black/50 px-3 py-1 font-mono text-sm font-bold text-white"><span className="h-3 w-3 rounded-full bg-auburn" />REC</motion.div>}
        </motion.div>
        <div className="flex flex-1 flex-col gap-4">
          <div className="grid grid-cols-3 gap-3">
            {Array.from({ length: config.shotsPerSession }, (_, i) => (
              <div key={i} className="aspect-[4/3] overflow-hidden rounded-md border-4 border-paper bg-[#f3e4b0]">
                {shots[i] ? (
                  <motion.img key={shots[i].length + i} src={shots[i]} initial={{ scale: 1.8, opacity: 0, rotate: -8 }} animate={{ scale: 1, opacity: 1, rotate: 0 }} transition={{ type: 'spring', stiffness: 260, damping: 18 }} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full items-center justify-center font-mono text-sm text-ink/50">{i + 1}</div>
                )}
              </div>
            ))}
          </div>
          {!running && !done && (
            <Btn big onClick={run} disabled={!!error}>
              ● Start camera
            </Btn>
          )}
          {running && <motion.div animate={{ opacity: [1, 0.5, 1] }} transition={{ repeat: Infinity, duration: 1.2 }} className="py-6 text-center font-mono text-xl font-bold">Shot {Math.min(shots.length + 1, config.shotsPerSession)} of {config.shotsPerSession}…</motion.div>}
          {done && (
            <div className="flex flex-col gap-3">
              <Btn big onClick={onNext}>
                Pick your best ▶
              </Btn>
              {!error && (
                <Btn kind="plain" onClick={run}>
                  ↺ Retake all
                </Btn>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="mt-8 self-start">
        <Btn kind="plain" onClick={onBack} disabled={running}>
          ◀ Back
        </Btn>
      </div>
    </div>
  )
}
