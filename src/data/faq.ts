export interface FaqItem {
  question: string
  answer: string
}

// Add new questions here — they'll show up on the "What We Offer" page automatically.
export const faq: FaqItem[] = [
  {
    question: 'Why use a mobile bar business?',
    answer:
      "Kegger's offers a big selection of cocktails and mocktails, and the best part is you choose your very own signature drink for your event. We custom-craft our cocktails and mocktails, so the sky is the limit — and it's a huge cost savings for our customers.",
  },
  {
    question: 'Why is it BYOB?',
    answer:
      "Wisconsin law doesn't allow a mobile bar service to sell or buy alcohol for their customers. As the host of your event, you buy all the alcohol that fits your budget and Kegger's will serve your guests. We'll work with you on the serving guide for your event, and any unused alcohol is returned to you at the end of the night.",
  },
  {
    question: 'What type of events do you serve?',
    answer:
      'We love every type of event — weddings, bridal showers, bachelor parties, celebrations of life, cocktail parties, costume parties, tailgates, outdoor parties, golf events, corporate events, birthday parties, and just about anything else you can think of!',
  },
  {
    question: 'Where can you go?',
    answer:
      "Just about anywhere. Our mobile trailer bar measures 7ft wide x 12ft deep x 8.5ft tall, so any doors or paths that fit those dimensions, our trailer will cruise right on and out of.",
  },
  {
    question: 'Are you insured?',
    answer:
      "Yes, we've got it covered! Our bartenders are certified and insured, and Kegger's Mobile Bar carries general liability and liquor liability insurance. Copies of our insurance can be provided on request.",
  },
  {
    question: 'Do you need electricity?',
    answer:
      "Yes, we need a standard 120V outlet, preferably dedicated just to our trailer. If reliable power isn't available onsite, we can bring a quiet generator. We do need a level surface to park, and being within 50 feet of an electrical source is preferred.",
  },
  {
    question: 'Which payment methods do you accept?',
    answer: 'Cash, Visa, Mastercard, Discover, American Express, PayPal, Venmo, and Apple Pay (a 3% surcharge applies to card and digital payments).',
  },
  {
    question: 'What areas do you serve?',
    answer: 'We proudly serve Central, Southern, and Northern Wisconsin.',
  },
  {
    question: 'Are your bartenders certified?',
    answer: 'All of our professional bartenders are fully certified, insured, and trained.',
  },
  {
    question: 'Is a deposit required?',
    answer:
      'Yes — a non-refundable deposit of $100 is required to secure your date. This deposit is applied to your final bill.',
  },
  {
    question: 'How will I be charged for services?',
    answer:
      'A 50% deposit is due upon signing your contract, with the remaining payment due 30 days prior to your event.',
  },
  {
    question: 'Can I have a cash bar?',
    answer:
      "Unfortunately, no — part of the reason this is all possible is because of licensing restrictions. The good news is you won't face the extreme markups venues usually have, and we can work out a plan that makes your wallet and your guests happy.",
  },
]
