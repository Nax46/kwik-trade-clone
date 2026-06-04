import { useQuery } from '@tanstack/react-query'
import { useMemo, useState } from 'react'
import { BlogCard } from '../components/blog/BlogCard'
import { FadeIn } from '../components/common/FadeIn'
import { PageHeader } from '../components/layout/PageHeader'
import { NewsletterForm } from '../components/layout/NewsletterForm'
import { PageMeta } from '../components/seo/PageMeta'
import { api } from '../api'

type BlogItem = {
  _id: string
  title: string
  slug: string
  excerpt: string
  category: string
  thumbnail?: string
  publishedAt?: string
  author: string
}

export function BlogPage() {
  const [category, setCategory] = useState('All')
  const { data, isLoading } = useQuery({
    queryKey: ['blogs', 'public'],
    queryFn: () =>
      api.getBlogs({ limit: 50 }) as Promise<{ items: BlogItem[] }>,
  })

  const posts = data?.items ?? []
  const categories = ['All', ...new Set(posts.map((p) => p.category))]
  const filtered = useMemo(
    () => (category === 'All' ? posts : posts.filter((p) => p.category === category)),
    [category, posts],
  )

  return (
    <>
      <PageMeta
        title="Trading Blog"
        description="Trading education articles on technical analysis, risk, psychology and market updates."
        path="/blog"
      />
      <PageHeader
        label="Blog"
        title="Learn to trade with clarity"
        description="Articles published from the admin panel—always up to date."
      />
      <section className="border-b border-slate-100 py-8">
        <div className="section-container">
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Blog categories">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={category === cat}
                onClick={() => setCategory(cat)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  category === cat
                    ? 'bg-brand-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>
      <section className="section-spacing">
        <div className="section-container">
          {isLoading ? (
            <p className="text-slate-500">Loading articles…</p>
          ) : filtered.length === 0 ? (
            <p className="text-slate-500">No published posts yet. Check back soon.</p>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((post, i) => (
                <FadeIn key={post._id} delay={i * 0.05}>
                  <BlogCard post={post} />
                </FadeIn>
              ))}
            </div>
          )}
        </div>
      </section>
      <section className="section-spacing bg-slate-50">
        <div className="section-container max-w-xl">
          <h2 className="text-xl font-semibold text-slate-900">Get new posts by email</h2>
          <NewsletterForm className="mt-4" />
        </div>
      </section>
    </>
  )
}
