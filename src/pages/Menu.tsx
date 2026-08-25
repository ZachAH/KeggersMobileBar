import { Bubbles } from '../components/Bubbles'
import { SectionHeading } from '../components/SectionHeading'
import { seasonalMocktails } from '../data/menu'

export function Menu() {
  return (
    <div className="mx-auto max-w-4xl">
      <SectionHeading>Mocktail Menu</SectionHeading>
      <p className="font-serif mt-4 text-center text-lg text-cream/70 italic">
        This season's curated lineup — with more arriving soon.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {seasonalMocktails.map((item) => (
          <div
            key={item.name}
            className={`group relative overflow-hidden rounded-lg border border-gold/20 bg-black/35 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-gold/40 hover:shadow-lg ${item.color.replace('bg-', 'text-')}`}
          >
            <div className="p-5">
              <p className="text-lg font-semibold text-cream">{item.name}</p>
              <ul className="mt-2 space-y-0.5 text-sm text-cream/65">
                {item.ingredients.map((ingredient) => (
                  <li key={ingredient}>{ingredient}</li>
                ))}
              </ul>
            </div>
            <span className={`block h-2 w-full ${item.color}`} />
            <Bubbles />
          </div>
        ))}
      </div>
    </div>
  )
}
