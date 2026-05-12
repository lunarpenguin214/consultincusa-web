import { useEffect } from 'react'
import { setSeo } from '../lib/seo'
import { BRAND } from '../data/brand'
import { getAllPosts } from '../lib/articles'
import { BlogPostCard } from '../components/BlogPostCard'

export function Insights() {
  const posts = getAllPosts()

  useEffect(() => {
    setSeo({
      title: 'Insights — Notes from the field · consultincusa',
      description:
        'Posts we wrote because we hit them on a real file. Anonymized operator bleed, capital plays that worked, tech stacks decoded, math we did so you do not have to.',
      lang: 'en',
      canonical: `https://${BRAND.domain}/insights`,
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'Blog',
        name: 'consultincusa Insights',
        url: `https://${BRAND.domain}/insights`,
        publisher: {
          '@type': 'Organization',
          name: BRAND.name,
          url: `https://${BRAND.domain}`,
        },
      },
    })
  }, [])

  return (
    <div className="bg-brand-cream text-brand-navy">
      <section className="max-w-3xl mx-auto px-4 md:px-10 py-16 md:py-24">
        <p className="text-xs uppercase tracking-widest font-bold">Insights</p>
        <h1 className="mt-4 font-serif text-5xl md:text-7xl font-bold tracking-tight leading-[1.05]">
          Notes from the field.
        </h1>
        <p className="mt-6 text-lg md:text-xl text-ink-500">
          Posts we wrote because we hit them on a real file. Anonymized operator bleed.
          Capital plays that worked. Tech stacks decoded. Math we did so you do not have to.
        </p>
      </section>

      <section className="max-w-3xl mx-auto px-4 md:px-10 py-16 border-t-2 border-brand-navy">
        {posts.length === 0 ? (
          <div className="bg-brand-paper border-2 border-brand-navy shadow-heritage p-8">
            <h2 className="font-serif text-2xl font-bold mb-3">Nothing published yet — by design.</h2>
            <p className="text-base text-ink-700 leading-relaxed">
              We won't fill a blog with thin posts to chase keywords. If you find content here,
              it's because we ran into it on a real file. We'd rather ship one post on a real deal
              than ten posts about general SBA trivia.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <BlogPostCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
