import { faqItems as siteFaq } from '../../data/siteContent'
import { Accordion, type AccordionItem } from '../ui/Accordion'
import { SectionHeader } from './SectionHeader'

type FAQProps = {
  limit?: number
  showHeader?: boolean
}

export function FAQ({ limit, showHeader = true }: FAQProps) {
  const items: AccordionItem[] = siteFaq
    .slice(0, limit ?? siteFaq.length)
    .map((f) => ({ id: f.id, question: f.question, answer: f.answer }))

  return (
    <section id="faq" className={showHeader ? 'py-20 sm:py-28' : ''}>
      <div className={showHeader ? 'mx-auto max-w-3xl px-4 sm:px-6 lg:px-8' : ''}>
        {showHeader && (
          <SectionHeader
            label="FAQ"
            title="Questions from traders"
            description="Clear answers about education, mentorship, and consultations."
          />
        )}
        <div className={showHeader ? 'mt-12' : ''}>
          <Accordion items={items} />
        </div>
      </div>
    </section>
  )
}
