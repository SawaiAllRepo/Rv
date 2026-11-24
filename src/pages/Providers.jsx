import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import { providers } from '../data/providers'
import { LOCATIONS } from '../data/services'
import ProviderCard from '../components/ProviderCard'
import SectionHeading from '../components/SectionHeading'

export default function Providers() {
  const [query, setQuery] = useState('')
  const [location, setLocation] = useState('')

  const list = useMemo(() => {
    let l = providers
    if (location) l = l.filter((p) => p.location === location)
    if (query.trim()) {
      const q = query.trim().toLowerCase()
      l = l.filter((p) => p.name.toLowerCase().includes(q))
    }
    return l
  }, [query, location])

  return (
    <div className="pt-16 lg:pt-20">
      <section className="bg-navy-900 py-16">
        <div className="container-x">
          <SectionHeading light eyebrow="Verified network" title="Trusted Professionals" subtitle="Meet the verified experts behind thousands of happy customers." />
          <div className="mx-auto mt-8 flex max-w-2xl flex-col gap-3 rounded-2xl bg-white p-3 shadow-lift sm:flex-row" data-testid="providers-filter-bar">
            <div className="flex flex-1 items-center gap-2 px-3">
              <Search className="h-5 w-5 text-brand-500" />
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by business name…" data-testid="providers-search-input" className="w-full bg-transparent py-2 text-sm text-navy-900 outline-none" />
            </div>
            <select value={location} onChange={(e) => setLocation(e.target.value)} data-testid="providers-location-select" className="input !w-full sm:!w-48">
              <option value="">All Locations</option>
              {LOCATIONS.map((l) => <option key={l}>{l}</option>)}
            </select>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-x">
          <p className="text-sm text-slate-500" data-testid="providers-count">Showing <span className="font-semibold text-navy-900">{list.length}</span> professionals</p>
          <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {list.map((p) => <ProviderCard key={p.id} provider={p} />)}
          </div>
        </div>
      </section>
    </div>
  )
}
