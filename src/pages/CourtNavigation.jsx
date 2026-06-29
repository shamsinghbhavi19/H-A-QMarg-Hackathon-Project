import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import {
  MapPin,
  Building2,
  FileCheck,
  Clock,
  Navigation,
  AlertTriangle,
  Scale,
  Phone,
  ListOrdered,
  BookOpen,
  IndianRupee,
} from 'lucide-react'
import Card from '../components/Card'
import courtData from '../data/courtNavigation.json'

function getDistrictKey(stateId, district) {
  return `${stateId}:${district.toLowerCase().replace(/\s+/g, '-')}`
}

export default function CourtNavigation() {
  const [stateId, setStateId] = useState('')
  const [district, setDistrict] = useState('')
  const [legalIssueId, setLegalIssueId] = useState('')

  const selectedState = courtData.states.find((s) => s.id === stateId)
  const districts = selectedState?.districts ?? []
  const issueGuidance = legalIssueId ? courtData.issueGuidance[legalIssueId] : null
  const legalIssue = courtData.legalIssues.find((i) => i.id === legalIssueId)

  const districtInfo = useMemo(() => {
    if (!stateId || !district) return null
    const key = getDistrictKey(stateId, district)
    return courtData.districtInfo[key] ?? courtData.defaultDistrictInfo
  }, [stateId, district])

  const showResults = stateId && district && legalIssueId

  const handleStateChange = (e) => {
    setStateId(e.target.value)
    setDistrict('')
    setLegalIssueId('')
  }

  const handleDistrictChange = (e) => {
    setDistrict(e.target.value)
    setLegalIssueId('')
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <header className="text-center mb-8 sm:mb-10 animate-slide-up">
        <p className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-medium mb-4">
          <Navigation className="w-3.5 h-3.5" aria-hidden="true" />
          Local court guide — placeholder data
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
          Court Navigation
        </h1>
        <p className="mt-2 text-gray-500 text-sm sm:text-base">
          Select your state, district, and legal issue to view court guidance
        </p>
      </header>

      {/* Selectors */}
      <Card className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-5">
          Find Your Court
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1.5">
              State
            </label>
            <select
              id="state"
              value={stateId}
              onChange={handleStateChange}
              className="w-full px-4 py-2.5 rounded-xl border border-pink-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">Select state</option>
              {courtData.states.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="district" className="block text-sm font-medium text-gray-700 mb-1.5">
              District
            </label>
            <select
              id="district"
              value={district}
              onChange={handleDistrictChange}
              disabled={!stateId}
              className="w-full px-4 py-2.5 rounded-xl border border-pink-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <option value="">Select district</option>
              {districts.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="legalIssue" className="block text-sm font-medium text-gray-700 mb-1.5">
              Legal Issue
            </label>
            <select
              id="legalIssue"
              value={legalIssueId}
              onChange={(e) => setLegalIssueId(e.target.value)}
              disabled={!district}
              className="w-full px-4 py-2.5 rounded-xl border border-pink-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <option value="">Select legal issue</option>
              {courtData.legalIssues.map((issue) => (
                <option key={issue.id} value={issue.id}>
                  {issue.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </Card>

      {/* Results */}
      {!showResults && (
        <Card className="text-center py-12">
          <div className="w-14 h-14 rounded-2xl bg-primary-50 text-primary-400 flex items-center justify-center mx-auto mb-4">
            <MapPin className="w-7 h-7" aria-hidden="true" />
          </div>
          <p className="text-sm font-medium text-gray-500">
            Select state, district, and legal issue to view court information
          </p>
          <p className="mt-1 text-xs text-gray-400">
            Data shown is placeholder information for guidance only
          </p>
        </Card>
      )}

      {showResults && issueGuidance && districtInfo && (
        <div className="space-y-6 animate-fade-in" role="region" aria-label="Court navigation results">
          {/* Summary header */}
          <Card className="border-primary-200">
            <div className="flex flex-col sm:flex-row sm:items-start gap-4">
              <div className="w-12 h-12 rounded-xl gradient-purple flex items-center justify-center shrink-0">
                <Scale className="w-6 h-6 text-white" aria-hidden="true" />
              </div>
              <div>
                <p className="text-xs font-medium text-primary-600 uppercase tracking-wide">
                  {selectedState.name} · {district}
                </p>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">
                  {legalIssue.name}
                </h2>
                <p lang="hi" className="text-sm text-primary-500 font-medium">
                  {legalIssue.nameHi}
                </p>
                <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                  {issueGuidance.summary}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="text-xs px-3 py-1 rounded-full bg-primary-50 text-primary-700 border border-primary-100">
                    {issueGuidance.law}
                  </span>
                  <span className="text-xs px-3 py-1 rounded-full bg-pink-50 text-pink-700 border border-pink-100">
                    {issueGuidance.courtType}
                  </span>
                </div>
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* District court info */}
            <Card>
              <div className="flex items-center gap-2 mb-4">
                <Building2 className="w-5 h-5 text-primary-600" aria-hidden="true" />
                <h3 className="font-semibold text-gray-900">Court in {district}</h3>
              </div>
              <dl className="space-y-3 text-sm">
                <div>
                  <dt className="text-gray-400 text-xs font-medium uppercase tracking-wide">
                    Primary Court
                  </dt>
                  <dd className="text-gray-800 font-medium mt-0.5">
                    {districtInfo.primaryCourt}, {district}
                  </dd>
                </div>
                {districtInfo.familyCourt && (
                  <div>
                    <dt className="text-gray-400 text-xs font-medium uppercase tracking-wide">
                      Family Court
                    </dt>
                    <dd className="text-gray-800 mt-0.5">{districtInfo.familyCourt}</dd>
                  </div>
                )}
                <div>
                  <dt className="text-gray-400 text-xs font-medium uppercase tracking-wide">
                    Address
                  </dt>
                  <dd className="text-gray-600 mt-0.5">{districtInfo.address}</dd>
                </div>
                <div>
                  <dt className="text-gray-400 text-xs font-medium uppercase tracking-wide">
                    Timings
                  </dt>
                  <dd className="text-gray-600 mt-0.5 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-primary-500 shrink-0" aria-hidden="true" />
                    {districtInfo.timings}
                  </dd>
                </div>
                <div>
                  <dt className="text-gray-400 text-xs font-medium uppercase tracking-wide">
                    Filing Counter
                  </dt>
                  <dd className="text-gray-600 mt-0.5">{districtInfo.filingCounter}</dd>
                </div>
                <div>
                  <dt className="text-gray-400 text-xs font-medium uppercase tracking-wide">
                    Free Legal Aid
                  </dt>
                  <dd className="text-gray-600 mt-0.5">{districtInfo.legalAid}</dd>
                </div>
                <div>
                  <dt className="text-gray-400 text-xs font-medium uppercase tracking-wide">
                    Helpline
                  </dt>
                  <dd className="text-gray-600 mt-0.5 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-primary-500 shrink-0" aria-hidden="true" />
                    {districtInfo.helpline}
                  </dd>
                </div>
              </dl>
            </Card>

            {/* Steps & documents */}
            <div className="space-y-6">
              <Card>
                <div className="flex items-center gap-2 mb-4">
                  <ListOrdered className="w-5 h-5 text-primary-600" aria-hidden="true" />
                  <h3 className="font-semibold text-gray-900">Steps to File</h3>
                </div>
                <ol className="space-y-3">
                  {issueGuidance.steps.map((step, i) => (
                    <li key={i} className="flex gap-3 text-sm text-gray-600">
                      <span
                        className="w-6 h-6 rounded-full gradient-purple text-white text-xs font-bold flex items-center justify-center shrink-0"
                        aria-hidden="true"
                      >
                        {i + 1}
                      </span>
                      <span className="leading-relaxed pt-0.5">{step}</span>
                    </li>
                  ))}
                </ol>
              </Card>

              <Card>
                <div className="flex items-center gap-2 mb-4">
                  <FileCheck className="w-5 h-5 text-primary-600" aria-hidden="true" />
                  <h3 className="font-semibold text-gray-900">Documents Needed</h3>
                </div>
                <ul className="space-y-2">
                  {issueGuidance.documents.map((doc) => (
                    <li key={doc} className="flex items-start gap-2 text-sm text-gray-600">
                      <FileCheck
                        className="w-4 h-4 text-primary-500 shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      {doc}
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </div>

          {/* Timeline & fees */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card>
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-5 h-5 text-primary-600" aria-hidden="true" />
                <h3 className="font-semibold text-gray-900">Expected Timeline</h3>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                {issueGuidance.timeline}
              </p>
            </Card>
            <Card>
              <div className="flex items-center gap-2 mb-2">
                <IndianRupee className="w-5 h-5 text-primary-600" aria-hidden="true" />
                <h3 className="font-semibold text-gray-900">Court Fees</h3>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                {issueGuidance.fees}
              </p>
            </Card>
          </div>

          <Card className="bg-primary-50/50 border-primary-100">
            <div className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-primary-600 shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <h3 className="font-semibold text-gray-900 text-sm">Before you visit</h3>
                <p className="mt-1 text-sm text-gray-600 leading-relaxed">
                  Carry original documents and photocopies. Arrive before 11 AM to avoid long
                  queues at the filing counter. You can use HAQMarg&apos;s{' '}
                  <Link to="/petition" className="text-primary-600 underline underline-offset-2 hover:text-primary-700">
                    Petition Generator
                  </Link>{' '}
                  to prepare your draft beforehand.
                </p>
              </div>
            </div>
          </Card>
        </div>
      )}

      <div className="mt-8 flex items-start gap-2 p-4 rounded-xl bg-amber-50 border border-amber-200 text-sm text-amber-800">
        <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" aria-hidden="true" />
        <p>
          This information is placeholder data from local JSON and may not reflect current
          court details. Always confirm at your district court registry. For emergencies,
          call <a href="tel:181" className="underline font-semibold">181</a> or{' '}
          <a href="tel:100" className="underline font-semibold">100</a>.
        </p>
      </div>
    </div>
  )
}
