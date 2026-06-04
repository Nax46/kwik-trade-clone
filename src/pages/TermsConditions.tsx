import { FadeIn } from '../components/common/FadeIn'
import { PageHeader } from '../components/layout/PageHeader'
import { PageMeta } from '../components/seo/PageMeta'
import { COMPANY } from '../data/siteContent'

const sections = [
  [
    '1. Acceptance of Terms',
    `By using ${COMPANY.name}, you agree to these terms for accessing our website, resources, and advisory inquiry services.`,
  ],
  [
    '2. Informational purpose',
    'All content is for general information and education only. It is not personalized investment, legal, or tax advice.',
  ],
  [
    '3. No brokerage services',
    'We do not execute trades, hold client funds, or operate as a broker-dealer or retail trading platform.',
  ],
  [
    '4. User submissions',
    'You must provide accurate information when submitting forms, booking consultations, or subscribing to communications.',
  ],
  [
    '5. Risk disclosure',
    'Investing and financial decisions involve substantial risk. You are solely responsible for decisions made with information from this site.',
  ],
  [
    '6. Intellectual property',
    'Articles, research, guides, and site materials remain the property of Meridian Financial Group unless otherwise stated.',
  ],
  [
    '7. Communications',
    'By subscribing or contacting us, you consent to receive emails and support responses as applicable, subject to privacy preferences.',
  ],
  [
    '8. Limitation of liability',
    'We are not liable for losses arising from reliance on website content or third-party market conditions beyond our control.',
  ],
  [
    '9. Changes to terms',
    'We may update these terms periodically. Continued use of the site constitutes acceptance of updated terms.',
  ],
  [
    '10. Disclaimer',
    'Past performance does not guarantee future results. Meridian does not guarantee outcomes from advisory engagements.',
  ],
]

export function TermsConditionsPage() {
  return (
    <>
      <PageMeta
        title="Terms & Conditions"
        description={`Terms of use for the ${COMPANY.name} website and services.`}
        path="/terms-conditions"
        noIndex
      />
      <PageHeader
        label="Legal"
        title="Terms & Conditions"
        description="Please read these terms before using our website and services."
      />
      <section className="py-16 sm:py-20" id="disclaimer">
        <div className="section-container max-w-4xl space-y-4">
          {sections.map(([title, text], index) => (
            <FadeIn key={title} delay={index * 0.04}>
              <article className="card-surface p-6">
                <h2 className="text-base font-semibold text-slate-900">{title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{text}</p>
              </article>
            </FadeIn>
          ))}
        </div>
      </section>
    </>
  )
}
