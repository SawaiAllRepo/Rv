import { useApp } from '../context/AppContext'
import Modal from './Modal'
import BookingForm from './BookingForm'

export default function BookingModal() {
  const { bookingModal, setBookingModal } = useApp()

  return (
    <Modal
      open={!!bookingModal}
      onClose={() => setBookingModal(null)}
      title="Book a Service"
      testid="booking-modal"
    >
      {bookingModal && (
        <BookingForm
          defaultServiceId={bookingModal.serviceId || ''}
          defaultPackageId={bookingModal.packageId || ''}
          defaultLocation={bookingModal.location || ''}
          onDone={() => setBookingModal(null)}
        />
      )}
    </Modal>
  )
}