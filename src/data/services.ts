export interface Service {
  title: string
  tagline: string
  headline: string
  description: string
  bullets?: string[]
  footer?: string
}

export const services: Service[] = [
  {
    title: 'Mocktail Bar Service',
    tagline: "Kegger's Specialty",
    headline: 'Fresh. Flavorful. Beautifully Crafted.',
    description: 'Signature mocktails, handcrafted from scratch for every guest.',
    bullets: [
      'Fresh, handcrafted non-alcoholic mocktails',
      'Homemade syrups',
      'Fresh juices and premium mixers',
      'Beautiful fruit, herbs, and specialty garnishes',
      'Seasonal mocktail menus',
      'Wellness/mocktail options',
    ],
    footer:
      'Perfect for weddings, corporate events, charitable events, and private parties — a fun option for guests of all ages.',
  },
  {
    title: 'Cocktail Bar Service',
    tagline: 'For Weddings & Private Events',
    headline: 'Elevate Your Event with a Professionally Styled Bar',
    description:
      "Kegger's can provide bartending and bar service for weddings and private events, including customized cocktail menus and professional service.",
  },
  {
    title: 'Beer & Wine Service',
    tagline: 'Simple, Classic & Elegant',
    headline: 'A Classic Bar Experience Made Easy',
    description:
      "Ideal for couples or hosts who don't want a full cocktail bar but still want professional bartending service.",
  },
]

export interface WhyChooseFeature {
  title: string
  description: string
}

export const whyChooseFeatures: WhyChooseFeature[] = [
  {
    title: 'Handcrafted Drinks',
    description:
      'Fresh juices, premium mixers, homemade syrups, and beautiful garnishes go into every drink we create.',
  },
  {
    title: 'Mocktails That Steal the Show',
    description:
      'Mocktails are our specialty! Our creative, flavorful, and beautifully presented non-alcoholic drinks give every guest something special to enjoy.',
  },
  {
    title: 'Made for Your Event',
    description:
      'From weddings and bridal showers to private parties and corporate events, we customize our bar service to fit your celebration. Having a themed event? Even better — we have specialty mocktails ready to go.',
  },
  {
    title: 'A Bar with Personality',
    description:
      'Our vintage mobile bar brings charm, style, and a memorable experience wherever we go.',
  },
]
