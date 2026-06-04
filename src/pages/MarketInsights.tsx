import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { FadeIn } from '../components/common/FadeIn'
import { PageHeader } from '../components/layout/PageHeader'
import { PageMeta } from '../components/seo/PageMeta'
import { api } from '../api'

type Insight = {
  _id: string
  title: string
  slug: string
  excerpt: string
  market: string
  sentiment: string
  publishedAt?: string
}

export function MarketInsightsPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['insights'],
    queryFn: () => api.getInsights({ limit: 20 }) as Promise<{ items: Insight[] }>,
  })

  return (
    <>
      <PageMeta
        title="Market Insights"
        description="Daily and weekly market analysis for Indian traders—published from the admin panel."
        path="/market-insights"
      />
      <PageHeader
        label="Market Insights"
        title="Markets at a glance"
        description="Educational market summaries—for learning, not buy/sell calls."
      />
      <section className="section-spacing">
        <div className="section-container grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {isLoading && <p className="text-slate-500">Loading insights…</p>}
          {data?.items.map((item, i) => (
            <FadeIn key={item._id} delay={i * 0.05}>
              <article className="card-surface flex h-full flex-col p-6">
                <span className="text-xs font-semibold uppercase text-brand-600">{item.sentiment}</span>
                <h2 className="mt-2 text-lg font-semibold text-slate-900">
                  <Link to={`/market-insights/${item.slug}`} className="hover:text-brand-600">
                    {item.title}
                  </Link>
                </h2>
                <p className="mt-2 flex-1 text-sm text-slate-600">{item.excerpt}</p>
                <p className="mt-4 text-xs text-slate-400">{item.market}</p>
              </article>
            </FadeIn>
          ))}
        </div>
      </section>
    </>
  )
}
