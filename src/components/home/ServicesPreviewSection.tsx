import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { FadeIn } from '../common/FadeIn'
import { SectionHeading } from '../common/SectionHeading'
import { servicesPreview } from '../../data/siteContent'
import { Button } from '../ui/Button'

export function ServicesPreviewSection() {
  return (
    <section className="section-spacing">
      <div className="section-container">
        <SectionHeading
          label="Services"
          title="Everything you need to trade with confidence"
          description="Education, analysis, mentorship, and risk guidance—designed for Indian markets."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:mt-14">
          {servicesPreview.map(({ title, description, icon: Icon, to }, index) => (
            <FadeIn key={title} delay={index * 0.08}>
              <article className="group card-surface flex h-full flex-col p-6 hover:border-brand-200">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand-50 to-indigo-50 text-brand-600">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-lg font-semibold text-slate-900">{title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{description}</p>
                <Link
                  to={to}
                  className="mt-4 inline-flex min-h-[44px] items-center gap-1 text-sm font-semibold text-brand-600 transition group-hover:gap-2"
                >
                  Learn more <ArrowRight className="h-4 w-4" />
                </Link>
              </article>
            </FadeIn>
          ))}
        </div>
        <div className="mt-10 text-center sm:mt-12">
          <Button to="/services" variant="outline">
            View all services
          </Button>
        </div>
      </div>
    </section>
  )
}
