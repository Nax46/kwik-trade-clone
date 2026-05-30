import { Footer } from '../components/layout/Footer'
import { PageHeader } from '../components/layout/PageHeader'

export function PrivacyPolicyPage() {
  const sections = [
    ['Information We Collect', 'We collect name, email, phone, and message content when you submit forms, plus basic usage data to improve our educational website.'],
    ['How We Use Information', 'Data is used to respond to inquiries, deliver newsletters, improve learning content, and maintain site security.'],
    ['Cookies and Tracking', 'We use essential and analytics cookies to maintain sessions and understand which content is most helpful to learners.'],
    ['Data Sharing', 'We do not sell personal data. Limited data may be shared with email and hosting providers under strict agreements.'],
    ['Data Retention', 'Form submissions and account data are retained only as long as needed for support, legal, or operational purposes.'],
    ['Security Controls', 'We use encryption, access controls, and monitoring to protect information submitted through our website.'],
    ['Your Rights', 'You may request access, correction, or deletion of your personal data where applicable by law.'],
    ['Children Privacy', 'Our educational content is not directed at children under 13 without parental consent.'],
    ['Newsletter Preferences', 'You can unsubscribe from marketing emails at any time using the link in each message.'],
    ['Contact Privacy Team', 'Send privacy requests to privacy@kwiktrade.com. We respond within applicable regulatory timelines.'],
  ]

  return (
    <>
      <PageHeader
        label="Legal"
        title="Privacy Policy"
        description="How Kwik Trade collects, uses, and protects your information."
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
