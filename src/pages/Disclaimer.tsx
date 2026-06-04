import { PageHeader } from '../components/layout/PageHeader'
import { PageMeta } from '../components/seo/PageMeta'

export function DisclaimerPage() {
  return (
    <>
      <PageMeta
        title="Disclaimer"
        description="Important risk disclaimer for TradeWithManish.com educational content."
        path="/disclaimer"
      />
      <PageHeader title="Disclaimer" description="Please read before using our content or services." />
      <section className="section-spacing">
        <div className="section-container prose prose-slate max-w-3xl">
          <p>
            TradeWithManish.com provides educational content, market commentary, and mentorship. We are
            not a SEBI-registered investment adviser or research analyst unless explicitly stated, and
            nothing on this website constitutes buy/sell recommendations.
          </p>
          <p>
            Trading in securities and derivatives involves substantial risk of loss. Past performance
            of strategies discussed in education or insights is not indicative of future results. You are
            solely responsible for your trading decisions.
          </p>
          <p>
            Consult a qualified financial adviser for personalized investment advice. By using this
            site you agree that TradeWithManish.com and its team are not liable for losses arising from
            your use of the information provided.
          </p>
        </div>
      </section>
    </>
  )
}
