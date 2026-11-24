import { Link } from 'react-router-dom'
import { Search, Compass, MessagesSquare, CalendarCheck, ArrowRight } from 'lucide-react'
import SectionHeading from '../components/SectionHeading'

const steps = [
  { num: '01', icon: Search, title: 'SEARCH', desc: 'Tell us what service you need.', detail: 'Browse 16+ categories or search directly — from service professionals to event managers.' },
  { num: '02', icon: Compass, title: 'DISCOVER', desc: 'Find trusted professionals near you.', detail: 'Compare verified providers by rating, experience, price and location.' },
  { num: '03', icon: MessagesSquare, title: 'CONNECT', desc: 'Contact or send an enquiry.', detail: 'Call, WhatsApp or send an enquiry — get clear quotes with no obligation.' },
  { num: '04', icon: CalendarCheck, title: 'BOOK', desc: 'Book your service with confidence.', detail: 'Pick a date and time that suits you. Track everything from your dashboard.' },
]

export default function HowItWorks() {
  return (
    <div className="pt-16 lg:pt-20">
      <section className="bg-navy-900 py-20">
        <div className="container-x">
          <SectionHeading light eyebrow="Simple & transparent" title="How It Works" subtitle="From search to service in four easy steps." />
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <div key={s.num} className="relative rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur transition-colors hover:border-brand-500/50" data-testid={`hiw-step-${s.title.toLowerCase()}`}>
                <span className="absolute right-6 top-6 font-display text-5xl font-bold text-brand-500/25">{s.num}</span>
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-500 text-white shadow-lg shadow-brand-500/30">
                  <s.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 font-display text-xl font-bold tracking-wide text-white">{s.title}</h3>
                <p className="mt-2 text-sm font-medium text-brand-200">{s.desc}</p>
                <p className="mt-2 text-sm text-slate-400">{s.detail}</p>
                {i < 3 && <ArrowRight className="absolute -right-4 top-1/2 hidden h-5 w-5 -translate-y-1/2 text-brand-400 lg:block" />}
              </div>
            ))}
          </div>
          <div className="mt-14 text-center">
            <Link to="/services" data-testid="hiw-cta-btn" className="btn-primary !px-8 !py-3">Find a Service Now <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container-x grid gap-6 md:grid-cols-3">
          {[
            { title: 'Verified Professionals', desc: 'Every provider is background-checked, skill-verified and reviewed by real customers before joining the platform.' },
            { title: 'Transparent Pricing', desc: 'Clear starting prices on every listing. No hidden charges, no surprises after the work is done.' },
            { title: 'Support That Stays', desc: 'Our support team is available 24/7 — before, during and after your service is completed.' },
          ].map((f, i) => (
            <div key={f.title} className="card p-8" data-testid={`hiw-feature-${i}`}>
              <span className="font-display text-4xl font-bold text-brand-500/30">0{i + 1}</span>
              <h3 className="mt-3 font-display text-lg font-bold">{f.title}</h3>
              <p className="mt-2 text-sm text-slate-500">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
