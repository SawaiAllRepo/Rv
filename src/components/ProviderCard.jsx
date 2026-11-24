import { Link } from 'react-router-dom'
import { MapPin, BadgeCheck, Heart, Phone, CalendarCheck } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { services as allServices } from '../data/services'
import { CONTACT } from '../data/providers'
import RatingStars from './RatingStars'

export default function ProviderCard({ provider, compact = false }) {
  const { savedProviders, toggleSaveProvider, setBookingModal } = useApp()
  const saved = savedProviders.includes(provider.id)
  const serviceNames = provider.services
    .map((id) => allServices.find((s) => s.id === id)?.name)
    .filter(Boolean)

  return (
    <div className="card flex h-full flex-col p-5 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-lift" data-testid={`provider-card-${provider.id}`}>
      <div className="flex items-start gap-4">
        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-navy-600 font-display text-lg font-bold text-white">
          {provider.name.split(' ').map((w) => w[0]).slice(0, 2).join('')}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <h3 className="truncate font-display text-base font-semibold">{provider.name}</h3>
            {provider.verified && <BadgeCheck className="h-4 w-4 shrink-0 fill-brand-500 text-white" aria-label="Verified" />}
          </div>
          <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
            <RatingStars rating={provider.rating} size="h-3.5 w-3.5" />
            <span>({provider.reviews})</span>
            <span className="inline-flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {provider.location}</span>
          </div>
        </div>
        <button
          onClick={() => toggleSaveProvider(provider.id)}
          data-testid={`save-provider-${provider.id}`}
          aria-label={saved ? 'Remove from saved' : 'Save provider'}
          className={`rounded-full p-2 transition-colors ${saved ? 'bg-red-50 text-red-500' : 'bg-slate-50 text-slate-400 hover:text-red-400'}`}
        >
          <Heart className={`h-4 w-4 ${saved ? 'fill-red-500' : ''}`} />
        </button>
      </div>

      <p className="mt-3 text-xs font-medium text-slate-500">{provider.experience}+ Years Experience</p>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {serviceNames.slice(0, 3).map((n) => (
          <span key={n} className="chip">{n}</span>
        ))}
      </div>

      <div className="mt-4 flex items-end justify-between border-t border-slate-100 pt-4">
        <div>
          <p className="text-[11px] uppercase tracking-wide text-slate-400">Starting from</p>
          <p className="font-display text-lg font-bold text-navy-900">₹{provider.startingPrice.toLocaleString('en-IN')}</p>
        </div>
        <div className="flex gap-2">
          <Link to={`/providers/${provider.id}`} data-testid={`view-profile-${provider.id}`} className="btn-outline !px-4 !py-2 !text-xs">View Profile</Link>
          {compact ? (
            <a href={CONTACT.phoneHref} data-testid={`contact-${provider.id}`} className="btn-navy !px-4 !py-2 !text-xs"><Phone className="h-3.5 w-3.5" /> Contact</a>
          ) : (
            <button onClick={() => setBookingModal({ serviceId: provider.services[0], providerId: provider.id })} data-testid={`book-now-${provider.id}`} className="btn-primary !px-4 !py-2 !text-xs">
              <CalendarCheck className="h-3.5 w-3.5" /> Book Now
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
