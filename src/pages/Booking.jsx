import { useSearchParams } from 'react-router-dom'
import BookingForm from '../components/BookingForm'
import SectionHeading from '../components/SectionHeading'

export default function Booking() {
  const [params] = useSearchParams()

  return (
    <div className="bg-slate-100 pb-20 pt-28 lg:pt-32">
      <div className="container-x max-w-2xl">
        <SectionHeading
          eyebrow="Quick & easy"
          title="Book a Service"
          subtitle="Fill in the details and a verified professional will confirm your slot."
        />

        <div
          className="card mt-8 p-6 sm:p-8"
          data-testid="booking-page-card"
        >
          <BookingForm
            defaultServiceId={params.get('service') || ''}
            defaultPackageId={params.get('package') || ''}
            defaultLocation={params.get('loc') || ''}
          />
        </div>
      </div>
    </div>
  )
}