import { AlertTriangle, BookOpen, CandlestickChart, Lightbulb, Shield, TrendingUp } from 'lucide-react'
import { Footer } from '../components/layout/Footer'
import { PageHeader } from '../components/layout/PageHeader'
import { FeatureGrid, SectionIntro } from '../components/marketing/ContentBlocks'

export function LearnPage() {
  return (
    <>
      <PageHeader
        label="Learn"
        title="Trading education for beginners and growing traders"
        description="A structured learning path covering fundamentals, risk, psychology, and technical analysis."
      />

      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionIntro
            eyebrow="Basics"
            title="Trading basics"
            description="Start here if you are new. Learn what markets are, how orders work, and why risk comes first."
          />
          <div className="mt-8 space-y-4">
            {[
              'Markets exist to match buyers and sellers. Price moves when supply and demand shift.',
              'Common instruments include forex pairs, stocks, commodities like gold, and digital assets.',
              'Every trade should begin with a plan: entry reason, invalidation level, and position size.',
            ].map((text) => (
              <article key={text} className="glass-panel rounded-xl p-5 text-sm leading-relaxed text-slate-300">
                {text}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-surface-raised/30 py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionIntro eyebrow="Styles" title="Types of trading" description="Different approaches suit different schedules, temperament, and experience." />
          <FeatureGrid
            items={[
              { icon: TrendingUp, title: 'Swing trading', description: 'Hold positions for days to weeks based on broader trend structure.' },
              { icon: CandlestickChart, title: 'Day trading', description: 'Open and close positions within the same session with strict risk rules.' },
              { icon: BookOpen, title: 'Position investing', description: 'Longer horizon decisions driven by fundamentals and macro context.' },
            ]}
          />
        </div>
      </section>

      <section className="border-t border-border py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionIntro eyebrow="Charts" title="Candlestick guide" description="Candlesticks show open, high, low, and close — the building blocks of chart reading." />
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {[
              ['Bullish candle', 'Close above open — buyers controlled the period.'],
              ['Bearish candle', 'Close below open — sellers controlled the period.'],
              ['Doji', 'Small body — indecision; watch for confirmation on next candles.'],
              ['Engulfing pattern', 'Larger candle consumes prior body — potential reversal signal with context.'],
            ].map(([title, text]) => (
              <article key={title} className="glass-panel rounded-xl p-5">
                <h3 className="font-semibold text-white">{title}</h3>
                <p className="mt-2 text-sm text-muted">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-surface-raised/30 py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionIntro eyebrow="Risk" title="Risk management" description="Protecting capital is more important than any single winning trade." />
          <FeatureGrid
            items={[
              { icon: Shield, title: 'Position sizing', description: 'Risk only a small, fixed percentage of your account per trade.' },
              { icon: Shield, title: 'Stop-loss discipline', description: 'Define exit points before entry and respect them without emotion.' },
              { icon: Shield, title: 'Risk-reward planning', description: 'Aim for setups where potential reward justifies the risk taken.' },
            ]}
          />
        </div>
      </section>

      <section className="border-t border-border py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionIntro eyebrow="Mistakes" title="Common beginner mistakes" description="Awareness helps you avoid costly habits early in your journey." />
          <div className="mt-8 space-y-3">
            {[
              'Trading without a written plan or journal.',
              'Increasing size after losses to recover quickly.',
              'Ignoring major news events and session volatility.',
              'Using too many indicators without understanding one setup.',
            ].map((item) => (
              <article key={item} className="flex items-start gap-3 rounded-xl border border-danger/20 bg-danger/5 p-4 text-sm text-slate-300">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-danger" />
                {item}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-surface-raised/30 py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionIntro eyebrow="Tips" title="Beginner tips" description="Practical habits that improve learning speed and consistency." />
          <FeatureGrid
            items={[
              { icon: Lightbulb, title: 'Study one market first', description: 'Master one asset class before expanding to others.' },
              { icon: Lightbulb, title: 'Demo practice', description: 'Practice execution and journaling with simulated capital.' },
              { icon: Lightbulb, title: 'Review weekly', description: 'Analyze what worked, what failed, and what to improve next week.' },
            ]}
          />
        </div>
      </section>

      <Footer />
    </>
  )
}
