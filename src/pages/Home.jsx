import { Link } from 'react-router-dom'
import {
  MessageSquare,
  FileText,
  MapPin,
  BookOpen,
  Shield,
  Lock,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Users,
  HeartHandshake,
  Scale,
  Phone,
} from 'lucide-react'
import Button from '../components/Button'
import Card from '../components/Card'

const features = [
  {
    icon: MessageSquare,
    title: 'AI Legal Assistant',
    titleHi: 'AI कानूनी सहायक',
    description:
      'Ask questions about your rights in simple language. Get clear answers about domestic violence, property, maintenance, and more.',
    to: '/assistant',
    color: 'bg-primary-100 text-primary-600',
  },
  {
    icon: FileText,
    title: 'Petition Generator',
    titleHi: 'याचिका जनरेटर',
    description:
      'Create ready-to-use legal petition drafts for maintenance, divorce, harassment, and other cases — in minutes.',
    to: '/petition',
    color: 'bg-pink-100 text-pink-600',
  },
  {
    icon: MapPin,
    title: 'Court Navigation',
    titleHi: 'अदालत मार्गदर्शन',
    description:
      'Step-by-step guides for visiting courts, filing cases, and understanding the legal process in your city.',
    to: '/court',
    color: 'bg-purple-100 text-purple-600',
  },
  {
    icon: BookOpen,
    title: 'Resource Center',
    titleHi: 'संसाधन केंद्र',
    description:
      'Guides, helplines, and legal templates curated for women in Tier-2 and Tier-3 cities across India.',
    to: '/resources',
    color: 'bg-violet-100 text-violet-600',
  },
]

const stats = [
  { value: '4', label: 'Free legal tools' },
  { value: '100%', label: 'Always free' },
  { value: '24/7', label: 'Guest access' },
]

const trustBadges = [
  { icon: Lock, label: 'No login required' },
  { icon: Shield, label: '100% free' },
  { icon: HeartHandshake, label: 'Women-focused' },
  { icon: Users, label: 'Made for Bharat' },
]

const ctaBenefits = ['No signup', 'No fees', 'Private & safe']

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section
        className="gradient-hero relative overflow-hidden"
        aria-labelledby="hero-heading"
      >
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-20 right-10 w-64 h-64 bg-pink-200/30 rounded-full blur-3xl motion-safe:animate-float" />
          <div
            className="absolute bottom-10 left-10 w-48 h-48 bg-primary-200/30 rounded-full blur-3xl motion-safe:animate-float"
            style={{ animationDelay: '2s' }}
          />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <div className="motion-safe:animate-slide-up">
              <p className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-pink-200 text-sm text-primary-700 font-medium mb-6 card-shadow">
                <Sparkles className="w-4 h-4 text-primary-500" aria-hidden="true" />
                Free AI legal help for every woman
              </p>

              <h1
                id="hero-heading"
                className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-gray-900 leading-[1.15] tracking-tight"
              >
                Know Your Rights.{' '}
                <span className="text-gradient-purple block sm:inline">
                  Claim Your Justice.
                </span>
              </h1>

              <p
                lang="hi"
                className="mt-3 text-base sm:text-lg text-primary-600 font-medium"
              >
                अपने हक़ जानें। अपना न्याय पाएं।
              </p>

              <p className="mt-4 text-base sm:text-lg text-gray-600 leading-relaxed max-w-xl">
                HAQMarg is your trusted legal companion — designed for women in
                Tier-2 and Tier-3 cities. Get AI-powered guidance, generate
                petitions, and navigate courts with confidence.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Button
                  to="/assistant"
                  size="lg"
                  aria-label="Start a free AI legal consultation"
                  className="w-full sm:w-auto justify-center"
                >
                  Get Free Legal Help
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Button>
                <Button
                  to="/resources"
                  variant="secondary"
                  size="lg"
                  className="w-full sm:w-auto justify-center"
                >
                  Browse Resources
                </Button>
              </div>

              <ul
                className="mt-8 grid grid-cols-3 gap-3 sm:gap-6 max-w-md"
                aria-label="Platform highlights"
              >
                {stats.map(({ value, label }) => (
                  <li key={label} className="text-center sm:text-left">
                    <p className="text-xl sm:text-2xl font-bold text-primary-700">
                      {value}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500">{label}</p>
                  </li>
                ))}
              </ul>

              <ul
                className="mt-8 flex flex-wrap gap-x-5 gap-y-3"
                aria-label="Trust indicators"
              >
                {trustBadges.map(({ icon: Icon, label }) => (
                  <li key={label} className="flex items-center gap-2 text-sm text-gray-600">
                    <Icon className="w-4 h-4 text-primary-500 shrink-0" aria-hidden="true" />
                    {label}
                  </li>
                ))}
              </ul>
            </div>

            <div
              className="hidden lg:grid grid-cols-2 gap-4 motion-safe:animate-slide-up"
              aria-hidden="true"
            >
              {features.map(({ icon: Icon, title, color }, i) => (
                <Card
                  key={title}
                  className={`${i % 2 === 1 ? 'translate-y-6' : ''}`}
                  padding="p-5"
                >
                  <div
                    className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center mb-3`}
                  >
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <p className="font-semibold text-gray-900 text-sm">{title}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 w-full"
        aria-labelledby="features-heading"
      >
        <header className="text-center mb-10 sm:mb-14 max-w-2xl mx-auto">
          <p className="text-sm font-semibold text-primary-600 uppercase tracking-wide mb-2">
            Our Services
          </p>
          <h2
            id="features-heading"
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900"
          >
            Everything you need in one place
          </h2>
          <p className="mt-3 text-gray-500 text-base sm:text-lg leading-relaxed">
            Four powerful tools to help you understand, act, and navigate the
            legal system — simple, free, and made for you.
          </p>
        </header>

        <ul
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 list-none p-0 m-0"
          role="list"
        >
          {features.map(({ icon: Icon, title, titleHi, description, to, color }) => (
            <li key={to}>
              <Link
                to={to}
                className="group block h-full rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
                aria-label={`${title} — ${description}`}
              >
                <Card hover className="h-full">
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center shrink-0 motion-safe:group-hover:scale-110 transition-transform duration-300`}
                      aria-hidden="true"
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 text-lg group-hover:text-primary-700 transition-colors">
                        {title}
                      </h3>
                      <p lang="hi" className="text-sm text-primary-500 font-medium">
                        {titleHi}
                      </p>
                      <p className="mt-2 text-sm text-gray-500 leading-relaxed">
                        {description}
                      </p>
                      <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary-600 motion-safe:group-hover:gap-2 transition-all">
                        Explore
                        <ArrowRight className="w-4 h-4" aria-hidden="true" />
                      </span>
                    </div>
                  </div>
                </Card>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* CTA */}
      <section
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 w-full"
        aria-labelledby="cta-heading"
      >
        <Card
          className="gradient-purple text-white text-center p-6 sm:p-10 lg:p-14 relative overflow-hidden"
          padding="p-0"
        >
          <div
            className="absolute inset-0 opacity-40 pointer-events-none"
            aria-hidden="true"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.08'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
            }}
          />

          <div className="relative px-6 sm:px-10 lg:px-14 py-10 sm:py-12">
            <div
              className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center mx-auto mb-5"
              aria-hidden="true"
            >
              <Scale className="w-7 h-7 text-white" />
            </div>

            <h2 id="cta-heading" className="text-2xl sm:text-3xl lg:text-4xl font-bold">
              You deserve to be heard
            </h2>
            <p
              id="cta-description"
              className="mt-3 text-white/85 text-base sm:text-lg max-w-xl mx-auto leading-relaxed"
            >
              Whether you&apos;re in Lucknow, Indore, Patna, or any city — start
              your legal journey today. Completely free, no signup needed.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center max-w-md sm:max-w-none mx-auto">
              <Button
                to="/assistant"
                variant="secondary"
                size="lg"
                aria-describedby="cta-description"
                className="w-full sm:w-auto justify-center !bg-white !text-primary-700 !border-white hover:!bg-pink-50 shadow-lg"
              >
                Start Free Consultation
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Button>
              <Button
                to="/petition"
                size="lg"
                className="w-full sm:w-auto justify-center !bg-white/15 !text-white border border-white/40 hover:!bg-white/25"
              >
                Generate a Petition
              </Button>
            </div>

            <ul
              className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-white/75 list-none p-0 m-0"
              aria-label="Benefits of using HAQMarg"
            >
              {ctaBenefits.map((item) => (
                <li key={item} className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 shrink-0" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>

            <p className="mt-6 text-sm text-white/60">
              Need urgent help? Call{' '}
              <a
                href="tel:181"
                className="underline underline-offset-2 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary-600 rounded-sm"
              >
                Women Helpline 181
              </a>
            </p>
          </div>
        </Card>
      </section>
    </div>
  )
}
