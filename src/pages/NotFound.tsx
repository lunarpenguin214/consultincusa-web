import { Link } from 'react-router-dom'

export function NotFound() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-6xl font-bold text-ink-900">404</h1>
      <p className="mt-4 text-xl text-ink-500">This page does not exist.</p>
      <Link
        to="/en"
        className="mt-8 bg-brand-600 hover:bg-brand-700 text-white font-semibold px-6 py-3 rounded-md transition"
      >
        Take me home
      </Link>
    </section>
  )
}
