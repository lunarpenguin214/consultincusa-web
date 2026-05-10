import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { SUPPORTED_LANGS, type Lang } from '../i18n'

const FLAGS: Record<Lang, string> = { en: '🇺🇸', pt: '🇧🇷', es: '🇪🇸' }

export function LangSwitcher() {
  const { lang = 'en' } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const { t } = useTranslation()

  return (
    <select
      aria-label="Language"
      value={lang}
      onChange={(e) => {
        const next = e.target.value as Lang
        const newPath = location.pathname.replace(`/${lang}`, `/${next}`)
        localStorage.setItem('lang', next)
        navigate(newPath)
      }}
      className="border border-ink-300 rounded-md px-2 py-1 text-sm bg-white"
    >
      {SUPPORTED_LANGS.map((l) => (
        <option key={l} value={l}>
          {FLAGS[l]} {t(`lang.${l}`)}
        </option>
      ))}
    </select>
  )
}
