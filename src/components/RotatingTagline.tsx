import { useState, useEffect } from 'react'
import clsx from 'clsx'

const ROTATIONS = [
  'How DTC brands do $10M in 18 months',
  'How agencies do 80% margins in 2 years',
  'How creators do 100K subs in 12 months',
  'How SaaS founders do $1M ARR in 24 months',
  'How D2C startups do CAC of $20 in 6 months',
  'How Shopify stores do $500K MRR in 3 years',
  'How newsletters do 50% open rates with 1 tool',
  'How agencies do 5× output with same headcount',
  'How creators do 6-figure launches with 4 emails',
  'How DTC ops do 4× ROAS with same ad spend',
  'How founders do 80h weeks in 40h',
  'How operators do 10× output with 6 tools',
  'How brands do Black Friday in 9 minutes setup',
  'How creators do paid subs without a CMS',
  'How agencies do retainers without losing clients',
]

export function RotatingTagline({ className }: { className?: string }) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % ROTATIONS.length)
    }, 3000)
    return () => clearInterval(id)
  }, [paused])

  return (
    <span
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className={clsx(
        'inline-block italic font-serif text-base md:text-lg text-brand-coral transition-opacity duration-500',
        className,
      )}
      aria-live="polite"
    >
      {ROTATIONS[index]}
    </span>
  )
}
