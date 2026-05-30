import { Route, Routes } from 'react-router-dom'
import { AuthLayout } from '../layouts/AuthLayout'
import { MainLayout } from '../layouts/MainLayout'
import { AboutPage } from '../pages/About'
import { BlogPage } from '../pages/Blog'
import { ContactPage } from '../pages/Contact'
import { FaqPage } from '../pages/Faq'
import { HomePage } from '../pages/Home'
import { LearnPage } from '../pages/Learn'
import { MarketInsightsPage } from '../pages/MarketInsights'
import { NotFoundPage } from '../pages/NotFound'
import { PrivacyPolicyPage } from '../pages/PrivacyPolicy'
import { TermsConditionsPage } from '../pages/TermsConditions'
import { ForgotPasswordPage } from '../pages/ForgotPassword'
import { LoginPage } from '../pages/Login'
import { RegisterPage } from '../pages/Register'

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="learn" element={<LearnPage />} />
        <Route path="market-insights" element={<MarketInsightsPage />} />
        <Route path="blog" element={<BlogPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="faq" element={<FaqPage />} />
        <Route path="terms-conditions" element={<TermsConditionsPage />} />
        <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
      </Route>

      <Route element={<AuthLayout />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="forgot-password" element={<ForgotPasswordPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
