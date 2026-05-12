import { Link, NavLink } from 'react-router-dom'
import clsx from 'clsx'

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/offers', label: 'Offers' },
  { to: '/insights', label: 'Insights' },
  { to: '/about', label: 'About' },
  { to: '/dtc-stack', label: 'DTC' },
  { to: '/agency-stack', label: 'Agency' },
  { to: '/newsletter-stack', label: 'Newsletter' },
]

export function Header() {
  return (
    <header className="border-b-2 border-brand-navy bg-brand-cream sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 md:px-10 h-16 flex items-center justify-between">
        <Link to="/" className="font-serif font-bold text-brand-navy text-xl tracking-tight">
          consultincusa
        </Link>
        <nav className="hidden md:flex items-center gap-5 text-sm font-bold uppercase tracking-wider">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                clsx(
                  'transition-colors',
                  isActive ? 'text-brand-coral' : 'text-brand-navy hover:text-brand-coral',
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
          <Link
            to="/book"
            className="bg-brand-coral text-white px-4 py-2 border-2 border-brand-navy shadow-heritage hover:shadow-heritage-pop transition-all"
          >
            Book
          </Link>
        </nav>
        <Link
          to="/book"
          className="md:hidden bg-brand-coral text-white px-3 py-1.5 border-2 border-brand-navy text-sm font-bold uppercase"
        >
          Book
        </Link>
      </div>
    </header>
  )
}
