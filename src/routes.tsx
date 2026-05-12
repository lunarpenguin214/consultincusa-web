import { createBrowserRouter } from 'react-router-dom'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import { About } from './pages/About'
import { Offers } from './pages/Offers'
import { Insights } from './pages/Insights'
import { InsightPost } from './pages/InsightPost'
import { DtcStack } from './pages/DtcStack'
import { AgencyStack } from './pages/AgencyStack'
import { NewsletterStack } from './pages/NewsletterStack'
import { Book } from './pages/Book'
import { NotFound } from './pages/NotFound'

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/about', element: <About /> },
      { path: '/offers', element: <Offers /> },
      { path: '/insights', element: <Insights /> },
      { path: '/insights/:slug', element: <InsightPost /> },
      { path: '/dtc-stack', element: <DtcStack /> },
      { path: '/agency-stack', element: <AgencyStack /> },
      { path: '/newsletter-stack', element: <NewsletterStack /> },
      { path: '/book', element: <Book /> },
      { path: '*', element: <NotFound /> },
    ],
  },
])
