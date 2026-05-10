import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { setSeo } from '../lib/seo'

const COPY = {
  en: {
    title: 'Form 5472 — the $25,000 IRS landmine non-residents must avoid',
    desc: 'Form 5472 is required every year for foreign-owned single-member US LLCs. Miss it and the IRS penalty is $25,000 per year. Here is what it is, why it matters, and how to file it.',
    h1: 'Form 5472 — the $25,000 landmine',
    body: [
      'If you own a US single-member LLC as a non-resident, the IRS requires you to file Form 5472 (Information Return of a 25% Foreign-Owned U.S. Corporation) AND a pro-forma Form 1120 every year. Even if your LLC has zero income.',
      'Penalty for missing the filing: $25,000 per form, per year. The IRS does not warn you. Most non-residents discover this in Year 2 when a notice arrives.',
      'Stripe Atlas does not include Form 5472. Doola charges $1,999/year for Total Compliance. Firstbase sells it as a $899/year add-on.',
      'consultincusa includes Form 5472 in the Welcome Bundle Year 1. We send a Year-2 reminder and offer the same template + walkthrough video for $99/year going forward.',
    ],
    cta: 'Get the free Form 5472 template',
  },
  pt: {
    title: 'Form 5472 — a multa de US$ 25.000 que brasileiros precisam evitar',
    desc: 'Form 5472 é obrigatório todo ano para LLCs americanas de dono brasileiro. Multa por não enviar: US$ 25.000 por ano. Aqui está o que é, por que importa e como enviar.',
    h1: 'Form 5472 — a multa de US$ 25.000',
    body: [
      'Se você é dono brasileiro de uma LLC nos EUA, o IRS exige Form 5472 + Form 1120 pro-forma TODO ano. Mesmo se a LLC não tiver receita.',
      'Multa por esquecer: US$ 25.000 por formulário, por ano. O IRS não avisa. A maioria descobre só no Ano 2 quando a notificação chega.',
      'Stripe Atlas não inclui. Doola cobra US$ 1.999/ano. Firstbase vende como add-on de US$ 899/ano.',
      'consultincusa inclui no Welcome Bundle Ano 1. Mandamos lembrete no Ano 2 e oferecemos template + tutorial por US$ 99/ano em diante.',
    ],
    cta: 'Receba o template grátis',
  },
  es: {
    title: 'Form 5472 — la multa de USD 25,000 que latinos deben evitar',
    desc: 'Form 5472 es obligatorio cada año para LLCs estadounidenses con dueño latino. Multa por no enviar: USD 25,000 por año. Aquí está qué es, por qué importa y cómo enviar.',
    h1: 'Form 5472 — la multa de USD 25,000',
    body: [
      'Si eres dueño latino de una LLC en USA, el IRS exige Form 5472 + Form 1120 pro-forma cada año. Incluso si la LLC no tiene ingresos.',
      'Multa por olvidar: USD 25,000 por formulario, por año. El IRS no avisa. La mayoría descubre solo en el Año 2 cuando llega la notificación.',
      'Stripe Atlas no lo incluye. Doola cobra USD 1,999/año. Firstbase lo vende como add-on de USD 899/año.',
      'consultincusa lo incluye en el Welcome Bundle Año 1. Enviamos recordatorio en Año 2 y ofrecemos template + tutorial por USD 99/año en adelante.',
    ],
    cta: 'Recibe el template gratis',
  },
} as const

export function Form5472() {
  const { lang = 'en' } = useParams<{ lang: 'en' | 'pt' | 'es' }>()
  const c = COPY[lang as keyof typeof COPY]

  useEffect(() => {
    setSeo({ title: c.title, description: c.desc, lang })
  }, [lang, c])

  return (
    <article className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-ink-900">{c.h1}</h1>
      {c.body.map((p, i) => (
        <p key={i} className="mt-6 text-lg text-ink-700 leading-relaxed">
          {p}
        </p>
      ))}
      <div className="mt-10 flex gap-3">
        <Link
          to={`/${lang}/${lang === 'en' ? 'book' : 'agendar'}`}
          className="bg-brand-600 hover:bg-brand-700 text-white font-semibold px-6 py-3 rounded-md transition"
        >
          {c.cta}
        </Link>
      </div>
    </article>
  )
}
