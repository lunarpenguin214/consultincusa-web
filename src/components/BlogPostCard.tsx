import { Link } from 'react-router-dom'
import type { Article } from '../lib/articles'

export function BlogPostCard({ post }: { post: Article }) {
  return (
    <Link
      to={`/insights/${post.slug}`}
      className="block bg-brand-paper border-2 border-brand-navy shadow-heritage hover:shadow-heritage-pop p-6 transition-all"
    >
      <p className="text-xs uppercase tracking-widest font-bold text-ink-500">
        {post.frontmatter.date}
      </p>
      <h2 className="mt-2 font-serif text-2xl md:text-3xl font-bold leading-tight">
        {post.frontmatter.title}
      </h2>
      <p className="mt-3 text-base text-ink-700 leading-relaxed">
        {post.frontmatter.description}
      </p>
      <p className="mt-4 text-sm text-brand-coral font-bold uppercase tracking-wider">Read →</p>
    </Link>
  )
}
