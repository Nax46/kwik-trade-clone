import { FAQ } from '../components/home/FAQ'
import { PageHeader } from '../components/layout/PageHeader'
import { Footer } from '../components/layout/Footer'
import { FAQList, SectionIntro } from '../components/marketing/ContentBlocks'

export function FaqPage() {
  return (
    <>
      <PageHeader
        label="FAQ"
        title="Frequently asked questions"
        description="Answers about learning paths, content updates, and how to use the platform."
      />
      <FAQ />
      <section className="border-t border-border bg-surface-raised/30 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <SectionIntro
            eyebrow="Learning"
            title="Learning and content"
            description="How our educational resources are organized and updated."
          />
          <FAQList
            items={[
              {
                question: 'Where should beginners start?',
                answer: 'Start with the Learn page trading basics, then read daily market insights to connect theory with real context.',
              },
              {
                question: 'How often is content updated?',
                answer: 'Market insight summaries are updated on business days. Blog articles are published weekly.',
              },
            ]}
          />
        </div>
      </section>
      <section className="border-t border-border py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <SectionIntro
            eyebrow="Account"
            title="Registration and newsletter"
            description="How accounts and email subscriptions work on the platform."
          />
          <FAQList
            items={[
              {
                question: 'Why create an account?',
                answer: 'Registration helps us send learning updates and save your preferences. It does not enable live trading on this site.',
              },
              {
                question: 'Can I unsubscribe from emails?',
                answer: 'Yes. Every newsletter includes an unsubscribe link, or you can contact support to update your preferences.',
              },
            ]}
          />
        </div>
      </section>
      <Footer />
    </>
  )
}
