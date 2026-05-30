import { SectionHeader } from './SectionHeader'
import { Accordion, type AccordionItem } from '../ui/Accordion'

const faqItems: AccordionItem[] = [
  {
    id: 'start',
    question: 'Do I need prior trading experience?',
    answer:
      'No. Our learning path starts with fundamentals and gradually introduces technical analysis, risk management, and market psychology.',
  },
  {
    id: 'cost',
    question: 'Is the educational content free?',
    answer:
      'Core lessons and market insight summaries are free to read. You can register to save progress and receive weekly learning updates.',
  },
  {
    id: 'advice',
    question: 'Is this financial advice?',
    answer:
      'No. All content is educational and informational. Always do your own research and consult licensed professionals before making financial decisions.',
  },
  {
    id: 'markets',
    question: 'Which markets do you cover?',
    answer:
      'We publish educational content for forex, gold, stocks, and crypto — focusing on concepts, context, and risk awareness.',
  },
  {
    id: 'updates',
    question: 'How often are insights updated?',
    answer:
      'Market insight summaries are refreshed on business days, with deeper weekly explainers published on the blog.',
  },
  {
    id: 'contact',
    question: 'Can I ask a specific learning question?',
    answer:
      'Yes. Use the contact form and our team will guide you to the right lesson or resource.',
  },
]

export function FAQ() {
  return (
    <section id="faq" className="py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="FAQ"
          title="Questions from new learners"
          description="Clear answers about how our education platform works."
        />
        <div className="mt-12">
          <Accordion items={faqItems} />
        </div>
      </div>
    </section>
  )
}
