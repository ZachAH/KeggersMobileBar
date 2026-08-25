export interface MenuItem {
  name: string
  description: string
  price: string
}

export const menu: MenuItem[] = [
  {
    name: 'Garden Spritz',
    description: 'Cucumber, mint, elderflower, soda',
    price: '$8',
  },
  {
    name: 'Smoke & Citrus',
    description: 'Blood orange, chili, lime, smoked salt rim',
    price: '$9',
  },
  {
    name: 'Berry Fields',
    description: 'Muddled blackberry, basil, lemon, tonic',
    price: '$8',
  },
]
