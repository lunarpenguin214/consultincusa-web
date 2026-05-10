import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import en from './locales/en.json'
import pt from './locales/pt.json'
import es from './locales/es.json'

export const SUPPORTED_LANGS = ['en', 'pt', 'es'] as const
export type Lang = (typeof SUPPORTED_LANGS)[number]

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      pt: { translation: pt },
      es: { translation: es },
    },
    fallbackLng: 'en',
    supportedLngs: ['en', 'pt', 'es'],
    interpolation: { escapeValue: false },
    detection: {
      order: ['path', 'navigator'],
      lookupFromPathIndex: 0,
    },
  })

export default i18n
