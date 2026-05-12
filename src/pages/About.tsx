import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { setSeo } from '../lib/seo'
import { BRAND } from '../data/brand'
import { ThreeRolesCard } from '../components/ThreeRolesCard'
import { LadderSection } from '../components/LadderSection'
import { MonogramAvatar } from '../components/MonogramAvatar'

const HOUSE_RULES = [
  {
    title: 'No fabricated metrics',
    body: '"$3B funded" without context is theater. We quote your file, not industry averages. The FTC has fined firms over this — we’re not interested in being one of them.',
  },
  {
    title: 'No upfront fees on capital',
    body: 'You pay nothing until something funds. Audit work is scoped and refundable if we recommend not engaging. That’s in writing before we start.',
  },
  {
    title: 'No "100% approved" theater',
    body: 'Nobody approves 100% of files. We tell you up front whether your deal is clean, needs work, or won’t fly — and which of those is which.',
  },
]

export function About() {
  useEffect(() => {
    setSeo({
      title: 'About — Three roles. One operating brain. · consultincusa',
      description:
        'Most operators don’t need a broker, a developer, or a consultant in isolation. They need someone who can hold all three. That’s the idea here.',
      lang: 'en',
      canonical: `https://${BRAND.domain}/about`,
    })
  }, [])

  return (
    <div className="bg-brand-cream text-brand-navy">
      {/* HERO */}
      <section className="max-w-4xl mx-auto px-4 md:px-10 py-20">
        <p className="text-xs uppercase tracking-widest font-bold">About consultincusa</p>
        <h1 className="mt-4 font-serif text-5xl md:text-7xl font-bold tracking-tight leading-[1.05]">
          {BRAND.thesis}
        </h1>
        <p className="mt-6 text-xl md:text-2xl text-ink-500 leading-relaxed">
          Most operators we work with don’t need a broker, a developer, or a consultant in
          isolation — they need someone who can hold all three in their head at the same time.
          That’s the idea here.
        </p>
      </section>

      {/* PILLARS */}
      <section className="max-w-6xl mx-auto px-4 md:px-10 py-16 border-t-2 border-brand-navy">
        <p className="text-sm uppercase tracking-widest font-bold mb-3">Three roles.</p>
        <h2 className="font-serif text-3xl md:text-5xl font-bold mb-12">One operating brain.</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {BRAND.pillars.map((p) => (
            <ThreeRolesCard key={p.key} pillar={p} showProducts />
          ))}
        </div>
      </section>

      {/* HOUSE RULES */}
      <section className="max-w-6xl mx-auto px-4 md:px-10 py-16 border-t-2 border-brand-navy">
        <h2 className="font-serif text-3xl md:text-5xl font-bold mb-12">
          What you won’t see here.
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {HOUSE_RULES.map((r) => (
            <div
              key={r.title}
              className="bg-brand-paper border-2 border-brand-navy shadow-heritage p-6"
            >
              <h3 className="font-serif text-xl font-bold mb-3">{r.title}</h3>
              <p className="text-sm text-ink-500 leading-relaxed">{r.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* LADDER */}
      <LadderSection />

      {/* FOUNDER */}
      <section className="max-w-3xl mx-auto px-4 md:px-10 py-16 border-t-2 border-brand-navy">
        <div className="flex items-start gap-6">
          <MonogramAvatar name="C U" size="xl" />
          <div>
            <p className="font-bold text-sm uppercase tracking-widest mb-3">
              Built by operators, for operators.
            </p>
            <p className="text-lg text-ink-700 leading-relaxed">
              consultincusa is a working desk, not a directory. Capital, systems, and ops sit at
              the same table because that’s how decisions actually land in a real business.
            </p>
            <p className="mt-4 text-lg text-ink-700 leading-relaxed">
              We diagnose first, recommend second, and only build or place when the math actually
              works. We pass on more deals than we take. The ones we take, we close.
            </p>
            <Link
              to="/book"
              className="inline-flex items-center mt-6 bg-brand-coral text-white text-base font-bold uppercase tracking-wider px-6 py-3 border-2 border-brand-navy shadow-heritage hover:shadow-heritage-pop transition-all"
            >
              Book the 15-min call
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
