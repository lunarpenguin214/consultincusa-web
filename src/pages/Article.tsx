import { useEffect } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import { getArticle } from '../lib/articles'
import { setSeo } from '../lib/seo'

export function Article({ slug }: { slug: string }) {
  const { lang = 'en' } = useParams<{ lang: 'en' | 'pt' | 'es' }>()
  const article = getArticle(slug, lang as 'en' | 'pt' | 'es')

  useEffect(() => {
    if (!article) return
    setSeo({
      title: article.frontmatter.title,
      description: article.frontmatter.description,
      lang: article.lang,
      canonical: article.frontmatter.canonical_url,
      hreflangs: article.frontmatter.hreflang,
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': article.frontmatter.schema_type ?? 'Article',
        headline: article.frontmatter.title,
        description: article.frontmatter.description,
        author: { '@type': 'Organization', name: article.frontmatter.author ?? 'consultincusa' },
        datePublished: article.frontmatter.date,
        dateModified: article.frontmatter.updated_at,
        inLanguage: article.lang,
      },
    })
  }, [article])

  if (!article) {
    return <Navigate to={`/${lang}`} replace />
  }

  return (
    <article className="max-w-3xl mx-auto px-4 py-12 prose prose-lg">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSlug, [rehypeAutolinkHeadings, { behavior: 'wrap' }]]}
      >
        {article.content}
      </ReactMarkdown>
    </article>
  )
}
