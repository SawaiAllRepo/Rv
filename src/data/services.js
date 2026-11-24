import heroImg from '../assets/hero.jpg'
import realEstate from '../assets/real-estate.jpg'
import waterTank from '../assets/water-tank.jpg'
import pestControl from '../assets/pest-control.jpg'
import sofaCleaning from '../assets/sofa-cleaning.jpg'
import aboutTeam from '../assets/about-team.jpg'
import social from '../assets/social.jpg'
import bungalowRental from '../assets/bungalow-rental.png'
import commercialGasSupply from '../assets/commercial-gas-supply.png'
import gasServicing from '../assets/gas-servicing.jpeg'

export const images = { heroImg, aboutTeam, social }

export const PRIORITY_LOCATIONS =['Pune', 'Lonavla/Khandala', 'Malavali']
export const UPCOMING_LOCATIONS = []
export const LOCATIONS = [...PRIORITY_LOCATIONS, ...UPCOMING_LOCATIONS]

// RV Solutions 24 core offering: Cleaning, Pest Control, Water Tank Cleaning & Bungalow Sales & Rental.
export const services = [
  {
    id: 'customize-deep-cleaning',
    name: 'Cleaning Services',
    icon: 'Sparkles',
    image: sofaCleaning,
    rating: 4.9,
    price: null,
    priceLabel: 'Package rates available',
    category: 'main',
    description: 'Regular and customized home cleaning, including fans and lights, cobweb removal, doors and windows, and deep cleaning.'
  },
  {
    id: 'pest-control',
    name: 'Pest Control',
    icon: 'Bug',
    image: pestControl,
    rating: 4.8,
    price: 1200,
    priceLabel: 'Packages from ₹1,200',
    category: 'main',
    description: 'Professional pest control for cockroaches, ants and bed bugs, with convenient annual package options.'
  },
  {
    id: 'water-tank-cleaning',
    name: 'Water Tank Cleaning',
    icon: 'Droplets',
    image: waterTank,
    rating: 4.8,
    price: 599,
    priceLabel: 'From ₹599',
    category: 'main',
    description: 'Professional overhead and underground water tank cleaning with hygienic scrubbing and disinfection.'
  },
  {
    id: 'sofa-carpet-cleaning',
    name: 'Sofa & Carpet Cleaning',
    icon: 'Armchair',
    image: sofaCleaning,
    rating: 4.8,
    price: 449,
    priceLabel: 'From ₹449',
    category: 'main',
    description: 'Dry vacuum and deep cleaning support for sofas and carpets as part of RV Solutions 24 cleaning services.'
  },
  {
    id: 'bungalow-on-rent',
    name:  'Bungalow Sales & Rental',
    icon: 'House',
     image: bungalowRental,
    rating: 4.7,
    price: null,
    priceLabel: 'On request',
    category: 'main',
description: 'Bungalow sales and rental services for properties, stays, gatherings and special occasions in our service locations.'  },
  {
    id: 'gas-servicing',
    name: 'Gas Servicing',
    icon: 'Wrench',
    image: gasServicing,
    rating: 4.7,
    price: null,
    priceLabel: 'On request',
    category: 'lion-gas',
    description: 'Gas servicing support provided separately under the Lion Gas Agency service category.'
  },
  {
    id: 'commercial-gas-supply',
    name: 'Commercial Gas Supply',
    icon: 'Factory',
   image: commercialGasSupply,
    rating: 4.7,
    price: null,
    priceLabel: 'On request',
   category: 'lion-gas',
    description: 'Commercial gas supply support provided separately under the Lion Gas Agency service category.'
  },
]

export const mainServices = services.filter((service) => service.category === 'main')
export const additionalServices = services.filter((service) => service.category === 'lion-gas')
export const popularServices = mainServices
