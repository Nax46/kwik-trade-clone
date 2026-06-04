import { Download, FileText } from 'lucide-react'
import { FadeIn } from '../common/FadeIn'

export type ResourceItem = {
  _id?: string
  title: string
  description: string
  category: string
  pdfUrl?: string
}

type ResourceCardProps = {
  resource: ResourceItem
  onDownload: () => void
  delay?: number
}

export function ResourceCard({ resource, onDownload, delay = 0 }: ResourceCardProps) {
  return (
    <FadeIn delay={delay}>
      <article className="card-surface flex h-full flex-col p-6">
        <div className="flex items-start justify-between gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
            <FileText className="h-5 w-5" aria-hidden />
          </span>
          <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">
            {resource.category}
          </span>
        </div>
        <h2 className="mt-4 text-lg font-semibold text-slate-900">{resource.title}</h2>
        <p className="mt-2 flex-1 text-sm text-slate-600">{resource.description}</p>
        <button
          type="button"
          onClick={onDownload}
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-600 hover:text-brand-700"
        >
          <Download className="h-4 w-4" />
          Download PDF
        </button>
      </article>
    </FadeIn>
  )
}
