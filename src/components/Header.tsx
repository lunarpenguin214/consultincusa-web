import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { LangSwitcher } from './LangSwitcher'

export function Header() {
  const { lang = 'en' } = useParams()
  const { t } = useTranslation()

  const guideSlug =
    lang === 'es'
      ? 'como-abrir-llc-en-usa-siendo-no-residente'
      : lang === 'pt'
        ? 'como-abrir-llc-nos-eua-sendo-brasileiro'
        : 'how-to-start-llc-as-non-resident'

  const bookSlug = lang === 'en' ? 'book' : 'agendar'

  return (
    <header className="border-b border-ink-300 bg-white sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to={`/${lang}`} className="font-bold text-ink-900 text-lg tracking-tight">
          consultincusa
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link to={`/${lang}`} className="hover:text-brand-600">
            {t('nav.home')}
          </Link>
          <Link to={`/${lang}/${guideSlug}`} className="hover:text-brand-600">
            {t('nav.guide')}
          </Link>
          <Link to={`/${lang}/vs/stripe-atlas`} className="hover:text-brand-600">
            {t('nav.vs')}
          </Link>
          <Link
            to={`/${lang}/${bookSlug}`}
            className="bg-brand-600 text-white px-4 py-2 rounded-md hover:bg-brand-700 transition"
          >
            {t('nav.book')}
          </Link>
          <LangSwitcher />
        </nav>
        <div className="md:hidden">
          <LangSwitcher />
        </div>
      </div>
    </header>
  )
}
