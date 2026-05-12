type Hreflangs = Record<string, string>

export interface SeoConfig {
  title: string
  description: string
  lang: string
  canonical?: string
  hreflangs?: Hreflangs
  ogImage?: string
  jsonLd?: object
}

export function setSeo(cfg: SeoConfig) {
  document.title = cfg.title
  document.documentElement.lang = cfg.lang

  upsertMeta('name', 'description', cfg.description)
  upsertMeta('property', 'og:title', cfg.title)
  upsertMeta('property', 'og:description', cfg.description)
  upsertMeta('property', 'og:type', 'website')
  upsertMeta('property', 'og:url', cfg.canonical ?? window.location.href)
  if (cfg.ogImage) upsertMeta('property', 'og:image', cfg.ogImage)
  upsertMeta('name', 'twitter:card', 'summary_large_image')
  upsertMeta('name', 'twitter:title', cfg.title)
  upsertMeta('name', 'twitter:description', cfg.description)

  upsertLink('canonical', cfg.canonical ?? window.location.href)

  // hreflang tags for SEO
  document.querySelectorAll('link[rel="alternate"][hreflang]').forEach((el) => el.remove())
  if (cfg.hreflangs) {
    for (const [hreflang, href] of Object.entries(cfg.hreflangs)) {
      const link = document.createElement('link')
      link.rel = 'alternate'
      link.hreflang = hreflang
      link.href = href
      document.head.appendChild(link)
    }
    const xDef = document.createElement('link')
    xDef.rel = 'alternate'
    xDef.hreflang = 'x-default'
    xDef.href = cfg.hreflangs.en ?? Object.values(cfg.hreflangs)[0]
    document.head.appendChild(xDef)
  }

  // JSON-LD
  document.querySelectorAll('script[type="application/ld+json"][data-cu]').forEach((el) =>
    el.remove(),
  )
  if (cfg.jsonLd) {
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.setAttribute('data-cu', 'seo')
    script.textContent = JSON.stringify(cfg.jsonLd)
    document.head.appendChild(script)
  }
}

function upsertMeta(attr: 'name' | 'property', key: string, value: string) {
  let el = document.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', value)
}

export const ORGANIZATION_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'consultincusa',
  legalName: 'Consultinc LLC',
  url: 'https://consultincusa.com',
  email: 'hello@consultincusa.com',
  description:
    'Capital, systems, and operations consultancy for owner-operators doing $500K-$50M revenue.',
  founder: {
    '@type': 'Person',
    name: 'Yomama',
  },
  sameAs: [] as string[],
}

function upsertLink(rel: string, href: string) {
  let el = document.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}
