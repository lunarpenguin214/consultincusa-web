import type { LENSES } from '../data/brand'

type Lens = (typeof LENSES)[number]

export function LensCard({ lens }: { lens: Lens }) {
  return (
    <div className="bg-brand-paper border-2 border-brand-navy shadow-heritage p-6 h-full flex flex-col">
      <p className="text-xs uppercase tracking-widest font-bold text-brand-coral">
        {lens.label}
      </p>
      <h3 className="mt-2 font-serif text-xl font-bold leading-tight">
        {lens.promise}
      </h3>
      <p className="mt-3 text-sm text-ink-500 leading-relaxed flex-1">{lens.detail}</p>
    </div>
  )
}
