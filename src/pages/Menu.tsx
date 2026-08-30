import { SectionHeading } from '../components/SectionHeading'
import { useMenuItems } from '../hooks/useMenuItems'

export function Menu() {
  const { data: items, isLoading, error } = useMenuItems()

  return (
    <div className="mx-auto max-w-4xl">
      <SectionHeading>Seasonal Menu</SectionHeading>
      <p className="font-serif mt-4 text-center text-lg text-noir/70 italic">
        This season's curated lineup — with more arriving soon.
      </p>

      {isLoading && <p className="mt-10 text-center text-noir/70">Loading…</p>}
      {error && <p className="mt-10 text-center text-crimson">Couldn't load the menu right now.</p>}
      {items && items.length === 0 && (
        <p className="mt-10 text-center text-noir/70">
          Our menu is being freshened up — check back soon!
        </p>
      )}

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {items?.map((item) => (
          <div
            key={item.id}
            className="group relative overflow-hidden rounded-lg border border-noir/10 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            {item.image_url && (
              <img src={item.image_url} alt={item.name} className="h-40 w-full object-cover" />
            )}
            <div className="p-5">
              <p className="text-lg font-semibold text-noir">{item.name}</p>
              <ul className="mt-2 space-y-0.5 text-sm text-noir/60">
                {item.ingredients.map((ingredient) => (
                  <li key={ingredient}>{ingredient}</li>
                ))}
              </ul>
            </div>
            <span className="block h-1.5 w-full bg-crimson" />
          </div>
        ))}
      </div>
    </div>
  )
}
