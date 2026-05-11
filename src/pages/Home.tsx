import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { RotatingTagline } from '../components/RotatingTagline'
import { setSeo } from '../lib/seo'

export function Home() {
  useEffect(() => {
    setSeo({
      title: 'consultincusa — Stack Intelligence for Operators',
      description:
        "We map your competitors' tech stacks. Industry by industry. Free 1-pager sent in 24 hours.",
      lang: 'en',
      canonical: 'https://consultincusa.com/',
    })
  }, [])

  return (
    <div className="bg-brand-cream text-brand-navy">
      <section className="max-w-5xl mx-auto px-4 md:px-10 py-24 text-center">
        <p className="text-xs uppercase tracking-widest font-bold">
          CONSULTINCUSA · STACK INTELLIGENCE
        </p>
        <RotatingTagline className="mt-4 block" />
        <h1 className="mt-6 font-serif text-5xl md:text-8xl font-bold tracking-tight leading-[1.05]">
          Know their stack.
        </h1>
        <p className="mt-6 text-xl text-ink-500 max-w-2xl mx-auto">
          We map the tools your competitors use. Industry by industry. Free 1-pager.
        </p>
        <p className="mt-12 text-sm uppercase tracking-widest font-bold">Pick your industry</p>
        <div className="mt-6 grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <Link
            to="/dtc-stack"
            className="bg-brand-paper border-2 border-brand-navy shadow-heritage hover:shadow-heritage-pop p-8 transition-all text-left"
          >
            <h2 className="font-serif text-2xl font-bold">DTC E-commerce</h2>
            <p className="mt-2 text-sm text-ink-500">$1M-$10M brands</p>
          </Link>
          <Link
            to="/agency-stack"
            className="bg-brand-paper border-2 border-brand-navy shadow-heritage hover:shadow-heritage-pop p-8 transition-all text-left"
          >
            <h2 className="font-serif text-2xl font-bold">Performance Agencies</h2>
            <p className="mt-2 text-sm text-ink-500">5-50 people</p>
          </Link>
          <Link
            to="/newsletter-stack"
            className="bg-brand-paper border-2 border-brand-navy shadow-heritage hover:shadow-heritage-pop p-8 transition-all text-left"
          >
            <h2 className="font-serif text-2xl font-bold">Newsletter Creators</h2>
            <p className="mt-2 text-sm text-ink-500">$100K-$2M ARR</p>
          </Link>
        </div>
      </section>
    </div>
  )
}
