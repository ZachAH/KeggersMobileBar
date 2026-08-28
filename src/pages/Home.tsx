import { Link } from 'react-router-dom'
import { Bubbles } from '../components/Bubbles'
import { Testimonials } from '../components/Testimonials'
import { seasonalMocktails } from '../data/menu'
import { useLocations } from '../hooks/useLocations'

const galleryPreview = [
  {
    src: '/preview/charitable-event.jpg',
    label: 'Community & Charity Events',
    color: 'text-gold',
  },
  { src: '/preview/fresh-pour.jpeg', label: 'Fresh Pour', color: 'text-cream' },
  { src: '/preview/owner.jpg', label: 'Meet the Owner', color: 'text-gold' },
]

export function Home() {
  const { data: locations } = useLocations()
  const upcoming = locations?.slice(0, 2)

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-20">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-12 text-center">
        <div>
          <h1 className="sr-only">
            Keggers Mobile Bar — Craft Mocktails &amp; Mobile Bar Service
          </h1>
          <p className="text-sm font-semibold tracking-[0.3em] text-gold uppercase">
            Craft Mocktails &middot; Corporate &amp; Private Events
          </p>
          <img
            src="/logo-header-gold.png"
            alt="Keggers Mobile Bar"
            className="animate-float mx-auto mt-4 h-64 w-auto sm:h-80"
          />
          <p className="font-serif mx-auto mt-6 max-w-xl text-xl text-cream/90 italic">
            An elegant, alcohol-free mobile bar for occasions of every scale — corporate galas
            and arena-sized outings, weddings and private affairs, and the local farmers market.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/menu"
              className="rounded-full border border-cream/60 px-6 py-3 text-sm font-semibold tracking-wide text-cream uppercase transition-colors hover:bg-gold hover:text-plum"
            >
              View the Menu
            </Link>
            <Link
              to="/contact"
              className="rounded-full bg-gold px-10 py-4 text-base font-bold tracking-wide text-plum uppercase shadow-md transition-all hover:scale-105 hover:bg-cream"
            >
              Inquire Now
            </Link>
            <Link
              to="/where-well-be"
              className="rounded-full border border-cream/60 px-6 py-3 text-sm font-semibold tracking-wide text-cream uppercase transition-colors hover:bg-gold hover:text-plum"
            >
              Find Us
            </Link>
          </div>
        </div>
      </div>

      <div className="text-center">
        <p className="font-serif text-3xl tracking-tight italic sm:text-4xl">
          <span className="text-cream">Seasonal.</span> <span className="text-gold">Refined.</span>{' '}
          <span className="text-cream">Always</span> <span className="text-gold">Zero-Proof.</span>
        </p>
        <div className="group relative mx-auto mt-8 max-w-2xl">
          <img
            src="/header/mocktail-trio.png"
            alt="Three Keggers Mobile Bar mocktails: Marigold Mule, Ginger Berry Fizz, and Berry In Love"
            className="w-full transition-transform duration-300 ease-out group-hover:-translate-y-1 group-hover:scale-[1.03]"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 text-gold/50">
            <Bubbles />
          </div>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {seasonalMocktails.map((item) => (
            <div
              key={item.name}
              className={`group relative overflow-hidden rounded-lg border border-gold/20 bg-black/35 text-left backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-gold/40 hover:shadow-lg ${item.color.replace('bg-', 'text-')}`}
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

      <Testimonials />

      {upcoming && upcoming.length > 0 && (
        <div>
          <h2 className="text-center font-script text-4xl text-gold">Upcoming Engagements</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {upcoming.map((loc) => (
              <div
                key={loc.id}
                className="flex items-start gap-4 rounded-lg border border-gold/20 bg-black/35 p-5 text-left backdrop-blur-md"
              >
                {loc.image_url && (
                  <img
                    src={loc.image_url}
                    alt={loc.venue_name}
                    className="h-16 w-16 shrink-0 rounded-md object-cover"
                  />
                )}
                <div>
                  <p className="font-semibold text-cream">{loc.venue_name}</p>
                  <p className="text-sm text-cream/65">{loc.address}</p>
                  <p className="mt-1 text-sm text-cream/65">
                    {new Date(loc.event_date).toLocaleDateString(undefined, {
                      weekday: 'long',
                      month: 'long',
                      day: 'numeric',
                    })}{' '}
                    · {loc.start_time}–{loc.end_time}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link to="/where-well-be" className="text-sm font-semibold text-gold underline">
              See the full schedule
            </Link>
          </div>
        </div>
      )}

      <div className="text-center">
        <h2 className="font-script text-4xl text-gold">Us in Action</h2>
        <p className="mt-2 text-sm text-cream/70">A peek behind the bar.</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {galleryPreview.map((item) => (
            <div
              key={item.label}
              className="group relative h-48 overflow-hidden rounded-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <img
                src={item.src}
                alt={item.label}
                className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/0 to-transparent" />
              <span className="absolute right-0 bottom-3 left-0 text-center text-xs font-semibold tracking-wide text-cream uppercase">
                {item.label}
              </span>
              <div className={`pointer-events-none absolute inset-x-0 bottom-0 h-24 ${item.color}`}>
                <Bubbles />
              </div>
            </div>
          ))}
        </div>
        <Link to="/gallery" className="mt-6 inline-block text-sm font-semibold text-gold underline">
          See the full gallery
        </Link>
      </div>
    </div>
  )
}
