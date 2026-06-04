import { AnimatePresence } from 'framer-motion'
import { Suspense } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { OrganizationSchema } from '../components/seo/StructuredData'
import { Footer } from '../components/layout/Footer'
import { Navbar } from '../components/layout/Navbar'
import { PageLoader } from '../components/layout/PageLoader'
import { PageTransition } from '../components/layout/PageTransition'
import { SkipToContent } from '../components/layout/SkipToContent'
import { WhatsAppButton } from '../components/layout/WhatsAppButton'
import { PageMeta } from '../components/seo/PageMeta'
import { defaultSeo } from '../config/seo'
import { useAnalytics } from '../hooks/useAnalytics'

export function MainLayout() {
  useAnalytics()
  const location = useLocation()

  return (
    <>
      <PageMeta title={defaultSeo.title} description={defaultSeo.description} path={location.pathname} />
      <OrganizationSchema />
      <SkipToContent />
      <div className="flex min-h-svh flex-col">
        <Navbar />
        <main id="main-content" className="flex-1" tabIndex={-1}>
          <AnimatePresence mode="wait">
            <PageTransition key={location.pathname}>
              <Suspense fallback={<PageLoader />}>
                <Outlet />
              </Suspense>
            </PageTransition>
          </AnimatePresence>
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </>
  )
}
