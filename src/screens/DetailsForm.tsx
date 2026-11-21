import type { ReactNode } from 'react'
import { motion } from 'motion/react'
import { config } from '../config'
import { Btn, Panel, Tag } from '../components/ui'
import { TypeIcon, typeNames } from '../components/TypeIcon'
import type { Theme } from '../themes'
import type { Details, PokeType } from '../types'

function TypePicker({ value, onChange }: { value: PokeType; onChange: (t: PokeType) => void }) {
  return (
    <div className="grid grid-cols-9 gap-2">
      {typeNames.map((t) => (
        <motion.button
          key={t}
          type="button"
          title={t}
          onClick={() => onChange(t)}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
          className={`rounded-full p-0.5 transition ${value === t ? 'ring-4 ring-hunyadi' : 'opacity-60 hover:opacity-100'}`}
        >
          <TypeIcon type={t} size={36} />
        </motion.button>
      ))}
    </div>
  )
}

export function DetailsForm({ theme, details, onChange, onNext, onBack }: { theme: Theme; details: Details; onChange: (d: Details) => void; onNext: () => void; onBack: () => void }) {
  const poke = theme.layout === 'pokemon'
  const set = (patch: Partial<Details>) => onChange({ ...details, ...patch })
  const row = (label: string, input: ReactNode, hint?: string) => (
    <div className="grid grid-cols-[170px_1fr] items-start gap-5">
      <div className="bg-vanilla py-3 text-center font-mono text-sm font-bold tracking-widest uppercase">{label}</div>
      <div>
        {input}
        {hint && <div className="mt-1 text-right font-mono text-xs text-ink/50">{hint}</div>}
      </div>
    </div>
  )
  const inputCls = 'w-full rounded bg-ink/10 px-4 py-3 font-mono text-xl outline-none transition-all duration-200 hover:bg-ink/15 focus:scale-[1.02] focus:bg-white focus:ring-4 focus:ring-hunyadi'
  const text = (key: 'name' | 'description' | 'ability1' | 'ability2', max: number, placeholder: string) => (
    <input className={inputCls} value={details[key]} maxLength={max} placeholder={placeholder} onChange={(e) => set({ [key]: e.target.value } as Partial<Details>)} />
  )

  return (
    <div className="flex w-full max-w-4xl flex-col items-center">
      <Tag>{theme.name} card: your details</Tag>
      <Panel className="flex w-full flex-col gap-4">
        <p className="text-sm text-ink/70">This appears on your card. We don't keep it after printing.</p>
        {row('Name', text('name', config.nameMax, 'e.g. Franco'), `${details.name.length}/${config.nameMax}`)}
        {row('Description', text('description', config.descriptionMax, 'A short line about you'), `${details.description.length}/${config.descriptionMax}`)}
        {poke && (
          <>
            {row('Your type', <TypePicker value={details.type} onChange={(t) => set({ type: t })} />)}
            {row('Ability 1', <div className="flex flex-col gap-2">{text('ability1', config.abilityMax, 'e.g. Thunder Smile')}<TypePicker value={details.ability1Type} onChange={(t) => set({ ability1Type: t })} /></div>, `${details.ability1.length}/${config.abilityMax}`)}
            {row('Ability 2', <div className="flex flex-col gap-2">{text('ability2', config.abilityMax, 'e.g. Quick Pose')}<TypePicker value={details.ability2Type} onChange={(t) => set({ ability2Type: t })} /></div>, `${details.ability2.length}/${config.abilityMax}`)}
          </>
        )}
        <div className="mt-2 flex justify-between">
          <Btn kind="plain" onClick={onBack}>
            ◀ Back
          </Btn>
          <Btn onClick={onNext} disabled={!details.name.trim()}>
            Next ▶
          </Btn>
        </div>
      </Panel>
    </div>
  )
}
