import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { RotatingTagline } from './RotatingTagline'
import { LeadFormSimple } from './LeadFormSimple'
import { MonogramAvatar } from './MonogramAvatar'
import { setSeo } from '../lib/seo'
import type { IndustryConfig } from '../data/industryConfig'
import { Check, AlertTriangle, Eye } from 'lucide-react'

export function LandingPage({ config }: { config: IndustryConfig }) {
  useEffect(() => {
    setSeo({
      title: config.pageTitle,
      description: config.metaDescription,
      lang: 'en',
      canonical: `https://consultincusa.com${config.url}`,
    })
  }, [config])

  return (
    <div className="bg-brand-cream text-brand-navy">
      <section className="max-w-5xl mx-auto px-4 md:px-10 py-16 md:py-24">
        <p className="text-xs uppercase tracking-widest text-brand-navy font-bold">
          CAPITAL · SYSTEMS · OPERATIONS · STACK INTELLIGENCE FOR {config.industryShort.toUpperCase()}
        </p>
        <RotatingTagline className="mt-4 block" />
        <h1 className="mt-6 font-serif text-5xl md:text-7xl font-bold tracking-tight leading-[1.05]">
          How you can work at the speed of commerce too.
        </h1>
        <p className="mt-6 text-lg md:text-xl text-ink-500 max-w-2xl">
          We map your competitors' tech stacks. {config.industryLabel}, tool by tool.
          Free 1-pager sent in 24 hours.
        </p>
        <p className="mt-3 text-sm text-ink-500 max-w-2xl">
          Stack intel is where we start. We also place capital, build systems, and audit ops.{' '}
          <Link to="/about" className="text-brand-coral font-bold hover:underline">
            Learn how →
          </Link>
        </p>
        <div className="mt-8 max-w-xl">
          <LeadFormSimple industry={config.slug} />
        </div>
        <p className="mt-4 text-sm text-ink-500">
          Free 1-pager sent within 24h · No spam · Already trusted by operators in 12+ countries
        </p>
      </section>

      <section className="max-w-5xl mx-auto px-4 md:px-10 py-16 border-t-2 border-brand-navy">
        <h2 className="font-serif text-3xl md:text-5xl font-bold mb-8">
          What's in the full {config.industryShort} Stack Atlas
        </h2>
        <ul className="grid md:grid-cols-2 gap-4">
          {config.atlasIncludes.map((item, i) => (
            <li key={i} className="flex gap-3 text-lg">
              <Check className="w-6 h-6 text-brand-coral shrink-0 mt-1" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="max-w-5xl mx-auto px-4 md:px-10 py-16">
        <h2 className="font-serif text-3xl md:text-5xl font-bold mb-4">
          What's in the free 1-pager
        </h2>
        <p className="text-lg text-ink-500 mb-8">
          The teaser before the full Atlas. Real data. Real brands.
        </p>
        <ul className="space-y-3">
          {config.onePagerIncludes.map((item, i) => (
            <li key={i} className="flex gap-3 text-lg">
              <Eye className="w-6 h-6 text-brand-coral shrink-0 mt-1" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="max-w-5xl mx-auto px-4 md:px-10 py-16 border-t-2 border-brand-navy">
        <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">{config.sampleTitle}</h2>
        <p className="text-lg text-ink-500 mb-8">
          A preview. Brand names redacted on this page — full names in the 1-pager.
        </p>
        <div className="bg-brand-paper border-2 border-brand-navy shadow-heritage overflow-x-auto">
          <table className="w-full text-left">
            <thead className="border-b-2 border-brand-navy bg-brand-cream">
              <tr>
                <th className="px-4 py-3 text-xs uppercase tracking-widest">Brand</th>
                <th className="px-4 py-3 text-xs uppercase tracking-widest">Size</th>
                <th className="px-4 py-3 text-xs uppercase tracking-widest">Tool 1</th>
                <th className="px-4 py-3 text-xs uppercase tracking-widest">Tool 2</th>
                <th className="px-4 py-3 text-xs uppercase tracking-widest">Tool 3</th>
              </tr>
            </thead>
            <tbody>
              {config.samplePreviewRows.map((row, i) => (
                <tr key={i} className="border-b border-ink-300 last:border-0">
                  <td className="px-4 py-3 font-bold blur-sm select-none">{row.brand}</td>
                  <td className="px-4 py-3">{row.revenue}</td>
                  <td className="px-4 py-3">{row.tool1}</td>
                  <td className="px-4 py-3">{row.tool2}</td>
                  <td className="px-4 py-3">{row.tool3}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 md:px-10 py-16 border-t-2 border-brand-navy">
        <h2 className="font-serif text-3xl md:text-5xl font-bold mb-8">The cost of not knowing</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {config.costOfNotKnowing.map((card, i) => (
            <div
              key={i}
              className="bg-brand-paper border-2 border-brand-navy shadow-heritage p-6"
            >
              <AlertTriangle className="w-8 h-8 text-brand-coral mb-3" />
              <h3 className="font-serif text-xl font-bold mb-2">{card.title}</h3>
              <p className="text-sm text-ink-500">{card.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 md:px-10 py-16">
        <div className="flex items-start gap-6">
          <MonogramAvatar name="Founder Name" size="lg" />
          <div>
            <p className="font-bold text-base mb-2">Why we built this</p>
            <p className="text-lg text-ink-700 leading-relaxed">
              I spent years guessing tool choices. Wrong tools cost me weeks. The right
              ones doubled my output. I built consultincusa to spare other operators the
              same mistakes. The Atlas is what I wished existed when I started.
            </p>
            <p className="text-lg text-ink-700 leading-relaxed mt-3">
              No fluff. Just the stacks of operators winning right now.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 md:px-10 py-16 border-t-2 border-brand-navy">
        <h2 className="font-serif text-3xl md:text-5xl font-bold mb-8 text-center">
          Common questions
        </h2>
        <div className="space-y-4">
          {config.faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-brand-paper border-2 border-brand-navy shadow-heritage p-6"
            >
              <p className="font-serif text-lg font-bold mb-2">{faq.q}</p>
              <p className="text-base text-ink-700">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-brand-navy text-white">
        <div className="max-w-3xl mx-auto px-4 md:px-10 py-20 text-center">
          <h2 className="font-serif text-4xl md:text-6xl font-bold leading-tight mb-6">
            Get the 1-pager. Then get the Atlas.
          </h2>
          <p className="text-lg opacity-90 mb-8">One email. 24 hours. Real data. No spam.</p>
          <div className="max-w-xl mx-auto">
            <LeadFormSimple industry={config.slug} />
          </div>
        </div>
      </section>
    </div>
  )
}
