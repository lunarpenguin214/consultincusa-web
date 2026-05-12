import { Link } from 'react-router-dom'
import { BRAND } from '../data/brand'

export function Footer() {
  return (
    <footer className="bg-brand-navy text-white border-t-2 border-brand-navy mt-auto">
      <div className="max-w-6xl mx-auto px-4 md:px-10 py-12">
        <p className="font-serif text-2xl md:text-3xl font-bold mb-2">
          {BRAND.pillarLine} · under one roof.
        </p>
        <p className="text-sm uppercase tracking-widest opacity-70">{BRAND.tagline}</p>
        <div className="mt-10 grid md:grid-cols-4 gap-8 text-sm">
          <div>
            <p className="font-bold uppercase tracking-widest mb-3">{BRAND.name}</p>
            <p className="opacity-70">
              {BRAND.legal} · {new Date().getFullYear()}
            </p>
            <p className="mt-2 opacity-70">
              <a href={`mailto:${BRAND.email}`} className="hover:text-brand-coral">
                {BRAND.email}
              </a>
            </p>
          </div>
          <div>
            <p className="font-bold uppercase tracking-widest mb-3">Navigate</p>
            <ul className="space-y-2 opacity-70">
              <li>
                <Link to="/" className="hover:text-brand-coral">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/offers" className="hover:text-brand-coral">
                  Offers
                </Link>
              </li>
              <li>
                <Link to="/insights" className="hover:text-brand-coral">
                  Insights
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-brand-coral">
                  About
                </Link>
              </li>
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
              <li>
                <Link to="/book" className="hover:text-brand-coral">
                  Book the 15-min call
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="font-bold uppercase tracking-widest mb-3">Other tools</p>
            <ul className="space-y-2 opacity-70 text-sm">
              <li>
                <a
                  href="https://voicehours.consultincllc.workers.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-coral"
                >
                  VoiceHours — voice business hours tool ↗
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="font-bold uppercase tracking-widest mb-3">Disclosures</p>
            <ul className="space-y-2 text-xs opacity-60 leading-relaxed">
              {BRAND.legalDisclosures.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 px-4 text-xs opacity-50 text-center">
        <p>© {new Date().getFullYear()} {BRAND.name}. All rights reserved.</p>
      </div>
    </footer>
  )
}
