import matter from 'gray-matter'

export interface ArticleFrontmatter {
  title: string
  description: string
  date: string
  author?: string
  updated_at?: string
}

export interface Article {
  slug: string
  lang: 'en'
  frontmatter: ArticleFrontmatter
  content: string
}

const rawInsights = import.meta.glob('/src/content/insights/**/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

const INSIGHTS: Article[] = Object.entries(rawInsights)
  .filter(([path]) => !path.endsWith('_placeholder.md'))
  .map(([path, raw]) => {
    const m = path.match(/\/src\/content\/insights\/([^/]+)\.md$/)
    if (!m) throw new Error(`Bad insight path: ${path}`)
    const [, slug] = m
    const parsed = matter(raw)
    return {
      slug,
      lang: 'en' as const,
      frontmatter: parsed.data as ArticleFrontmatter,
      content: parsed.content,
    }
  })
  .sort((a, b) => {
    const dateA = a.frontmatter.date ?? ''
    const dateB = b.frontmatter.date ?? ''
    return dateB.localeCompare(dateA)
  })

export function getPost(slug: string): Article | undefined {
  return INSIGHTS.find((p) => p.slug === slug)
}

export function getAllPosts(): Article[] {
  return INSIGHTS
}
