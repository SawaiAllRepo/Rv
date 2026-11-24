import { services, popularServices, LOCATIONS } from '../data/services'
import { providers, CONTACT } from '../data/providers'
import { reviews } from '../data/reviews'
import { memberships } from '../data/memberships'
import { bookings, enquiries } from '../data/bookings'

// Mock API layer — mirrors the shape of the future Django REST endpoints.
// To go live, replace each function body with a fetch() call; page code stays unchanged.
const delay = (data, ms = 120) => new Promise((res) => setTimeout(() => res(data), ms))

export const api = {
  getServices: () => delay(services),
  getService: (id) => delay(services.find((s) => s.id === id) || null),
  getPopularServices: () => delay(popularServices),
  getLocations: () => delay(LOCATIONS),

  getProviders: ({ serviceId, location, minRating, maxPrice, availableOnly, query } = {}) => {
    let list = providers
    if (serviceId) list = list.filter((p) => p.services.includes(serviceId))
    if (location) list = list.filter((p) => p.location === location)
    if (minRating) list = list.filter((p) => p.rating >= minRating)
    if (maxPrice) list = list.filter((p) => p.startingPrice <= maxPrice)
    if (availableOnly) list = list.filter((p) => p.available)
    if (query) {
      const q = query.toLowerCase()
      list = list.filter((p) => p.name.toLowerCase().includes(q) || p.services.join(' ').includes(q))
    }
    return delay(list)
  },
  getProvider: (id) => delay(providers.find((p) => p.id === id) || null),
  getSimilarProviders: (provider) =>
    delay(providers.filter((p) => p.id !== provider.id && p.services.some((s) => provider.services.includes(s))).slice(0, 3)),

  getReviews: (providerName) =>
    delay(providerName ? reviews.filter((r) => r.provider === providerName) : reviews),

  getMemberships: () => delay(memberships),
  getBookings: () => delay(bookings),
  getEnquiries: () => delay(enquiries),
  getContact: () => delay(CONTACT),
}
