import { Outlet, useParams, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Header } from './Header'
import { Footer } from './Footer'
import { SUPPORTED_LANGS, type Lang } from '../i18n'

export function LocaleLayout() {
  const { lang } = useParams<{ lang: string }>()
  const { i18n } = useTranslation()

  useEffect(() => {
    if (lang && SUPPORTED_LANGS.includes(lang as Lang)) {
      i18n.changeLanguage(lang)
      localStorage.setItem('lang', lang)
      document.documentElement.lang = lang
    }
  }, [lang, i18n])

  if (!lang || !SUPPORTED_LANGS.includes(lang as Lang)) {
    return <Navigate to="/en" replace />
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
