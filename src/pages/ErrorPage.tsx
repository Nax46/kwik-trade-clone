import { AlertTriangle, Home, RefreshCw } from 'lucide-react'
import { PageMeta } from '../components/seo/PageMeta'

type ErrorPageProps = {
  error?: Error | null
  onReset?: () => void
}

export function ErrorPage({ error, onReset }: ErrorPageProps) {
  return (
    <>
      <PageMeta
        title="Something went wrong"
        description="An unexpected error occurred. Please try again or return to the homepage."
        noIndex
      />
      <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600">
          <AlertTriangle className="h-7 w-7" aria-hidden />
        </span>
        <h1 className="mt-6 text-3xl font-bold text-slate-900">Something went wrong</h1>
        <p className="mt-4 max-w-md text-slate-600">
          We apologize for the inconvenience. Our team has been notified. You can try refreshing
          the page or return to the homepage.
        </p>
        {import.meta.env.DEV && error?.message && (
          <pre className="mt-4 max-w-lg overflow-auto rounded-lg bg-slate-100 p-4 text-left text-xs text-slate-700">
            {error.message}
          </pre>
        )}
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          {onReset && (
            <button
              type="button"
              onClick={onReset}
              className="btn-outline inline-flex items-center gap-2"
            >
              <RefreshCw className="h-4 w-4" aria-hidden />
              Try again
            </button>
          )}
          <a href="/" className="btn-primary inline-flex items-center gap-2">
            <Home className="h-4 w-4" aria-hidden />
            Back to home
          </a>
        </div>
        <a
          href="/contact"
          className="mt-4 text-sm font-medium text-brand-600 hover:text-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded"
        >
          Contact support
        </a>
      </div>
    </>
  )
}
