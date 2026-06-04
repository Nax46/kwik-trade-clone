import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { PageLoader } from '../components/layout/PageLoader'
import { MainLayout } from '../layouts/MainLayout'
import { NotFoundPage } from '../pages/NotFound'

const AdminRoutes = lazy(() =>
  import('../admin/routes/AdminRoutes').then((m) => ({ default: m.AdminRoutes })),
)

const HomePage = lazy(() => import('../pages/Home').then((m) => ({ default: m.HomePage })))
const AboutPage = lazy(() => import('../pages/About').then((m) => ({ default: m.AboutPage })))
const ServicesPage = lazy(() =>
  import('../pages/Services').then((m) => ({ default: m.ServicesPage })),
)
const ContactPage = lazy(() =>
  import('../pages/Contact').then((m) => ({ default: m.ContactPage })),
)
const FaqPage = lazy(() => import('../pages/Faq').then((m) => ({ default: m.FaqPage })))
const BlogPage = lazy(() => import('../pages/Blog').then((m) => ({ default: m.BlogPage })))
const BlogDetailPage = lazy(() =>
  import('../pages/BlogDetail').then((m) => ({ default: m.BlogDetailPage })),
)
const MarketInsightsPage = lazy(() =>
  import('../pages/MarketInsights').then((m) => ({ default: m.MarketInsightsPage })),
)
const InsightDetailPage = lazy(() =>
  import('../pages/InsightDetail').then((m) => ({ default: m.InsightDetailPage })),
)
const ResourcesPage = lazy(() =>
  import('../pages/Resources').then((m) => ({ default: m.ResourcesPage })),
)
const ConsultationPage = lazy(() =>
  import('../pages/Consultation').then((m) => ({ default: m.ConsultationPage })),
)
const PrivacyPolicyPage = lazy(() =>
  import('../pages/PrivacyPolicy').then((m) => ({ default: m.PrivacyPolicyPage })),
)
const TermsConditionsPage = lazy(() =>
  import('../pages/TermsConditions').then((m) => ({ default: m.TermsConditionsPage })),
)
const MentorshipPage = lazy(() =>
  import('../pages/Mentorship').then((m) => ({ default: m.MentorshipPage })),
)
const DisclaimerPage = lazy(() =>
  import('../pages/Disclaimer').then((m) => ({ default: m.DisclaimerPage })),
)

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="services" element={<ServicesPage />} />
        <Route path="mentorship" element={<MentorshipPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="faq" element={<FaqPage />} />
        <Route path="blog" element={<BlogPage />} />
        <Route path="blog/:slug" element={<BlogDetailPage />} />
        <Route path="market-insights" element={<MarketInsightsPage />} />
        <Route path="market-insights/:slug" element={<InsightDetailPage />} />
        <Route path="resources" element={<ResourcesPage />} />
        <Route path="consultation" element={<ConsultationPage />} />
        <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="terms-conditions" element={<TermsConditionsPage />} />
        <Route path="disclaimer" element={<DisclaimerPage />} />
      </Route>
      <Route
        path="admin/*"
        element={
          <Suspense fallback={<PageLoader />}>
            <AdminRoutes />
          </Suspense>
        }
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
