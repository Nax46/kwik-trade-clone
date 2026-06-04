import { motion } from 'framer-motion'
import { Globe, Mail, MapPin, Phone, Share2, Video } from 'lucide-react'
import { Link } from 'react-router-dom'
import {
  COMPANY,
  footerQuickLinks,
  legalLinks,
  socialLinks,
} from '../../data/siteContent'
import { Button } from '../ui/Button'
import { NewsletterForm } from './NewsletterForm'

const socialIcons: Record<string, typeof Share2> = {
  linkedin: Share2,
  twitter: Globe,
  youtube: Video,
  instagram: Share2,
  telegram: Globe,
}

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-gradient-to-b from-slate-50 to-white" role="contentinfo">
      <div className="section-container border-b border-slate-100 py-10 sm:py-12">
        <div className="flex flex-col items-center gap-6 rounded-2xl bg-gradient-to-r from-brand-600 to-indigo-700 px-6 py-10 text-center shadow-soft sm:flex-row sm:justify-between sm:text-left sm:px-10">
          <div>
            <h2 className="text-xl font-bold text-white sm:text-2xl">Start your trading journey</h2>
            <p className="mt-2 max-w-md text-sm text-brand-100">
              Book a free consultation or explore our mentorship programs.
            </p>
          </div>
          <Button
            to="/consultation"
            className="w-full shrink-0 bg-white text-brand-700 hover:bg-brand-50 sm:w-auto"
          >
            Book consultation
          </Button>
        </div>
      </div>

      <div className="section-container py-12 lg:py-14">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
            >
              <img src="/logo.svg" alt="" className="h-9 w-9 rounded-xl shadow-soft" width={36} height={36} />
              <span className="text-lg font-semibold text-slate-900">{COMPANY.shortName}</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-600">{COMPANY.description}</p>
            <nav className="mt-6 flex gap-3" aria-label="Social media">
              {socialLinks.map((social) => {
                const Icon = socialIcons[social.icon]
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="touch-target flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition hover:border-brand-300 hover:text-brand-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                    aria-label={social.label}
                  >
                    <Icon className="h-4 w-4" aria-hidden />
                  </a>
                )
              })}
            </nav>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-900">Quick links</h3>
            <ul className="mt-4 space-y-2.5">
              {footerQuickLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-slate-600 transition hover:text-brand-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-900">Contact</h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              <li className="flex items-start gap-2.5">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" aria-hidden />
                <a
                  href={`mailto:${COMPANY.email}`}
                  className="break-all hover:text-brand-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded"
                >
                  {COMPANY.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" aria-hidden />
                <a href={`tel:${COMPANY.phone.replace(/\D/g, '')}`} className="hover:text-brand-600">
                  {COMPANY.phone}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" aria-hidden />
                <address className="not-italic">{COMPANY.address}</address>
              </li>
            </ul>
            <p className="mt-3 text-xs text-slate-500">{COMPANY.hours}</p>
          </div>

          <div className="lg:col-span-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-900">Newsletter</h3>
            <p className="mt-2 text-sm text-slate-600">Weekly market insights and education updates.</p>
            <NewsletterForm className="mt-4" variant="stacked" />
          </div>
        </div>

        <motion.div
          className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-8 sm:flex-row"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} {COMPANY.name}. All rights reserved.
          </p>
          <nav className="flex flex-wrap justify-center gap-4" aria-label="Legal">
            {legalLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-xs text-slate-500 hover:text-brand-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </motion.div>

        <p className="mt-4 text-center text-xs leading-relaxed text-slate-400">
          Information on this website is for education only and does not constitute investment, legal, or tax advice.
        </p>
      </div>
    </footer>
  )
}
