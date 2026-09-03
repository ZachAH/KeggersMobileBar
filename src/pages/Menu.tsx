import { Breadcrumbs } from '../components/Breadcrumbs'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { useMenuItems } from '../hooks/useMenuItems'
import { useSEO } from '../hooks/useSEO'
import type { MenuItem } from '../types/menuItem'

function DrinkShowcase({ items, emptyMessage }: { items: MenuItem[]; emptyMessage: string }) {
  if (items.length === 0) {
    return <p className="mt-10 text-center text-noir/60">{emptyMessage}</p>
  }

  return (
    <div className="mt-10 flex flex-col gap-16 sm:gap-24">
      {items.map((item, i) => (
        <div key={item.id}>
          {i > 0 && (
            <div className="mx-auto mb-16 flex items-center justify-center gap-3 sm:mb-24">
              <span className="h-px w-16 bg-noir/10" />
              <span className="h-2 w-2 rounded-full bg-crimson" aria-hidden="true" />
              <span className="h-px w-16 bg-noir/10" />
            </div>
          )}
          <Reveal>
            <div className="grid items-center gap-10 sm:grid-cols-2 sm:gap-16">
              <div className={item.image_url ? (i % 2 === 1 ? 'sm:order-2' : '') : 'hidden'}>
                {item.image_url && (
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="mx-auto h-auto w-full max-w-sm rounded-2xl object-contain drop-shadow-2xl sm:max-w-md"
                  />
                )}
              </div>
              <div
                className={`text-center sm:text-left ${
                  item.image_url ? (i % 2 === 1 ? 'sm:order-1' : '') : 'sm:col-span-2 sm:text-center'
                }`}
              >
                <h3 className="font-serif text-4xl font-semibold text-noir sm:text-5xl">
                  {item.name}
                </h3>
                <p className="font-serif mt-6 text-xl leading-relaxed text-noir/75 italic">
                  {item.description}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      ))}
    </div>
  )
}

export function Menu() {
  useSEO({
    title: 'Seasonal Preview Menu',
    description:
      "A preview of this season's handcrafted mocktails and wellness teas from Keggers Mobile Bar — plus custom menus crafted for weddings and private events throughout Wisconsin.",
  })
  const { data: items, isLoading, error } = useMenuItems()
  const mocktails = items?.filter((item) => item.category === 'mocktail') ?? []
  const wellnessTeas = items?.filter((item) => item.category === 'wellness-tea') ?? []

  return (
    <div className="mx-auto max-w-5xl">
      <Breadcrumbs current="Seasonal Menu" href="/menu" />
      <SectionHeading>Seasonal Preview Menu</SectionHeading>
      <p className="font-serif mt-4 text-center text-lg text-noir/70 italic">
        A preview of what's pouring this season — Sandy also hand-crafts custom mocktails and
        wellness teas for every occasion, so ask us about building a menu just for your event.
      </p>

      {isLoading && <p className="mt-10 text-center text-noir/70">Loading…</p>}
      {error && <p className="mt-10 text-center text-crimson">Couldn't load the menu right now.</p>}

      {items && (
        <>
          <div className="mt-20">
            <p className="text-xs font-semibold tracking-[0.3em] text-crimson uppercase">
              Sip &amp; Savor
            </p>
            <h2 className="font-serif mt-2 text-3xl font-semibold text-noir sm:text-4xl">
              Seasonal Mocktails
            </h2>
            <DrinkShowcase items={mocktails} emptyMessage="New mocktails coming soon." />
          </div>

          <div className="mx-auto my-20 flex items-center justify-center gap-3 sm:my-28">
            <span className="h-px w-24 bg-noir/10" />
            <span className="h-2.5 w-2.5 rounded-full bg-crimson" aria-hidden="true" />
            <span className="h-px w-24 bg-noir/10" />
          </div>

          <div className="pb-20 sm:pb-28">
            <p className="text-xs font-semibold tracking-[0.3em] text-crimson uppercase">
              Sip &amp; Restore
            </p>
            <h2 className="font-serif mt-2 text-3xl font-semibold text-noir sm:text-4xl">
              Seasonal Wellness Teas
            </h2>
            <DrinkShowcase items={wellnessTeas} emptyMessage="New wellness teas coming soon." />
          </div>
        </>
      )}
    </div>
  )
}
