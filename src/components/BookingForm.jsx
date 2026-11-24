import { useState } from 'react'
import {
  CheckCircle2,
  CalendarCheck,
  ArrowLeft,
  MessageCircle,
  User,
  Phone,
  MapPin,
  CalendarDays,
  Clock3,
  Home,
  BriefcaseBusiness,
  FileText,
} from 'lucide-react'

import { services } from '../data/services'
import { memberships } from '../data/memberships'
import { useApp } from '../context/AppContext'
import { submitFormData } from '../services/sheetApi'

const DIRECT_SERVICE_IDS = [
  'bungalow-on-rent',
  'gas-servicing',
  'commercial-gas-supply',
]

const LOCATIONS = ['Pune', 'Lonavla/Khandala', 'Malavali']

const TIME_SLOTS = [
  '08:00 AM',
  '10:00 AM',
  '12:00 PM',
  '02:00 PM',
  '04:00 PM',
  '06:00 PM',
]

const WHATSAPP_NUMBER = '919923425447'

export default function BookingForm({
  defaultServiceId = '',
  defaultPackageId = '',
  defaultLocation = '',
  onDone,
  onBack,
}) {
  const { addBooking } = useApp()

  const [form, setForm] = useState({
    serviceId: defaultServiceId,
    packageId: defaultPackageId,
    location: defaultLocation,
    date: '',
    time: '',
    address: '',
    mobile: '',
    notes: '',
    fullName: '',
    requirement: '',
    preferredLocation: defaultLocation,
    guests: '',
    budget: '',
    serviceRequired: '',
    problemDetails: '',
    businessName: '',
    businessType: '',
    gasRequirement: '',
    supplyType: '',
    deliveryAddress: '',
  })

  const [submitted, setSubmitted] = useState(null)

  const selectedService = services.find(
    (service) => service.id === form.serviceId
  )

  const isDirectService = DIRECT_SERVICE_IDS.includes(form.serviceId)

  const set = (key) => (e) => {
    setForm((current) => ({
      ...current,
      [key]: e.target.value,
    }))
  }

  const handleServiceChange = (e) => {
    const serviceId = e.target.value
    const isDirect = DIRECT_SERVICE_IDS.includes(serviceId)

    setForm((current) => ({
      ...current,
      serviceId,
      packageId: '',
      location: isDirect ? '' : current.location,
      preferredLocation: '',
    }))
  }

  const goBackToServiceSelection = () => {
    setForm((current) => ({
      ...current,
      serviceId: '',
      packageId: '',
      location: '',
      preferredLocation: '',
    }))
  }

  const handleBack = () => {
    if (onBack) {
      onBack()
    } else {
      goBackToServiceSelection()
    }
  }

  const openWhatsApp = () => {
    const message = `Hello, I am interested in ${
      selectedService?.name || 'your service'
    }. Please share more details.`

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      '_blank',
      'noopener,noreferrer'
    )
  }

  const today = new Date().toISOString().split('T')[0]

  const submitNormalBooking = async (e) => {
    e.preventDefault()

    const service = services.find(
      (s) => s.id === form.serviceId
    )

    const membership = memberships.find(
      (m) => m.id === form.packageId
    )

    const booking = {
      id: `BK-${Math.floor(1000 + Math.random() * 9000)}`,
      service: service?.name || 'General Service',
      package: membership?.name || 'Selected Package',
      packagePrice: membership
        ? `₹${membership.price.toLocaleString('en-IN')} ${membership.period}`
        : 'On quote',
      location: form.location,
      date: form.date,
      time: form.time,
      status: 'Pending',
      amount: membership
        ? `₹${membership.price.toLocaleString('en-IN')}`
        : 'On quote',
      address: form.address,
      mobile: form.mobile,
      notes: form.notes,
    }

    addBooking(booking)
    await submitFormData({ form: 'Booking', data: booking })
    setSubmitted(booking)
  }

  const submitDirectEnquiry = async (e) => {
    e.preventDefault()

    const enquiry = {
      id: `ENQ-${Math.floor(1000 + Math.random() * 9000)}`,
      service: selectedService?.name || 'Service Enquiry',
      status: 'Pending',
      fullName: form.fullName,
      mobile: form.mobile,
      date: form.date,
      time: form.time,
      requirement: form.requirement,
      preferredLocation: form.preferredLocation,
      guests: form.guests,
      budget: form.budget,
      address: form.address,
      notes: form.notes,
      serviceRequired: form.serviceRequired,
      problemDetails: form.problemDetails,
      businessName: form.businessName,
      businessType: form.businessType,
      gasRequirement: form.gasRequirement,
      supplyType: form.supplyType,
      deliveryAddress: form.deliveryAddress,
    }

    await submitFormData({ form: 'Direct Enquiry', data: enquiry })
    setSubmitted(enquiry)
  }

  /* =========================================================
     SUCCESS SCREEN
  ========================================================= */

  if (submitted) {
    return (
      <div
        className="py-8 text-center"
        data-testid="booking-success"
      >
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-50">
          <CheckCircle2 className="h-9 w-9 text-green-500" />
        </span>

        <h4 className="mt-5 font-display text-2xl font-bold text-navy-900">
          {isDirectService
            ? 'Enquiry Submitted Successfully'
            : 'Booking Request Submitted'}
        </h4>

        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-slate-500">
          Your request{' '}
          <span className="font-semibold text-navy-900">
            {submitted.id}
          </span>{' '}
          has been submitted successfully.
        </p>

        <div className="mx-auto mt-6 max-w-md rounded-2xl border border-slate-200 bg-slate-50 p-5 text-left">
          <p className="text-sm text-slate-600">
            <span className="font-semibold text-navy-900">
              Service:
            </span>{' '}
            {submitted.service}
          </p>

          {submitted.package && (
            <p className="mt-3 text-sm text-slate-600">
              <span className="font-semibold text-navy-900">
                Package:
              </span>{' '}
              {submitted.package}
            </p>
          )}

          {submitted.packagePrice && (
            <p className="mt-3 text-sm text-slate-600">
              <span className="font-semibold text-navy-900">
                Price:
              </span>{' '}
              {submitted.packagePrice}
            </p>
          )}

          {submitted.location && (
            <p className="mt-3 text-sm text-slate-600">
              <span className="font-semibold text-navy-900">
                Location:
              </span>{' '}
              {submitted.location}
            </p>
          )}

          {submitted.fullName && (
            <p className="mt-3 text-sm text-slate-600">
              <span className="font-semibold text-navy-900">
                Name:
              </span>{' '}
              {submitted.fullName}
            </p>
          )}

          {submitted.mobile && (
            <p className="mt-3 text-sm text-slate-600">
              <span className="font-semibold text-navy-900">
                Mobile:
              </span>{' '}
              {submitted.mobile}
            </p>
          )}
        </div>

        <p className="mt-5 text-xs text-slate-400">
          Our team will contact you shortly.
        </p>

        <button
          type="button"
          onClick={() => onDone?.()}
          data-testid="booking-done-btn"
          className="mt-6 inline-flex items-center justify-center rounded-xl bg-brand-600 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-500/20 transition hover:bg-brand-700"
        >
          Done
        </button>
      </div>
    )
  }

  /* =========================================================
     DIRECT SERVICE FORM
  ========================================================= */

  if (isDirectService) {
    return (
      <div
        className="w-full"
        data-testid="direct-service-container"
      >
        {/* Top Navigation */}
        <div className="mb-7 flex flex-col gap-4 border-b border-slate-100 pb-6 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={handleBack}
            className="group inline-flex w-fit items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-brand-300 hover:bg-brand-50 hover:text-brand-600"
            aria-label="Back to all services"
          >
            <ArrowLeft className="h-4 w-4 transition group-hover:-translate-x-1" />
            Back to All Services
          </button>

          <button
            type="button"
            onClick={openWhatsApp}
            className="inline-flex w-fit items-center gap-2 rounded-xl bg-green-50 px-4 py-2.5 text-sm font-semibold text-green-700 transition hover:bg-green-100"
          >
            <MessageCircle className="h-5 w-5" />
            WhatsApp Us
          </button>
        </div>

        <div className="grid gap-7 lg:grid-cols-[minmax(0,1fr)_250px]">
          {/* =====================================================
              MAIN FORM
          ====================================================== */}

          <form
            onSubmit={submitDirectEnquiry}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7"
            data-testid="direct-service-form"
          >
            {/* Form Header */}
            <div className="mb-7">
              <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-brand-600">
                <FileText className="h-3.5 w-3.5" />
                Service Enquiry
              </div>

              <h3 className="mt-4 font-display text-2xl font-bold text-navy-900 sm:text-3xl">
                {selectedService?.name}
              </h3>

              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-500">
                Please share your requirements below. Our team will
                review your enquiry and contact you shortly.
              </p>
            </div>

            {/* =================================================
                PERSONAL DETAILS
            ================================================== */}

            <div className="mb-7">
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <User className="h-4 w-4" />
                </span>

                <div>
                  <h4 className="text-sm font-bold text-navy-900">
                    Personal Details
                  </h4>

                  <p className="text-xs text-slate-400">
                    Tell us how we can reach you
                  </p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {/* Full Name */}
                <div>
                  <label
                    className="mb-1.5 block text-xs font-semibold text-slate-700"
                    htmlFor="direct-full-name"
                  >
                    Full Name <span className="text-red-500">*</span>
                  </label>

                  <div className="relative">
                    <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                    <input
                      id="direct-full-name"
                      required
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-3 text-sm text-navy-900 outline-none transition placeholder:text-slate-400 focus:border-brand-400 focus:bg-white focus:ring-4 focus:ring-brand-500/10"
                      placeholder="Enter your full name"
                      value={form.fullName}
                      onChange={set('fullName')}
                    />
                  </div>
                </div>

                {/* Mobile */}
                <div>
                  <label
                    className="mb-1.5 block text-xs font-semibold text-slate-700"
                    htmlFor="direct-mobile"
                  >
                    Mobile Number <span className="text-red-500">*</span>
                  </label>

                  <div className="relative">
                    <Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                    <input
                      id="direct-mobile"
                      type="tel"
                      required
                      pattern="[0-9+ \-]{10,15}"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-3 text-sm text-navy-900 outline-none transition placeholder:text-slate-400 focus:border-brand-400 focus:bg-white focus:ring-4 focus:ring-brand-500/10"
                      placeholder="e.g. 98765 43210"
                      value={form.mobile}
                      onChange={set('mobile')}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* =================================================
                BUNGALOW
            ================================================== */}

            {form.serviceId === 'bungalow-on-rent' && (
              <div className="mb-7">
                <div className="mb-4 flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                    <Home className="h-4 w-4" />
                  </span>

                  <div>
                    <h4 className="text-sm font-bold text-navy-900">
                      Bungalow Requirements
                    </h4>

                    <p className="text-xs text-slate-400">
                      Share your stay or property requirement
                    </p>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {/* Requirement */}
                  <div>
                    <label
                      className="mb-1.5 block text-xs font-semibold text-slate-700"
                      htmlFor="bungalow-requirement"
                    >
                      Requirement <span className="text-red-500">*</span>
                    </label>

                    <select
                      id="bungalow-requirement"
                      required
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-navy-900 outline-none transition focus:border-brand-400 focus:bg-white focus:ring-4 focus:ring-brand-500/10"
                      value={form.requirement}
                      onChange={set('requirement')}
                    >
                      <option value="">
                        Select requirement
                      </option>
                      <option value="Sales">Sales</option>
                      <option value="Rental">Rental</option>
                    </select>
                  </div>

                  {/* Location */}
                  <div>
                    <label
                      className="mb-1.5 block text-xs font-semibold text-slate-700"
                      htmlFor="bungalow-location"
                    >
                      Preferred Location{' '}
                      <span className="text-red-500">*</span>
                    </label>

                    <select
                      id="bungalow-location"
                      required
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-navy-900 outline-none transition focus:border-brand-400 focus:bg-white focus:ring-4 focus:ring-brand-500/10"
                      value={form.preferredLocation}
                      onChange={set('preferredLocation')}
                    >
                      <option value="">
                        Select location
                      </option>

                      {LOCATIONS.map((location) => (
                        <option
                          key={location}
                          value={location}
                        >
                          {location}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Date */}
                  <div>
                    <label
                      className="mb-1.5 block text-xs font-semibold text-slate-700"
                      htmlFor="bungalow-date"
                    >
                      Preferred Date
                    </label>

                    <div className="relative">
                      <CalendarDays className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                      <input
                        id="bungalow-date"
                        type="date"
                        min={today}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-3 text-sm text-navy-900 outline-none transition focus:border-brand-400 focus:bg-white focus:ring-4 focus:ring-brand-500/10"
                        value={form.date}
                        onChange={set('date')}
                      />
                    </div>
                  </div>

                  {/* Time */}
                  <div>
                    <label
                      className="mb-1.5 block text-xs font-semibold text-slate-700"
                      htmlFor="bungalow-time"
                    >
                      Preferred Time
                    </label>

                    <div className="relative">
                      <Clock3 className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                      <select
                        id="bungalow-time"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-3 text-sm text-navy-900 outline-none transition focus:border-brand-400 focus:bg-white focus:ring-4 focus:ring-brand-500/10"
                        value={form.time}
                        onChange={set('time')}
                      >
                        <option value="">
                          Select time slot
                        </option>

                        {TIME_SLOTS.map((time) => (
                          <option key={time} value={time}>
                            {time}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Guests */}
                  <div>
                    <label
                      className="mb-1.5 block text-xs font-semibold text-slate-700"
                      htmlFor="bungalow-guests"
                    >
                      Number of Guests / People
                    </label>

                    <input
                      id="bungalow-guests"
                      type="number"
                      min="1"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-navy-900 outline-none transition focus:border-brand-400 focus:bg-white focus:ring-4 focus:ring-brand-500/10"
                      placeholder="e.g. 10"
                      value={form.guests}
                      onChange={set('guests')}
                    />
                  </div>

                  {/* Budget */}
                  <div>
                    <label
                      className="mb-1.5 block text-xs font-semibold text-slate-700"
                      htmlFor="bungalow-budget"
                    >
                      Budget
                    </label>

                    <input
                      id="bungalow-budget"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-navy-900 outline-none transition placeholder:text-slate-400 focus:border-brand-400 focus:bg-white focus:ring-4 focus:ring-brand-500/10"
                      placeholder="e.g. ₹10,000"
                      value={form.budget}
                      onChange={set('budget')}
                    />
                  </div>

                  {/* Address */}
                  <div className="sm:col-span-2">
                    <label
                      className="mb-1.5 block text-xs font-semibold text-slate-700"
                      htmlFor="bungalow-address"
                    >
                      Complete Address{' '}
                      <span className="text-red-500">*</span>
                    </label>

                    <div className="relative">
                      <MapPin className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-slate-400" />

                      <input
                        id="bungalow-address"
                        required
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-3 text-sm text-navy-900 outline-none transition placeholder:text-slate-400 focus:border-brand-400 focus:bg-white focus:ring-4 focus:ring-brand-500/10"
                        placeholder="Flat / House no., Society, Area, City"
                        value={form.address}
                        onChange={set('address')}
                      />
                    </div>
                  </div>

                  {/* Notes */}
                  <div className="sm:col-span-2">
                    <label
                      className="mb-1.5 block text-xs font-semibold text-slate-700"
                      htmlFor="bungalow-notes"
                    >
                      Additional Requirements
                    </label>

                    <textarea
                      id="bungalow-notes"
                      rows={4}
                      className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-navy-900 outline-none transition placeholder:text-slate-400 focus:border-brand-400 focus:bg-white focus:ring-4 focus:ring-brand-500/10"
                      placeholder="Tell us anything else..."
                      value={form.notes}
                      onChange={set('notes')}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* =================================================
                GAS SERVICING
            ================================================== */}

            {form.serviceId === 'gas-servicing' && (
              <div className="mb-7">
                <div className="mb-4 flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                    <BriefcaseBusiness className="h-4 w-4" />
                  </span>

                  <div>
                    <h4 className="text-sm font-bold text-navy-900">
                      Gas Service Details
                    </h4>

                    <p className="text-xs text-slate-400">
                      Tell us about the service you need
                    </p>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {/* Location */}
                  <div>
                    <label
                      className="mb-1.5 block text-xs font-semibold text-slate-700"
                      htmlFor="gas-location"
                    >
                      Location <span className="text-red-500">*</span>
                    </label>

                    <select
                      id="gas-location"
                      required
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-navy-900 outline-none transition focus:border-brand-400 focus:bg-white focus:ring-4 focus:ring-brand-500/10"
                      value={form.preferredLocation}
                      onChange={set('preferredLocation')}
                    >
                      <option value="">
                        Select location
                      </option>

                      {LOCATIONS.map((location) => (
                        <option key={location} value={location}>
                          {location}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Service Required */}
                  <div>
                    <label
                      className="mb-1.5 block text-xs font-semibold text-slate-700"
                      htmlFor="gas-service-required"
                    >
                      Service Required{' '}
                      <span className="text-red-500">*</span>
                    </label>

                    <select
                      id="gas-service-required"
                      required
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-navy-900 outline-none transition focus:border-brand-400 focus:bg-white focus:ring-4 focus:ring-brand-500/10"
                      value={form.serviceRequired}
                      onChange={set('serviceRequired')}
                    >
                      <option value="">
                        Select service
                      </option>
                      <option value="Gas Stove">
                        Gas Stove
                      </option>
                      <option value="Gas Pipeline">
                        Gas Pipeline
                      </option>
                      <option value="Gas Connection">
                        Gas Connection
                      </option>
                      <option value="Other">
                        Other
                      </option>
                    </select>
                  </div>

                  {/* Date */}
                  <div>
                    <label
                      className="mb-1.5 block text-xs font-semibold text-slate-700"
                      htmlFor="gas-date"
                    >
                      Preferred Date{' '}
                      <span className="text-red-500">*</span>
                    </label>

                    <div className="relative">
                      <CalendarDays className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                      <input
                        id="gas-date"
                        type="date"
                        required
                        min={today}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-3 text-sm text-navy-900 outline-none transition focus:border-brand-400 focus:bg-white focus:ring-4 focus:ring-brand-500/10"
                        value={form.date}
                        onChange={set('date')}
                      />
                    </div>
                  </div>

                  {/* Time */}
                  <div>
                    <label
                      className="mb-1.5 block text-xs font-semibold text-slate-700"
                      htmlFor="gas-time"
                    >
                      Preferred Time{' '}
                      <span className="text-red-500">*</span>
                    </label>

                    <select
                      id="gas-time"
                      required
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-navy-900 outline-none transition focus:border-brand-400 focus:bg-white focus:ring-4 focus:ring-brand-500/10"
                      value={form.time}
                      onChange={set('time')}
                    >
                      <option value="">
                        Select time slot
                      </option>

                      {TIME_SLOTS.map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Address */}
                  <div className="sm:col-span-2">
                    <label
                      className="mb-1.5 block text-xs font-semibold text-slate-700"
                      htmlFor="gas-address"
                    >
                      Complete Address{' '}
                      <span className="text-red-500">*</span>
                    </label>

                    <input
                      id="gas-address"
                      required
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-navy-900 outline-none transition placeholder:text-slate-400 focus:border-brand-400 focus:bg-white focus:ring-4 focus:ring-brand-500/10"
                      placeholder="Flat / House no., Society, Area, City"
                      value={form.address}
                      onChange={set('address')}
                    />
                  </div>

                  {/* Problem */}
                  <div className="sm:col-span-2">
                    <label
                      className="mb-1.5 block text-xs font-semibold text-slate-700"
                      htmlFor="gas-problem"
                    >
                      Problem / Service Details{' '}
                      <span className="text-red-500">*</span>
                    </label>

                    <textarea
                      id="gas-problem"
                      required
                      rows={4}
                      className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-navy-900 outline-none transition placeholder:text-slate-400 focus:border-brand-400 focus:bg-white focus:ring-4 focus:ring-brand-500/10"
                      placeholder="Please describe the problem or service required..."
                      value={form.problemDetails}
                      onChange={set('problemDetails')}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* =================================================
                COMMERCIAL GAS
            ================================================== */}

            {form.serviceId === 'commercial-gas-supply' && (
              <div className="mb-7">
                <div className="mb-4 flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                    <BriefcaseBusiness className="h-4 w-4" />
                  </span>

                  <div>
                    <h4 className="text-sm font-bold text-navy-900">
                      Business & Supply Details
                    </h4>

                    <p className="text-xs text-slate-400">
                      Share your commercial gas requirement
                    </p>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {/* Business Name */}
                  <div>
                    <label
                      className="mb-1.5 block text-xs font-semibold text-slate-700"
                      htmlFor="business-name"
                    >
                      Business / Company Name{' '}
                      <span className="font-normal text-slate-400">
                        (Optional)
                      </span>
                    </label>

                    <input
                      id="business-name"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-navy-900 outline-none transition placeholder:text-slate-400 focus:border-brand-400 focus:bg-white focus:ring-4 focus:ring-brand-500/10"
                      placeholder="Enter business/company name"
                      value={form.businessName}
                      onChange={set('businessName')}
                    />
                  </div>

                  {/* Location */}
                  <div>
                    <label
                      className="mb-1.5 block text-xs font-semibold text-slate-700"
                      htmlFor="commercial-location"
                    >
                      Location <span className="text-red-500">*</span>
                    </label>

                    <select
                      id="commercial-location"
                      required
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-navy-900 outline-none transition focus:border-brand-400 focus:bg-white focus:ring-4 focus:ring-brand-500/10"
                      value={form.preferredLocation}
                      onChange={set('preferredLocation')}
                    >
                      <option value="">
                        Select location
                      </option>

                      {LOCATIONS.map((location) => (
                        <option key={location} value={location}>
                          {location}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Business Type */}
                  <div>
                    <label
                      className="mb-1.5 block text-xs font-semibold text-slate-700"
                      htmlFor="business-type"
                    >
                      Business Type{' '}
                      <span className="text-red-500">*</span>
                    </label>

                    <input
                      id="business-type"
                      required
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-navy-900 outline-none transition placeholder:text-slate-400 focus:border-brand-400 focus:bg-white focus:ring-4 focus:ring-brand-500/10"
                      placeholder="e.g. Hotel, Restaurant, Factory"
                      value={form.businessType}
                      onChange={set('businessType')}
                    />
                  </div>

                  {/* Gas Requirement */}
                  <div>
                    <label
                      className="mb-1.5 block text-xs font-semibold text-slate-700"
                      htmlFor="gas-requirement"
                    >
                      Gas Requirement / Quantity{' '}
                      <span className="text-red-500">*</span>
                    </label>

                    <input
                      id="gas-requirement"
                      required
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-navy-900 outline-none transition placeholder:text-slate-400 focus:border-brand-400 focus:bg-white focus:ring-4 focus:ring-brand-500/10"
                      placeholder="e.g. 100 kg / 10 cylinders"
                      value={form.gasRequirement}
                      onChange={set('gasRequirement')}
                    />
                  </div>

                  {/* Supply Type */}
                  <div>
                    <label
                      className="mb-1.5 block text-xs font-semibold text-slate-700"
                      htmlFor="supply-type"
                    >
                      Supply Type{' '}
                      <span className="text-red-500">*</span>
                    </label>

                    <select
                      id="supply-type"
                      required
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-navy-900 outline-none transition focus:border-brand-400 focus:bg-white focus:ring-4 focus:ring-brand-500/10"
                      value={form.supplyType}
                      onChange={set('supplyType')}
                    >
                      <option value="">
                        Select supply type
                      </option>
                      <option value="Regular">
                        Regular
                      </option>
                      <option value="One-time">
                        One-time
                      </option>
                      <option value="Urgent">
                        Urgent
                      </option>
                    </select>
                  </div>

                  {/* Date */}
                  <div>
                    <label
                      className="mb-1.5 block text-xs font-semibold text-slate-700"
                      htmlFor="commercial-date"
                    >
                      Preferred Date
                    </label>

                    <div className="relative">
                      <CalendarDays className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                      <input
                        id="commercial-date"
                        type="date"
                        min={today}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-3 text-sm text-navy-900 outline-none transition focus:border-brand-400 focus:bg-white focus:ring-4 focus:ring-brand-500/10"
                        value={form.date}
                        onChange={set('date')}
                      />
                    </div>
                  </div>

                  {/* Delivery Address */}
                  <div className="sm:col-span-2">
                    <label
                      className="mb-1.5 block text-xs font-semibold text-slate-700"
                      htmlFor="delivery-address"
                    >
                      Delivery Address{' '}
                      <span className="text-red-500">*</span>
                    </label>

                    <div className="relative">
                      <MapPin className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-slate-400" />

                      <input
                        id="delivery-address"
                        required
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-3 text-sm text-navy-900 outline-none transition placeholder:text-slate-400 focus:border-brand-400 focus:bg-white focus:ring-4 focus:ring-brand-500/10"
                        placeholder="Complete delivery address"
                        value={form.deliveryAddress}
                        onChange={set('deliveryAddress')}
                      />
                    </div>
                  </div>

                  {/* Notes */}
                  <div className="sm:col-span-2">
                    <label
                      className="mb-1.5 block text-xs font-semibold text-slate-700"
                      htmlFor="commercial-notes"
                    >
                      Additional Requirements
                    </label>

                    <textarea
                      id="commercial-notes"
                      rows={4}
                      className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-navy-900 outline-none transition placeholder:text-slate-400 focus:border-brand-400 focus:bg-white focus:ring-4 focus:ring-brand-500/10"
                      placeholder="Any additional requirements..."
                      value={form.notes}
                      onChange={set('notes')}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Submit */}
            <div className="border-t border-slate-100 pt-6">
              <button
                type="submit"
                data-testid="direct-enquiry-submit-btn"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-brand-500/20 transition hover:-translate-y-0.5 hover:bg-brand-700 hover:shadow-xl"
              >
                <CalendarCheck className="h-5 w-5" />
                Submit Enquiry
              </button>

              <p className="mt-3 text-center text-xs text-slate-400">
                By submitting this enquiry, our team will contact you
                regarding your requirement.
              </p>
            </div>
          </form>

          {/* =====================================================
              WHATSAPP SIDE CARD
          ====================================================== */}

          <aside className="lg:block">
            <div className="sticky top-24 overflow-hidden rounded-2xl border border-green-100 bg-gradient-to-br from-green-50 to-white p-5 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-500 text-white shadow-lg shadow-green-500/20">
                <MessageCircle className="h-6 w-6" />
              </div>

              <h4 className="mt-5 font-display text-lg font-bold text-navy-900">
                Need Quick Help?
              </h4>

              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Have questions about this service? Chat directly with
                our team on WhatsApp.
              </p>

              <button
                type="button"
                onClick={openWhatsApp}
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-green-500 px-4 py-3 text-sm font-bold text-white transition hover:bg-green-600"
              >
                <MessageCircle className="h-5 w-5" />
                Chat on WhatsApp
              </button>

              <div className="mt-5 rounded-xl border border-green-100 bg-white p-3">
                <p className="text-xs font-semibold text-slate-500">
                  WhatsApp Support
                </p>

                <p className="mt-1 text-sm font-bold text-green-700">
                  +91 99234 25447
                </p>
              </div>

              <div className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-slate-500">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />

                <span>
                  Our team can help you with service details,
                  availability and requirements.
                </span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    )
  }

  /* =========================================================
     NORMAL BOOKING FLOW
  ========================================================= */

  return (
    <form
      onSubmit={submitNormalBooking}
      className="space-y-6"
      data-testid="booking-form"
    >
      <div>
        <h3 className="font-display text-xl font-bold text-navy-900">
          Book a Service
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          Select your service, package and preferred schedule.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {/* Service */}
        <div>
          <label
            className="mb-1.5 block text-xs font-semibold text-slate-700"
            htmlFor="bk-service"
          >
            What services do you need?
          </label>

          <select
            id="bk-service"
            required
            data-testid="booking-service-select"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-navy-900 outline-none transition focus:border-brand-400 focus:bg-white focus:ring-4 focus:ring-brand-500/10"
            value={form.serviceId}
            onChange={handleServiceChange}
          >
            <option value="">
              Select a service
            </option>

            {services.map((service) => (
              <option key={service.id} value={service.id}>
                {service.name}
              </option>
            ))}
          </select>
        </div>

        {/* Package */}
        <div>
          <label
            className="mb-1.5 block text-xs font-semibold text-slate-700"
            htmlFor="bk-package"
          >
            Package
          </label>

          <select
            id="bk-package"
            required
            data-testid="booking-package-select"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-navy-900 outline-none transition focus:border-brand-400 focus:bg-white focus:ring-4 focus:ring-brand-500/10"
            value={form.packageId}
            onChange={set('packageId')}
          >
            <option value="">
              Select a package
            </option>

            {memberships.map((membership) => (
              <option
                key={membership.id}
                value={membership.id}
              >
                {membership.name} — ₹
                {membership.price.toLocaleString('en-IN')}{' '}
                {membership.period}
              </option>
            ))}
          </select>
        </div>

        {/* Location */}
        <div>
          <label
            className="mb-1.5 block text-xs font-semibold text-slate-700"
            htmlFor="bk-location"
          >
            Location
          </label>

          <select
            id="bk-location"
            required
            data-testid="booking-location-select"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-navy-900 outline-none transition focus:border-brand-400 focus:bg-white focus:ring-4 focus:ring-brand-500/10"
            value={form.location}
            onChange={set('location')}
          >
            <option value="">
              Select a location
            </option>

            {LOCATIONS.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>

        {/* Date */}
        <div>
          <label
            className="mb-1.5 block text-xs font-semibold text-slate-700"
            htmlFor="bk-date"
          >
            Preferred Date
          </label>

          <input
            id="bk-date"
            type="date"
            required
            min={today}
            data-testid="booking-date-input"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-navy-900 outline-none transition focus:border-brand-400 focus:bg-white focus:ring-4 focus:ring-brand-500/10"
            value={form.date}
            onChange={set('date')}
          />
        </div>

        {/* Time */}
        <div>
          <label
            className="mb-1.5 block text-xs font-semibold text-slate-700"
            htmlFor="bk-time"
          >
            Preferred Time
          </label>

          <select
            id="bk-time"
            required
            data-testid="booking-time-select"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-navy-900 outline-none transition focus:border-brand-400 focus:bg-white focus:ring-4 focus:ring-brand-500/10"
            value={form.time}
            onChange={set('time')}
          >
            <option value="">
              Select time slot
            </option>

            {TIME_SLOTS.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>

        {/* Address */}
        <div className="sm:col-span-2">
          <label
            className="mb-1.5 block text-xs font-semibold text-slate-700"
            htmlFor="bk-address"
          >
            Service Address
          </label>

          <input
            id="bk-address"
            required
            data-testid="booking-address-input"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-navy-900 outline-none transition placeholder:text-slate-400 focus:border-brand-400 focus:bg-white focus:ring-4 focus:ring-brand-500/10"
            placeholder="Flat / House no., Society, Area, City"
            value={form.address}
            onChange={set('address')}
          />
        </div>

        {/* Mobile */}
        <div className="sm:col-span-2">
          <label
            className="mb-1.5 block text-xs font-semibold text-slate-700"
            htmlFor="bk-mobile"
          >
            Mobile Number
          </label>

          <input
            id="bk-mobile"
            type="tel"
            required
            pattern="[0-9+ \-]{10,15}"
            data-testid="booking-mobile-input"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-navy-900 outline-none transition placeholder:text-slate-400 focus:border-brand-400 focus:bg-white focus:ring-4 focus:ring-brand-500/10"
            placeholder="e.g. 98765 43210"
            value={form.mobile}
            onChange={set('mobile')}
          />
        </div>

        {/* Notes */}
        <div className="sm:col-span-2">
          <label
            className="mb-1.5 block text-xs font-semibold text-slate-700"
            htmlFor="bk-notes"
          >
            Additional Requirements{' '}
            <span className="font-normal text-slate-400">
              (optional)
            </span>
          </label>

          <textarea
            id="bk-notes"
            rows={3}
            data-testid="booking-notes-input"
            className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-navy-900 outline-none transition placeholder:text-slate-400 focus:border-brand-400 focus:bg-white focus:ring-4 focus:ring-brand-500/10"
            placeholder="Anything the professional should know..."
            value={form.notes}
            onChange={set('notes')}
          />
        </div>
      </div>

      <button
        type="submit"
        data-testid="booking-submit-btn"
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-brand-500/20 transition hover:bg-brand-700"
      >
        <CalendarCheck className="h-5 w-5" />
        Confirm Booking
      </button>
    </form>
  )
}