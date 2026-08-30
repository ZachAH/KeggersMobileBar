import { Link } from 'react-router-dom'
import { Reveal } from '../components/Reveal'
import { Testimonials } from '../components/Testimonials'
import { TickerStrip } from '../components/TickerStrip'
import { useLocations } from '../hooks/useLocations'

const galleryPreview = [
  { src: '/preview/charitable-event.jpg', label: 'Community & Charity Events' },
  { src: '/preview/farmers-market-setup.jpeg', label: 'Farmers Market' },
  { src: '/preview/owner.jpg', label: 'Art Musuem' },
  { src: '/gallery/wedding.jpg', label: 'Weddings' },
]

export function Home() {
  const { data: locations } = useLocations()
  const upcoming = locations?.slice(0, 2)

  return (
    <div className="-mx-6 -mt-12 -mb-12 bg-paper text-noir">
      <div className="relative h-[70vh] min-h-[520px] w-full overflow-hidden sm:min-h-[640px]">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="/video/hero.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/10" />
        <div className="relative flex h-full flex-col items-start justify-end px-6 pb-16 sm:px-16 sm:pb-20">
          <p className="text-xs font-semibold tracking-[0.35em] text-crimson uppercase sm:text-sm">
            Crafted Mocktails &middot; Signature Cocktails &middot; Beer &amp; Wine Service
          </p>
          <h1 className="font-serif mt-4 max-w-2xl text-5xl leading-[1.05] font-semibold tracking-tight text-white sm:text-7xl">
            More Than A Bar.
            <br />
            It's An Experience.
          </h1>
          <Link
            to="/contact"
            className="mt-8 inline-block bg-crimson px-8 py-4 text-sm font-bold tracking-wide text-white uppercase transition-colors hover:bg-white hover:text-noir"
          >
            Inquire Now
          </Link>
        </div>
      </div>

      <TickerStrip />

      <div className="mx-auto grid max-w-5xl gap-10 px-6 py-20 sm:grid-cols-2 sm:items-center sm:gap-16 sm:py-28">
        <Reveal>
          <img
            src="/gallery/signature-pour.jpeg"
            alt="A signature Keggers Mobile Bar pour"
            className="w-full rounded-2xl object-cover shadow-xl"
          />
        </Reveal>
        <Reveal delay={150}>
          <span className="inline-block border-2 border-crimson px-6 py-5 sm:px-8 sm:py-6">
            <h2 className="font-serif text-3xl leading-tight font-semibold sm:text-4xl">
              The Centerpiece of Every Celebration
            </h2>
          </span>
          <p className="mt-6 text-lg text-noir/70">
            Elevated mobile bar experiences for weddings, private parties, corporate events, and
            charitable events throughout Wisconsin — mocktails are our specialty, and we pour
            cocktails and beer &amp; wine too.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/menu"
              className="border border-noir px-6 py-3 text-sm font-semibold tracking-wide uppercase transition-colors hover:bg-noir hover:text-white"
            >
              View the Menu
            </Link>
            <Link
              to="/where-well-be"
              className="border border-noir px-6 py-3 text-sm font-semibold tracking-wide uppercase transition-colors hover:bg-noir hover:text-white"
            >
              Find Us
            </Link>
          </div>
        </Reveal>
      </div>

      <div className="bg-noir px-6 py-20 text-white sm:py-28">
        <Reveal>
          <Testimonials />
        </Reveal>
      </div>

      {upcoming && upcoming.length > 0 && (
        <div className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
          <Reveal>
            <h2 className="font-serif text-center text-4xl font-semibold">Upcoming Engagements</h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {upcoming.map((loc) => (
                <div key={loc.id} className="flex items-start gap-4 border border-noir/10 p-6 shadow-sm">
                  {loc.image_url && (
                    <img
                      src={loc.image_url}
                      alt={loc.venue_name}
                      className="h-16 w-16 shrink-0 rounded-md object-cover"
                    />
                  )}
                  <div>
                    <p className="font-semibold">{loc.venue_name}</p>
                    <p className="text-sm text-noir/60">{loc.address}</p>
                    <p className="mt-1 text-sm text-noir/60">
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
            <div className="mt-8 text-center">
              <Link to="/where-well-be" className="text-sm font-semibold text-crimson underline">
                See the full schedule
              </Link>
            </div>
          </Reveal>
        </div>
      )}

      <div className="px-6 pt-4 pb-20 text-center sm:pb-28">
        <Reveal>
          <h2 className="font-serif text-4xl font-semibold">Us in Action</h2>
          <p className="mt-2 text-sm text-noir/60">A peek behind the bar.</p>
        </Reveal>
        <div className="mx-auto mt-10 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {galleryPreview.map((item, i) => (
            <Reveal key={item.label} delay={i * 100}>
              <div className="group relative h-56 overflow-hidden rounded-2xl">
                <img
                  src={item.src}
                  alt={item.label}
                  className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-transparent" />
                <span className="absolute right-0 bottom-3 left-0 text-center text-xs font-semibold tracking-wide text-white uppercase">
                  {item.label}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
        <Link to="/gallery" className="mt-8 inline-block text-sm font-semibold text-crimson underline">
          See the full gallery
        </Link>
      </div>
    </div>
  )
}
