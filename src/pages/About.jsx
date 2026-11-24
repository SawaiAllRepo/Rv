import { Link } from 'react-router-dom'
import { Lightbulb, HeartHandshake, ShieldCheck, HandHeart, RefreshCcw, Link2, Briefcase, Eye, ArrowRight } from 'lucide-react'
import SectionHeading from '../components/SectionHeading'
import { images } from '../data/services'

const values = [
  { icon: Lightbulb, name: 'Pioneering Spirit', desc: 'We build new ways to make everyday services simple and accessible.' },
  { icon: HeartHandshake, name: 'Passion for Client', desc: 'Every decision starts with what is best for the customer.' },
  { icon: ShieldCheck, name: 'Responsibility', desc: 'We stand behind every professional and every booking on our platform.' },
  { icon: HandHeart, name: 'Respect', desc: 'For customers, professionals and every community we serve.' },
  { icon: RefreshCcw, name: 'Flexibility', desc: 'Services and plans that adapt to real homes and real schedules.' },
  { icon: Link2, name: 'Integration', desc: 'One connected platform for every service, in every neighbourhood.' },
  { icon: Briefcase, name: 'Professionalism', desc: 'Trained, verified and accountable — every provider, every visit.' },
  { icon: Eye, name: 'Transparency', desc: 'Clear pricing, honest reviews and open communication, always.' },
]

export default function About() {
  return (
    <div className="pt-16 lg:pt-20">
      <section className="bg-navy-900 py-20">
        <div className="container-x">
          <SectionHeading light eyebrow="Who we are" title="About RVsolutions24" subtitle="Cleaning, Pest Control, Water Tank Cleaning & Bungalow Sales & Rental — with Lion Gas Agency kept as a separate service category." />
        </div>
      </section>

      <section className="py-20">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <div className="overflow-hidden rounded-3xl shadow-lift">
            <img src={images.aboutTeam} alt="The RVsolutions24 team at work" className="h-full w-full object-cover" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-600">Our Story</p>
            <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">Born From Real Customer Needs</h2>
            <p className="mt-5 text-base leading-relaxed text-slate-500">
RV Solutions 24 is focused on reliable property-care services: professional cleaning, pest control, water tank cleaning and bungalow sales & rentals. Our goal is to make these essential services simple to discover and enquire about.            </p>
            <p className="mt-4 text-base leading-relaxed text-slate-500">
We keep our core offering clear and customer-focused, with transparent package information and priority coverage in Pune, Lonavla/Khandala and Malavali. Lion Gas Agency services are intentionally presented separately so customers can easily understand what RV Solutions 24 provides.            </p>
            <Link to="/services" data-testid="about-explore-btn" className="btn-primary mt-7">Explore Our Services <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>

      <section className="bg-white py-20" data-testid="values-section">
        <div className="container-x">
          <SectionHeading eyebrow="What we stand for" title="Our Values" subtitle="The principles behind every service, every professional and every booking." />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div key={v.name} className="card group p-6 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-lift" data-testid={`value-${v.name.toLowerCase().replace(/\s+/g, '-')}`}>
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-500 group-hover:text-white">
                  <v.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-display text-base font-bold">{v.name}</h3>
                <p className="mt-2 text-sm text-slate-500">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}
