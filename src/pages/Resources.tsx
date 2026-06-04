import { useQuery } from '@tanstack/react-query'
import { useMemo, useState } from 'react'
import { ResourceCard } from '../components/resources/ResourceCard'
import { FadeIn } from '../components/common/FadeIn'
import { PageHeader } from '../components/layout/PageHeader'
import { PageMeta } from '../components/seo/PageMeta'
import { api } from '../api'

type Resource = {
  _id: string
  title: string
  description: string
  pdfUrl: string
  category: string
}

export function ResourcesPage() {
  const [category, setCategory] = useState('All')
  const { data, isLoading } = useQuery({
    queryKey: ['resources'],
    queryFn: () => api.getResources() as Promise<Resource[]>,
  })

  const resources = data ?? []
  const categories = ['All', ...new Set(resources.map((r) => r.category))]
  const filtered = useMemo(
    () => (category === 'All' ? resources : resources.filter((r) => r.category === category)),
    [category, resources],
  )

  return (
    <>
      <PageMeta
        title="Resources & Downloads"
        description="PDF guides and checklists for trading education."
        path="/resources"
      />
      <PageHeader
        label="Resources"
        title="Guides & downloads"
        description="Admin-managed PDFs and learning materials."
      />
      <section className="border-b border-slate-100 py-8">
        <div className="section-container flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={`rounded-full px-4 py-2 text-sm font-medium ${
                category === cat ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>
      <section className="section-spacing">
        <div className="section-container">
          {isLoading ? (
            <p className="text-slate-500">Loading resources…</p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((r, i) => (
                <FadeIn key={r._id} delay={i * 0.05}>
                  <ResourceCard
                    resource={r}
                    onDownload={() => window.open(r.pdfUrl, '_blank', 'noopener')}
                  />
                </FadeIn>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
