import { useState } from 'react'
import { Send } from 'lucide-react'
import Modal from './Modal'
import { services, LOCATIONS } from '../data/services'
import { useApp } from '../context/AppContext'
import { submitFormData } from '../services/sheetApi'

export default function EnquiryModal() {
  const { enquiryModal, setEnquiryModal, toast } = useApp()
  const [form, setForm] = useState({ name: '', mobile: '', email: '', serviceId: '', location: '', date: '', message: '' })
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const submit = async (e) => {
    e.preventDefault()
    const svc = services.find(
      (s) => s.id === (form.serviceId || enquiryModal?.serviceId)
    )
    const data = {
      id: `ENQ-${Math.floor(1000 + Math.random() * 9000)}`,
      status: 'Pending',
      name: form.name,
      mobile: form.mobile,
      email: form.email,
      service: svc?.name || '',
      location: form.location,
      date: form.date,
      message: form.message,
    }
    const result = await submitFormData({ form: 'Enquiry', data })
    setEnquiryModal(null)
    setForm({ name: '', mobile: '', email: '', serviceId: '', location: '', date: '', message: '' })
    toast(
      result.ok
        ? 'Enquiry sent successfully! The provider will contact you soon.'
        : 'Enquiry could not be saved. Please try again later.'
    )
  }

  return (
    <Modal open={!!enquiryModal} onClose={() => setEnquiryModal(null)} title="Send an Enquiry" testid="enquiry-modal">
      <form onSubmit={submit} className="space-y-4" data-testid="enquiry-form">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="label" htmlFor="en-name">Name</label>
            <input id="en-name" required data-testid="enquiry-name-input" className="input" placeholder="Your full name" value={form.name} onChange={set('name')} />
          </div>
          <div>
            <label className="label" htmlFor="en-mobile">Mobile</label>
            <input id="en-mobile" type="tel" required pattern="[0-9+ \-]{10,15}" data-testid="enquiry-mobile-input" className="input" placeholder="98765 43210" value={form.mobile} onChange={set('mobile')} />
          </div>
          <div>
            <label className="label" htmlFor="en-email">Email</label>
            <input id="en-email" type="email" required data-testid="enquiry-email-input" className="input" placeholder="you@example.com" value={form.email} onChange={set('email')} />
          </div>
          <div>
            <label className="label" htmlFor="en-service">Service</label>
            <select id="en-service" required data-testid="enquiry-service-select" className="input" value={form.serviceId || enquiryModal?.serviceId || ''} onChange={set('serviceId')}>
              <option value="">Select a service</option>
              {services.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
          </div>
          <div>
            <label className="label" htmlFor="en-location">Location</label>
            <select id="en-location" required data-testid="enquiry-location-select" className="input" value={form.location} onChange={set('location')}>
              <option value="">Select location</option>
              {LOCATIONS.map((l) => <option key={l}>{l}</option>)}
            </select>
          </div>
          <div>
            <label className="label" htmlFor="en-date">Preferred Date</label>
            <input id="en-date" type="date" required data-testid="enquiry-date-input" className="input" value={form.date} onChange={set('date')} min={new Date().toISOString().split('T')[0]} />
          </div>
          <div className="sm:col-span-2">
            <label className="label" htmlFor="en-message">Message</label>
            <textarea id="en-message" rows={3} required data-testid="enquiry-message-input" className="input resize-none" placeholder="Describe your requirement…" value={form.message} onChange={set('message')} />
          </div>
        </div>
        <button type="submit" data-testid="enquiry-submit-btn" className="btn-primary w-full !py-3">
          <Send className="h-4 w-4" /> Send Enquiry
        </button>
      </form>
    </Modal>
  )
}
