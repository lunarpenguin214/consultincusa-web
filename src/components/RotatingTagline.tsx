import { useState, useEffect } from 'react'
import clsx from 'clsx'

const ROTATIONS = [
  'Their lender said yes in 48 hours. Yours said maybe in 30 days.',
  "Their MCA refi'd into a 7% term loan. Yours bleeds daily at 80% APR.",
  'Their SBA 7(a) closed in 14 days. Yours is stuck on document #6.',
  'Their CFO sleeps. Yours rebuilds the cash schedule at 11pm Sundays.',
  'Their close took 9 minutes. Yours took 9 days.',
  "They cleaned the vendor stack and saved $60K/yr. You're still on 14 tools.",
  'Their software gets opened daily. Yours got built and forgotten.',
  'Their broker delivered. Yours disappeared after the contract.',
  'Their tax return tells a clean story. Yours has 8 surprises.',
  'They got the $500K line. You got the runaround.',
  'Their stacked debt unwound. Yours stacked higher last week.',
  "They closed Q4 with 6 tools. You're juggling 14.",
  'We diagnose first, recommend second.',
  'Refundable if we recommend not engaging.',
  '"No" is a real answer here.',
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
