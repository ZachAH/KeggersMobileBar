import { Bubbles } from '../components/Bubbles'
import { SectionHeading } from '../components/SectionHeading'
import { useMenuItems } from '../hooks/useMenuItems'

export function Menu() {
  const { data: items, isLoading, error } = useMenuItems()
  const favorites = items?.filter((item) => item.favorite)

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

      {favorites && favorites.length > 0 && (
        <div
          className={`mt-10 grid gap-10 ${
            favorites.length === 1
              ? 'mx-auto max-w-lg'
              : favorites.length === 2
                ? 'sm:grid-cols-2'
                : 'sm:grid-cols-3'
          }`}
        >
          {favorites.map((item) => (
            <div key={item.id} className="flex flex-col items-center">
              {item.image_url && (
                <img
                  src={item.image_url}
                  alt={item.name}
                  className="h-auto w-full max-h-[30rem] object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.55)] sm:max-h-[36rem]"
                />
              )}
              <p className="font-script mt-4 text-3xl text-gold">{item.name}</p>
            </div>
          ))}
        </div>
      )}

      <div className="mt-16 grid gap-6 sm:grid-cols-2">
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
