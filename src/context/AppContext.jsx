import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react'
import { bookings as seedBookings } from '../data/bookings'

const AppContext = createContext(null)

const readStorage = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

export function AppProvider({ children }) {
  const [savedProviders, setSavedProviders] = useState(() => readStorage('rv24_saved', []))
  const [bookings, setBookings] = useState(seedBookings)
  const [toasts, setToasts] = useState([])
  const [bookingModal, setBookingModal] = useState(null) // { serviceId, providerId }
  const [enquiryModal, setEnquiryModal] = useState(null) // { serviceId, providerId }
  const toastId = useRef(0)

  const toast = useCallback((message, type = 'success') => {
    const id = ++toastId.current
    setToasts((t) => [...t, { id, message, type }])
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 4000)
  }, [])

  const toggleSaveProvider = useCallback((id) => {
    setSavedProviders((s) => {
      const next = s.includes(id) ? s.filter((x) => x !== id) : [...s, id]
      localStorage.setItem('rv24_saved', JSON.stringify(next))
      return next
    })
  }, [])

  const addBooking = useCallback((booking) => {
    setBookings((b) => [booking, ...b])
  }, [])

  const value = useMemo(
    () => ({
      savedProviders, toggleSaveProvider,
      bookings, addBooking,
      toasts, toast,
      bookingModal, setBookingModal,
      enquiryModal, setEnquiryModal,
    }),
    [savedProviders, toggleSaveProvider, bookings, addBooking, toasts, toast, bookingModal, enquiryModal]
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
