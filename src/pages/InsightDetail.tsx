import { useQuery } from '@tanstack/react-query'
import { ArrowLeft } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { api } from '../api'
import { PageMeta } from '../components/seo/PageMeta'
import { NotFoundPage } from './NotFound'

export function InsightDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const { data, isLoading } = useQuery({
    queryKey: ['insight', slug],
    queryFn: () =>
      api.getInsight(slug!) as Promise<{
        title: string
        excerpt: string
        content: string
        sentiment: string
        market: string
      }>,
    enabled: Boolean(slug),
  })

  if (isLoading) return <p className="section-container py-20">Loading…</p>
  if (!data) return <NotFoundPage />

  return (
    <>
      <PageMeta title={data.title} description={data.excerpt} path={`/market-insights/${slug}`} />
      <article className="section-spacing">
        <div className="section-container max-w-3xl">
          <Link to="/market-insights" className="inline-flex items-center gap-1 text-sm text-brand-600">
            <ArrowLeft className="h-4 w-4" />
            All insights
          </Link>
          <p className="mt-4 text-sm font-semibold text-brand-600">{data.sentiment} · {data.market}</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">{data.title}</h1>
          <p className="mt-4 text-lg text-slate-600">{data.excerpt}</p>
          <div
            className="prose prose-slate mt-8 max-w-none"
            dangerouslySetInnerHTML={{ __html: data.content.replace(/\n/g, '<br/>') }}
          />
        </div>
      </article>
    </>
  )
}
