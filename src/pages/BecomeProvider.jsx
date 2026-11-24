import { useState } from 'react'
import { CheckCircle2, Send, BadgeCheck, Users, TrendingUp } from 'lucide-react'
import { services, LOCATIONS } from '../data/services'
import { submitFormData } from '../services/sheetApi'
import SectionHeading from '../components/SectionHeading'

const perks = [
  { icon: Users, title: 'Steady Customer Flow', desc: 'Get discovered by customers actively searching for your services in your city.' },
  { icon: BadgeCheck, title: 'Verified Badge', desc: 'Stand out with a verified listing that builds instant trust with customers.' },
  { icon: TrendingUp, title: 'Grow Your Revenue', desc: 'Zero joining fee. Transparent lead model. Payments directly from customers.' },
]

export default function BecomeProvider() {
  const [form, setForm] = useState({ business: '', owner: '', mobile: '', email: '', category: '', location: '', experience: '', servicesOffered: '', price: '', description: '' })
  const [submitted, setSubmitted] = useState(false)
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const submit = async (e) => {
    e.preventDefault()
    const category = services.find((s) => s.id === form.category)
    const data = {
      id: `PROV-${Math.floor(1000 + Math.random() * 9000)}`,
      status: 'Pending',
      business: form.business,
      owner: form.owner,
      mobile: form.mobile,
      email: form.email,
      category: category?.name || form.category,
      location: form.location,
      experience: form.experience,
      price: form.price,
      servicesOffered: form.servicesOffered,
      description: form.description,
    }
    await submitFormData({ form: 'Provider Application', data })
    setSubmitted(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="pt-16 lg:pt-20">
      <section className="bg-navy-900 py-16">
        <div className="container-x">
          <SectionHeading light eyebrow="Partner with us" title="Grow Your Business With RVsolutions24" subtitle="Join our network of trusted professionals and connect with customers looking for your services." />
        </div>
      </section>

      <section className="py-16">
        <div className="container-x grid gap-10 lg:grid-cols-5">
          <div className="space-y-5 lg:col-span-2">
            {perks.map((p) => (
              <div key={p.title} className="card flex items-start gap-4 p-5" data-testid={`perk-${p.title.toLowerCase().replace(/\s+/g, '-')}`}>
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600"><p.icon className="h-5 w-5" /></span>
                <div>
                  <h3 className="font-display text-sm font-bold">{p.title}</h3>
                  <p className="mt-1 text-sm text-slate-500">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="card h-fit p-6 sm:p-8 lg:col-span-3" data-testid="provider-application-card">
            {submitted ? (
              <div className="py-10 text-center" data-testid="provider-success">
                <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-50">
                  <CheckCircle2 className="h-9 w-9 text-green-500" />
                </span>
                <h2 className="mt-4 font-display text-2xl font-bold">Application submitted successfully!</h2>
                <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
                  Thank you, {form.owner.split(' ')[0] || 'partner'}. Our onboarding team will verify your details and contact you within 2–3 working days.
                </p>
                <p className="mt-1 text-xs text-slate-400">Your application has been recorded. Our onboarding team will contact you within 2–3 working days.</p>
                <button onClick={() => setSubmitted(false)} data-testid="provider-another-btn" className="btn-outline mt-6">Submit Another Application</button>
              </div>
            ) : (
              <>
                <h2 className="font-display text-xl font-bold">Service Provider Application</h2>
                <form onSubmit={submit} className="mt-6 space-y-4" data-testid="provider-form">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="label" htmlFor="pv-business">Business Name</label>
                      <input id="pv-business" required data-testid="provider-business-input" className="input" placeholder="e.g. CleanPro Services" value={form.business} onChange={set('business')} />
                    </div>
                    <div>
                      <label className="label" htmlFor="pv-owner">Owner Name</label>
                      <input id="pv-owner" required data-testid="provider-owner-input" className="input" placeholder="Your full name" value={form.owner} onChange={set('owner')} />
                    </div>
                    <div>
                      <label className="label" htmlFor="pv-mobile">Mobile Number</label>
                      <input id="pv-mobile" type="tel" required pattern="[0-9+ \-]{10,15}" data-testid="provider-mobile-input" className="input" placeholder="98765 43210" value={form.mobile} onChange={set('mobile')} />
                    </div>
                    <div>
                      <label className="label" htmlFor="pv-email">Email</label>
                      <input id="pv-email" type="email" required data-testid="provider-email-input" className="input" placeholder="business@example.com" value={form.email} onChange={set('email')} />
                    </div>
                    <div>
                      <label className="label" htmlFor="pv-category">Service Category</label>
                      <select id="pv-category" required data-testid="provider-category-select" className="input" value={form.category} onChange={set('category')}>
                        <option value="">Select category</option>
                        {services.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="label" htmlFor="pv-location">Location</label>
                      <select id="pv-location" required data-testid="provider-location-select" className="input" value={form.location} onChange={set('location')}>
                        <option value="">Select city</option>
                        {LOCATIONS.map((l) => <option key={l}>{l}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="label" htmlFor="pv-exp">Experience (years)</label>
                      <input id="pv-exp" type="number" min="0" max="60" required data-testid="provider-experience-input" className="input" placeholder="e.g. 5" value={form.experience} onChange={set('experience')} />
                    </div>
                    <div>
                      <label className="label" htmlFor="pv-price">Starting Price (₹)</label>
                      <input id="pv-price" type="number" min="0" required data-testid="provider-price-input" className="input" placeholder="e.g. 499" value={form.price} onChange={set('price')} />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="label" htmlFor="pv-services">Services Offered</label>
                      <input id="pv-services" required data-testid="provider-services-input" className="input" placeholder="e.g. Deep cleaning, pest control, sofa shampooing" value={form.servicesOffered} onChange={set('servicesOffered')} />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="label" htmlFor="pv-desc">Business Description</label>
                      <textarea id="pv-desc" rows={4} required data-testid="provider-description-input" className="input resize-none" placeholder="Tell customers what makes your business great…" value={form.description} onChange={set('description')} />
                    </div>
                  </div>
                  <button type="submit" data-testid="provider-submit-btn" className="btn-primary w-full !py-3"><Send className="h-4 w-4" /> Submit Application</button>
                </form>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
