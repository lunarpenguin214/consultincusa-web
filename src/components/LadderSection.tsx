import { Link } from 'react-router-dom'
import { BRAND } from '../data/brand'

export function LadderSection() {
  return (
    <section className="max-w-6xl mx-auto px-4 md:px-10 py-16 border-t-2 border-brand-navy">
      <p className="text-sm uppercase tracking-widest font-bold mb-3 text-center">
        Three steps. Three ways to engage.
      </p>
      <h2 className="font-serif text-3xl md:text-5xl font-bold mb-12 text-center">
        Each step is opt-in. You only move forward when the math says move.
      </h2>
      <div className="grid md:grid-cols-3 gap-8 items-stretch">
        {BRAND.ladder.map((tier) => (
          <div
            key={tier.number}
            className={`relative bg-brand-paper border-2 border-brand-navy p-8 flex flex-col ${
              tier.featured ? 'shadow-heritage-pop md:scale-[1.04] z-10' : 'shadow-heritage'
            }`}
          >
            {tier.featured && tier.featuredLabel && (
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-brand-gold text-brand-navy text-xs font-bold tracking-widest px-6 py-2 border-2 border-brand-navy uppercase whitespace-nowrap">
                {tier.featuredLabel}
              </div>
            )}
            <p className="text-xs uppercase tracking-widest font-bold text-brand-coral">
              {tier.number}
            </p>
            <h3 className="mt-2 font-serif text-3xl font-bold">{tier.tier}</h3>
            <p className="mt-3 text-2xl font-bold">{tier.price}</p>
            <p className="text-xs uppercase tracking-widest text-ink-500 mt-1">{tier.note}</p>
            <p className="mt-4 text-sm text-ink-700 leading-relaxed">{tier.blurb}</p>
            <ul className="mt-6 space-y-2 text-sm flex-1">
              {tier.bullets.map((b) => (
                <li key={b} className="flex gap-2">
                  <span className="text-brand-coral font-bold">·</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <Link
              to={tier.ctaHref}
              className="mt-6 block text-center bg-brand-cream border-2 border-brand-navy text-brand-navy text-sm font-bold uppercase tracking-wider py-3 hover:bg-brand-navy hover:text-white transition-all"
            >
              {tier.ctaLabel}
            </Link>
          </div>
        ))}
      </div>
    </section>
  )
}
