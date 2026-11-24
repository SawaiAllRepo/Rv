import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Search,
  MapPin,
  ArrowRight,
  ShieldCheck,
  Quote,
  Check,
} from 'lucide-react'

import {
  services,
  mainServices,
  additionalServices,
  PRIORITY_LOCATIONS,
  UPCOMING_LOCATIONS,
  LOCATIONS,
  images,
} from '../data/services'

import { memberships } from '../data/memberships'
import { reviews } from '../data/reviews'
import ServiceCard from '../components/ServiceCard'
import SectionHeading from '../components/SectionHeading'
import RatingStars from '../components/RatingStars'
import BookingForm from '../components/BookingForm'

const DIRECT_SERVICE_IDS = [
  'bungalow-on-rent',
  'gas-servicing',
  'commercial-gas-supply',
]

export default function Home() {
  const navigate = useNavigate()

  const [query, setQuery] = useState('')
  const [location, setLocation] = useState('')
  const [directServiceId, setDirectServiceId] = useState('')

  const selectedDirectService = services.find(
    (service) => service.id === directServiceId
  )

  const handleServiceChange = (value) => {
    setQuery(value)

    const selectedService = services.find(
      (service) =>
        service.name.toLowerCase() === value.trim().toLowerCase()
    )

    if (
      selectedService &&
      DIRECT_SERVICE_IDS.includes(selectedService.id)
    ) {
      setDirectServiceId(selectedService.id)
      setLocation('')
      return
    }

    setDirectServiceId('')
  }

  const search = (e) => {
    e.preventDefault()

    const cleanQuery = query.trim()

    if (!cleanQuery) {
      navigate(
        `/services?loc=${encodeURIComponent(location)}`
      )
      return
    }

    const match = services.find(
      (service) =>
        service.name
          .toLowerCase()
          .includes(cleanQuery.toLowerCase())
    )

    if (match) {
      if (DIRECT_SERVICE_IDS.includes(match.id)) {
        setDirectServiceId(match.id)
        setLocation('')
        return
      }

      navigate(
        `/services/${match.id}${
          location
            ? `?loc=${encodeURIComponent(location)}`
            : ''
        }`
      )
    } else {
      navigate(
        `/services?q=${encodeURIComponent(
          cleanQuery
        )}&loc=${encodeURIComponent(location)}`
      )
    }
  }

  const handleDirectFormBack = () => {
    setDirectServiceId('')
    setQuery('')
    setLocation('')
  }

  /*
   * ============================================================
   * DIRECT SERVICE SCREEN
   *
   * Bungalow Sales & Rental
   * Gas Servicing
   * Commercial Gas Supply
   *
   * These services open their own direct enquiry form.
   * ============================================================
   */

  if (directServiceId && selectedDirectService) {
    return (
      <div
        className="min-h-screen bg-slate-100 pt-20"
        data-testid="direct-service-page"
      >
        <div className="container-x py-8 sm:py-12">
          <div className="mx-auto max-w-5xl">
            <div className="rounded-3xl bg-white p-5 shadow-lift sm:p-8">
              <BookingForm
                key={directServiceId}
                defaultServiceId={directServiceId}
                onDone={handleDirectFormBack}
                onBack={handleDirectFormBack}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }

  /*
   * ============================================================
   * NORMAL HOME PAGE
   * ============================================================
   */

  return (
    <div>
      {/* ========================================================
          HERO SECTION
      ========================================================= */}
      <section
        className="relative flex min-h-[92vh] items-center overflow-hidden bg-navy-900"
        data-testid="hero-section"
      >
        <img
          src={images.heroImg}
          alt="RV Solutions 24 cleaning, pest control and home services"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-navy-900/95 via-navy-900/80 to-navy-900/40" />

        <div className="container-x relative py-28 lg:py-32">
          <div className="max-w-3xl">
            {/* Brand */}
            <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-brand-200 backdrop-blur">
              <ShieldCheck className="h-3.5 w-3.5" />
              RV SOLUTIONS 24
            </p>

            {/* Heading */}
            <h1 className="mt-6 font-display text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              Cleaning,{' '}
              <span className="text-brand-400">
                Pest Control
              </span>{' '}
              & Home Solutions
            </h1>

            {/* Subtitle */}
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-300 md:text-lg">
              Trusted cleaning, pest control, water tank cleaning and
              Bungalow Sales & Rental services — with professional home
              care packages for your property.
            </p>

            {/* ==================================================
                SERVICE SEARCH
            ================================================== */}
            <form
              onSubmit={search}
              className="mt-8 flex flex-col gap-3 rounded-2xl bg-white p-3 shadow-lift sm:flex-row sm:items-center sm:rounded-full"
              data-testid="hero-search-form"
            >
              {/* Service Dropdown */}
              <div className="flex flex-1 items-center gap-2 px-3">
                <Search className="h-5 w-5 shrink-0 text-brand-500" />

                <select
                  value={query}
                  onChange={(e) =>
                    handleServiceChange(e.target.value)
                  }
                  aria-label="What service do you need"
                  data-testid="hero-search-input"
                  className="w-full cursor-pointer bg-transparent py-2.5 text-sm text-navy-900 outline-none"
                >
                  <option value="">
                    What service do you need?
                  </option>

                  {services.map((service) => (
                    <option
                      key={service.id}
                      value={service.name}
                    >
                      {service.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="hidden h-8 w-px bg-slate-200 sm:block" />

              {/* Location */}
              <div className="flex flex-1 items-center gap-2 px-3">
                <MapPin className="h-5 w-5 shrink-0 text-brand-500" />

                <select
                  value={location}
                  onChange={(e) =>
                    setLocation(e.target.value)
                  }
                  aria-label="Select Location"
                  data-testid="hero-location-select"
                  className="w-full cursor-pointer bg-transparent py-2.5 text-sm text-navy-900 outline-none"
                >
                  <option value="">
                    Select Location
                  </option>

                  {LOCATIONS.map((item) => (
                    <option
                      key={item}
                      value={item}
                    >
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              {/* Find Services */}
              <button
                type="submit"
                data-testid="hero-find-btn"
                className="btn-primary sm:!px-7 sm:!py-3"
              >
                Find Services
              </button>
            </form>

            {/* ==================================================
                CORE SERVICE QUICK BUTTONS
            ================================================== */}
            <div className="mt-5 flex flex-wrap items-center gap-2 text-xs text-slate-300">
              <span className="mr-1 font-medium">
                Core services:
              </span>

              {mainServices.map((service) => (
                <button
                  key={service.id}
                  type="button"
                  onClick={() =>
                    navigate(`/services/${service.id}`)
                  }
                  className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 font-medium text-white backdrop-blur transition-colors hover:bg-brand-500"
                >
                  {service.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          CORE SERVICES
      ========================================================= */}
      <section
        className="py-20"
        data-testid="services-section"
      >
        <div className="container-x">
          <SectionHeading
            eyebrow="RV SOLUTIONS 24"
            title="Our Core Services"
            subtitle="Professional Cleaning, Pest Control, Water Tank Cleaning and Bungalow Sales & Rental services."
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {mainServices.map((service, index) => (
              <ServiceCard
                key={service.id}
                service={service}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          MEMBERSHIPS
      ========================================================= */}
      <section
        className="bg-navy-900 py-20"
        data-testid="membership-section"
      >
        <div className="container-x">
          <SectionHeading
            light
            eyebrow="Annual home care packages"
            title="Silver, Gold & Platinum Packages"
            subtitle="Simple yearly plans combining pest control and cleaning services for your home."
          />

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {memberships.map((membership) => (
              <div
                key={membership.id}
                className={`relative flex flex-col rounded-3xl p-7 ${
                  membership.highlighted
                    ? 'bg-white ring-2 ring-brand-500 shadow-lift'
                    : 'border border-white/10 bg-white/5'
                }`}
              >
                {membership.badge && (
                  <span className="absolute -top-3 left-6 rounded-full bg-brand-700 px-3 py-1 text-xs font-bold text-white">
                    {membership.badge}
                  </span>
                )}

                <h3
                  className={`font-display text-lg font-bold uppercase tracking-widest ${
                    membership.highlighted
                      ? 'text-brand-600'
                      : 'text-brand-400'
                  }`}
                >
                  {membership.name}
                </h3>

                <p
                  className={`mt-1 text-xs ${
                    membership.highlighted
                      ? 'text-slate-500'
                      : 'text-slate-400'
                  }`}
                >
                  {membership.tagline}
                </p>

                <p
                  className={`mt-5 font-display text-3xl font-bold ${
                    membership.highlighted
                      ? 'text-navy-900'
                      : 'text-white'
                  }`}
                >
                  ₹
                  {membership.price.toLocaleString('en-IN')}{' '}
                  <span
                    className={`text-sm font-medium ${
                      membership.highlighted
                        ? 'text-slate-500'
                        : 'text-slate-400'
                    }`}
                  >
                    / Year
                  </span>
                </p>

                <ul className="mt-6 space-y-3">
                  {membership.features.map((feature) => (
                    <li
                      key={feature}
                      className={`flex items-start gap-2 text-sm ${
                        membership.highlighted
                          ? 'text-slate-600'
                          : 'text-slate-300'
                      }`}
                    >
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* View Package Details */}
                <Link
                  to="/membership"
                  className={`mt-7 flex w-full items-center justify-center rounded-xl px-4 py-3 text-sm font-bold ${
                    membership.highlighted
                      ? 'bg-brand-700 text-white hover:bg-brand-800'
                      : 'border border-white/20 bg-white/10 text-white hover:border-brand-400 hover:bg-white/20'
                  }`}
                >
                  View Package Details
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          LION GAS AGENCY
      ========================================================= */}
      <section
        className="bg-slate-100 py-20"
        data-testid="additional-services-section"
      >
        <div className="container-x">
          <SectionHeading
            eyebrow="Separate service category"
            title="Lion Gas Agency"
            subtitle="Gas services are presented separately and are not part of RV Solutions 24's core cleaning and home-care offering."
          />

          <div className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-2">
            {additionalServices.map((service, index) => (
              <ServiceCard
                key={service.id}
                service={service}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          LOCATIONS
      ========================================================= */}
      <section
        className="bg-slate-50 py-20"
        data-testid="locations-section"
      >
        <div className="container-x">
          <SectionHeading
            eyebrow="Service Locations"
            title="Priority Locations"
            subtitle="RV Solutions 24 currently prioritises service coverage in Pune, Lonavla/Khandala and Malavali."
          />

          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {PRIORITY_LOCATIONS.map((item) => (
              <div
                key={item}
                className="card flex items-center gap-4 p-6"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <MapPin className="h-5 w-5" />
                </span>

                <div>
                  <h3 className="font-display text-lg font-bold text-navy-900">
                    {item}
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    Priority service location
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-center">
            <p className="text-sm font-semibold text-navy-900">
              Coming Soon / Upcoming Locations
            </p>

            <p className="mt-1 text-sm text-slate-500">
              {UPCOMING_LOCATIONS.length > 0
                ? `${UPCOMING_LOCATIONS.join(
                    ', '
                  )} and more locations will be added soon.`
                : 'More locations will be added soon.'}
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================
          REVIEWS
      ========================================================= */}
      <section
        className="py-20"
        data-testid="reviews-section"
      >
        <div className="container-x">
          <SectionHeading
            eyebrow="Customer stories"
            title="Loved by Customers"
            subtitle="Real reviews from homes and properties in our service locations."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {reviews.slice(0, 6).map((review) => (
              <figure
                key={review.id}
                className="card flex h-full flex-col p-6"
                data-testid={`review-card-${review.id}`}
              >
                <Quote className="h-7 w-7 text-brand-200" />

                <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">
                  "{review.text}"
                </blockquote>

                <figcaption className="mt-5 border-t border-slate-100 pt-4">
                  <RatingStars
                    rating={review.rating}
                    showValue={false}
                  />

                  <div className="mt-2 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-navy-900">
                        {review.name}
                      </p>

                      <p className="text-xs text-slate-400">
                        {review.service} · {review.location}
                      </p>
                    </div>

                    <p className="text-xs text-slate-400">
                      {review.date}
                    </p>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          CTA
      ========================================================= */}
      <section className="bg-navy-900 py-14 text-center">
        <div className="container-x">
          <h2 className="font-display text-3xl font-bold text-white">
            Need Cleaning, Pest Control or Water Tank Cleaning?
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-slate-300">
            Choose a service or annual package and send an enquiry to
            RV Solutions 24.
          </p>

          <Link
            to="/services"
            className="btn-primary mt-6"
          >
            Explore Services
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  )
}