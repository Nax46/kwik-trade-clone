import { Link } from 'react-router-dom'
import { Footer } from '../components/layout/Footer'
import { Button } from '../components/ui/Button'

export function NotFoundPage() {
  return (
    <>
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">404</p>
          <h1 className="mt-3 text-4xl font-bold text-white sm:text-5xl">Page not found</h1>
          <p className="mt-4 text-sm text-muted sm:text-base">
            The page you are looking for does not exist or may have moved.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button to="/">Back to home</Button>
            <Link to="/contact" className="text-sm font-medium text-accent">Contact support</Link>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}
