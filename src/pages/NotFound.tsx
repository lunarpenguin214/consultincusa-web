import { Link } from 'react-router-dom'

export function NotFound() {
  return (
    <section className="flex-1 flex flex-col items-center justify-center px-4 py-24 text-center bg-brand-cream">
      <h1 className="font-serif text-7xl md:text-9xl font-bold text-brand-navy">404</h1>
      <p className="mt-4 text-xl text-ink-500">This page does not exist.</p>
      <Link
        to="/"
        className="mt-8 bg-brand-coral text-white font-bold uppercase tracking-wider px-6 py-3 border-2 border-brand-navy shadow-heritage hover:shadow-heritage-pop transition-all"
      >
        Take me home
      </Link>
    </section>
  )
}
