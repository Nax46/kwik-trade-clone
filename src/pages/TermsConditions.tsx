import { Footer } from '../components/layout/Footer'
import { PageHeader } from '../components/layout/PageHeader'

export function TermsConditionsPage() {
  const sections = [
    ['1. Acceptance of Terms', 'By using Kwik Trade, you agree to these terms for accessing educational content and submitting inquiries through our website.'],
    ['2. Educational purpose', 'All content is for learning and general information only. It is not financial, investment, or trading advice.'],
    ['3. No brokerage services', 'We do not execute trades, hold client funds, or operate as a broker, exchange, or investment advisor.'],
    ['4. User accounts', 'You must provide accurate information when registering or submitting forms. Misuse may result in account restriction.'],
    ['5. Risk disclosure', 'Trading and investing involve substantial risk. You are solely responsible for decisions made using information from this site.'],
    ['6. Intellectual property', 'Articles, lessons, and site materials remain the property of Kwik Trade unless otherwise stated.'],
    ['7. Communications', 'By subscribing or contacting us, you consent to receive educational emails and support responses as applicable.'],
    ['8. Limitation of liability', 'We are not liable for losses arising from reliance on educational content or third-party market conditions.'],
    ['9. Changes to terms', 'We may update these terms periodically. Continued use of the site constitutes acceptance of updated terms.'],
    ['10. Contact', 'For legal questions, email legal@kwiktrade.com with your request and account email if applicable.'],
  ]

  return (
    <>
      <PageHeader
        label="Legal"
        title="Terms & Conditions"
        description="Please read these terms before using our educational platform."
      />
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            {sections.map(([title, text]) => (
              <article key={title} className="glass-panel rounded-xl p-5">
                <h2 className="text-base font-semibold text-white">{title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}
