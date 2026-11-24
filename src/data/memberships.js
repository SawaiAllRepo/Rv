
export const memberships = [
  {
    id: 'silver',
    name: 'Silver',
    price: 1200,
    period: '/ Year',
    tagline: 'Essential annual pest control',
    features: ['Pest Control – Twice a Year'],
    highlighted: false,
  },

  {
    id: 'gold',
    name: 'Gold',
    price: 2400,
    period: '/ Year',
    tagline: 'Regular cleaning and pest control',
    features: [
      'Pest Control – Twice a Year',
      'Quarterly Cleaning',
      'Fans & Lights Cleaning',
      'Cobweb Removal',
      'Dry Cleaning of Doors & Windows',
    ],
    highlighted: false,
  },

  {
    id: 'platinum',
    name: 'Platinum',
    price: 6000,
    period: '/ Year',
    tagline: 'Complete home care package',
    features: [
      'Pest Control – Twice a Year',
      '6 Cleaning Visits',
      'Fans & Lights Cleaning',
      'Cobweb Removal',
      'Dry Cleaning of Doors & Windows',
      '2 Deep Cleaning Visits',
      'Bedroom, Living Room, Kitchen & Bathroom Deep Cleaning',
      'Dry Vacuum Cleaning of Sofa & Carpet',
    ],
    highlighted: true,
    badge: 'Most Popular',
  },
]

export const pricingTerms = {
  base: 'Package applicable for 1 BHK or up to 550 sq. ft. carpet area.',

  additional: [
    {
      service: 'Sofa Cleaning',
      charge: '₹350 per seat',
    },
    {
      service: 'Water Tank Cleaning',
      charge: '₹3,500 for 2 tanks',
      note: 'Applicable for tanks up to 10,000 litres',
      extraCharge: '₹2,000 per tank',
    },
    {
      service: 'Pest Control',
      charge:
        '₹650 for 1 BHK (excluding Rodent and Termite Control)',
    },
  ],

  note: 'Basic pest control covers Cockroaches, Ants and Bed Bugs. Termite Treatment and Rodent Control are excluded.',
}

export const exclusions = [
  'Termite Treatment',
  'Rodent Control',
  'Appliance cleaning',
  'Chandelier cleaning',
  'Inside cleaning of occupied cupboards',
  'Wet wall and ceiling wiping',
  'Areas inaccessible during cleaning',
]

