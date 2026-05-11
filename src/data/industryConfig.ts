export interface IndustryConfig {
  slug: 'dtc' | 'agency' | 'newsletter'
  url: string
  pageTitle: string
  metaDescription: string
  industryLabel: string
  industryShort: string
  sampleTitle: string
  samplePreviewRows: {
    brand: string
    revenue: string
    tool1: string
    tool2: string
    tool3: string
  }[]
  atlasIncludes: string[]
  onePagerIncludes: string[]
  costOfNotKnowing: { title: string; body: string }[]
  faqs: { q: string; a: string }[]
}

export const CONFIGS: Record<'dtc' | 'agency' | 'newsletter', IndustryConfig> = {
  dtc: {
    slug: 'dtc',
    url: '/dtc-stack',
    pageTitle: 'The DTC Stack — Tools every $1M-$10M brand actually runs',
    metaDescription:
      'Free 1-pager: the exact tech stack of the top 10 DTC brands at $1M-$10M revenue. Email platform, SMS, analytics, support — mapped tool by tool.',
    industryLabel: 'DTC E-commerce',
    industryShort: 'DTC',
    sampleTitle: "Top 10 DTC brands' stack at a glance",
    samplePreviewRows: [
      { brand: 'Brand A', revenue: '$5M', tool1: 'Shopify', tool2: 'Klaviyo', tool3: 'Gorgias' },
      { brand: 'Brand B', revenue: '$3M', tool1: 'Shopify', tool2: 'Sendlane', tool3: 'Front' },
      { brand: 'Brand C', revenue: '$8M', tool1: 'Shopify Plus', tool2: 'Klaviyo', tool3: 'Triple Whale' },
      { brand: 'Brand D', revenue: '$2M', tool1: 'Shopify', tool2: 'Omnisend', tool3: 'Reamaze' },
      { brand: 'Brand E', revenue: '$10M', tool1: 'Shopify Plus', tool2: 'Klaviyo', tool3: 'Triple Whale' },
    ],
    atlasIncludes: [
      '50 DTC brands at $1M-$10M revenue analyzed tool by tool',
      'The 5 competitive gap tools the top 10% use that the bottom 50% do not',
      "Monthly cost estimate of each top brand's full stack",
      'Trending tools (Triple Whale, Postscript, Loop, etc.) vs declining ones',
      'Pre-built stack recommendations by revenue tier (sub-$1M / $1-3M / $3-10M)',
    ],
    onePagerIncludes: [
      '10 real brands at $1M-$10M, named',
      '5 stack categories: e-com platform, email, SMS, analytics, support',
      'Cost note: typical monthly spend per brand',
    ],
    costOfNotKnowing: [
      {
        title: 'Wasted 80 hours testing tools',
        body: 'Picking wrong tools costs 80+ hours over 6 months on switching, importing, retraining staff.',
      },
      {
        title: 'Paying 2× for 60% of features',
        body: 'Operators routinely overpay because they default to the loudest brand, not the right fit.',
      },
      {
        title: 'Falling behind on Black Friday',
        body: 'Without the same stack as the top brands, you ship slower. By Q4 you are 30 days behind.',
      },
    ],
    faqs: [
      {
        q: 'Is this real data or estimates?',
        a: 'Real. Sourced from BuiltWith, public case studies, agency portfolios, and direct conversations with brand operators. We name names in the full Atlas.',
      },
      {
        q: 'How fresh is the data?',
        a: 'Atlas refreshes every 90 days. Free 1-pager always uses the latest snapshot.',
      },
      {
        q: 'Who is this for?',
        a: 'DTC brand operators at $500K-$10M revenue who pick their own tools. If you have a procurement team this is too tactical.',
      },
      {
        q: 'When is the full Atlas ready?',
        a: 'Pre-ordered Atlases ship within 6 weeks of pre-order threshold being met. Free 1-pager ships in 24 hours regardless.',
      },
    ],
  },
  agency: {
    slug: 'agency',
    url: '/agency-stack',
    pageTitle: 'The Agency Stack — Tools mid-size performance agencies actually run',
    metaDescription:
      'Free 1-pager: the exact tech stack of top mid-size performance agencies. CRM, reporting, comms, time-tracking — mapped tool by tool.',
    industryLabel: 'Performance Agencies',
    industryShort: 'Agency',
    sampleTitle: 'Top 10 mid-size performance agency stacks',
    samplePreviewRows: [
      { brand: 'Agency A', revenue: '15 people', tool1: 'HubSpot', tool2: 'Notion', tool3: 'Loom' },
      { brand: 'Agency B', revenue: '8 people', tool1: 'Pipedrive', tool2: 'ClickUp', tool3: 'Slack' },
      { brand: 'Agency C', revenue: '30 people', tool1: 'HubSpot', tool2: 'Asana', tool3: 'Harvest' },
      { brand: 'Agency D', revenue: '12 people', tool1: 'Copper', tool2: 'Notion', tool3: 'Loom' },
      { brand: 'Agency E', revenue: '20 people', tool1: 'HubSpot', tool2: 'Monday', tool3: 'Toggl' },
    ],
    atlasIncludes: [
      '50 performance agencies (5-50 people) analyzed end to end',
      'The CRM + comms + time-tracking combo that retains clients longest',
      'Stripe vs custom invoicing — what % use what at what size',
      'Trending tools (Loom, Tella, Cabal) vs the legacy tools agencies are dropping',
      'Recommended stack by team size: solo, 5-15, 15-50',
    ],
    onePagerIncludes: [
      '10 real agencies (5-50 people), named',
      '5 stack categories: CRM, reporting, comms, time-tracking, finance',
      'Note: typical monthly stack spend per agency size',
    ],
    costOfNotKnowing: [
      {
        title: 'Losing 2 clients to better-organized competitors',
        body: 'Clients leave for agencies that respond faster — wrong stack = slow comms = churn.',
      },
      {
        title: 'Paying for HubSpot when you need Pipedrive',
        body: 'Overpaying for enterprise CRM features your team never touches.',
      },
      {
        title: 'Hiring 2 people when 1 tool would do',
        body: 'Stacks that automate reporting save a full headcount at the 15-person mark.',
      },
    ],
    faqs: [
      {
        q: 'Is this real data or estimates?',
        a: 'Real. Sourced from LinkedIn job postings, agency portfolios, conference talks, and direct conversations with agency owners.',
      },
      { q: 'How fresh is the data?', a: 'Atlas refreshes every 90 days.' },
      {
        q: 'Who is this for?',
        a: 'Agency owners at 5-50 people who personally pick their tools. Bigger agencies have procurement — we are too tactical.',
      },
      {
        q: 'When is the full Atlas ready?',
        a: 'Pre-ordered Atlases ship within 6 weeks of threshold. Free 1-pager ships in 24 hours regardless.',
      },
    ],
  },
  newsletter: {
    slug: 'newsletter',
    url: '/newsletter-stack',
    pageTitle: 'The Newsletter Stack — Tools the top paid newsletters actually run',
    metaDescription:
      'Free 1-pager: the exact tech stack of top paid newsletters at $100K-$2M ARR. Platform, payment, analytics, growth — mapped tool by tool.',
    industryLabel: 'Newsletter Creators',
    industryShort: 'Newsletter',
    sampleTitle: 'Top 10 paid newsletter creator stacks',
    samplePreviewRows: [
      { brand: 'Newsletter A', revenue: '120K subs', tool1: 'Beehiiv', tool2: 'Stripe', tool3: 'Tally' },
      { brand: 'Newsletter B', revenue: '80K subs', tool1: 'Substack', tool2: 'Substack pay', tool3: 'Calendly' },
      { brand: 'Newsletter C', revenue: '200K subs', tool1: 'Ghost', tool2: 'Stripe', tool3: 'Plausible' },
      { brand: 'Newsletter D', revenue: '50K subs', tool1: 'Kit', tool2: 'Stripe', tool3: 'Typeform' },
      { brand: 'Newsletter E', revenue: '300K subs', tool1: 'Beehiiv', tool2: 'Stripe', tool3: 'PostHog' },
    ],
    atlasIncludes: [
      '50 paid newsletters ($100K-$2M ARR) analyzed platform by platform',
      'Beehiiv vs Substack vs Ghost vs Kit — what % chose what and why',
      'The growth tools the top newsletters use that yours probably does not',
      'Monetization stack: Stripe vs platform-native, sponsorship CRM, course add-ons',
      'Recommended stack by subscriber count: under 10K, 10-50K, 50-200K, 200K+',
    ],
    onePagerIncludes: [
      '10 real paid newsletters, named',
      '5 stack categories: platform, payment, analytics, growth, sponsorship',
      'Note: typical monthly stack spend per subscriber tier',
    ],
    costOfNotKnowing: [
      {
        title: 'Stuck on the wrong platform at 50K subs',
        body: 'Migrating Substack → Beehiiv at 50K subs costs 2-3 weeks of growth. Pick right the first time.',
      },
      {
        title: 'Leaving $30K/yr in monetization on the table',
        body: 'Top newsletters layer 3-4 revenue streams. Most beginners use one. The Atlas shows the layering.',
      },
      {
        title: 'No growth stack = stuck at organic only',
        body: 'Growth tools (SparkLoop, refer-a-friend, partner stack) double sub growth. Without them you plateau.',
      },
    ],
    faqs: [
      {
        q: 'Is this real data or estimates?',
        a: 'Real. Newsletter platforms show their footer/branding publicly, payments are sourced from public Stripe receipts and creator interviews.',
      },
      { q: 'How fresh is the data?', a: 'Atlas refreshes every 90 days.' },
      {
        q: 'Who is this for?',
        a: 'Newsletter operators at $100K-$2M ARR. Hobbyist newsletters under $50K ARR will find this too advanced.',
      },
      {
        q: 'When is the full Atlas ready?',
        a: 'Pre-ordered Atlases ship within 6 weeks of threshold. Free 1-pager ships in 24 hours regardless.',
      },
    ],
  },
}
