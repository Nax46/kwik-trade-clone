import { FadeIn } from '../common/FadeIn'
import { SectionHeading } from '../common/SectionHeading'
import { NewsletterForm } from '../layout/NewsletterForm'

export function NewsletterSection() {
  return (
    <section className="border-t border-slate-100 bg-slate-50 section-spacing" aria-labelledby="newsletter-heading">
      <div className="section-container">
        <FadeIn>
          <SectionHeading
            label="Newsletter"
            title="Insights delivered to your inbox"
            description="Weekly perspectives on Indian markets, trading education, and mentorship updates from TradeWithManish."
          />
          <div className="mx-auto mt-10 max-w-xl">
            <NewsletterForm variant="stacked" />
            <p className="mt-4 text-center text-xs text-slate-500">
              No spam. Unsubscribe anytime. For general information only—not investment advice.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
