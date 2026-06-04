import { Newspaper } from 'lucide-react'
import type { NewsCard as NewsCardType } from '../../data/marketInsights'
import { FadeIn } from '../common/FadeIn'

type NewsCardProps = {
  item: NewsCardType
  delay?: number
}

export function NewsCard({ item, delay = 0 }: NewsCardProps) {
  return (
    <FadeIn delay={delay}>
      <article className="card-surface h-full p-5">
        <div className="flex items-start gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
            <Newspaper className="h-4 w-4" aria-hidden />
          </span>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-600">
              {item.category}
            </span>
            <h3 className="mt-1 font-semibold text-slate-900">{item.headline}</h3>
          </div>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.summary}</p>
        <footer className="mt-4 flex items-center justify-between text-xs text-slate-500">
          <span>{item.source}</span>
          <time dateTime={item.publishedAt}>
            {new Date(item.publishedAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
            })}
          </time>
        </footer>
      </article>
    </FadeIn>
  )
}
