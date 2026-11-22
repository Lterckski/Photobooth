import { Btn, Tag, Tile } from '../components/ui'
import { OutputPreview } from '../components/OutputPreview'
import { samplePhoto } from '../components/samplePhoto'
import { sampleDetails } from '../components/sampleDetails'
import { ThemeLogo } from '../components/ThemeLogo'
import { themes } from '../themes'

export function ThemePick({ selected, onSelect, onNext, onBack }: { selected: string | null; onSelect: (id: string) => void; onNext: () => void; onBack: () => void }) {
  const photo = samplePhoto(200)
  return (
    <div className="flex w-full max-w-6xl flex-col items-center">
      <Tag>Trading card: pick a theme</Tag>
      <div className="grid w-full grid-cols-4 gap-6">
        {themes.map((t, i) => {
          const on = t.id === selected
          return (
            <Tile key={t.id} index={i} selected={on} onClick={() => onSelect(t.id)} className="flex flex-col items-center gap-3 p-4">
              <OutputPreview theme={t} photo={photo} details={sampleDetails} maxW={210} maxH={294} className="shadow-md" />
              <div className="flex h-10 items-center">
                <ThemeLogo theme={t} height={40} plain style={{ maxWidth: 200 }} fallback={<div className="font-mono text-base font-bold uppercase">{t.name}</div>} />
              </div>
              <div className="text-sm text-ink/70">{t.tagline}</div>
            </Tile>
          )
        })}
      </div>
      <div className="mt-8 flex w-full justify-between">
        <Btn kind="plain" onClick={onBack}>
          ◀ Back
        </Btn>
        <Btn onClick={onNext} disabled={!selected}>
          Next ▶
        </Btn>
      </div>
    </div>
  )
}
