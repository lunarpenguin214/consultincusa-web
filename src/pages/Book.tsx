import { useEffect } from 'react'
import { setSeo } from '../lib/seo'

const CAL_LINK = 'https://cal.com/consultincusa/15min'

export function Book() {
  useEffect(() => {
    setSeo({
      title: 'Book a free 15-min call · consultincusa',
      description:
        'Book a 15-minute call. Tell us your industry, we tell you which stack the top operators run.',
      lang: 'en',
      canonical: 'https://consultincusa.com/book',
    })
  }, [])

  return (
    <section className="max-w-4xl mx-auto px-4 md:px-10 py-16 bg-brand-cream">
      <h1 className="font-serif text-4xl md:text-6xl font-bold text-brand-navy text-center">
        Book your free 15-min call
      </h1>
      <p className="mt-4 text-lg text-ink-500 text-center">
        Tell us your industry. We will tell you which stack the top operators actually run.
      </p>
      <div className="mt-10 border-2 border-brand-navy overflow-hidden bg-white shadow-heritage">
        <iframe
          src={CAL_LINK}
          width="100%"
          height="700"
          title="Cal.com booking"
          loading="lazy"
        />
      </div>
      <p className="mt-6 text-sm text-ink-500 text-center">
        Booking widget powered by Cal.com. If it doesn't load, email{' '}
        <a
          href="mailto:hello@consultincusa.com"
          className="text-brand-coral underline font-bold"
        >
          hello@consultincusa.com
        </a>
        .
      </p>
    </section>
  )
}
