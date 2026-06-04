import { PageHeader } from '../components/layout/PageHeader'
import { PageMeta } from '../components/seo/PageMeta'
import { ProcessTimelineSection } from '../components/services/ProcessTimelineSection'
import { ServiceCardsSection } from '../components/services/ServiceCardsSection'
import { ServiceDetailsSection } from '../components/services/ServiceDetailsSection'

export function ServicesPage() {
  return (
    <>
      <PageMeta
        title="Financial Services"
        description="Wealth management, corporate advisory, investment research, risk programs, and more."
        path="/services"
      />
      <PageHeader
        label="Services"
        title="Financial services tailored to your goals"
        description="From wealth stewardship to corporate advisory and risk programs—integrated support under one trusted partner."
      />
      <ServiceCardsSection />
      <ServiceDetailsSection />
      <ProcessTimelineSection />
    </>
  )
}
