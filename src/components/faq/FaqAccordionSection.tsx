import { Accordion } from '../ui/Accordion'
import { faqItems } from '../../data/siteContent'
import { FadeIn } from '../common/FadeIn'

export function FaqAccordionSection() {
  return (
    <FadeIn className="section-container max-w-3xl py-16 sm:py-20">
      <Accordion items={faqItems} />
    </FadeIn>
  )
}
