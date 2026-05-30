import { Footer } from '../components/layout/Footer'
import { PageHeader } from '../components/layout/PageHeader'

export function AboutPage() {
  const sections = [
    ['Our mission', 'We help beginners and intermediate learners understand trading through clear education, market context, and practical guidance.'],
    ['What we are not', 'We are not a broker, exchange, or investment advisor. We do not execute trades or provide personalized financial advice.'],
    ['What we provide', 'Structured lessons, daily market insight summaries, blog articles, and tools that support learning and informed decision-making.'],
    ['Who we serve', 'Students, part-time learners, and curious professionals who want to build trading knowledge responsibly.'],
    ['Editorial standards', 'Content is reviewed for clarity, educational value, and risk awareness before publication.'],
    ['Community approach', 'We encourage questions, feedback, and continuous improvement of our learning resources.'],
  ]

  return (
    <>
      <PageHeader
        label="About"
        title="Trading education, explained clearly"
        description="Kwik Trade is a learning platform focused on market information, beginner guidance, and practical trading education."
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
