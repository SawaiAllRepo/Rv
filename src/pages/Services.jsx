import { useMemo, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { Search, MapPin } from 'lucide-react'
import {
  mainServices,
  additionalServices,
  LOCATIONS,
} from '../data/services'
import ServiceCard from '../components/ServiceCard'
import SectionHeading from '../components/SectionHeading'

export default function Services() {
  const [params, setParams] = useSearchParams()

  const [query, setQuery] = useState(params.get('q') || '')
  const [location, setLocation] = useState(params.get('loc') || '')

  const filteredMain = useMemo(() => {
    const q = query.trim().toLowerCase()

    return mainServices.filter(
      (service) =>
        !q ||
        service.name.toLowerCase().includes(q) ||
        service.description.toLowerCase().includes(q)
    )
  }, [query])

  const filteredGas = useMemo(() => {
    const q = query.trim().toLowerCase()

    return additionalServices.filter(
      (service) =>
        !q ||
        service.name.toLowerCase().includes(q) ||
        service.description.toLowerCase().includes(q)
    )
  }, [query])

  const updateParams = (q, l) => {
    const next = {}

    if (q) next.q = q
    if (l) next.loc = l

    setParams(next, { replace: true })
  }

  const handleSearchChange = (value) => {
    setQuery(value)
    updateParams(value, location)
  }

  const handleLocationChange = (value) => {
    setLocation(value)
    updateParams(query, value)
  }

  const clearSearch = () => {
    setQuery('')
    updateParams('', location)
  }

  return (
    <div className="pt-16 lg:pt-20">
      {/* Hero Section */}
      <section className="bg-navy-900 py-16">
        <div className="container-x">
          <SectionHeading
            light
            eyebrow="RV Solutions 24"
            title="Cleaning, Pest Control, Water Tank Cleaning & Bungalow Sales & Rental"
            subtitle="Our core services focus on property care. Lion Gas Agency services are kept in a separate category below."
          />

          {/* Find Services */}
          <div
            className="mx-auto mt-8 flex max-w-2xl flex-col gap-3 rounded-2xl bg-white p-3 shadow-lift sm:flex-row"
            data-testid="services-filter-bar"
          >
            {/* Search */}
            <div className="flex flex-1 items-center gap-2 px-3">
              <Search className="h-5 w-5 text-brand-500" />

              <input
                value={query}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder="Find Services…"
                data-testid="services-search-input"
                className="w-full bg-transparent py-2 text-sm text-navy-900 placeholder-slate-400 outline-none"
              />
            </div>

            <div className="hidden w-px bg-slate-200 sm:block" />

            {/* Location Filter */}
            <div className="flex items-center gap-2 px-3 sm:w-48">
              <MapPin className="h-5 w-5 text-brand-500" />

              <select
                value={location}
                onChange={(e) => handleLocationChange(e.target.value)}
                data-testid="services-location-select"
                className="w-full bg-transparent py-2 text-sm text-navy-900 outline-none"
              >
                <option value="">All Locations</option>

                {LOCATIONS.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Core Services */}
      <section className="py-16">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <SectionHeading
                eyebrow="Core offering"
                title="RV Solutions 24 Services"
                subtitle="These are the services customers can book from RV Solutions 24."
              />
            </div>

            <Link to="/membership" className="btn-outline">
              View Annual Packages
            </Link>
          </div>

          {/* Service Count */}
          <p
            className="mt-8 text-sm text-slate-500"
            data-testid="services-count"
          >
            Showing{' '}
            <span className="font-semibold text-navy-900">
              {filteredMain.length}
            </span>{' '}
            core service categories
            {location && (
              <>
                {' '}
                · service area:{' '}
                <span className="font-semibold text-navy-900">
                  {location}
                </span>
              </>
            )}
          </p>

          {/* No Results */}
          {filteredMain.length === 0 ? (
            <div className="card mt-8 p-12 text-center">
              <p className="font-display text-lg font-semibold">
                No core services found
              </p>

              <button
                onClick={clearSearch}
                className="btn-outline mt-5"
              >
                Clear Search
              </button>
            </div>
          ) : (
            /* Service Cards */
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredMain.map((service, index) => (
                <ServiceCard
                  service={service}
                  index={index}
                  key={service.id}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lion Gas Agency */}
      <section
        className="bg-slate-100 py-16"
        data-testid="lion-gas-section"
      >
        <div className="container-x">
          <SectionHeading
            eyebrow="Separate service category"
            title="Lion Gas Agency"
            subtitle="Gas Servicing and Commercial Gas Supply are separate from the RV Solutions 24 cleaning, pest control, water tank cleaning and Bungalow Sales & Rental services."
          />

          {/* Gas Services */}
          {filteredGas.length > 0 && (
            <div className="mx-auto mt-10 grid max-w-4xl gap-6 sm:grid-cols-2">
              {filteredGas.map((service, index) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  index={index}
                />
              ))}
            </div>
          )}

          {filteredGas.length === 0 && (
            <div className="card mx-auto mt-10 max-w-2xl p-10 text-center">
              <p className="font-display text-lg font-semibold text-navy-900">
                No gas services found
              </p>

              <p className="mt-2 text-sm text-slate-500">
                Try a different service search.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}