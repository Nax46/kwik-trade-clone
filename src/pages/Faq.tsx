import { FaqAccordionSection } from '../components/faq/FaqAccordionSection'
import { CtaSection } from '../components/home/CtaSection'
import { PageHeader } from '../components/layout/PageHeader'
import { PageMeta } from '../components/seo/PageMeta'

export function FaqPage() {
  return (
    <>
      <PageMeta
        title="FAQ"
        description="Frequently asked questions about TradeWithManish services, mentorship, and consultation."
        path="/faq"
      />
      <PageHeader
        label="FAQ"
        title="Frequently asked questions"
        description="Answers to common questions about our services, engagement process, and how we work with clients."
      />
      <FaqAccordionSection />
      <CtaSection />
    </>
  )
}
