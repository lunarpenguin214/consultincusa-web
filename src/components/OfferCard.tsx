import { Link } from 'react-router-dom'
import type { TIERS } from '../data/brand'

type Tier = (typeof TIERS)[number]

export function OfferCard({ tier }: { tier: Tier }) {
  return (
    <div
      className={`relative bg-brand-paper border-2 border-brand-navy p-8 flex flex-col ${
        tier.featured ? 'shadow-heritage-lg md:scale-[1.04] z-10' : 'shadow-heritage'
      }`}
    >
      {tier.featured && tier.featuredLabel && (
        <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-brand-gold text-brand-navy text-xs font-bold tracking-widest px-6 py-2 border-2 border-brand-navy uppercase">
          {tier.featuredLabel}
        </div>
      )}
      <p className="text-xs uppercase tracking-widest font-bold text-brand-coral mt-2">{tier.name}</p>
      <h3 className="mt-2 font-serif text-3xl md:text-4xl font-bold">{tier.price}</h3>
      <p className="mt-1 text-xs uppercase tracking-widest text-ink-500">{tier.note}</p>
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
  )
}
