import { CompanyIntroSection } from '../components/home/CompanyIntroSection'
import { TrustSection } from '../components/home/TrustSection'
import { CtaSection } from '../components/home/CtaSection'
import { FAQ } from '../components/home/FAQ'
import { HeroSection } from '../components/home/HeroSection'
import { LearningPathSection } from '../components/home/LearningPathSection'
import { NewsletterSection } from '../components/home/NewsletterSection'
import { ServicesPreviewSection } from '../components/home/ServicesPreviewSection'
import { StatisticsSection } from '../components/home/StatisticsSection'
import { TestimonialsSection } from '../components/home/TestimonialsSection'
import { WhyChooseUsSection } from '../components/home/WhyChooseUsSection'
import { SectionHeading } from '../components/common/SectionHeading'
import { Button } from '../components/ui/Button'
import { PageMeta } from '../components/seo/PageMeta'
import { defaultSeo } from '../config/seo'

export function HomePage() {
  return (
    <>
      <PageMeta title={defaultSeo.title} description={defaultSeo.description} path="/" />
      <HeroSection />
      <TrustSection />
      <CompanyIntroSection />
      <WhyChooseUsSection />
      <ServicesPreviewSection />
      <LearningPathSection />
      <section className="section-spacing">
        <div className="section-container flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <SectionHeading
            label="Market insights"
            title="Latest analysis"
            description="Backend-published insights with clear bias and levels."
            align="left"
          />
          <Button variant="outline" to="/market-insights">
            View all insights
          </Button>
        </div>
      </section>
      <StatisticsSection />
      <TestimonialsSection />
      <CtaSection />
      <section className="section-spacing bg-white">
        <div className="section-container">
          <FAQ limit={4} />
          <div className="mt-8 text-center">
            <Button variant="outline" to="/faq">
              View all FAQs
            </Button>
          </div>
        </div>
      </section>
      <NewsletterSection />
    </>
  )
}
