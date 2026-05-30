import { Bitcoin, Coins, LineChart, Newspaper } from 'lucide-react'
import { Footer } from '../components/layout/Footer'
import { PageHeader } from '../components/layout/PageHeader'
import { SectionIntro } from '../components/marketing/ContentBlocks'

const dailyUpdate = {
  title: 'Daily market update',
  summary:
    'Global markets are balancing rate expectations with growth data. Learners should focus on scheduled economic releases, session overlaps, and volatility spikes around major headlines.',
  points: [
    'US session: watch index futures and earnings-related moves.',
    'European session: monitor policy commentary and energy-linked assets.',
    'Asia session: track regional data and currency sensitivity.',
  ],
}

const sections = [
  {
    icon: LineChart,
    title: 'Forex updates',
    items: [
      'EUR/USD: range-bound ahead of inflation and employment data.',
      'GBP/USD: sensitive to BoE commentary and UK growth prints.',
      'USD/JPY: volatility tied to yield differentials and risk sentiment.',
    ],
  },
  {
    icon: Bitcoin,
    title: 'Crypto updates',
    items: [
      'Bitcoin: elevated volatility — emphasize risk sizing and liquidity zones.',
      'Ethereum: network activity and macro risk appetite remain key drivers.',
      'Altcoins: higher beta; suitable only after core risk rules are solid.',
    ],
  },
  {
    icon: Coins,
    title: 'Gold updates',
    items: [
      'Gold: inflation expectations and USD strength influence direction.',
      'Safe-haven demand can rise during geopolitical uncertainty.',
      'Use higher timeframes to avoid overreacting to intraday noise.',
    ],
  },
  {
    icon: Newspaper,
    title: 'Stock updates',
    items: [
      'US indices: leadership concentrated in a few sectors this week.',
      'Earnings reactions may widen single-stock volatility.',
      'Beginners should start with index context before stock picking.',
    ],
  },
]

export function MarketInsightsPage() {
  return (
    <>
      <PageHeader
        label="Market Insights"
        title="Educational market summaries"
        description="Daily context and sector notes to help you learn how markets behave — not trading recommendations."
      />

      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <article className="glass-panel rounded-2xl p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-wider text-accent">{dailyUpdate.title}</p>
            <p className="mt-3 text-base leading-relaxed text-slate-300">{dailyUpdate.summary}</p>
            <ul className="mt-5 space-y-2">
              {dailyUpdate.points.map((point) => (
                <li key={point} className="flex items-start gap-2 text-sm text-muted">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  {point}
                </li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      {sections.map((section, index) => {
        const Icon = section.icon
        return (
          <section
            key={section.title}
            className={`border-t border-border py-14 sm:py-20 ${index % 2 === 0 ? 'bg-surface-raised/30' : ''}`}
          >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <SectionIntro
                eyebrow="Update"
                title={section.title}
                description="Informational notes for learning and planning."
              />
              <div className="mt-8 grid gap-4 md:grid-cols-3">
                {section.items.map((item) => (
                  <article key={item} className="glass-panel rounded-xl p-5 text-sm text-slate-300">
                    <Icon className="mb-3 h-5 w-5 text-accent" />
                    {item}
                  </article>
                ))}
              </div>
            </div>
          </section>
        )
      })}

      <Footer />
    </>
  )
}
