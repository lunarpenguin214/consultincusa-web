import { useTranslation } from 'react-i18next'
import { useParams, Link } from 'react-router-dom'

export function Footer() {
  const { t } = useTranslation()
  const { lang = 'en' } = useParams()

  return (
    <footer className="border-t border-ink-300 bg-ink-100/50 mt-12">
      <div className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-3 gap-8 text-sm">
        <div>
          <p className="font-bold text-ink-900">consultincusa</p>
          <p className="mt-2 text-ink-500">{t('footer.tagline')}</p>
        </div>
        <div>
          <p className="font-semibold text-ink-900 mb-2">{t('nav.guide')}</p>
          <ul className="space-y-1 text-ink-500">
            <li>
              <Link to={`/${lang}/how-to-start-llc-as-non-resident`} className="hover:text-brand-600">
                How to Start an LLC
              </Link>
            </li>
            <li>
              <Link to={`/${lang}/vs/stripe-atlas`} className="hover:text-brand-600">
                vs Stripe Atlas
              </Link>
            </li>
            <li>
              <Link to={`/${lang}/form-5472`} className="hover:text-brand-600">
                Form 5472 explained
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="font-semibold text-ink-900 mb-2">Contact</p>
          <ul className="space-y-1 text-ink-500">
            <li>hello@consultincusa.com</li>
            <li>WhatsApp: +1 (XXX) XXX-XXXX</li>
            <li>
              <Link to={`/${lang}/${lang === 'en' ? 'book' : 'agendar'}`} className="hover:text-brand-600">
                {t('nav.book')}
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-ink-300 py-4 px-4 text-xs text-ink-500 text-center">
        <p>{t('footer.rights')}</p>
        <p className="mt-1 max-w-2xl mx-auto">{t('footer.disclaimer')}</p>
      </div>
    </footer>
  )
}
