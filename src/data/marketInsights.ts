export type MarketUpdate = {
  id: string
  title: string
  summary: string
  date: string
  sentiment: 'neutral' | 'positive' | 'cautious'
}

export type NewsCard = {
  id: string
  headline: string
  source: string
  summary: string
  category: string
  publishedAt: string
}

export type AnalysisCard = {
  id: string
  title: string
  analyst: string
  summary: string
  assetClass: string
  outlook: 'bullish' | 'bearish' | 'neutral'
  publishedAt: string
}

export const dailyMarketUpdate: MarketUpdate = {
  id: 'daily-2026-06-03',
  title: 'Global Markets Brief — June 3, 2026',
  summary:
    'Equity indices are mixed as investors weigh softer manufacturing data against resilient services activity. Fixed income markets are focused on upcoming central bank commentary, while commodities reflect ongoing energy supply discussions and steady precious metals demand.',
  date: '2026-06-03',
  sentiment: 'neutral',
}

export const marketHighlights = [
  'S&P 500 futures flat ahead of ISM services release; sector leadership narrow.',
  'EUR/USD range-bound near multi-week midpoint; ECB speakers on watch.',
  'Gold holds above key technical zone as real yields stabilize.',
  'Investment-grade credit spreads unchanged; primary issuance light.',
]

export const newsCards: NewsCard[] = [
  {
    id: 'n1',
    headline: 'Fed officials signal data-dependent path for next policy meeting',
    source: 'Meridian Research Desk',
    summary:
      'Markets are pricing two potential outcomes for the next decision, with emphasis on labor market cooling versus sticky services inflation.',
    category: 'Monetary Policy',
    publishedAt: '2026-06-03T08:00:00Z',
  },
  {
    id: 'n2',
    headline: 'European banks report stable net interest margins in Q1 updates',
    source: 'Sector Monitor',
    summary:
      'Regional lenders highlight disciplined loan growth and improved asset quality trends, supporting dividend sustainability narratives.',
    category: 'Financials',
    publishedAt: '2026-06-02T14:30:00Z',
  },
  {
    id: 'n3',
    headline: 'Technology earnings revisions tick higher for second half',
    source: 'Equity Strategy',
    summary:
      'Analyst consensus for large-cap software has improved modestly, though valuation multiples remain sensitive to rate volatility.',
    category: 'Equities',
    publishedAt: '2026-06-02T11:15:00Z',
  },
  {
    id: 'n4',
    headline: 'Oil markets balance supply discipline with demand uncertainty',
    source: 'Commodities Brief',
    summary:
      'Inventory draws in key regions support prices, while macro growth concerns cap upside without fresh catalysts.',
    category: 'Energy',
    publishedAt: '2026-06-01T16:45:00Z',
  },
  {
    id: 'n5',
    headline: 'Private credit fundraising remains robust despite spread compression',
    source: 'Alternatives Weekly',
    summary:
      'Institutional allocators continue diversifying into direct lending, with emphasis on manager selection and covenant quality.',
    category: 'Private Markets',
    publishedAt: '2026-06-01T09:00:00Z',
  },
  {
    id: 'n6',
    headline: 'Asia-Pacific equities outperform on improved trade sentiment',
    source: 'Global Markets',
    summary:
      'Regional indices led gains overnight, supported by currency stability and stronger export order data from key economies.',
    category: 'Asia Pacific',
    publishedAt: '2026-05-31T22:00:00Z',
  },
]

export const analysisCards: AnalysisCard[] = [
  {
    id: 'a1',
    title: 'US Large-Cap Equities: Concentration Risk in a Narrow Rally',
    analyst: 'Priya Natarajan, CFA',
    summary:
      'Index-level returns mask dispersion beneath the surface. We favor quality factor exposure and disciplined rebalancing for diversified portfolios.',
    assetClass: 'Equities',
    outlook: 'neutral',
    publishedAt: '2026-06-02',
  },
  {
    id: 'a2',
    title: 'Investment Grade Credit: Carry Still Attractive, Selectivity Required',
    analyst: 'Marcus Delaney',
    summary:
      'Spreads near cycle tights argue for barbell structures—shorter duration core plus selective long credit in high-conviction issuers.',
    assetClass: 'Fixed Income',
    outlook: 'neutral',
    publishedAt: '2026-06-01',
  },
  {
    id: 'a3',
    title: 'Gold: Structural Support from Central Bank Demand',
    analyst: 'Priya Natarajan, CFA',
    summary:
      'Official sector purchases and diversification trends provide a floor; tactical positioning should respect USD and real yield dynamics.',
    assetClass: 'Commodities',
    outlook: 'bullish',
    publishedAt: '2026-05-30',
  },
  {
    id: 'a4',
    title: 'USD Outlook: Range Trade Likely Through Summer',
    analyst: 'International Strategy Team',
    summary:
      'Policy divergence narratives are balanced by growth convergence. Hedging programs should avoid over-rotation on single data prints.',
    assetClass: 'FX',
    outlook: 'neutral',
    publishedAt: '2026-05-29',
  },
]
