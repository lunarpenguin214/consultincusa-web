import { useState, useEffect } from 'react'
import clsx from 'clsx'

const ROTATIONS = [
  'We diagnose first, recommend second.',
  'A working desk, not a directory.',
  'Capital. Systems. Operations. One table.',
  'Math first. Meetings second.',
  '"No" is a real answer here.',
  'Paid by closers, not by seekers.',
  'Refundable if we recommend not engaging.',
  'Built by operators, for operators.',
  'More businesses fail from misdiagnosing cash than from cash itself.',
  'Run the math before you run the meeting.',
  'Borderline files are where we earn our keep.',
  'Yes / no / not-yet — never "maybe forever."',
  'Three roles. One operating brain.',
  'For owner-operators doing $500K–$50M.',
  'SBA-savvy without the SBA-lifer brittleness.',
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
