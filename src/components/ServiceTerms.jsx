import { Info, XCircle, Ruler } from 'lucide-react'
import { pricingTerms, exclusions } from '../data/memberships'

export default function ServiceTerms() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="card p-6 sm:p-8" data-testid="important-information">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600"><Info className="h-5 w-5" /></span>
          <h3 className="font-display text-xl font-bold">Important Information</h3>
        </div>
        <p className="mt-4 flex items-start gap-2 rounded-xl bg-brand-50 px-4 py-3 text-sm font-medium text-brand-700">
          <Ruler className="mt-0.5 h-4 w-4 shrink-0" /> {pricingTerms.base}
        </p>
        <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-slate-500">Additional room charges</p>
        <ul className="mt-2 divide-y divide-slate-100">
          {pricingTerms.additional.map((a) => (
            <li key={a.service} className="flex items-center justify-between py-2.5 text-sm">
              <span className="text-slate-600">{a.service}</span>
              <span className="font-semibold text-navy-900">{a.charge}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 rounded-xl bg-amber-50 px-4 py-3 text-xs leading-relaxed text-amber-700">{pricingTerms.note}</p>
      </div>

      <div className="card p-6 sm:p-8" data-testid="exclusions-section">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-500"><XCircle className="h-5 w-5" /></span>
          <h3 className="font-display text-xl font-bold">What's Not Included</h3>
        </div>
        <ul className="mt-5 space-y-3">
          {exclusions.map((e) => (
            <li key={e} className="flex items-start gap-3 text-sm text-slate-600">
              <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" /> {e}
            </li>
          ))}
        </ul>
        <p className="mt-5 text-xs text-slate-400">
          Add-on services can be arranged on request at an additional charge. Speak to our support team for a custom quote.
        </p>
      </div>
    </div>
  )
}
