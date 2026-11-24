import { Link } from 'react-router-dom'
import { Instagram, Facebook, Linkedin, Youtube, Phone, Mail, MapPin } from 'lucide-react'
import { CONTACT } from '../data/providers'
import { Logo } from './Navbar'

const cols = [
  {
    title: 'Company',
    links: [
      { label: 'About Us', to: '/about' },
      { label: 'Services', to: '/services' },
      { label: 'Contact', to: '/contact' },
    ],
  },
  {
    title: 'Main Services',
    links: [
      { label: 'Water Tank Cleaning', to: '/services/water-tank-cleaning' },
      { label: 'Sofa & Carpet Cleaning', to: '/services/sofa-carpet-cleaning' },
      { label: 'Pest Control', to: '/services/pest-control' },
      { label: 'Customize Deep Cleaning', to: '/services/customize-deep-cleaning' },
      { label: 'Bungalow Sales & Rental', to: '/services/bungalow-on-rent' },
    ],
  },
  {
    title: 'Gas Services',
    links: [
      { label: 'Gas Servicing', to: '/services/gas-servicing' },
      { label: 'Commercial Gas Supply', to: '/services/commercial-gas-supply' },
    ],
  },

]

const socials = [
  { icon: Instagram, label: 'Instagram', href: '#' },
  { icon: Facebook, label: 'Facebook', href: '#' },
  { icon: Linkedin, label: 'LinkedIn', href: '#' },
  { icon: Youtube, label: 'YouTube', href: '#' },
]

export default function Footer() {
  return (
    <footer className="bg-navy-900 text-slate-300" data-testid="footer">
      <div className="container-x grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <div><Logo dark={false} /></div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-400">
            RV Solutions 24 — Cleaning, Pest Control, Water Tank Cleaning & Bungalow Sales & Rental services. Lion Gas Agency is presented separately.
          </p>
          <div className="mt-5 space-y-2 text-sm text-slate-400">
            <p className="flex items-center gap-2"><Phone className="h-4 w-4 shrink-0 text-brand-400" /> <a href={CONTACT.phoneHref} className="transition-colors hover:text-brand-400">{CONTACT.phone}</a></p>
            <p className="flex items-center gap-2"><Mail className="h-4 w-4 shrink-0 text-brand-400" /> <a href={`mailto:${CONTACT.email}`} className="transition-colors hover:text-brand-400">{CONTACT.email}</a></p>
            <p className="flex items-center gap-2"><MapPin className="h-4 w-4 shrink-0 text-brand-400" /> {CONTACT.address}</p>
          </div>
          <div className="mt-5 flex gap-3">
            {socials.map((s) => (
              <a key={s.label} href={s.href} aria-label={s.label} data-testid={`social-${s.label.toLowerCase()}`}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-slate-300 transition-colors hover:bg-brand-500 hover:text-white">
                <s.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
        {cols.map((c) => (
          <div key={c.title}>
            <h4 className="mb-4 font-display text-sm font-semibold uppercase tracking-wider text-white">{c.title}</h4>
            <ul className="space-y-2.5">
              {c.links.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="text-sm text-slate-400 transition-colors hover:text-brand-400">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10 py-5">
        <p className="container-x text-center text-xs text-slate-500">
          © {new Date().getFullYear()} RVsolutions24. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
