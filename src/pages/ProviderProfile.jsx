import { Link, useParams } from 'react-router-dom'
import { MapPin, BadgeCheck, Phone, MessageCircle, Mail, CalendarCheck, Briefcase, ArrowLeft, Heart, CheckCircle2 } from 'lucide-react'
import { providers, CONTACT } from '../data/providers'
import { services } from '../data/services'
import { reviews as allReviews } from '../data/reviews'
import { useApp } from '../context/AppContext'
import RatingStars from '../components/RatingStars'
import ProviderCard from '../components/ProviderCard'
import SectionHeading from '../components/SectionHeading'

export default function ProviderProfile() {
  const { id } = useParams()
  const { setBookingModal, setEnquiryModal, savedProviders, toggleSaveProvider } = useApp()
  const provider = providers.find((p) => p.id === id)

  if (!provider) {
    return (
      <div className="container-x flex min-h-[60vh] flex-col items-center justify-center pt-24 text-center">
        <h1 className="font-display text-2xl font-bold">Provider not found</h1>
        <Link to="/providers" className="btn-primary mt-6" data-testid="back-to-providers-btn">Browse Professionals</Link>
      </div>
    )
  }

  const providerServices = provider.services.map((sid) => services.find((s) => s.id === sid)).filter(Boolean)
  const providerReviews = allReviews.filter((r) => r.provider === provider.name)
  const similar = providers.filter((p) => p.id !== provider.id && p.services.some((s) => provider.services.includes(s))).slice(0, 3)
  const saved = savedProviders.includes(provider.id)

  return (
    <div className="pt-16 lg:pt-20">
      <section className="bg-navy-900 py-14">
        <div className="container-x">
          <Link to="/providers" className="inline-flex items-center gap-1.5 text-sm text-slate-300 transition-colors hover:text-white" data-testid="back-link">
            <ArrowLeft className="h-4 w-4" /> All Professionals
          </Link>
          <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-center">
            <span className="flex h-24 w-24 shrink-0 items-center justify-center rounded-3xl bg-gradient-to-br from-brand-500 to-navy-600 font-display text-3xl font-bold text-white shadow-lift">
              {provider.name.split(' ').map((w) => w[0]).slice(0, 2).join('')}
            </span>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="font-display text-3xl font-bold text-white sm:text-4xl" data-testid="provider-name">{provider.name}</h1>
                {provider.verified && <span className="chip !bg-brand-700 !text-white"><BadgeCheck className="h-3.5 w-3.5" /> Verified</span>}
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-300">
                <RatingStars rating={provider.rating} /> <span className="-ml-2">({provider.reviews} reviews)</span>
                <span className="inline-flex items-center gap-1"><MapPin className="h-4 w-4" /> {provider.location}</span>
                <span className="inline-flex items-center gap-1"><Briefcase className="h-4 w-4" /> {provider.experience}+ years experience</span>
              </div>
            </div>
            <button onClick={() => toggleSaveProvider(provider.id)} data-testid="profile-save-btn" className={`btn-outline !border-white/30 !bg-white/10 !text-white hover:!bg-white/20 ${saved ? '!text-red-300' : ''}`}>
              <Heart className={`h-4 w-4 ${saved ? 'fill-red-400 text-red-400' : ''}`} /> {saved ? 'Saved' : 'Save'}
            </button>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap">
            <a href={CONTACT.phoneHref} data-testid="profile-call-btn" className="btn-primary"><Phone className="h-4 w-4" /> Call Now</a>
            <a href={`https://wa.me/${CONTACT.whatsapp}`} target="_blank" rel="noreferrer" data-testid="profile-whatsapp-btn" className="btn-outline !border-white/30 !bg-white/10 !text-white hover:!bg-white/20"><MessageCircle className="h-4 w-4" /> WhatsApp</a>
            <button onClick={() => setEnquiryModal({ providerId: provider.id, serviceId: provider.services[0] })} data-testid="profile-enquiry-btn" className="btn-outline !border-white/30 !bg-white/10 !text-white hover:!bg-white/20"><Mail className="h-4 w-4" /> Send Enquiry</button>
            <button onClick={() => setBookingModal({ providerId: provider.id, serviceId: provider.services[0] })} data-testid="profile-book-btn" className="btn-navy !bg-white !text-navy-900 hover:!bg-brand-50"><CalendarCheck className="h-4 w-4" /> Book Service</button>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-x grid gap-10 lg:grid-cols-3">
          <div className="space-y-10 lg:col-span-2">
            <div className="card p-6 sm:p-8" data-testid="about-business">
              <h2 className="font-display text-xl font-bold">About the Business</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{provider.about}</p>
              <p className="mt-4 text-xs text-slate-400">Owned by <span className="font-semibold text-navy-900">{provider.owner}</span></p>
            </div>

            <div className="card p-6 sm:p-8" data-testid="services-offered">
              <h2 className="font-display text-xl font-bold">Services Offered</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {providerServices.map((s) => (
                  <Link key={s.id} to={`/services/${s.id}`} className="chip !px-4 !py-2 !text-sm transition-colors hover:!bg-brand-100">{s.name}</Link>
                ))}
              </div>
            </div>

            <div className="card p-6 sm:p-8" data-testid="pricing-section">
              <h2 className="font-display text-xl font-bold">Pricing</h2>
              <ul className="mt-4 divide-y divide-slate-100">
                {provider.pricing.map((pr) => (
                  <li key={pr.item} className="flex items-center justify-between py-3 text-sm">
                    <span className="text-slate-600">{pr.item}</span>
                    <span className="font-semibold text-navy-900">{pr.price}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-slate-400">Final quote depends on scope of work. No hidden charges.</p>
            </div>

            <div className="card p-6 sm:p-8" data-testid="gallery-section">
              <h2 className="font-display text-xl font-bold">Business Gallery</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                {provider.gallery.map((g, i) => (
                  <img key={i} src={g} alt={`${provider.name} work sample ${i + 1}`} loading="lazy" className="h-32 w-full rounded-xl object-cover transition-transform duration-300 hover:scale-[1.03]" />
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="card p-6" data-testid="experience-card">
              <h3 className="font-display text-base font-bold">Experience</h3>
              <p className="mt-2 font-display text-3xl font-bold text-brand-600">{provider.experience}+ years</p>
              <p className="mt-1 text-xs text-slate-500">Serving customers since {new Date().getFullYear() - provider.experience}</p>
            </div>
            <div className="card p-6" data-testid="service-areas-card">
              <h3 className="font-display text-base font-bold">Service Areas</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {provider.areas.map((a) => <span key={a} className="chip !bg-slate-100 !text-slate-600"><MapPin className="h-3 w-3" /> {a}</span>)}
              </div>
            </div>
            <div className="card bg-navy-900 p-6 !border-navy-800" data-testid="quick-book-card">
              <h3 className="font-display text-base font-bold text-white">Book {provider.name}</h3>
              <p className="mt-1 text-xs text-slate-400">Starting from ₹{provider.startingPrice.toLocaleString('en-IN')}</p>
              <button onClick={() => setBookingModal({ providerId: provider.id, serviceId: provider.services[0] })} data-testid="quick-book-btn" className="btn-primary mt-4 w-full">Book Service Now</button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16" data-testid="customer-reviews-section">
        <div className="container-x">
          <SectionHeading center={false} eyebrow="Feedback" title="Customer Reviews" subtitle={`What customers say about ${provider.name}.`} />
          {providerReviews.length === 0 ? (
            <p className="mt-8 text-sm text-slate-500">Reviews coming soon for this provider.</p>
          ) : (
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {providerReviews.map((r) => (
                <figure key={r.id} className="card p-6" data-testid={`provider-review-${r.id}`}>
                  <RatingStars rating={r.rating} showValue={false} />
                  <blockquote className="mt-3 text-sm leading-relaxed text-slate-600">"{r.text}"</blockquote>
                  <figcaption className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-xs text-slate-400">
                    <span className="font-semibold text-navy-900">{r.name}</span>
                    <span>{r.date}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          )}
        </div>
      </section>

      {similar.length > 0 && (
        <section className="py-16" data-testid="similar-providers-section">
          <div className="container-x">
            <SectionHeading center={false} eyebrow="Keep exploring" title="Similar Providers" subtitle="Other verified professionals offering related services." />
            <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {similar.map((p) => <ProviderCard key={p.id} provider={p} compact />)}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
