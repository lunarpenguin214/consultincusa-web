import { useEffect } from 'react'
import { setSeo } from '../lib/seo'
import { BRAND, LENSES, TIERS } from '../data/brand'
import { LensCard } from '../components/LensCard'
import { OfferCard } from '../components/OfferCard'

export function Offers() {
  useEffect(() => {
    setSeo({
      title: 'The Five Lenses — consultincusa',
      description:
        'Five lenses. One operating brain. Applied to your business in five days. Eagle-eye review of capital, systems, operations, growth, and tech — the seeing you would hire five consultants for, from one operator.',
      lang: 'en',
      canonical: `https://${BRAND.domain}/offers`,
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'Service',
        serviceType: 'Business consulting',
        provider: {
          '@type': 'Organization',
          name: BRAND.name,
          url: `https://${BRAND.domain}`,
        },
        offers: TIERS.map((t) => ({
          '@type': 'Offer',
          name: t.name,
          price: t.price.replace(/[^0-9]/g, ''),
          priceCurrency: 'USD',
          description: t.blurb,
        })),
      },
    })
  }, [])

  return (
    <div className="bg-brand-cream text-brand-navy">
      <section className="max-w-6xl mx-auto px-4 md:px-10 py-16 md:py-24">
        <p className="text-xs uppercase tracking-widest font-bold">Capital · Systems · Operations</p>
        <h1 className="mt-4 font-serif text-5xl md:text-7xl font-bold tracking-tight leading-[1.05]">
          Five lenses. One operating brain.
        </h1>
        <p className="mt-6 text-lg md:text-xl text-ink-500 max-w-3xl">
          Applied to your business in five days. The seeing you would hire five separate consultants for —
          from one operator who holds all five in his head at the same time.
        </p>
        <p className="mt-4 text-base text-ink-700 max-w-3xl">
          For owner-operators doing $500K–$50M. We diagnose first, recommend second, and only build
          or place when the math actually works. Refundable if findings fall short of stated ROI.
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-4 md:px-10 py-16 border-t-2 border-brand-navy">
        <p className="text-sm uppercase tracking-widest font-bold mb-3">The Five Lenses</p>
        <h2 className="font-serif text-3xl md:text-5xl font-bold mb-12">
          Same brain. Five angles of seeing.
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {LENSES.map((lens) => (
            <LensCard key={lens.id} lens={lens} />
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 md:px-10 py-16 border-t-2 border-brand-navy">
        <p className="text-sm uppercase tracking-widest font-bold mb-3">Three ways to engage</p>
        <h2 className="font-serif text-3xl md:text-5xl font-bold mb-12">
          Pick the depth that fits your situation.
        </h2>
        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          {TIERS.map((tier) => (
            <OfferCard key={tier.id} tier={tier} />
          ))}
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 md:px-10 py-16 border-t-2 border-brand-navy">
        <h2 className="font-serif text-3xl md:text-4xl font-bold mb-8">What's included regardless of tier</h2>
        <ul className="space-y-3 text-base text-ink-700">
          <li>· Written deliverable you keep — no slide-deck theater</li>
          <li>· Specific dollar findings (not "opportunities") with prioritized action</li>
          <li>· Direct operator-to-operator communication. No account managers</li>
          <li>· State-aware capital eligibility map (if Capital lens applies)</li>
          <li>· Refund guarantee if findings fall short of stated ROI</li>
          <li>· Documented in writing before engagement begins</li>
        </ul>
      </section>

      <section className="max-w-3xl mx-auto px-4 md:px-10 py-16 border-t-2 border-brand-navy">
        <h2 className="font-serif text-3xl md:text-5xl font-bold mb-6">
          Ready to be seen?
        </h2>
        <p className="text-lg text-ink-700 mb-8">
          15-minute call. No commitment. We tell you up front whether your situation fits one of the
          tiers — and if not, we point you to the better option.
        </p>
        <a
          href="/book"
          className="inline-flex items-center bg-brand-coral text-white text-base font-bold uppercase tracking-wider px-8 py-4 border-2 border-brand-navy shadow-heritage hover:shadow-heritage-pop transition-all"
        >
          Book the 15-min call
        </a>
      </section>
    </div>
  )
}
