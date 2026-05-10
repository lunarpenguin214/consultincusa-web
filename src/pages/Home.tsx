import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Hero } from '../components/Hero'
import { LeadForm } from '../components/LeadForm'
import { setSeo } from '../lib/seo'

const META = {
  en: {
    title: 'consultincusa — Open Your US LLC in 14 Days',
    desc: 'Open a US LLC as a non-resident in 14 days. EIN, banking, Form 5472, and WhatsApp human support in English, Português, Español, हिंदी, 中文.',
  },
  pt: {
    title: 'consultincusa — Abra sua LLC nos EUA em 14 dias',
    desc: 'Abra LLC nos EUA sendo brasileiro em 14 dias. EIN, conta Mercury, Form 5472 e suporte humano em português via WhatsApp.',
  },
  es: {
    title: 'consultincusa — Abre tu LLC en USA en 14 días',
    desc: 'Abre una LLC en USA siendo no residente en 14 días. EIN, banco Mercury, Form 5472 y soporte humano en español por WhatsApp.',
  },
} as const

export function Home() {
  const { lang = 'en' } = useParams<{ lang: 'en' | 'pt' | 'es' }>()
  const meta = META[lang as keyof typeof META]

  useEffect(() => {
    setSeo({
      title: meta.title,
      description: meta.desc,
      lang,
      hreflangs: {
        en: 'https://consultincusa.com/en',
        pt: 'https://consultincusa.com/pt',
        es: 'https://consultincusa.com/es',
      },
      canonical: `https://consultincusa.com/${lang}`,
    })
  }, [lang, meta])

  return (
    <>
      <Hero />
      <section id="lead-form" className="bg-ink-100/30 py-16">
        <div className="max-w-2xl mx-auto px-4">
          <LeadForm />
        </div>
      </section>
      <section className="py-16 max-w-5xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-ink-900 text-center mb-12">
          What you get with consultincusa
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Feature
            title="14-day formation"
            body="LLC + EIN + bank account, end-to-end, in 14 days. Or money back AND we keep working."
          />
          <Feature
            title="In your language"
            body="English, Português, Español, हिंदी, 中文. Every form, every call, every WhatsApp message."
          />
          <Feature
            title="Form 5472 included"
            body="Year 1 included. Other services charge $899-$1,999/year for this. We don't."
          />
          <Feature
            title="Mercury rescue path"
            body="If Mercury says no, we don't quit. We route to Relay, Wise, or in-person — whatever it takes."
          />
          <Feature
            title="Real human anchor"
            body="Your WhatsApp anchor. Real person in your community. 1-hour response during business hours."
          />
          <Feature
            title="Skool community"
            body="Skool community of newcomer founders. Cohort calls, wins feed, regional chat in your language."
          />
        </div>
      </section>
    </>
  )
}

function Feature({ title, body }: { title: string; body: string }) {
  return (
    <div className="border border-ink-300 rounded-lg p-6 hover:shadow-md transition">
      <h3 className="font-bold text-ink-900 text-lg">{title}</h3>
      <p className="mt-2 text-ink-500 text-sm">{body}</p>
    </div>
  )
}
