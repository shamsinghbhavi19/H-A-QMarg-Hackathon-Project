import { Link } from "react-router-dom";
import { useState } from 'react'
import {
  BookOpen,
  Phone,
  FileText,
  Shield,
  Heart,
  Scale,
  ExternalLink,
  Search,
} from 'lucide-react'
import Card from '../components/Card'
import Button from '../components/Button'

const categories = [
  { id: 'all', label: 'All Resources' },
  { id: 'rights', label: 'Know Your Rights' },
  { id: 'guides', label: 'Step-by-Step Guides' },
  { id: 'helplines', label: 'Helplines' },
  { id: 'templates', label: 'Templates' },
]

const resources = [
  {
    id: "domestic-violence",
    category: 'rights',
    title: 'Your Rights Under Domestic Violence Act',
    titleHi: 'घरेलू हिंसा अधिनियम के तहत आपके अधिकार',
    description: 'Complete guide to protection orders, residence orders, and monetary relief under PWDVA 2005.',
    readTime: '8 min read',
  },
  {
    id:  "property-rights",
    category: 'rights',
    title: 'Property Rights for Daughters',
    titleHi: 'बेटियों के संपत्ति अधिकार',
    description: 'Understanding coparcenary rights under the Hindu Succession (Amendment) Act, 2005.',
    readTime: '6 min read',
  },
  {
    id:  "maintenance",
    category: 'rights',
    title: 'Maintenance Rights After Separation',
    titleHi: 'अलगाव के बाद भरण-पोषण अधिकार',
    description: 'How to claim maintenance under Section 125 CrPC and Section 20 of DV Act.',
    readTime: '7 min read',
  },
  {
    id:  "fir-guide",
    category: 'guides',
    title: 'How to File an FIR for Harassment',
    titleHi: 'उत्पीड़न की FIR कैसे दर्ज करें',
    description: 'Step-by-step process for filing a First Information Report at your local police station.',
    readTime: '5 min read',
  },
  {
    id: "protection-order",
    category: 'guides',
    title: 'Getting a Restraining Order',
    titleHi: 'निषेधाज्ञा कैसे प्राप्त करें',
    description: 'How to apply for a protection order if you feel unsafe.',
    readTime: '6 min read',
  },
  {
    id: "mutual-divorce",
    category: 'guides',
    title: 'Mutual Consent Divorce Process',
    titleHi: 'आपसी सहमति से तलाक की प्रक्रिया',
    description: 'Timeline, documents, and court procedure for mutual consent divorce.',
    readTime: '10 min read',
  },
  {
    id: "women-helpline",
    category: 'helplines',
    title: 'National Women Helpline — 181',
    titleHi: 'राष्ट्रीय महिला हेल्पलाइन',
    description: '24/7 toll-free helpline for women in distress. Available in multiple languages.',
    readTime: 'Helpline',
    phone: '181',
  },
  {
    id: "ncw",
    category: 'helplines',
    title: 'National Commission for Women',
    titleHi: 'राष्ट्रीय महिला आयोग',
    description: 'NCW handles complaints related to women\'s rights violations across India.',
    readTime: 'Helpline',
    phone: '7827170170',
  },
  {
    id: "legal-aid",
    category: 'helplines',
    title: 'Legal Services Authority — Free Legal Aid',
    titleHi: 'निःशुल्क कानूनी सहायता',
    description: 'NALSA provides free legal aid to women who cannot afford a lawyer. Available at every district.',
    readTime: 'Helpline',
    phone: '15100',
  },
  {
    id: "affidavit-template",
    category: 'templates',
    title: 'Affidavit Template for Court',
    titleHi: 'अदालत के लिए शपथ पत्र',
    description: 'Standard affidavit format for use in legal proceedings.',
    readTime: 'Template',
  },
  {
    id: "complaint-letter",
    category: 'templates',
    title: 'Complaint Letter to Police Station',
    titleHi: 'थाना प्रभारी को शिकायत पत्र',
    description: 'Ready-to-use complaint letter format for police stations.',
    readTime: 'Template',
  },
  {
    id: "legal-notice",
    category: 'templates',
    title: 'Legal Notice Format',
    titleHi: 'कानूनी नोटिस प्रारूप',
    description: 'Template for sending a legal notice before filing a case.',
    readTime: 'Template',
  },
]

const categoryIcons = {
  rights: Shield,
  guides: BookOpen,
  helplines: Phone,
  templates: FileText,
}

const categoryColors = {
  rights: 'bg-primary-100 text-primary-600',
  guides: 'bg-pink-100 text-pink-600',
  helplines: 'bg-red-100 text-red-600',
  templates: 'bg-violet-100 text-violet-600',
}

export default function ResourceCenter() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [search, setSearch] = useState('')

  const filtered = resources.filter((r) => {
    const matchCategory = activeCategory === 'all' || r.category === activeCategory
    const matchSearch =
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.titleHi.includes(search) ||
      r.description.toLowerCase().includes(search.toLowerCase())
    return matchCategory && matchSearch
  })

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="text-center mb-8 animate-slide-up">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-50 text-violet-700 text-xs font-medium mb-4">
          <BookOpen className="w-3.5 h-3.5" aria-hidden="true" />
          Free Legal Resources
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
          Resource Center
        </h1>
        <p className="mt-2 text-gray-500">
          Guides, helplines, and templates — everything to understand your legal rights
        </p>
      </div>

      {/* Emergency Banner */}
      <Card className="mb-8 gradient-pink border-pink-200">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-red-100 text-red-600 flex items-center justify-center shrink-0">
            <Phone className="w-6 h-6" aria-hidden="true" />
          </div>
          <div className="flex-1">
            <h2 className="font-semibold text-gray-900">In an Emergency?</h2>
            <p className="text-sm text-gray-600 mt-1">
              Call <strong>181</strong> (Women Helpline) or <strong>100</strong> (Police) immediately.
              These services are free and available 24/7.
            </p>
          </div>
          <a
            href="tel:181"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 text-white text-sm font-medium hover:bg-red-700 transition-colors shrink-0"
          >
            <Phone className="w-4 h-4" aria-hidden="true" />
            Call 181
          </a>
        </div>
      </Card>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
            aria-hidden="true"
          />
          <label htmlFor="resource-search" className="sr-only">
            Search resources
          </label>
          <input
            id="resource-search"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search resources…"
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-pink-200 bg-white/80 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              onClick={() => setActiveCategory(id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-colors ${
                activeCategory === id
                  ? 'gradient-purple text-white'
                  : 'bg-white/80 text-gray-600 border border-pink-100 hover:bg-primary-50'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Resource Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((resource) => {
          const Icon = categoryIcons[resource.category] || BookOpen
          const color = categoryColors[resource.category] || 'bg-gray-100 text-gray-600'

          return (
            <Card key={resource.id} hover className="flex flex-col">
              <div className="flex items-start gap-3 mb-3">
                <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center shrink-0`}>
                  <Icon className="w-5 h-5" aria-hidden="true" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 text-sm leading-snug">
                    {resource.title}
                  </h3>
                  <p className="text-xs text-primary-500 mt-0.5">{resource.titleHi}</p>
                </div>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed flex-1">
                {resource.description}
              </p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wide">
                  {resource.readTime}
                </span>
                {resource.phone ? (
                  <a
                    href={`tel:${resource.phone}`}
                    className="inline-flex items-center gap-1 text-xs font-medium text-primary-600 hover:text-primary-700"
                  >
                    <Phone className="w-3 h-3" aria-hidden="true" />
                    {resource.phone}
                  </a>
                ) : (
                  <Link
  to={`/resources/${resource.id}`}
  className="inline-flex items-center gap-1 text-xs font-medium text-primary-600 hover:text-primary-700"
>
  Read More
  <ExternalLink className="w-3 h-3" />
</Link>
                )}
              </div>
            </Card>
          )
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-40" aria-hidden="true" />
          <p>No resources found. Try a different search or category.</p>
        </div>
      )}

      {/* Legal Aid Section */}
      <Card className="mt-12">
        <div className="flex flex-col md:flex-row items-start gap-6">
          <div className="w-14 h-14 rounded-2xl gradient-purple flex items-center justify-center shrink-0">
            <Scale className="w-7 h-7 text-white" aria-hidden="true" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-900">
              Free Legal Aid — You Qualify
            </h2>
            <p className="mt-2 text-sm text-gray-500 leading-relaxed">
              Under the Legal Services Authorities Act, 1987, every woman is entitled to free legal
              aid regardless of income. Visit your District Legal Services Authority (DLSA) office
              at the district court, or call <strong>15100</strong> (NALSA helpline).
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Button to="/petition" size="sm">
                Generate a Petition
              </Button>
              <Button to="/assistant" variant="secondary" size="sm">
                Ask AI Assistant
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Trust Section */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { icon: Shield, title: 'Verified Information', desc: 'Based on Indian law' },
          { icon: Heart, title: 'Women-First', desc: 'Designed for your needs' },
          { icon: BookOpen, title: 'Hindi & English', desc: 'In your language' },
        ].map(({ icon: Icon, title, desc }) => (
          <div key={title} className="flex items-center gap-3 p-4 rounded-xl bg-white/60 border border-pink-100">
            <Icon className="w-5 h-5 text-primary-500 shrink-0" aria-hidden="true" />
            <div>
              <p className="text-sm font-medium text-gray-900">{title}</p>
              <p className="text-xs text-gray-500">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
