import { Check, Crown, MessageCircle } from 'lucide-react'
import { memberships } from '../data/memberships'
import SectionHeading from '../components/SectionHeading'
import ServiceTerms from '../components/ServiceTerms'

const WHATSAPP_NUMBER = '919923425447'

export default function Membership() {
  const handleWhatsAppEnquiry = (membership) => {
    const message = `Hello RV Solutions 24,

I am interested in the ${membership.name} Home Care Package.

Package: ${membership.name}
Price: ₹${membership.price.toLocaleString('en-IN')} ${membership.period}

Package Includes:
${membership.features.map((feature) => `• ${feature}`).join('\n')}

Please share more details and help me proceed with this package.

Thank you.`

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      message
    )}`

    window.location.href = whatsappUrl
  }

  return (
    <div className="pt-16 lg:pt-20">
      {/* Hero Section */}
      <section className="bg-navy-900 py-16">
        <div className="container-x">
          <SectionHeading
            light
            eyebrow="RV Solutions 24 annual packages"
            title="Silver, Gold & Platinum Home Care Plans"
            subtitle="Annual pest control and cleaning packages designed for 1 BHK homes or up to 550 sq. ft. carpet area."
          />
        </div>
      </section>

      {/* Membership Cards */}
      <section className="py-16">
        <div className="container-x grid items-stretch gap-6 lg:grid-cols-3">
          {memberships.map((m) => (
            <div
              key={m.id}
              data-testid={`membership-card-${m.id}`}
              className={`relative flex flex-col rounded-3xl p-8 transition-[transform,box-shadow] duration-300 hover:-translate-y-1.5 ${
                m.highlighted
                  ? 'bg-navy-900 text-white shadow-lift ring-2 ring-brand-500 lg:scale-[1.04]'
                  : 'card'
              }`}
            >
              {/* Badge */}
              {m.badge && (
                <span className="absolute -top-3.5 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-brand-700 px-4 py-1.5 text-xs font-bold text-white shadow-lg">
                  <Crown className="h-3.5 w-3.5" />
                  {m.badge}
                </span>
              )}

              {/* Package Name */}
              <h3
                className={`text-2xl font-extrabold ${
                  m.highlighted ? 'text-white' : 'text-navy-900'
                }`}
              >
                {m.name}
              </h3>

              {/* Tagline */}
              <p
                className={`mt-2 text-sm ${
                  m.highlighted ? 'text-white/70' : 'text-slate-500'
                }`}
              >
                {m.tagline}
              </p>

              {/* Price */}
              <p
                className={`mt-6 text-3xl font-extrabold ${
                  m.highlighted ? 'text-white' : 'text-navy-900'
                }`}
              >
                ₹{m.price.toLocaleString('en-IN')}{' '}
                <span
                  className={`text-sm font-medium ${
                    m.highlighted ? 'text-white/70' : 'text-slate-500'
                  }`}
                >
                  {m.period}
                </span>
              </p>

              {/* Features */}
              <ul className="mt-8 flex-1 space-y-4">
                {m.features.map((feature) => (
                  <li
                    key={feature}
                    className={`flex items-start gap-3 text-sm ${
                      m.highlighted ? 'text-white/90' : 'text-slate-700'
                    }`}
                  >
                    <span
                      className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                        m.highlighted
                          ? 'bg-brand-500 text-white'
                          : 'bg-brand-100 text-brand-700'
                      }`}
                    >
                      <Check className="h-3.5 w-3.5" />
                    </span>

                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* WhatsApp Enquiry Button */}
              <button
                type="button"
                onClick={() => handleWhatsAppEnquiry(m)}
                data-testid={`choose-${m.id}-btn`}
                className="mt-8 flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-brand-700 px-4 py-3 text-sm font-bold text-white opacity-100 shadow-md transition-colors hover:bg-brand-800 active:bg-brand-900"
              >
                <MessageCircle className="h-4 w-4 shrink-0" />
                <span className="whitespace-nowrap">
                  Submit Enquiry on WhatsApp
                </span>
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Terms & Conditions */}
      <section className="bg-white py-16">
        <div className="container-x">
          <ServiceTerms />
        </div>
      </section>
    </div>
  )
}