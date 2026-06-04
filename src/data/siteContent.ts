import type { LucideIcon } from 'lucide-react'
import {
  BarChart3,
  BookOpen,
  CandlestickChart,
  GraduationCap,
  LineChart,
  MessageCircle,
  ShieldCheck,
  TrendingUp,
  Users,
  Wallet,
} from 'lucide-react'

export const COMPANY = {
  name: 'TradeWithManish.com',
  shortName: 'TradeWithManish',
  tagline: 'Simplifying Trading For Every Trader',
  description:
    'Professional trading education, market analysis, mentorship and consultation for beginners and active traders across Indian markets.',
  email: 'naxchaudhary46@gmail.com',
  phone: '8155952384',
  address: 'Deesa, Gujarat 385535',
  hours: 'All days, 9:00 AM – 6:00 PM IST',
  whatsapp: '918155952384',
  whatsappMessage: 'Hi Manish, I want to learn more about your trading mentorship.',
} as const

export const mainNavLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Mentorship', to: '/mentorship' },
  { label: 'Insights', to: '/market-insights' },
  { label: 'Blog', to: '/blog' },
  { label: 'Resources', to: '/resources' },
  { label: 'Contact', to: '/contact' },
] as const

export const footerQuickLinks = [
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Mentorship', to: '/mentorship' },
  { label: 'Market Insights', to: '/market-insights' },
  { label: 'Blog', to: '/blog' },
  { label: 'Resources', to: '/resources' },
  { label: 'Book Consultation', to: '/consultation' },
  { label: 'FAQ', to: '/faq' },
  { label: 'Contact', to: '/contact' },
] as const

export const footerNavLinks = footerQuickLinks

export const legalLinks = [
  { label: 'Privacy Policy', to: '/privacy-policy' },
  { label: 'Terms & Conditions', to: '/terms-conditions' },
  { label: 'Disclaimer', to: '/disclaimer' },
] as const

export const socialLinks = [
  { label: 'YouTube', href: 'https://youtube.com', icon: 'youtube' as const },
  { label: 'Instagram', href: 'https://instagram.com', icon: 'instagram' as const },
  { label: 'Telegram', href: 'https://t.me', icon: 'telegram' as const },
] as const

export const experienceLevels = [
  'Complete beginner',
  'Learning basics',
  'Paper trading',
  'Active trader',
  'Professional',
] as const

export const interestedServices = [
  'Trading Education',
  'Market Analysis',
  'Trading Mentorship',
  'Technical Analysis',
  'Risk Management',
  'Portfolio Guidance',
  'Consultation',
] as const

export const whyChooseUs = [
  {
    title: 'Beginner-friendly teaching',
    description: 'Concepts explained in simple Hindi-English mix with real chart examples—not jargon overload.',
    icon: GraduationCap,
  },
  {
    title: 'Practical market analysis',
    description: 'Daily and weekly outlooks focused on Nifty, Bank Nifty, and stocks you actually trade.',
    icon: LineChart,
  },
  {
    title: 'Risk-first mindset',
    description: 'Position sizing, stop-loss discipline, and capital protection before chasing returns.',
    icon: ShieldCheck,
  },
  {
    title: 'Community support',
    description: 'Learn alongside serious traders with accountability, Q&A, and structured learning paths.',
    icon: Users,
  },
] as const

export const servicesPreview = [
  {
    title: 'Trading Education',
    description: 'Structured courses from market basics to advanced price action.',
    icon: BookOpen,
    to: '/services#trading-education',
  },
  {
    title: 'Market Analysis',
    description: 'Clear bias, levels, and scenarios for index and stock traders.',
    icon: BarChart3,
    to: '/services#market-analysis',
  },
  {
    title: 'Trading Mentorship',
    description: '1-on-1 guidance to build habits, journal trades, and improve execution.',
    icon: MessageCircle,
    to: '/mentorship',
  },
  {
    title: 'Risk Management',
    description: 'Rules and frameworks so one bad week does not wipe your account.',
    icon: ShieldCheck,
    to: '/services#risk-management',
  },
] as const

export const learningPath = [
  { step: 1, title: 'Market foundations', description: 'Exchanges, order types, candles, and how Indian markets work.' },
  { step: 2, title: 'Technical analysis', description: 'Support/resistance, trends, indicators, and multi-timeframe view.' },
  { step: 3, title: 'Risk & psychology', description: 'Risk per trade, journaling, and emotional control in live markets.' },
  { step: 4, title: 'Live mentorship', description: 'Personal review of your setups, mistakes, and improvement plan.' },
] as const

export const statistics = [
  { label: 'Students mentored', value: 1200, suffix: '+', prefix: '' },
  { label: 'Educational sessions', value: 350, suffix: '+', prefix: '' },
  { label: 'Years teaching', value: 8, suffix: '+', prefix: '' },
  { label: 'Community members', value: 5000, suffix: '+', prefix: '' },
] as const

export const testimonials = [
  {
    quote: 'Manish sir simplified options for me. I finally understand risk before reward.',
    name: 'Rahul P.',
    role: 'Retail trader, Ahmedabad',
  },
  {
    quote: 'The mentorship calls helped me stop overtrading and follow my journal daily.',
    name: 'Kiran M.',
    role: 'Swing trader',
  },
  {
    quote: 'Market insight notes are crisp—levels, bias, and invalidation in one page.',
    name: 'Dev S.',
    role: 'Intraday trader',
  },
] as const

export type ServiceItem = {
  id: string
  title: string
  summary: string
  description: string
  features: string[]
  icon: LucideIcon
}

export const services: ServiceItem[] = [
  {
    id: 'trading-education',
    title: 'Trading Education',
    summary: 'Step-by-step learning for beginners and intermediate traders.',
    description:
      'From opening your demat account to reading charts confidently—our education track builds skills with homework, quizzes, and live doubt sessions.',
    features: ['Recorded + live modules', 'Beginner to advanced tracks', 'Trade journal templates', 'Weekly Q&A'],
    icon: GraduationCap,
  },
  {
    id: 'market-analysis',
    title: 'Market Analysis',
    summary: 'Actionable index and stock outlook with clear levels.',
    description:
      'Morning bias, key supports/resistances, and event watchlist for Nifty, Bank Nifty, and momentum stocks—written for traders, not economists.',
    features: ['Daily market brief', 'Weekly outlook PDF', 'Event & result calendar', 'Telegram alerts'],
    icon: BarChart3,
  },
  {
    id: 'trading-mentorship',
    title: 'Trading Mentorship',
    summary: 'Personal coaching to accelerate your learning curve.',
    description:
      'Review your trades, fix recurring mistakes, and build a repeatable playbook with direct feedback from Manish.',
    features: ['1-on-1 video calls', 'Trade review', 'Custom improvement plan', 'Accountability check-ins'],
    icon: MessageCircle,
  },
  {
    id: 'technical-analysis',
    title: 'Technical Analysis',
    summary: 'Price action, indicators, and multi-timeframe confluence.',
    description:
      'Learn how to mark structures, spot high-probability setups, and avoid indicator clutter on Indian charts.',
    features: ['Price action modules', 'Indicator masterclass', 'Backtesting basics', 'Setup library'],
    icon: CandlestickChart,
  },
  {
    id: 'risk-management',
    title: 'Risk Management',
    summary: 'Protect capital with rules that survive bad streaks.',
    description:
      'Position sizing, max daily loss, R-multiples, and portfolio heat—implemented with simple spreadsheets and checklists.',
    features: ['Risk calculators', 'Stop-loss frameworks', 'Drawdown recovery plan', 'Psychology drills'],
    icon: ShieldCheck,
  },
  {
    id: 'portfolio-guidance',
    title: 'Portfolio Guidance',
    summary: 'Balanced swing and positional portfolio construction.',
    description:
      'Sector rotation awareness, allocation bands, and when to stay cash—education only, not investment advice.',
    features: ['Watchlist building', 'Sector maps', 'Position sizing by conviction', 'Review cadence'],
    icon: Wallet,
  },
  {
    id: 'trading-community',
    title: 'Trading Community',
    summary: 'Serious traders learning together with structure.',
    description:
      'Community channels for setups, journals, and market discussion—moderated to keep quality high.',
    features: ['Members-only chat', 'Weekly challenges', 'Peer learning groups', 'Live market hours'],
    icon: Users,
  },
  {
    id: 'market-insights',
    title: 'Market Insights',
    summary: 'Published research and scenario plans on the site.',
    description:
      'Read detailed insight articles with charts, macro context, and trade plans updated as conditions change.',
    features: ['Insight archive', 'Sentiment tags', 'PDF exports', 'Email digest'],
    icon: TrendingUp,
  },
]

export const processSteps = [
  { step: 1, title: 'Free consultation', description: 'Book a 30-minute call to discuss your experience and goals.' },
  { step: 2, title: 'Learning plan', description: 'We recommend the right track—education, mentorship, or both.' },
  { step: 3, title: 'Structured learning', description: 'Follow modules, complete assignments, and join live sessions.' },
  { step: 4, title: 'Live markets', description: 'Apply concepts with journal reviews and risk checkpoints.' },
  { step: 5, title: 'Ongoing growth', description: 'Refine your edge with community and updated market insights.' },
]

export const teamMembers = [
  {
    name: 'Manish',
    role: 'Founder & Lead Mentor',
    bio: 'Trading educator and market analyst helping Indian retail traders build discipline, risk control, and confidence.',
    image: 'M',
  },
]

export const faqItems = [
  {
    id: 'faq-1',
    question: 'Is this a stock tips or guaranteed profit service?',
    answer:
      'No. TradeWithManish.com is an education and mentorship platform. We teach process, risk management, and analysis—we do not guarantee returns.',
  },
  {
    id: 'faq-2',
    question: 'Do I need prior trading experience?',
    answer:
      'No. We have dedicated beginner tracks. Active traders can join mentorship or advanced modules directly.',
  },
  {
    id: 'faq-3',
    question: 'How do I book a consultation?',
    answer:
      'Visit the Consultation page, pick a date and 30-minute slot between 9 AM and 6 PM, and submit your details. You will receive confirmation by email.',
  },
  {
    id: 'faq-4',
    question: 'What markets do you cover?',
    answer:
      'Primary focus is Indian equities and derivatives (NSE/BSE)—Nifty, Bank Nifty, and liquid stocks.',
  },
  {
    id: 'faq-5',
    question: 'Are sessions online?',
    answer:
      'Yes. Education and mentorship are delivered online via video calls and digital resources.',
  },
  {
    id: 'faq-6',
    question: 'How do I contact support?',
    answer:
      `Email ${COMPANY.email}, call ${COMPANY.phone}, or use the contact form on this site.`,
  },
]

export const missionVision = {
  mission:
    'To simplify trading education so every motivated learner can understand markets, manage risk, and grow with discipline.',
  vision:
    'To build India’s most trusted beginner-friendly trading education community led by practical mentorship.',
  story:
    'TradeWithManish started as free market notes and chart explanations shared with friends who wanted clear, honest guidance. Today it is a full platform combining structured courses, published insights, mentorship, and consultation—always with risk education at the center.',
}
