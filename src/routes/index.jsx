import { Route, Routes } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import Home from '../pages/Home'
import Services from '../pages/Services'
import ServiceDetail from '../pages/ServiceDetail'
import Providers from '../pages/Providers'
import ProviderProfile from '../pages/ProviderProfile'
import About from '../pages/About'
import Contact from '../pages/Contact'
import Booking from '../pages/Booking'
import Membership from '../pages/Membership'
import NotFound from '../pages/NotFound'

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:id" element={<ServiceDetail />} />
        <Route path="/providers" element={<Providers />} />
        <Route path="/providers/:id" element={<ProviderProfile />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/membership" element={<Membership />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
