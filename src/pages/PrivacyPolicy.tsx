import { FadeIn } from '../components/common/FadeIn'
import { PageHeader } from '../components/layout/PageHeader'
import { PageMeta } from '../components/seo/PageMeta'
import { COMPANY } from '../data/siteContent'

const sections = [
  [
    'Information We Collect',
    'We collect name, email, phone, and message content when you submit forms, consultation requests, or newsletter subscriptions, plus basic usage data to improve our website.',
  ],
  [
    'How We Use Information',
    'Data is used to respond to inquiries, schedule consultations, deliver newsletters, improve content, and maintain site security.',
  ],
  [
    'Cookies and Tracking',
    'We use essential and analytics cookies to maintain sessions and understand which content is most helpful to visitors.',
  ],
  [
    'Data Sharing',
    'We do not sell personal data. Limited data may be shared with email, scheduling, and hosting providers under strict agreements.',
  ],
  [
    'Data Retention',
    'Form submissions and account data are retained only as long as needed for support, legal, or operational purposes.',
  ],
  [
    'Security Controls',
    'We use encryption, access controls, and monitoring to protect information submitted through our website.',
  ],
  [
    'Your Rights',
    'You may request access, correction, or deletion of your personal data where applicable by law.',
  ],
  [
    'Newsletter Preferences',
    'You can unsubscribe from marketing emails at any time using the link in each message.',
  ],
  [
    'Contact Privacy Team',
    `Send privacy requests to privacy@${COMPANY.email.split('@')[1]}. We respond within applicable regulatory timelines.`,
  ],
]

export function PrivacyPolicyPage() {
  return (
    <>
      <PageMeta
        title="Privacy Policy"
        description={`How ${COMPANY.name} collects, uses, and protects your personal information.`}
        path="/privacy-policy"
        noIndex
      />
      <PageHeader
        label="Legal"
        title="Privacy Policy"
        description={`How ${COMPANY.name} handles your personal information.`}
      />
      <section className="py-16 sm:py-20">
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
