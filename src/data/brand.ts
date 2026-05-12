export const BRAND = {
  name: 'consultincusa',
  legal: 'Consultinc LLC',
  domain: 'consultincusa.com',
  email: 'hello@consultincusa.com',

  tagline: 'We assess. We audit. We propose.',
  pillarLine: 'Capital · Systems · Operations',
  subhead: 'Your outside Capital, Systems, and Operations desk.',
  thesis: 'Three roles. One operating brain.',
  anchor:
    'For owner-operators doing $500K–$50M. We diagnose first, recommend second, and only build or place when the math actually works.',
  founderLine:
    "Built by operators, for operators. A working desk, not a directory. Capital, systems, and ops sit at the same table because that's how decisions actually land in a real business.",

  pillars: [
    {
      key: 'capital',
      label: 'Capital',
      lead: 'SBA-savvy without the SBA-lifer brittleness.',
      body: 'Packages files, shops the lender bench, stays on the deal until it funds. Paid by closing lender.',
      products: [
        'SBA 7(a) and 504',
        'Working capital + lines of credit',
        'Equipment, factoring, MCA cleanup',
        'Acquisitions and partner buyouts',
      ],
    },
    {
      key: 'systems',
      label: 'Systems',
      lead: 'Builds the software your team actually opens.',
      body: "Cloudflare-grade infrastructure when the use case justifies it; no over-engineering when it doesn't.",
      products: [
        'Custom apps + internal tools',
        'CRM, intake, document pipelines',
        'API + automation glue',
        'Cloudflare Workers · D1 · React',
      ],
    },
    {
      key: 'operations',
      label: 'Operations',
      lead: 'Audits the moving parts and proposes a plan you can actually execute.',
      body: 'Vendor stack, SOPs, low-voltage / access build-outs through licensed integrator partners.',
      products: [
        'Process & SOP audits',
        'Vendor and stack consolidation',
        'Low-voltage / access control',
        'Quality-of-earnings coordination',
      ],
    },
  ] as const,

  ladder: [
    {
      number: '01',
      tier: 'Assess',
      price: 'Free',
      note: '15 min · no commitment',
      blurb:
        "Short call or form. We listen, ask the right questions, tell you whether what you're asking for is the right thing to ask for.",
      bullets: [
        'Run any tool, free, no email wall',
        'Honest read on fit — capital, systems, ops',
        'No pitch. No upsell. Just direction.',
      ],
      ctaLabel: 'Start with a tool',
      ctaHref: '/book',
      featured: false,
      featuredLabel: '',
    },
    {
      number: '02',
      tier: 'Audit',
      price: 'Scoped',
      note: 'Fixed fee · agreed up front',
      blurb:
        "We dig into the numbers, contracts, systems, eligibility. Tell you what's real and what's noise — without selling you anything yet.",
      bullets: [
        'Debt schedule + cash flow review',
        'State-aware program eligibility map',
        'Vendor / stack / ops audit if relevant',
        'Written findings · yours to keep',
      ],
      ctaLabel: 'Scope an audit',
      ctaHref: '/book?intent=audit',
      featured: true,
      featuredLabel: 'Most engagements start here',
    },
    {
      number: '03',
      tier: 'Propose + Place',
      price: 'Success-based',
      note: 'Paid by closer · not by you',
      blurb:
        'A plan you can act on — with us, with someone else, or shelf for a quarter. If we place capital, the lender pays our fee at funding.',
      bullets: [
        'Lender packaging + placement',
        'Systems build / integrator coordination',
        'Nothing owed if nothing closes',
        'Documented in writing before we begin',
      ],
      ctaLabel: 'Talk through a deal',
      ctaHref: '/book?intent=propose',
      featured: false,
      featuredLabel: '',
    },
  ] as const,

  fitIf: [
    '$500K–$50M annual revenue',
    'You sign the checks · or you’re next to who does',
    'You’ve been pitched by 6 brokers and trust 0',
    'Capital, systems, or ops decision is on your desk this quarter',
  ],

  fitNot: [
    'Pre-revenue / idea stage',
    'Looking for the cheapest MCA broker',
    'A retail investor — we’re B2B only',
    'Hoping someone says yes when the math says no',
  ],

  trustCards: [
    {
      number: '01',
      title: 'State-aware eligibility',
      body: 'Each lender covers a specific state list with specific zip exclusions. Our tools route accordingly. A "yes" in California means little if our SBA partners don’t run California paper.',
    },
    {
      number: '02',
      title: 'Paid by closers, not seekers',
      body: 'You pay nothing until something funds. If a deal doesn’t close, you don’t owe us. Documented in writing up front. Audit fees are scoped, fixed, and refundable if we recommend not engaging.',
    },
    {
      number: '03',
      title: '"No" is a real answer',
      body: 'If the math says wait a quarter — or go elsewhere — we say so. We pass on more deals than we take. The ones we take, we close.',
    },
  ] as const,

  legalDisclosures: [
    'We are not a lender, a registered investment advisor, or a broker-dealer.',
    'Eligibility for capital products varies by state and by lender; we will always disclose state coverage before recommending a product.',
    'No fee structure described on this site is a guarantee of approval, funding, rate, or term.',
  ],
} as const
