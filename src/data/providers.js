import pestControl from '../assets/pest-control.jpg'
import sofaCleaning from '../assets/sofa-cleaning.jpg'
import waterTank from '../assets/water-tank.jpg'
import realEstate from '../assets/real-estate.jpg'

export const CONTACT = {
  phone: '+91 99234 25447',
  phoneHref: 'tel:+919923425447',
  whatsapp: '919923425447',
  email: 'help@rvsolutions24.com',
  address: 'Sarla Appt, Flat no. 7/8, Bhairavnath Nagar, Kusgaon, Lonavala 410401',
  hours: 'Mon – Sun, 9:00 AM – 9:00 PM',
}

export const providers = [
  {
    id: 'cleanpro-services',
    name: 'CleanPro Services',
    owner: 'Rajesh Kulkarni',
    rating: 4.8,
    reviews: 324,
    location: 'Lonavla/Khandala',
    experience: 8,
    verified: true,
    available: true,
    services: [
      'pest-control',
      'customize-deep-cleaning',
      'sofa-carpet-cleaning',
      'water-tank-cleaning',
    ],
    startingPrice: 499,
    about:
      'Professional home care service specialising in pest control, sofa & carpet cleaning and water tank cleaning.',
    areas: ['Lonavla/Khandala'],
    pricing: [
      { item: 'Pest Control (1 BHK)', price: '₹499' },
      { item: 'Home Deep Cleaning (1 BHK)', price: '₹1,499' },
      { item: 'Sofa Cleaning (per seat)', price: '₹149' },
      { item: 'Water Tank Cleaning (1000L)', price: '₹599' },
    ],
    gallery: [pestControl, sofaCleaning, waterTank],
  },
  {
    id: 'sparklehome-solutions',
    name: 'SparkleHome Solutions',
    owner: 'Sneha Deshmukh',
    rating: 4.7,
    reviews: 256,
    location: 'Pune',
    experience: 6,
    verified: true,
    available: true,
    services: [
      'customize-deep-cleaning',
      'sofa-carpet-cleaning',
      'water-tank-cleaning',
    ],
    startingPrice: 799,
    about:
      'Professional cleaning support for homes and offices, including sofa & carpet care and water tank hygiene.',
    areas: ['Pune'],
    pricing: [
      { item: 'Home Deep Cleaning (1 BHK)', price: '₹1,799' },
      { item: 'Sofa Cleaning (per seat)', price: '₹179' },
      { item: 'Water Tank Cleaning (1000L)', price: '₹699' },
    ],
    gallery: [sofaCleaning, waterTank],
  },
  {
    id: 'safehome-pest-control',
    name: 'SafeHome Pest Control',
    owner: 'Mohammed Irfan',
    rating: 4.8,
    reviews: 289,
    location: 'Malavali',
    experience: 7,
    verified: true,
    available: true,
    services: ['pest-control'],
    startingPrice: 499,
    about:
      'Pest control service for cockroaches, ants and bed bugs with professional treatment support.',
    areas: ['Malavali'],
    pricing: [
      { item: 'General Pest Control (1 BHK)', price: '₹499' },
      { item: 'Bed Bug Treatment', price: '₹1,299' },
    ],
    gallery: [pestControl],
  },
]