import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { RotatingTagline } from '../components/RotatingTagline'
import { LadderSection } from '../components/LadderSection'
import { AntiList } from '../components/AntiList'
import { TrustCards } from '../components/TrustCards'
import { ThreeRolesCard } from '../components/ThreeRolesCard'
import { MonogramAvatar } from '../components/MonogramAvatar'
import { BRAND } from '../data/brand'
import { setSeo } from '../lib/seo'

export function Home() {
  useEffect(() => {
    setSeo({
      title: 'consultincusa — Capital · Systems · Operations',
      description:
        'We assess. We audit. We propose. Your outside Capital, Systems, and Operations desk for owner-operators doing $500K–$50M.',
      lang: 'en',
      canonical: `https://${BRAND.domain}/`,
    })
  }, [])

  return (
    <div className="bg-brand-cream text-brand-navy">
      {/* HERO */}
      <section className="max-w-6xl mx-auto px-4 md:px-10 py-16 md:py-24">
        <p className="text-xs uppercase tracking-widest font-bold">{BRAND.pillarLine}</p>
        <RotatingTagline className="mt-4 block" />
        <h1 className="mt-6 font-serif text-5xl md:text-8xl font-bold tracking-tight leading-[1.05]">
          {BRAND.tagline}
        </h1>
        <p className="mt-6 text-xl md:text-2xl text-ink-500 max-w-3xl">{BRAND.subhead}</p>
        <p className="mt-4 text-base md:text-lg text-ink-700 max-w-3xl">{BRAND.anchor}</p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <Link
            to="/book"
            className="inline-flex items-center justify-center bg-brand-coral text-white text-base font-bold uppercase tracking-wider px-8 py-4 border-2 border-brand-navy shadow-heritage hover:shadow-heritage-pop transition-all"
          >
            Book the 15-min call
          </Link>
          <Link
            to="/about"
            className="inline-flex items-center justify-center bg-brand-paper text-brand-navy text-base font-bold uppercase tracking-wider px-8 py-4 border-2 border-brand-navy hover:bg-brand-navy hover:text-white transition-all"
          >
            How it works
          </Link>
        </div>
        <p className="mt-8 text-sm uppercase tracking-widest text-ink-500">
          Live · National where legal · Boots on ground NY · TX
        </p>
      </section>

      {/* 3-TIER LADDER */}
      <LadderSection />

      {/* THREE ROLES */}
      <section className="max-w-6xl mx-auto px-4 md:px-10 py-16 border-t-2 border-brand-navy">
        <h2 className="font-serif text-3xl md:text-5xl font-bold mb-12 text-center">
          {BRAND.thesis}
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {BRAND.pillars.map((p) => (
            <ThreeRolesCard key={p.key} pillar={p} />
          ))}
        </div>
      </section>

      {/* INDUSTRY PICKERS (preserved, moved below the fold) */}
      <section className="max-w-6xl mx-auto px-4 md:px-10 py-16 border-t-2 border-brand-navy">
        <p className="text-xs uppercase tracking-widest font-bold text-center">
          Start with stack intelligence for your industry
        </p>
        <h2 className="mt-3 font-serif text-3xl md:text-4xl font-bold text-center">
          Free 1-pager. Real competitor data. 24-hour delivery.
        </h2>
        <div className="mt-10 grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <IndustryCard to="/dtc-stack" label="DTC E-commerce" sub="$1M–$10M brands" />
          <IndustryCard to="/agency-stack" label="Performance Agencies" sub="5–50 people" />
          <IndustryCard to="/newsletter-stack" label="Newsletter Creators" sub="$100K–$2M ARR" />
        </div>
      </section>

      {/* WHO + ANTI-LIST */}
      <section className="max-w-6xl mx-auto px-4 md:px-10 py-16 border-t-2 border-brand-navy">
        <h2 className="font-serif text-3xl md:text-5xl font-bold mb-8 text-center">
          Owner-operators who want a straight answer.
        </h2>
        <AntiList />
      </section>

      {/* TRUST CARDS */}
      <section className="max-w-6xl mx-auto px-4 md:px-10 py-16 border-t-2 border-brand-navy">
        <p className="text-sm uppercase tracking-widest text-ink-500 mb-4 text-center font-bold">
          No upfront fees. No run-around. No fairy tales.
        </p>
        <h2 className="font-serif text-3xl md:text-5xl font-bold mb-12 text-center">
          Our incentive only fires when something funds, ships, or works.
        </h2>
        <TrustCards />
      </section>

      {/* FOUNDER NOTE */}
      <section className="max-w-3xl mx-auto px-4 md:px-10 py-16 border-t-2 border-brand-navy">
        <div className="flex items-start gap-6">
          <MonogramAvatar name="C U" size="lg" />
          <div>
            <p className="font-bold text-base mb-2">A working desk, not a directory.</p>
            <p className="text-lg text-ink-700 leading-relaxed">{BRAND.founderLine}</p>
          </div>
        </div>
      </section>
    </div>
  )
}

function IndustryCard({ to, label, sub }: { to: string; label: string; sub: string }) {
  return (
    <Link
      to={to}
      className="bg-brand-paper border-2 border-brand-navy shadow-heritage hover:shadow-heritage-pop p-8 transition-all"
    >
      <h3 className="font-serif text-2xl font-bold text-brand-navy">{label}</h3>
      <p className="mt-2 text-sm text-ink-500">{sub}</p>
    </Link>
  )
}
