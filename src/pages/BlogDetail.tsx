import { useQuery } from '@tanstack/react-query'
import { ArrowLeft, Clock, User } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { FadeIn } from '../components/common/FadeIn'
import { PageMeta } from '../components/seo/PageMeta'
import { ArticleSchema } from '../components/seo/StructuredData'
import { api } from '../api'
import { defaultSeo } from '../config/seo'
import { NotFoundPage } from './NotFound'

export function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const { data: post, isLoading } = useQuery({
    queryKey: ['blog', slug],
    queryFn: () => api.getBlog(slug!) as Promise<{
      title: string
      slug: string
      excerpt: string
      content: string
      author: string
      publishedAt?: string
      category: string
    }>,
    enabled: Boolean(slug),
  })

  if (isLoading) {
    return <p className="section-container py-20 text-slate-500">Loading article…</p>
  }

  if (!post) return <NotFoundPage />

  return (
    <>
      <PageMeta title={post.title} description={post.excerpt} path={`/blog/${post.slug}`} type="article" />
      <ArticleSchema
        title={post.title}
        description={post.excerpt}
        author={post.author}
        datePublished={post.publishedAt ?? new Date().toISOString()}
        url={`${defaultSeo.url}/blog/${post.slug}`}
      />
      <article className="py-12 sm:py-16">
        <div className="section-container max-w-3xl">
          <Link to="/blog" className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-600">
            <ArrowLeft className="h-4 w-4" />
            Back to blog
          </Link>
          <FadeIn>
            <p className="mt-6 text-sm font-semibold text-brand-600">{post.category}</p>
            <h1 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">{post.title}</h1>
            <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-500">
              <span className="inline-flex items-center gap-1">
                <User className="h-4 w-4" />
                {post.author}
              </span>
              {post.publishedAt && (
                <span className="inline-flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {new Date(post.publishedAt).toLocaleDateString('en-IN')}
                </span>
              )}
            </div>
            <div
              className="prose prose-slate mt-10 max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br/>') }}
            />
          </FadeIn>
        </div>
      </article>
    </>
  )
}
