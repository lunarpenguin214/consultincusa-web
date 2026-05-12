import { useEffect } from 'react'
import { useParams, Navigate, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import { setSeo } from '../lib/seo'
import { BRAND } from '../data/brand'
import { getPost } from '../lib/articles'

export function InsightPost() {
  const { slug } = useParams<{ slug: string }>()
  const post = slug ? getPost(slug) : null

  useEffect(() => {
    if (!post) return
    setSeo({
      title: `${post.frontmatter.title} — consultincusa Insights`,
      description: post.frontmatter.description,
      lang: 'en',
      canonical: `https://${BRAND.domain}/insights/${post.slug}`,
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: post.frontmatter.title,
        description: post.frontmatter.description,
        author: {
          '@type': 'Person',
          name: post.frontmatter.author ?? 'Yomama',
          url: `https://${BRAND.domain}/about`,
        },
        publisher: {
          '@type': 'Organization',
          name: BRAND.name,
          url: `https://${BRAND.domain}`,
        },
        datePublished: post.frontmatter.date,
        dateModified: post.frontmatter.updated_at ?? post.frontmatter.date,
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `https://${BRAND.domain}/insights/${post.slug}`,
        },
      },
    })
  }, [post])

  if (!post) {
    return <Navigate to="/insights" replace />
  }

  return (
    <div className="bg-brand-cream text-brand-navy">
      <article className="max-w-3xl mx-auto px-4 md:px-10 py-16">
        <Link to="/insights" className="text-sm text-brand-coral underline">
          ← All insights
        </Link>
        <h1 className="mt-6 font-serif text-4xl md:text-6xl font-bold tracking-tight leading-[1.05]">
          {post.frontmatter.title}
        </h1>
        <p className="mt-4 text-sm text-ink-500 uppercase tracking-widest font-bold">
          {post.frontmatter.date} · {Math.ceil(post.content.split(' ').length / 200)} min read
        </p>
        <div className="mt-10 prose prose-lg max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeSlug, [rehypeAutolinkHeadings, { behavior: 'wrap' }]]}
          >
            {post.content}
          </ReactMarkdown>
        </div>

        <div className="mt-16 bg-brand-navy text-white border-2 border-brand-navy shadow-heritage-lg p-8">
          <h2 className="font-serif text-2xl md:text-3xl font-bold mb-3">
            Saw something in this post that's also your situation?
          </h2>
          <p className="text-base mb-6 opacity-90">
            Book the 15-minute call. We tell you up front whether one of our five lenses fits.
          </p>
          <Link
            to="/book"
            className="inline-flex items-center bg-brand-coral text-white text-sm font-bold uppercase tracking-wider px-6 py-3 border-2 border-white shadow-heritage hover:shadow-heritage-pop transition-all"
          >
            Book the 15-min call
          </Link>
        </div>
      </article>
    </div>
  )
}
