
import { useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import {
  MapPin,
  Star,
  IndianRupee,
  Check,
  ArrowLeft,
  MessageCircle,
  Phone,
  Calendar,
  Clock,
  User,
  Building2,
  BriefcaseBusiness,
} from 'lucide-react'

import { services, LOCATIONS } from '../data/services'
import { memberships, pricingTerms, exclusions } from '../data/memberships'
import { useApp } from '../context/AppContext'
import { submitFormData } from '../services/sheetApi'
import { CONTACT } from '../data/providers'

export default function ServiceDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const { setBookingModal } = useApp()

  const service = services.find((s) => s.id === id)

  const [location, setLocation] = useState(params.get('loc') || '')
  const [submitted, setSubmitted] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    location: '',
    requirementType: '',
    businessName: '',
    businessType: '',
    gasRequirement: '',
    deliveryRequirement: '',
    preferredDate: '',
    preferredTime: '',
    guests: '',
    budget: '',
    address: '',
    message: '',
  })

  const isDirectFormService = [
    'bungalow-on-rent',
    'gas-servicing',
    'commercial-gas-supply',
  ].includes(id)

  const isBungalow = id === 'bungalow-on-rent'
  const isGasServicing = id === 'gas-servicing'
  const isCommercialGas = id === 'commercial-gas-supply'

  const handleFormChange = (e) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleEnquirySubmit = async (e) => {
    e.preventDefault()

    const data = {
      id: `ENQ-${Math.floor(1000 + Math.random() * 9000)}`,
      status: 'Pending',
      service: service?.name || '',
      name: formData.name,
      mobile: formData.mobile,
      requirementType: formData.requirementType,
      location: formData.location,
      preferredDate: formData.preferredDate,
      preferredTime: formData.preferredTime,
      guests: formData.guests,
      budget: formData.budget,
      businessName: formData.businessName,
      businessType: formData.businessType,
      gasRequirement: formData.gasRequirement,
      deliveryRequirement: formData.deliveryRequirement,
      address: formData.address,
      message: formData.message,
    }

    await submitFormData({ form: 'ServiceDetail Enquiry', data })
    setSubmitted(true)
  }

  const handleWhatsAppClick = () => {
    const message = `Hello RV Solutions 24, I am interested in ${service.name}. Please share more details.`

    const whatsappUrl = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(
      message
    )}`

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
  }

  const resetForm = () => {
    setSubmitted(false)

    setFormData({
      name: '',
      mobile: '',
      location: '',
      requirementType: '',
      businessName: '',
      businessType: '',
      gasRequirement: '',
      deliveryRequirement: '',
      preferredDate: '',
      preferredTime: '',
      guests: '',
      budget: '',
      address: '',
      message: '',
    })
  }

  if (!service) {
    return (
      <div className="container-x flex min-h-[60vh] flex-col items-center justify-center pt-24 text-center">
        <h1 className="font-display text-2xl font-bold">
          Service not found
        </h1>

        <button
          type="button"
          onClick={() => navigate('/services')}
          className="btn-primary mt-6"
          data-testid="back-to-services-btn"
        >
          Browse All Services
        </button>
      </div>
    )
  }

  return (
    <div className="pt-16 lg:pt-20">
      {/* Service Header */}
      <section className="relative overflow-hidden bg-navy-900 py-16">
        <img
          src={service.image}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-20"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-navy-900/95 to-navy-900/60" />

        <div className="container-x relative">
          <button
            type="button"
            onClick={() => navigate('/services')}
            className="inline-flex items-center gap-1.5 text-sm text-slate-300 transition-colors hover:text-white"
            data-testid="back-link"
          >
            <ArrowLeft className="h-4 w-4" />
            All Services
          </button>

          <h1
            className="mt-4 font-display text-3xl font-bold text-white sm:text-4xl lg:text-5xl"
            data-testid="service-title"
          >
            {service.name} Services
          </h1>

          <p className="mt-3 max-w-2xl text-base text-slate-300 md:text-lg">
            {service.description}
          </p>

          <div className="mt-5 flex flex-wrap gap-4 text-sm text-slate-300">
            <span className="inline-flex items-center gap-1.5">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              {service.rating} average rating
            </span>

            {service.price && (
              <span className="inline-flex items-center gap-1.5">
                <IndianRupee className="h-4 w-4 text-brand-400" />
                Starting {service.priceLabel}
              </span>
            )}

            {!isDirectFormService && (
              <span className="inline-flex items-center gap-1.5">
                <Check className="h-4 w-4 text-brand-400" />
                {memberships.length} packages available
              </span>
            )}

            {isDirectFormService && (
              <span className="inline-flex items-center gap-1.5">
                <MessageCircle className="h-4 w-4 text-brand-400" />
                Enquiry available
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Direct Service Enquiry Forms */}
      {isDirectFormService ? (
        <section className="bg-slate-100 py-12 sm:py-16">
          <div className="container-x">
            <div className="mb-8">
              <h2 className="font-display text-2xl font-bold text-navy-900 sm:text-3xl">
                Enquire About {service.name}
              </h2>

              <p className="mt-2 max-w-2xl text-slate-500">
                Fill in the details below and our team will contact you.
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
              {/* Form */}
              <div className="card p-6 sm:p-8">
                {submitted ? (
                  <div
                    className="flex min-h-[420px] flex-col items-center justify-center text-center"
                    data-testid="enquiry-success"
                  >
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-100 text-brand-600">
                      <Check className="h-8 w-8" />
                    </div>

                    <h3 className="mt-5 font-display text-2xl font-bold text-navy-900">
                      Enquiry Submitted
                    </h3>

                    <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
                      Thank you for your enquiry. Our team will contact you
                      soon.
                    </p>

                    <button
                      type="button"
                      onClick={resetForm}
                      className="btn-outline mt-6"
                    >
                      Submit Another Enquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleEnquirySubmit}>
                    <div className="grid gap-5 sm:grid-cols-2">
                      {/* Full Name */}
                      <div>
                        <label
                          htmlFor="name"
                          className="mb-2 block text-sm font-semibold text-navy-900"
                        >
                          Full Name *
                        </label>

                        <div className="relative">
                          <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                          <input
                            id="name"
                            name="name"
                            type="text"
                            value={formData.name}
                            onChange={handleFormChange}
                            required
                            placeholder="Enter your name"
                            className="input pl-10"
                          />
                        </div>
                      </div>

                      {/* Mobile */}
                      <div>
                        <label
                          htmlFor="mobile"
                          className="mb-2 block text-sm font-semibold text-navy-900"
                        >
                          Mobile Number *
                        </label>

                        <div className="relative">
                          <Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                          <input
                            id="mobile"
                            name="mobile"
                            type="tel"
                            value={formData.mobile}
                            onChange={handleFormChange}
                            required
                            pattern="[0-9]{10}"
                            placeholder="10-digit mobile number"
                            className="input pl-10"
                          />
                        </div>
                      </div>

                      {/* Bungalow */}
                      {isBungalow && (
                        <>
                          <div>
                            <label
                              htmlFor="requirementType"
                              className="mb-2 block text-sm font-semibold text-navy-900"
                            >
                              Requirement *
                            </label>

                            <select
                              id="requirementType"
                              name="requirementType"
                              value={formData.requirementType}
                              onChange={handleFormChange}
                              required
                              className="input"
                            >
                              <option value="">Select Requirement</option>
                              <option value="Bungalow Sales">
                                Bungalow Sales
                              </option>
                              <option value="Bungalow Rental">
                                Bungalow Rental
                              </option>
                            </select>
                          </div>

                          <div>
                            <label
                              htmlFor="location"
                              className="mb-2 block text-sm font-semibold text-navy-900"
                            >
                              Preferred Location *
                            </label>

                            <div className="relative">
                              <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                              <select
                                id="location"
                                name="location"
                                value={formData.location}
                                onChange={handleFormChange}
                                required
                                className="input pl-10"
                              >
                                <option value="">Select Location</option>

                                {LOCATIONS.map((item) => (
                                  <option key={item} value={item}>
                                    {item}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>

                          <div>
                            <label
                              htmlFor="preferredDate"
                              className="mb-2 block text-sm font-semibold text-navy-900"
                            >
                              Preferred Date
                            </label>

                            <div className="relative">
                              <Calendar className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                              <input
                                id="preferredDate"
                                name="preferredDate"
                                type="date"
                                value={formData.preferredDate}
                                onChange={handleFormChange}
                                className="input pl-10"
                              />
                            </div>
                          </div>

                          <div>
                            <label
                              htmlFor="preferredTime"
                              className="mb-2 block text-sm font-semibold text-navy-900"
                            >
                              Preferred Time
                            </label>

                            <div className="relative">
                              <Clock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                              <input
                                id="preferredTime"
                                name="preferredTime"
                                type="time"
                                value={formData.preferredTime}
                                onChange={handleFormChange}
                                className="input pl-10"
                              />
                            </div>
                          </div>

                          <div>
                            <label
                              htmlFor="guests"
                              className="mb-2 block text-sm font-semibold text-navy-900"
                            >
                              Number of Guests / People
                            </label>

                            <input
                              id="guests"
                              name="guests"
                              type="number"
                              min="1"
                              value={formData.guests}
                              onChange={handleFormChange}
                              placeholder="Enter number"
                              className="input"
                            />
                          </div>

                          <div>
                            <label
                              htmlFor="budget"
                              className="mb-2 block text-sm font-semibold text-navy-900"
                            >
                              Budget
                            </label>

                            <input
                              id="budget"
                              name="budget"
                              type="text"
                              value={formData.budget}
                              onChange={handleFormChange}
                              placeholder="Enter your budget"
                              className="input"
                            />
                          </div>
                        </>
                      )}

                      {/* Gas Servicing */}
                      {isGasServicing && (
                        <>
                          <div>
                            <label
                              htmlFor="location"
                              className="mb-2 block text-sm font-semibold text-navy-900"
                            >
                              Location *
                            </label>

                            <div className="relative">
                              <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                              <select
                                id="location"
                                name="location"
                                value={formData.location}
                                onChange={handleFormChange}
                                required
                                className="input pl-10"
                              >
                                <option value="">Select Location</option>

                                {LOCATIONS.map((item) => (
                                  <option key={item} value={item}>
                                    {item}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>

                          <div>
                            <label
                              htmlFor="requirementType"
                              className="mb-2 block text-sm font-semibold text-navy-900"
                            >
                              Gas Service Type *
                            </label>

                            <select
                              id="requirementType"
                              name="requirementType"
                              value={formData.requirementType}
                              onChange={handleFormChange}
                              required
                              className="input"
                            >
                              <option value="">
                                Select Service Type
                              </option>
                              <option value="Gas Stove Servicing">
                                Gas Stove Servicing
                              </option>
                              <option value="Gas Pipeline Servicing">
                                Gas Pipeline Servicing
                              </option>
                              <option value="Gas Connection Servicing">
                                Gas Connection Servicing
                              </option>
                              <option value="Other Gas Service">
                                Other Gas Service
                              </option>
                            </select>
                          </div>

                          <div>
                            <label
                              htmlFor="preferredDate"
                              className="mb-2 block text-sm font-semibold text-navy-900"
                            >
                              Preferred Date *
                            </label>

                            <div className="relative">
                              <Calendar className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                              <input
                                id="preferredDate"
                                name="preferredDate"
                                type="date"
                                value={formData.preferredDate}
                                onChange={handleFormChange}
                                required
                                className="input pl-10"
                              />
                            </div>
                          </div>

                          <div>
                            <label
                              htmlFor="preferredTime"
                              className="mb-2 block text-sm font-semibold text-navy-900"
                            >
                              Preferred Time *
                            </label>

                            <div className="relative">
                              <Clock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                              <input
                                id="preferredTime"
                                name="preferredTime"
                                type="time"
                                value={formData.preferredTime}
                                onChange={handleFormChange}
                                required
                                className="input pl-10"
                              />
                            </div>
                          </div>
                        </>
                      )}

                      {/* Commercial Gas */}
                      {isCommercialGas && (
                        <>
                          <div>
                            <label
                              htmlFor="businessName"
                              className="mb-2 block text-sm font-semibold text-navy-900"
                            >
                              Business / Company Name
                              <span className="ml-1 font-normal text-slate-400">
                                (Optional)
                              </span>
                            </label>

                            <div className="relative">
                              <Building2 className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                              <input
                                id="businessName"
                                name="businessName"
                                type="text"
                                value={formData.businessName}
                                onChange={handleFormChange}
                                placeholder="Business / company name"
                                className="input pl-10"
                              />
                            </div>
                          </div>

                          <div>
                            <label
                              htmlFor="businessType"
                              className="mb-2 block text-sm font-semibold text-navy-900"
                            >
                              Business Type *
                            </label>

                            <div className="relative">
                              <BriefcaseBusiness className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                              <select
                                id="businessType"
                                name="businessType"
                                value={formData.businessType}
                                onChange={handleFormChange}
                                required
                                className="input pl-10"
                              >
                                <option value="">
                                  Select Business Type
                                </option>
                                <option value="Restaurant">
                                  Restaurant
                                </option>
                                <option value="Hotel">Hotel</option>
                                <option value="Catering">Catering</option>
                                <option value="Food Business">
                                  Food Business
                                </option>
                                <option value="Industrial">
                                  Industrial
                                </option>
                                <option value="Other">Other</option>
                              </select>
                            </div>
                          </div>

                          <div>
                            <label
                              htmlFor="location"
                              className="mb-2 block text-sm font-semibold text-navy-900"
                            >
                              Location *
                            </label>

                            <div className="relative">
                              <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                              <select
                                id="location"
                                name="location"
                                value={formData.location}
                                onChange={handleFormChange}
                                required
                                className="input pl-10"
                              >
                                <option value="">Select Location</option>

                                {LOCATIONS.map((item) => (
                                  <option key={item} value={item}>
                                    {item}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>

                          <div>
                            <label
                              htmlFor="gasRequirement"
                              className="mb-2 block text-sm font-semibold text-navy-900"
                            >
                              Gas Requirement / Quantity *
                            </label>

                            <input
                              id="gasRequirement"
                              name="gasRequirement"
                              type="text"
                              value={formData.gasRequirement}
                              onChange={handleFormChange}
                              required
                              placeholder="e.g. Number of cylinders / quantity"
                              className="input"
                            />
                          </div>

                          <div>
                            <label
                              htmlFor="deliveryRequirement"
                              className="mb-2 block text-sm font-semibold text-navy-900"
                            >
                              Supply Requirement *
                            </label>

                            <select
                              id="deliveryRequirement"
                              name="deliveryRequirement"
                              value={formData.deliveryRequirement}
                              onChange={handleFormChange}
                              required
                              className="input"
                            >
                              <option value="">Select Requirement</option>
                              <option value="Regular Supply">
                                Regular Supply
                              </option>
                              <option value="One Time Delivery">
                                One Time Delivery
                              </option>
                              <option value="Urgent Requirement">
                                Urgent Requirement
                              </option>
                            </select>
                          </div>
                        </>
                      )}

                      {/* Address */}
                      <div className="sm:col-span-2">
                        <label
                          htmlFor="address"
                          className="mb-2 block text-sm font-semibold text-navy-900"
                        >
                          Complete Address *
                        </label>

                        <textarea
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleFormChange}
                          required
                          rows={3}
                          placeholder="Enter your complete address"
                          className="input min-h-[90px] resize-y"
                        />
                      </div>

                      {/* Additional Requirements */}
                      <div className="sm:col-span-2">
                        <label
                          htmlFor="message"
                          className="mb-2 block text-sm font-semibold text-navy-900"
                        >
                          Additional Requirements
                          <span className="ml-1 font-normal text-slate-400">
                            (Optional)
                          </span>
                        </label>

                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleFormChange}
                          rows={4}
                          placeholder="Tell us about your requirement..."
                          className="input min-h-[110px] resize-y"
                        />
                      </div>
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      className="btn-primary mt-6 w-full"
                      data-testid="submit-enquiry-btn"
                    >
                      Submit Enquiry
                    </button>
                  </form>
                )}
              </div>

              {/* WhatsApp Side Card */}
              <div className="lg:sticky lg:top-28 lg:self-start">
                <div className="card overflow-hidden">
                  <div className="bg-navy-900 p-6 text-white">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10">
                      <MessageCircle className="h-6 w-6 text-brand-400" />
                    </div>

                    <h3 className="mt-5 font-display text-xl font-bold">
                      Need Quick Assistance?
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-300">
                      Have a question or need quick information? Connect with
                      our team directly on WhatsApp.
                    </p>
                  </div>

                  <div className="p-6">
                    <div className="flex items-start gap-3">
                      <Phone className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />

                      <div>
                        <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                          Contact
                        </p>

                        <a
                          href={CONTACT.phoneHref}
                          className="mt-1 block text-sm font-semibold text-navy-900 hover:text-brand-600"
                        >
                          {CONTACT.phone}
                        </a>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleWhatsAppClick}
                      className="btn-primary mt-6 flex w-full items-center justify-center gap-2"
                      data-testid="whatsapp-enquiry-btn"
                    >
                      <MessageCircle className="h-4 w-4" />
                      Chat on WhatsApp
                    </button>

                    <p className="mt-4 text-center text-xs leading-5 text-slate-500">
                      WhatsApp is available for direct assistance and general
                      enquiries.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <>
          {/* Location Selector */}
          <section
            className="sticky top-16 z-30 border-b border-slate-200 bg-white/95 py-4 backdrop-blur lg:top-20"
            data-testid="filter-bar"
          >
            <div className="container-x flex flex-wrap items-center gap-3">
              <MapPin className="h-5 w-5 text-brand-600" />

              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                data-testid="filter-location"
                className="input !w-auto !py-2"
              >
                <option value="">Select Location</option>

                {LOCATIONS.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>

              {location && (
                <span className="text-sm font-medium text-slate-600">
                  Packages available in {location}
                </span>
              )}
            </div>
          </section>

          {/* Packages */}
          <section className="py-12">
            <div className="container-x">
              {!location ? (
                <div className="card p-12 text-center">
                  <MapPin className="mx-auto h-10 w-10 text-slate-300" />

                  <h2 className="mt-4 font-display text-xl font-semibold text-navy-900">
                    Select a location
                  </h2>

                  <p className="mt-2 text-sm text-slate-500">
                    Please select a location above to view available packages.
                  </p>
                </div>
              ) : (
                <>
                  <div className="mb-8">
                    <h2 className="font-display text-2xl font-bold text-navy-900 sm:text-3xl">
                      Packages available in {location}
                    </h2>

                    <p className="mt-2 text-slate-500">
                      Choose the package that best suits your home care
                      requirements.
                    </p>
                  </div>

                  {/* Package Cards */}
                  <div className="grid gap-6 lg:grid-cols-3">
                    {memberships.map((membership) => (
                      <div
                        key={membership.id}
                        className={`card relative flex flex-col p-6 ${
                          membership.highlighted
                            ? 'border-2 border-brand-500 shadow-lift'
                            : ''
                        }`}
                        data-testid={`package-${membership.id}`}
                      >
                        {membership.badge && (
                          <span className="absolute right-5 top-5 rounded-full bg-brand-600 px-3 py-1 text-xs font-semibold text-white">
                            {membership.badge}
                          </span>
                        )}

                        <h3 className="font-display text-2xl font-bold text-navy-900">
                          {membership.name}
                        </h3>

                        <p className="mt-2 min-h-[40px] text-sm text-slate-500">
                          {membership.tagline}
                        </p>

                        <div className="mt-5">
                          <span className="font-display text-3xl font-bold text-navy-900">
                            ₹{membership.price.toLocaleString('en-IN')}
                          </span>

                          <span className="ml-1 text-sm text-slate-500">
                            {membership.period}
                          </span>
                        </div>

                        <div className="my-6 h-px bg-slate-200" />

                        <h4 className="text-sm font-semibold text-navy-900">
                          Package Includes
                        </h4>

                        <ul className="mt-4 flex flex-1 flex-col gap-3">
                          {membership.features.map((feature) => (
                            <li
                              key={feature}
                              className="flex items-start gap-2 text-sm text-slate-600"
                            >
                              <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>

                        <button
                          onClick={() =>
                            setBookingModal({
                              serviceId: id,
                              packageId: membership.id,
                              location,
                            })
                          }
                          className="btn-primary mt-6 w-full"
                          data-testid={`package-book-${membership.id}`}
                        >
                          Choose {membership.name}
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Pricing & Exclusions */}
                  <div className="mt-10 grid gap-6 lg:grid-cols-2">
                    <div className="card p-6">
                      <h3 className="font-display text-lg font-semibold text-navy-900">
                        Pricing Terms
                      </h3>

                      <p className="mt-3 text-sm text-slate-600">
                        {pricingTerms.base}
                      </p>

                      <h4 className="mt-5 text-sm font-semibold text-navy-900">
                        Additional Charges
                      </h4>

                      <ul className="mt-3 divide-y divide-slate-100">
                        {pricingTerms.additional.map((item) => (
                          <li
                            key={item.service}
                            className="py-3 text-sm"
                          >
                            <div className="flex items-start justify-between gap-4">
                              <span className="text-slate-600">
                                {item.service}
                              </span>

                              <span className="text-right font-semibold text-navy-900">
                                {item.charge}
                              </span>
                            </div>

                            {item.note && (
                              <p className="mt-1 text-xs text-slate-500">
                                {item.note}
                              </p>
                            )}

                            {item.extraCharge && (
                              <p className="mt-1 text-xs font-semibold text-navy-900">
                                {item.extraCharge}
                              </p>
                            )}
                          </li>
                        ))}
                      </ul>

                      <p className="mt-5 text-xs leading-5 text-slate-500">
                        {pricingTerms.note}
                      </p>
                    </div>

                    <div className="card p-6">
                      <h3 className="font-display text-lg font-semibold text-navy-900">
                        Package Exclusions
                      </h3>

                      <ul className="mt-4 space-y-3">
                        {exclusions.map((item, index) => (
                          <li
                            key={`${item}-${index}`}
                            className="flex items-start gap-2 text-sm text-slate-600"
                          >
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </>
              )}
            </div>
          </section>
        </>
      )}
    </div>
  )
}
