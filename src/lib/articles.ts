import matter from 'gray-matter'

// Vite glob: import all .md files under src/content as raw strings.
// The keys come back as paths like '/src/content/en/how-to-start-llc-as-non-resident.md'
const rawArticles = import.meta.glob('/src/content/**/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

export interface Article {
  slug: string
  lang: 'en' | 'pt' | 'es'
  frontmatter: {
    title: string
    description: string
    keywords?: string[]
    date?: string
    updated_at?: string
    author?: string
    canonical_url?: string
    hreflang?: Record<string, string>
    schema_type?: string
    [key: string]: unknown
  }
  content: string
}

const ARTICLES: Article[] = Object.entries(rawArticles).map(([path, raw]) => {
  // path: /src/content/<lang>/<slug>.md
  const m = path.match(/\/src\/content\/(en|pt|es)\/([^/]+)\.md$/)
  if (!m) throw new Error(`Bad article path: ${path}`)
  const [, lang, slug] = m
  const parsed = matter(raw)
  return {
    slug,
    lang: lang as 'en' | 'pt' | 'es',
    frontmatter: parsed.data as Article['frontmatter'],
    content: parsed.content,
  }
})

export function getArticle(slug: string, lang: 'en' | 'pt' | 'es'): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug && a.lang === lang)
}

export function getAllArticles(): Article[] {
  return ARTICLES
}
