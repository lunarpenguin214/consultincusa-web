import { BRAND } from '../data/brand'

export function TrustCards() {
  return (
    <div className="grid md:grid-cols-3 gap-8">
      {BRAND.trustCards.map((card) => (
        <div
          key={card.number}
          className="bg-brand-paper border-2 border-brand-navy shadow-heritage p-6"
        >
          <p className="text-xs uppercase tracking-widest font-bold text-brand-coral">
            {card.number}
          </p>
          <h3 className="mt-2 font-serif text-xl font-bold leading-tight">{card.title}</h3>
          <p className="mt-3 text-sm text-ink-500 leading-relaxed">{card.body}</p>
        </div>
      ))}
    </div>
  )
}
