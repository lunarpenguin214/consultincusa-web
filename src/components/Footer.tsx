import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="border-t-2 border-brand-navy bg-brand-cream mt-auto">
      <div className="max-w-6xl mx-auto px-4 md:px-10 py-10 grid md:grid-cols-3 gap-8 text-sm">
        <div>
          <p className="font-serif font-bold text-brand-navy text-lg">consultincusa</p>
          <p className="mt-2 text-ink-500">
            Stack intelligence for operators. Industry by industry.
          </p>
        </div>
        <div>
          <p className="font-bold uppercase tracking-wider text-brand-navy mb-2">Industries</p>
          <ul className="space-y-1 text-ink-500">
            <li>
              <Link to="/dtc-stack" className="hover:text-brand-coral">
                DTC E-commerce
              </Link>
            </li>
            <li>
              <Link to="/agency-stack" className="hover:text-brand-coral">
                Performance Agencies
              </Link>
            </li>
            <li>
              <Link to="/newsletter-stack" className="hover:text-brand-coral">
                Newsletter Creators
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="font-bold uppercase tracking-wider text-brand-navy mb-2">Contact</p>
          <ul className="space-y-1 text-ink-500">
            <li>
              <a href="mailto:hello@consultincusa.com" className="hover:text-brand-coral">
                hello@consultincusa.com
              </a>
            </li>
            <li>
              <Link to="/book" className="hover:text-brand-coral">
                Book a 15-min call
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-ink-300 py-4 px-4 text-xs text-ink-500 text-center">
        <p>© {new Date().getFullYear()} consultincusa. All rights reserved.</p>
      </div>
    </footer>
  )
}
