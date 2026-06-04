import { LineChart } from 'lucide-react'
import type { AnalysisCard as AnalysisCardType } from '../../data/marketInsights'
import { FadeIn } from '../common/FadeIn'

const outlookStyles = {
  bullish: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
  bearish: 'bg-red-50 text-red-700 ring-red-600/20',
  neutral: 'bg-slate-100 text-slate-600 ring-slate-500/20',
}

type AnalysisCardProps = {
  item: AnalysisCardType
  delay?: number
}

export function AnalysisCard({ item, delay = 0 }: AnalysisCardProps) {
  return (
    <FadeIn delay={delay}>
      <article className="card-surface flex h-full flex-col p-6">
        <div className="flex items-start justify-between gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
            <LineChart className="h-5 w-5" aria-hidden />
          </span>
          <span
            className={`rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ring-1 ring-inset ${outlookStyles[item.outlook]}`}
          >
            {item.outlook}
          </span>
        </div>
        <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
          {item.assetClass}
        </p>
        <h3 className="mt-1 text-lg font-semibold text-slate-900">{item.title}</h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">{item.summary}</p>
        <footer className="mt-4 border-t border-slate-100 pt-4 text-xs text-slate-500">
          <p className="font-medium text-slate-700">{item.analyst}</p>
          <time dateTime={item.publishedAt} className="mt-0.5 block">
            {new Date(item.publishedAt).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </time>
        </footer>
      </article>
    </FadeIn>
  )
}
