import { Check, CalendarCheck } from 'lucide-react'
import { useApp } from '../context/AppContext'
import SectionHeading from '../components/SectionHeading'
import ServiceTerms from '../components/ServiceTerms'
import sofaImg from '../assets/sofa-cleaning.jpg'
import pestImg from '../assets/pest-control.jpg'
import waterTankImg from '../assets/water-tank.jpg'
import painterImg from '../assets/painter.jpg'

const sections = [
  {
    id: 'bedroom-living', title: 'Bedroom & Living Room Cleaning', image: sofaImg,
    description: 'Complete dusting, vacuuming and detailing of bedrooms and living areas for a fresh, allergen-free home.',
    includes: ['Dusting of furniture & fixtures', 'Floor vacuuming & mopping', 'Cobweb removal', 'Window sill & skirting wipe-down'],
  },
  {
    id: 'sofa-carpet-mattress', title: 'Sofa, Carpet, Mattress & Curtains', image: sofaImg,
    description: 'Professional extraction cleaning that removes deep-seated dust, stains and allergens from upholstery and fabrics.',
    includes: ['Shampoo & vacuum extraction', 'Stain treatment', 'Mattress sanitisation', 'Curtain dry cleaning'],
  },
  {
    id: 'kitchen', title: 'Kitchen Cleaning', image: waterTankImg,
    description: 'Degreasing and deep cleaning of the hardest-working room in your home — counters, tiles, sink and exteriors.',
    includes: ['Countertop & tile degreasing', 'Sink & tap descaling', 'Cabinet exterior wipe-down', 'Exhaust & chimney exterior cleaning'],
  },
  {
    id: 'floor-surface', title: 'Floor & Surface Cleaning', image: painterImg,
    description: 'Machine scrubbing and polishing that restores the shine of tiles, marble and wooden flooring.',
    includes: ['Machine scrubbing', 'Stain & grout treatment', 'Surface disinfection', 'Skirting & edge detailing'],
  },
  {
    id: 'bathroom', title: 'Bathroom Cleaning', image: waterTankImg,
    description: 'Deep sanitisation of bathrooms — tiles, fittings, WC and glass — for a hygienic, sparkling finish.',
    includes: ['Tile & grout descaling', 'WC & basin sanitisation', 'Tap & shower polishing', 'Glass partition cleaning'],
  },
  {
    id: 'balcony', title: 'Balcony Cleaning', image: sofaImg,
    description: 'Sweeping, washing and railing wipe-down to make your balcony a space you actually want to sit in.',
    includes: ['Floor washing & scrubbing', 'Railing & grill dusting', 'Cobweb removal', 'Drain outlet clearing'],
  },
  {
    id: 'sofa-carpet', title: 'Sofa & Carpet Cleaning', image: sofaImg,
    description: 'Dedicated upholstery care packages for homes and offices — quick drying, fabric-safe and long-lasting freshness.',
    includes: ['Per-seat sofa shampooing', 'Carpet deep vacuum & wash', 'Fabric-safe chemicals', 'Quick-dry process (4–6 hrs)'],
  },
  {
    id: 'pest-control', title: 'Pest Control', image: pestImg,
    description: 'Safe, government-approved treatments for cockroaches, ants and bed bugs — with service warranty.',
    includes: ['Gel & spray treatment', 'Child & pet-safe chemicals', 'Kitchen & bathroom focus', 'Up to 6 months warranty'],
  },
]

export default function Cleaning() {
  const { setBookingModal } = useApp()

  return (
    <div className="pt-16 lg:pt-20">
      <section className="relative overflow-hidden bg-navy-900 py-20">
        <img src={sofaImg} alt="" className="absolute inset-0 h-full w-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-900/95 to-navy-900/60" />
        <div className="container-x relative">
          <SectionHeading light center={false} eyebrow="Premium home care" title="Cleaning Services" subtitle="Deep cleaning, upholstery care and pest control by trained, verified professionals — with transparent pricing." />
          <button onClick={() => setBookingModal({ serviceId: 'sofa-carpet-cleaning' })} data-testid="cleaning-hero-book-btn" className="btn-primary mt-8 !px-8 !py-3">
            <CalendarCheck className="h-4 w-4" /> Book a Cleaning
          </button>
        </div>
      </section>

      <section className="py-16">
        <div className="container-x space-y-14">
          {sections.map((s, i) => (
            <div key={s.id} className={`grid items-center gap-8 lg:grid-cols-2 ${i % 2 ? 'lg:[&>*:first-child]:order-2' : ''}`} data-testid={`cleaning-section-${s.id}`}>
              <div className="overflow-hidden rounded-3xl shadow-lift">
                <img src={s.image} alt={s.title} loading="lazy" className="h-64 w-full object-cover sm:h-80" />
              </div>
              <div>
                <h2 className="font-display text-2xl font-bold sm:text-3xl">{s.title}</h2>
                <p className="mt-3 text-base text-slate-500">{s.description}</p>
                <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
                  {s.includes.map((inc) => (
                    <li key={inc} className="flex items-start gap-2 text-sm text-slate-600">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" /> {inc}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => setBookingModal({ serviceId: s.id === 'pest-control' ? 'pest-control' : 'sofa-carpet-cleaning' })}
                  data-testid={`cleaning-book-${s.id}`}
                  className="btn-primary mt-6"
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container-x">
          <SectionHeading eyebrow="Good to know" title="Important Information & Exclusions" />
          <div className="mt-10">
            <ServiceTerms />
          </div>
        </div>
      </section>
    </div>
  )
}
