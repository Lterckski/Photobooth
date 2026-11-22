import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, MotionConfig, motion } from 'motion/react'
import { config } from './config'
import { Shell } from './components/ui'
import { themeById } from './themes'
import { emptyDetails, type Session } from './types'
import { Camera } from './screens/Camera'
import { DetailsForm } from './screens/DetailsForm'
import { Done } from './screens/Done'
import { PickShots } from './screens/PickShots'
import { Preview } from './screens/Preview'
import { ThemePick } from './screens/ThemePick'
import { Welcome } from './screens/Welcome'

type Step = 'welcome' | 'theme' | 'details' | 'camera' | 'pick' | 'preview' | 'done'

const flow: Step[] = ['theme', 'details', 'camera', 'pick', 'preview']

const newSession = (): Session => ({
  themeId: null,
  details: emptyDetails(),
  shots: [],
  picked: [],
  // Demo ID. In production this comes from the sales log so every print is traceable.
  sessionId: String(Math.floor(1000 + Math.random() * 9000)),
})

export default function App() {
  const [step, setStep] = useState<Step>('welcome')
  const [s, setS] = useState<Session>(newSession)
  const lastTouch = useRef(Date.now())

  const reset = useCallback(() => {
    setS(newSession())
    setStep('welcome')
  }, [])

  // Return to the welcome screen if a customer walks away mid-session.
  useEffect(() => {
    const touch = () => (lastTouch.current = Date.now())
    window.addEventListener('pointerdown', touch)
    window.addEventListener('keydown', touch)
    const t = setInterval(() => {
      if (step !== 'welcome' && step !== 'done' && Date.now() - lastTouch.current > config.idleResetSeconds * 1000) reset()
    }, 1000)
    return () => {
      window.removeEventListener('pointerdown', touch)
      window.removeEventListener('keydown', touch)
      clearInterval(t)
    }
  }, [step, reset])

  const go = (st: Step) => {
    lastTouch.current = Date.now()
    setStep(st)
  }

  const theme = themeById(s.themeId)
  const stepNo = flow.indexOf(step) + 1

  const screen = (
    <motion.div
      key={step}
      initial={{ opacity: 0, x: 80, filter: 'blur(6px)' }}
      animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
      exit={{ opacity: 0, x: -80, filter: 'blur(6px)' }}
      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
      className="flex w-full flex-col items-center"
    >
      {step === 'theme' && (
        <ThemePick selected={s.themeId} onSelect={(id) => setS({ ...s, themeId: id })} onBack={reset} onNext={() => go('details')} />
      )}
      {step === 'details' && <DetailsForm theme={theme} details={s.details} onChange={(d) => setS({ ...s, details: d })} onBack={() => go('theme')} onNext={() => go('camera')} />}
      {step === 'camera' && (
        <Camera
          shots={s.shots}
          onShots={(shots) => setS((cur) => ({ ...cur, shots, picked: [] }))}
          onBack={() => go('details')}
          onNext={() => go('pick')}
        />
      )}
      {step === 'pick' && (
        <PickShots shots={s.shots} picks={1} picked={s.picked} onChange={(picked) => setS({ ...s, picked })} onBack={() => go('camera')} onNext={() => go('preview')} />
      )}
      {step === 'preview' && (
        <Preview theme={theme} photo={s.shots[s.picked[0]]} details={s.details} cardId={s.sessionId} onBack={() => go('pick')} onPrinted={() => go('done')} />
      )}
      {step === 'done' && <Done onReset={reset} />}
    </motion.div>
  )

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence mode="wait">
        {step === 'welcome' ? (
          <motion.div key="welcome" className="h-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 1.04 }} transition={{ duration: 0.3 }}>
            <Welcome onStart={() => go('theme')} />
          </motion.div>
        ) : (
          <motion.div key="flow" className="h-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Shell step={stepNo > 0 ? stepNo : undefined} totalSteps={flow.length}>
              <AnimatePresence mode="wait">{screen}</AnimatePresence>
            </Shell>
          </motion.div>
        )}
      </AnimatePresence>
    </MotionConfig>
  )
}
