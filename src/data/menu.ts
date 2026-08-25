export interface MenuItem {
  name: string
  ingredients: string[]
  color: string
}

export const seasonalMocktails: MenuItem[] = [
  {
    name: 'Marigold Mule',
    ingredients: ['Marigold tea syrup', 'Orange juice', 'Ginger beer (non-alcoholic)'],
    color: 'bg-gold',
  },
  {
    name: 'Ginger Berry Fizz',
    ingredients: [
      'Blueberry syrup',
      'Lemon juice',
      'Pineapple juice',
      'Ginger beer (non-alcoholic)',
    ],
    color: 'bg-teal',
  },
  {
    name: 'Berry In Love',
    ingredients: [
      'Muddled mint leaves',
      'Strawberry syrup',
      'Rose water',
      'Lemon juice',
      'Ginger ale',
    ],
    color: 'bg-red',
  },
]
