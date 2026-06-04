import { PageHeader } from '../components/layout/PageHeader'
import { PageMeta } from '../components/seo/PageMeta'
import { Button } from '../components/ui/Button'
import { processSteps } from '../data/siteContent'

export function MentorshipPage() {
  return (
    <>
      <PageMeta
        title="Trading Mentorship"
        description="1-on-1 trading mentorship with Manish—trade reviews, accountability, and a personalized improvement plan."
        path="/mentorship"
      />
      <PageHeader
        title="Trading Mentorship"
        description="Personal guidance to build discipline, fix mistakes, and grow as a trader."
      />
      <section className="section-spacing">
        <div className="section-container max-w-3xl">
          <p className="text-lg text-slate-600">
            Mentorship is for traders who want direct feedback—not another course they never finish.
            We review your journal, setups, and risk rules on scheduled calls and set weekly goals you
            can measure.
          </p>
          <ul className="mt-8 space-y-3 text-slate-700">
            <li>• Trade journal and screenshot reviews</li>
            <li>• Custom playbook for your style (intraday or swing)</li>
            <li>• Risk and psychology checkpoints</li>
            <li>• Priority access to market insight notes</li>
          </ul>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button to="/consultation">Book free consultation</Button>
            <Button variant="outline" to="/contact">
              Ask a question
            </Button>
          </div>
        </div>
      </section>
      <section className="section-spacing bg-slate-50">
        <div className="section-container">
          <h2 className="text-2xl font-bold text-slate-900">How mentorship works</h2>
          <ol className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {processSteps.map((s) => (
              <li key={s.step} className="card-surface p-6">
                <span className="text-sm font-semibold text-brand-600">Step {s.step}</span>
                <h3 className="mt-2 font-semibold text-slate-900">{s.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{s.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  )
}
