import { ArrowLeft, FileQuestion } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PageMeta } from '../components/seo/PageMeta'
import { Button } from '../components/ui/Button'
import { footerQuickLinks } from '../data/siteContent'

export function NotFoundPage() {
  return (
    <>
      <PageMeta
        title="Page Not Found"
        description="The page you requested could not be found."
        noIndex
      />
      <div className="flex min-h-[65vh] flex-col items-center justify-center px-4 py-16 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
          <FileQuestion className="h-8 w-8" aria-hidden />
        </span>
        <p className="mt-6 text-sm font-semibold uppercase tracking-widest text-brand-600">404</p>
        <h1 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">Page not found</h1>
        <p className="mt-4 max-w-md text-slate-600">
          The page you are looking for may have been moved, removed, or the URL may be incorrect.
        </p>
        <Button to="/" className="mt-8">
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Back to home
        </Button>
        <nav className="mt-10" aria-label="Helpful links">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Popular pages
          </p>
          <ul className="mt-3 flex flex-wrap justify-center gap-3">
            {footerQuickLinks.slice(0, 5).map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="text-sm font-medium text-brand-600 hover:text-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  )
}
