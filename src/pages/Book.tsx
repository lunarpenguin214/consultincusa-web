import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { setSeo } from '../lib/seo'

const META = {
  en: {
    title: 'Book a free 15-min call · consultincusa',
    desc: 'Book a free 15-minute discovery call in your language. We will tell you honestly if our bundle fits — and if not, point you to the better option.',
    headline: 'Book your free 15-min call',
    sub: 'In English. With a real person who has helped thousands of non-resident founders.',
  },
  pt: {
    title: 'Agendar 15 min grátis · consultincusa',
    desc: 'Agende uma chamada de 15 minutos em português. A gente te diz se nosso pacote serve — e se não, te aponta a melhor alternativa.',
    headline: 'Agende seus 15 min grátis',
    sub: 'Em português. Com uma pessoa real que já ajudou milhares de brasileiros.',
  },
  es: {
    title: 'Agendar 15 min gratis · consultincusa',
    desc: 'Agenda una llamada de 15 minutos en español. Te decimos si nuestro paquete encaja — y si no, te apuntamos a la mejor alternativa.',
    headline: 'Agenda tus 15 min gratis',
    sub: 'En español. Con una persona real que ya ha ayudado a miles de latinos.',
  },
} as const

const CAL_LINKS = {
  en: 'https://cal.com/consultincusa/15min-en',
  pt: 'https://cal.com/consultincusa/15min-pt',
  es: 'https://cal.com/consultincusa/15min-es',
}

export function Book() {
  const { lang = 'en' } = useParams<{ lang: 'en' | 'pt' | 'es' }>()
  const meta = META[lang as keyof typeof META]
  const calLink = CAL_LINKS[lang as keyof typeof CAL_LINKS]

  useEffect(() => {
    setSeo({ title: meta.title, description: meta.desc, lang })
  }, [lang, meta])

  return (
    <section className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-4xl md:text-5xl font-bold text-ink-900 text-center">
        {meta.headline}
      </h1>
      <p className="mt-4 text-lg text-ink-500 text-center">{meta.sub}</p>
      <div className="mt-10 border border-ink-300 rounded-lg overflow-hidden bg-white shadow-md">
        <iframe
          src={calLink}
          width="100%"
          height="700"
          frameBorder={0}
          title="Cal.com booking"
          loading="lazy"
        />
      </div>
      <p className="mt-6 text-sm text-ink-500 text-center">
        Booking widget powered by Cal.com. If it doesn't load, email{' '}
        <a href="mailto:hello@consultincusa.com" className="text-brand-600 underline">
          hello@consultincusa.com
        </a>
        .
      </p>
    </section>
  )
}
