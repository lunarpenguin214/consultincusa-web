import { createBrowserRouter, Navigate } from 'react-router-dom'
import { LocaleLayout } from './components/LocaleLayout'
import { Home } from './pages/Home'
import { Article } from './pages/Article'
import { Book } from './pages/Book'
import { Form5472 } from './pages/Form5472'
import { MercuryRescue } from './pages/MercuryRescue'
import { NotFound } from './pages/NotFound'
import { SUPPORTED_LANGS } from './i18n'

// Detect browser language and redirect / -> /<lang>
function RootRedirect() {
  const stored = typeof window !== 'undefined' ? localStorage.getItem('lang') : null
  const navLang = typeof navigator !== 'undefined' ? navigator.language?.slice(0, 2) : 'en'
  const target = SUPPORTED_LANGS.includes((stored ?? navLang) as never)
    ? (stored ?? navLang)
    : 'en'
  return <Navigate to={`/${target}`} replace />
}

export const router = createBrowserRouter([
  { path: '/', element: <RootRedirect /> },
  {
    path: '/:lang',
    element: <LocaleLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'how-to-start-llc-as-non-resident', element: <Article slug="how-to-start-llc-as-non-resident" /> },
      { path: 'como-abrir-llc-nos-eua-sendo-brasileiro', element: <Article slug="como-abrir-llc-nos-eua-sendo-brasileiro" /> },
      { path: 'como-abrir-llc-en-usa-siendo-no-residente', element: <Article slug="como-abrir-llc-en-usa-siendo-no-residente" /> },
      { path: 'vs/stripe-atlas', element: <Article slug="vs-stripe-atlas" /> },
      { path: 'book', element: <Book /> },
      { path: 'agendar', element: <Book /> },
      { path: 'form-5472', element: <Form5472 /> },
      { path: 'mercury-rescue', element: <MercuryRescue /> },
      { path: 'mercury-rechazo', element: <MercuryRescue /> },
    ],
  },
  { path: '*', element: <NotFound /> },
])
