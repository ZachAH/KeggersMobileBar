import { Bubbles } from '../components/Bubbles'
import { SectionHeading } from '../components/SectionHeading'
import { useMenuItems } from '../hooks/useMenuItems'

export function Menu() {
  const { data: items, isLoading, error } = useMenuItems()

  return (
    <div className="mx-auto max-w-4xl">
      <SectionHeading>Seasonal Menu</SectionHeading>
      <p className="font-serif mt-4 text-center text-lg text-cream/70 italic">
        This season's curated lineup — with more arriving soon.
      </p>

      {isLoading && <p className="mt-10 text-center text-cream/80">Loading…</p>}
      {error && (
        <p className="mt-10 text-center text-gold">Couldn't load the menu right now.</p>
      )}
      {items && items.length === 0 && (
        <p className="mt-10 text-center text-cream/70">
          Our menu is being freshened up — check back soon!
        </p>
      )}

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {items?.map((item) => (
          <div
            key={item.id}
            className={`group relative overflow-hidden rounded-lg border border-gold/20 bg-black/35 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-gold/40 hover:shadow-lg ${item.color.replace('bg-', 'text-')}`}
          >
            {item.image_url && (
              <img
                src={item.image_url}
                alt={item.name}
                className="h-40 w-full object-cover"
              />
            )}
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
