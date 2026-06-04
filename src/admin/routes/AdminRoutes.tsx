import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { PageLoader } from '../../components/layout/PageLoader'
import { AdminGuard } from '../components/AdminGuard'
import { AdminLayout } from '../layouts/AdminLayout'
import { AdminForgotPasswordPage } from '../pages/AdminForgotPasswordPage'
import { AdminLoginPage } from '../pages/AdminLoginPage'
import { AdminResetPasswordPage } from '../pages/AdminResetPasswordPage'

const DashboardPage = lazy(() =>
  import('../pages/DashboardPage').then((m) => ({ default: m.DashboardPage })),
)
const LeadsPage = lazy(() => import('../pages/LeadsPage').then((m) => ({ default: m.LeadsPage })))
const BookingsPage = lazy(() =>
  import('../pages/BookingsPage').then((m) => ({ default: m.BookingsPage })),
)
const BlogsAdminPage = lazy(() =>
  import('../pages/BlogsAdminPage').then((m) => ({ default: m.BlogsAdminPage })),
)
const InsightsAdminPage = lazy(() =>
  import('../pages/InsightsAdminPage').then((m) => ({ default: m.InsightsAdminPage })),
)
const ResourcesAdminPage = lazy(() =>
  import('../pages/ResourcesAdminPage').then((m) => ({ default: m.ResourcesAdminPage })),
)
const TestimonialsPage = lazy(() =>
  import('../pages/TestimonialsPage').then((m) => ({ default: m.TestimonialsPage })),
)
const NewsletterPage = lazy(() =>
  import('../pages/NewsletterPage').then((m) => ({ default: m.NewsletterPage })),
)
const AnalyticsPage = lazy(() =>
  import('../pages/AnalyticsPage').then((m) => ({ default: m.AnalyticsPage })),
)
const SettingsPage = lazy(() =>
  import('../pages/SettingsPage').then((m) => ({ default: m.SettingsPage })),
)
const ProfilePage = lazy(() =>
  import('../pages/ProfilePage').then((m) => ({ default: m.ProfilePage })),
)

export function AdminRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="login" element={<AdminLoginPage />} />
        <Route path="forgot-password" element={<AdminForgotPasswordPage />} />
        <Route path="reset-password" element={<AdminResetPasswordPage />} />
        <Route element={<AdminGuard />}>
          <Route element={<AdminLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="leads" element={<LeadsPage />} />
            <Route path="bookings" element={<BookingsPage />} />
            <Route path="blogs" element={<BlogsAdminPage />} />
            <Route path="insights" element={<InsightsAdminPage />} />
            <Route path="resources" element={<ResourcesAdminPage />} />
            <Route path="testimonials" element={<TestimonialsPage />} />
            <Route path="newsletter" element={<NewsletterPage />} />
            <Route path="analytics" element={<AnalyticsPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="*" element={<Navigate to="/admin" replace />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  )
}
