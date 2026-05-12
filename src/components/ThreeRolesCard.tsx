import type { BRAND } from '../data/brand'

type Pillar = (typeof BRAND.pillars)[number]

export function ThreeRolesCard({
  pillar,
  showProducts,
}: {
  pillar: Pillar
  showProducts?: boolean
}) {
  return (
    <div className="bg-brand-paper border-2 border-brand-navy shadow-heritage p-6">
      <p className="text-xs uppercase tracking-widest font-bold text-brand-coral">
        {pillar.label}
      </p>
      <h3 className="mt-2 font-serif text-2xl font-bold leading-tight">{pillar.lead}</h3>
      <p className="mt-3 text-sm text-ink-500 leading-relaxed">{pillar.body}</p>
      {showProducts && (
        <ul className="mt-4 space-y-1 text-sm text-ink-700">
          {pillar.products.map((p) => (
            <li key={p} className="flex gap-2">
              <span className="text-brand-coral font-bold">·</span>
              <span>{p}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
