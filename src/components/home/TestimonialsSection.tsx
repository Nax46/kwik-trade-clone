import { Quote } from 'lucide-react'
import { FadeIn } from '../common/FadeIn'
import { SectionHeading } from '../common/SectionHeading'
import { testimonials } from '../../data/siteContent'

export function TestimonialsSection() {
  return (
    <section className="section-spacing">
      <div className="section-container">
        <SectionHeading
          label="Testimonials"
          title="What our learners say"
          description="Traders and beginners who partner with TradeWithManish for structured growth."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-3 lg:mt-14">
          {testimonials.map(({ quote, name, role }, index) => (
            <FadeIn key={name} delay={index * 0.1}>
              <article className="card-surface flex h-full flex-col p-6">
                <Quote className="h-8 w-8 text-brand-200" aria-hidden />
                <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-600">
                  &ldquo;{quote}&rdquo;
                </p>
                <div className="mt-6 border-t border-slate-100 pt-4">
                  <p className="font-semibold text-slate-900">{name}</p>
                  <p className="text-sm text-slate-500">{role}</p>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
