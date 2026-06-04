export const defaultSeo = {
  siteName: 'TradeWithManish.com',
  title: 'TradeWithManish.com — Trading Education & Mentorship',
  description:
    'Simplifying trading for every trader. Education, market analysis, mentorship and consultation with Manish in Deesa, Gujarat.',
  url: import.meta.env.VITE_SITE_URL ?? 'https://tradewithmanish.com',
  ogImage: '/og-default.svg',
  twitterHandle: '@tradewithmanish',
  keywords: 'trading education, mentorship, market analysis, Nifty, Bank Nifty, Gujarat',
}

export const SITE_URL = defaultSeo.url
export const SITE_NAME = defaultSeo.siteName
export const DEFAULT_OG_IMAGE = defaultSeo.ogImage
