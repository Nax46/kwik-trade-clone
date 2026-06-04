import { ArrowRight, Clock } from 'lucide-react'
import { Link } from 'react-router-dom'

export type BlogCardPost = {
  slug: string
  title: string
  excerpt: string
  category: string
  publishedAt?: string
  author: string
  thumbnail?: string
  coverGradient?: string
}

type BlogCardProps = {
  post: BlogCardPost
}

export function BlogCard({ post }: BlogCardProps) {
  const date = post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-IN') : ''
  return (
    <article className="card-surface group flex h-full flex-col overflow-hidden">
      <div
        className={`flex h-44 items-end bg-gradient-to-br ${post.coverGradient ?? 'from-brand-100 to-indigo-100'} p-4`}
        aria-hidden
      >
        {post.thumbnail ? (
          <img src={post.thumbnail} alt="" className="absolute inset-0 h-full w-full object-cover opacity-90" />
        ) : null}
        <span className="relative rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-brand-700 shadow-sm">
          {post.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        {date && (
          <time dateTime={post.publishedAt} className="text-xs text-slate-500">
            {date}
          </time>
        )}
        <h2 className="mt-2 text-lg font-semibold text-slate-900 group-hover:text-brand-700">
          <Link to={`/blog/${post.slug}`} className="rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500">
            {post.title}
          </Link>
        </h2>
        <p className="mt-2 flex-1 text-sm text-slate-600 line-clamp-3">{post.excerpt}</p>
        <p className="mt-4 flex items-center gap-1 text-xs text-slate-500">
          <Clock className="h-3.5 w-3.5" />
          {post.author}
        </p>
        <Link
          to={`/blog/${post.slug}`}
          className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-600 hover:text-brand-700"
        >
          Read article
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  )
}
