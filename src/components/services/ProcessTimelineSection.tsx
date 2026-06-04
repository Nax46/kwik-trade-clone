import { motion } from 'framer-motion'
import { FadeIn } from '../common/FadeIn'
import { SectionHeading } from '../common/SectionHeading'
import { processSteps } from '../../data/siteContent'

export function ProcessTimelineSection() {
  return (
    <section className="py-16 sm:py-20">
      <div className="section-container">
        <SectionHeading
          label="Process"
          title="How we work with you"
          description="A structured engagement model from first conversation through ongoing partnership."
        />
        <div className="relative mt-14">
          <div
            className="absolute left-4 top-0 hidden h-full w-0.5 bg-gradient-to-b from-brand-200 to-indigo-200 md:left-1/2 md:block md:-translate-x-px"
            aria-hidden
          />
          <div className="space-y-10">
            {processSteps.map((step, index) => (
              <FadeIn key={step.step} delay={index * 0.08}>
                <div
                  className={`relative flex flex-col gap-4 md:flex-row md:items-center ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  <div className="md:w-1/2 md:pr-12 md:text-right">
                    <div
                      className={`card-surface p-6 ${
                        index % 2 === 0 ? 'md:ml-auto md:max-w-md' : 'md:mr-auto md:max-w-md'
                      }`}
                    >
                      <span className="text-xs font-semibold uppercase tracking-wider text-brand-600">
                        Step {step.step}
                      </span>
                      <h3 className="mt-2 text-lg font-semibold text-slate-900">{step.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-600">{step.description}</p>
                    </div>
                  </div>
                  <motion.div
                    className="absolute left-4 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-brand-600 to-indigo-600 text-sm font-bold text-white shadow-soft md:left-1/2 md:-translate-x-1/2"
                    whileInView={{ scale: [0.8, 1.1, 1] }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                  >
                    {step.step}
                  </motion.div>
                  <div className="hidden md:block md:w-1/2" />
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
