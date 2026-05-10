import { useTranslation } from 'react-i18next'
import { Link, useParams } from 'react-router-dom'

export function Hero() {
  const { t } = useTranslation()
  const { lang = 'en' } = useParams()
  const guideSlug =
    lang === 'es'
      ? 'como-abrir-llc-en-usa-siendo-no-residente'
      : lang === 'pt'
        ? 'como-abrir-llc-nos-eua-sendo-brasileiro'
        : 'how-to-start-llc-as-non-resident'
  const bookSlug = lang === 'en' ? 'book' : 'agendar'

  return (
    <section className="relative bg-gradient-to-b from-brand-50 to-white">
      <div className="max-w-6xl mx-auto px-4 py-20 md:py-28 text-center">
        <p className="text-sm font-semibold text-brand-600 uppercase tracking-wide">
          {t('hero.eyebrow')}
        </p>
        <h1 className="mt-4 text-4xl md:text-6xl font-bold text-ink-900 max-w-4xl mx-auto leading-tight tracking-tight">
          {t('hero.headline')}
        </h1>
        <p className="mt-6 text-lg md:text-xl text-ink-500 max-w-3xl mx-auto">
          {t('hero.sub')}
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to={`/${lang}/${bookSlug}`}
            className="bg-brand-600 hover:bg-brand-700 text-white font-semibold px-7 py-3.5 rounded-md transition shadow-md"
          >
            {t('hero.cta_primary')}
          </Link>
          <Link
            to={`/${lang}/${guideSlug}`}
            className="border-2 border-ink-900 text-ink-900 hover:bg-ink-900 hover:text-white font-semibold px-7 py-3.5 rounded-md transition"
          >
            {t('hero.cta_secondary')}
          </Link>
        </div>
        <p className="mt-8 text-sm text-ink-500">{t('hero.trust')}</p>
      </div>
    </section>
  )
}
