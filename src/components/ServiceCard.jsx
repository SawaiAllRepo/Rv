import { Link } from 'react-router-dom'
import { ArrowRight, Star } from 'lucide-react'
import ServiceIcon from './ServiceIcon'

export default function ServiceCard({ service, index = 0 }) {
  return (
    <Link
      to={`/services/${service.id}`}
      data-testid={`service-card-${service.id}`}
      className="card group overflow-hidden transition-[transform,box-shadow] duration-300 hover:-translate-y-1.5 hover:shadow-lift"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className="relative h-44 overflow-hidden">
        <img src={service.image} alt={service.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900/50 to-transparent" />
        <span className="absolute bottom-3 left-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white/95 text-brand-600 shadow-md">
          <ServiceIcon name={service.icon} className="h-5 w-5" />
        </span>
      </div>
      <div className="p-5">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-display text-base font-semibold">{service.name}</h3>
          <span className="flex items-center gap-1 text-xs font-semibold text-amber-500">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" /> {service.rating}
          </span>
        </div>
        <p className="mt-1.5 line-clamp-2 text-sm text-slate-500">{service.description}</p>
        <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 transition-colors group-hover:text-brand-700">
          Explore Service <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  )
}
