import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { setSeo } from '../lib/seo'

const COPY = {
  en: {
    title: 'Mercury rejected your application? The rescue path · consultincusa',
    desc: 'Mercury rejected your non-resident LLC application. You are not stuck. Here is the proven rescue path: Relay, Wise, and traditional bank options.',
    h1: 'Mercury said no. We have a Plan B.',
    steps: [
      ['Submit to Relay Financial', 'Different criteria than Mercury. Often approved when Mercury rejects. Same online onboarding model.'],
      ['Try Wise Business', 'Multi-currency receiving account. Accepts most non-resident LLCs. Not technically a US bank, but works for most use cases.'],
      ['Build 60-90 days operating history', 'Use Wise as primary. Build invoicing + Stripe history. Re-apply Mercury after 90 days with stronger profile.'],
      ['Travel to the US', 'Open at Chase, BofA, or Wells Fargo in person with passport + EIN + Articles of Organization. Highest approval rate.'],
      ['Partner intro at regional bank', 'Our anchors have relationships with regional banks open to non-residents in their metros. We make the intro.'],
    ],
  },
  pt: { title: '', desc: '', h1: '', steps: [] as [string, string][] },
  es: {
    title: '¿Mercury rechazó tu aplicación? El camino de rescate · consultincusa',
    desc: 'Mercury rechazó tu aplicación de LLC no-residente. No estás atrapado. Aquí está el camino de rescate probado: Relay, Wise, y opciones de banco tradicional.',
    h1: 'Mercury dijo no. Tenemos Plan B.',
    steps: [
      ['Aplica a Relay Financial', 'Criterios diferentes a Mercury. Aprueba con frecuencia cuando Mercury rechaza. Mismo onboarding online.'],
      ['Prueba Wise Business', 'Cuenta multi-moneda. Acepta la mayoría de LLCs no-residentes. No es banco americano técnicamente, pero funciona para la mayoría.'],
      ['Construye 60-90 días de historial', 'Usa Wise como principal. Construye historial de facturas + Stripe. Re-aplica a Mercury después de 90 días con perfil más fuerte.'],
      ['Viaja a USA', 'Abre en Chase, BofA o Wells Fargo en persona con pasaporte + EIN + Articles of Organization. Tasa de aprobación más alta.'],
      ['Intro de socio en banco regional', 'Nuestros anchors tienen relaciones con bancos regionales abiertos a no-residentes en sus metros. Hacemos la intro.'],
    ],
  },
} as const

export function MercuryRescue() {
  const { lang = 'en' } = useParams<{ lang: 'en' | 'pt' | 'es' }>()
  const c = COPY[lang as keyof typeof COPY] ?? COPY.en

  useEffect(() => {
    setSeo({ title: c.title, description: c.desc, lang })
  }, [lang, c])

  return (
    <article className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-ink-900">{c.h1}</h1>
      <ol className="mt-10 space-y-6">
        {(c.steps as [string, string][]).map(([title, body], i) => (
          <li key={i} className="border-l-4 border-brand-500 pl-6">
            <p className="font-bold text-ink-900 text-lg">
              {i + 1}. {title}
            </p>
            <p className="mt-2 text-ink-700">{body}</p>
          </li>
        ))}
      </ol>
      <div className="mt-10">
        <Link
          to={`/${lang}/${lang === 'en' ? 'book' : 'agendar'}`}
          className="bg-brand-600 hover:bg-brand-700 text-white font-semibold px-6 py-3 rounded-md transition inline-block"
        >
          Book a 15-min rescue call
        </Link>
      </div>
    </article>
  )
}
