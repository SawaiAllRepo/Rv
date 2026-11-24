import { useState } from 'react'
import { Phone, Mail, MapPin, Clock, Send, MessageCircle } from 'lucide-react'
import { CONTACT } from '../data/providers'
import { useApp } from '../context/AppContext'
import { submitFormData } from '../services/sheetApi'
import SectionHeading from '../components/SectionHeading'

const info = [
  { icon: Phone, title: 'Phone', value: CONTACT.phone, href: CONTACT.phoneHref, testid: 'contact-phone' },
  { icon: Mail, title: 'Email', value: CONTACT.email, href: `mailto:${CONTACT.email}`, testid: 'contact-email' },
  { icon: MapPin, title: 'Location', value: CONTACT.address, testid: 'contact-location' },
  { icon: Clock, title: 'Working Hours', value: CONTACT.hours, sub: 'Support available 24/7 online', testid: 'contact-hours' },
]

export default function Contact() {
  const { toast } = useApp()
  const [form, setForm] = useState({ name: '', email: '', mobile: '', subject: '', message: '' })
  const [sending, setSending] = useState(false)
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const submit = async (e) => {
    e.preventDefault()
    if (sending) return
    setSending(true)
    try {
      const result = await submitFormData({
        form: 'Contact Message',
        data: { ...form },
      })
      setForm({ name: '', email: '', mobile: '', subject: '', message: '' })
      toast(
        result.ok
          ? result.confirmation
            ? `Saved successfully ✓ Added Row #${result.confirmation.rowNumber} to "${result.confirmation.tab}". Our team will reach out within 24 hours.`
            : 'Message sent successfully! Our team will reach out within 24 hours.'
          : `Message could not be saved. ${result.error || 'Please try again or WhatsApp us directly.'}`
      )
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="pt-16 lg:pt-20">
      <section className="bg-navy-900 py-16">
        <div className="container-x">
          <SectionHeading light eyebrow="We reply within 24 hours" title="Contact Us" subtitle="Questions about a service, membership or partnership? We would love to hear from you." />
        </div>
      </section>

      <section className="py-16">
        <div className="container-x grid gap-10 lg:grid-cols-5">
          <div className="card h-fit p-6 sm:p-8 lg:col-span-3" data-testid="contact-form-card">
            <h2 className="font-display text-xl font-bold">Send Us a Message</h2>
            <form onSubmit={submit} className="mt-6 space-y-4" data-testid="contact-form">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="label" htmlFor="cf-name">Name</label>
                  <input id="cf-name" required data-testid="contact-name-input" className="input" placeholder="Your full name" value={form.name} onChange={set('name')} />
                </div>
                <div>
                  <label className="label" htmlFor="cf-email">Email</label>
                  <input id="cf-email" type="email" required data-testid="contact-email-input" className="input" placeholder="you@example.com" value={form.email} onChange={set('email')} />
                </div>
                <div>
                  <label className="label" htmlFor="cf-mobile">Mobile</label>
                  <input id="cf-mobile" type="tel" required pattern="[0-9+ \-]{10,15}" data-testid="contact-mobile-input" className="input" placeholder="98765 43210" value={form.mobile} onChange={set('mobile')} />
                </div>
                <div>
                  <label className="label" htmlFor="cf-subject">Subject</label>
                  <input id="cf-subject" required data-testid="contact-subject-input" className="input" placeholder="How can we help?" value={form.subject} onChange={set('subject')} />
                </div>
                <div className="sm:col-span-2">
                  <label className="label" htmlFor="cf-message">Message</label>
                  <textarea id="cf-message" rows={5} required data-testid="contact-message-input" className="input resize-none" placeholder="Write your message…" value={form.message} onChange={set('message')} />
                </div>
              </div>
              <button type="submit" disabled={sending} data-testid="contact-submit-btn" className="btn-primary w-full !py-3 sm:w-auto disabled:opacity-60 disabled:cursor-not-allowed"><Send className="h-4 w-4" /> {sending ? 'Sending…' : 'Send Message'}</button>
            </form>
          </div>

          <div className="space-y-4 lg:col-span-2">
            {info.map((c) => (
              <div key={c.title} className="card flex items-start gap-4 p-5" data-testid={c.testid}>
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600"><c.icon className="h-5 w-5" /></span>
                <div>
                  <h3 className="font-display text-sm font-bold">{c.title}</h3>
                  <p className="mt-0.5 text-sm text-slate-600">
                    {c.href ? <a href={c.href} className="transition-colors hover:text-brand-600">{c.value}</a> : c.value}
                  </p>
                  {c.sub && <p className="text-[11px] text-slate-400">{c.sub}</p>}
                </div>
              </div>
            ))}
            <div className="card bg-navy-900 !border-navy-800 p-5" data-testid="contact-actions">
              <h3 className="font-display text-sm font-bold text-white">Prefer to talk right away?</h3>
              <div className="mt-4 grid grid-cols-3 gap-2">
                <a href={CONTACT.phoneHref} data-testid="contact-call-btn" className="btn-primary !px-2 !py-2 !text-xs"><Phone className="h-3.5 w-3.5" /> Call Now</a>
                <a href={`https://wa.me/${CONTACT.whatsapp}`} target="_blank" rel="noreferrer" data-testid="contact-whatsapp-btn" className="btn-outline !border-white/30 !bg-white/10 !px-2 !py-2 !text-xs !text-white hover:!bg-white/20"><MessageCircle className="h-3.5 w-3.5" /> WhatsApp</a>
                <a href={`mailto:${CONTACT.email}`} data-testid="contact-email-btn" className="btn-outline !border-white/30 !bg-white/10 !px-2 !py-2 !text-xs !text-white hover:!bg-white/20"><Mail className="h-3.5 w-3.5" /> Email Us</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
