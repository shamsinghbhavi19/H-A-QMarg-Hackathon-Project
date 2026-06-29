import { Link } from 'react-router-dom'
import { Scale, Heart, Phone } from 'lucide-react'

const quickLinks = [
  { to: '/assistant', label: 'AI Legal Assistant' },
  { to: '/petition', label: 'Petition Generator' },
  { to: '/court', label: 'Court Navigation' },
  { to: '/resources', label: 'Resource Center' },
]

const helplines = [
  { label: 'Women Helpline', number: '181' },
  { label: 'Police', number: '100' },
  { label: 'NCW', number: '7827170170' },
]

const promises = [
  '100% free — no hidden charges',
  'No login or signup needed',
  'Private and confidential',
  'Available in Hindi and English',
]

export default function Footer() {
  return (
    <footer
      className="mt-auto border-t border-pink-100/60 bg-white/60 backdrop-blur-sm"
      role="contentinfo"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link
              to="/"
              className="inline-flex items-center gap-2 mb-4 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
              aria-label="HAQMarg — go to home page"
            >
              <div
                className="w-9 h-9 rounded-lg gradient-purple flex items-center justify-center"
                aria-hidden="true"
              >
                <Scale className="w-4 h-4 text-white" />
              </div>
              <div>
                <span className="font-bold text-gray-900 block">HAQMarg</span>
                <span lang="hi" className="text-[11px] text-primary-600 font-medium">
                  आपके हक़, आपकी आवाज़
                </span>
              </div>
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
              Empowering women across India with free, accessible legal guidance.
              Built for Tier-2 and Tier-3 cities — simple, private, and always free.
            </p>
          </div>

          <nav aria-label="Footer quick links">
            <h2 className="font-semibold text-gray-900 text-sm mb-4">Quick Links</h2>
            <ul className="space-y-2.5">
              {quickLinks.map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-sm text-gray-500 hover:text-primary-600 transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-semibold text-gray-900 text-sm mb-4">
              Emergency Helplines
            </h2>
            <ul className="space-y-2.5">
              {helplines.map(({ label, number }) => (
                <li key={number}>
                  <a
                    href={`tel:${number}`}
                    className="flex items-center gap-2 text-sm text-gray-500 hover:text-primary-600 transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
                  >
                    <Phone className="w-3.5 h-3.5 text-primary-500 shrink-0" aria-hidden="true" />
                    <span>
                      {label}:{' '}
                      <strong className="text-gray-700 font-semibold">{number}</strong>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-semibold text-gray-900 text-sm mb-4">Our Promise</h2>
            <ul className="space-y-2.5 text-sm text-gray-500">
              {promises.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-primary-400 mt-1.5 shrink-0" aria-hidden="true">
                    •
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-pink-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p>&copy; {new Date().getFullYear()} HAQMarg. All rights reserved.</p>
          <p className="flex items-center gap-1.5 text-center sm:text-right">
            Made with
            <Heart
              className="w-3 h-3 text-pink-400 fill-pink-400"
              aria-hidden="true"
            />
            <span>for every woman&apos;s right to justice</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
