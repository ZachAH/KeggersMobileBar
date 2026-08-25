import { Bubbles } from '../components/Bubbles'
import { SectionHeading } from '../components/SectionHeading'

const photos = [
  {
    src: '/gallery/mobile-bar-trailer.jpeg',
    label: 'The Mobile Bar',
    color: 'text-gold',
    span: 'sm:row-span-2',
  },
  {
    src: '/gallery/charity-event-bar-setup.jpg',
    label: 'Charity Event Setup',
    color: 'text-cream',
    span: '',
  },
  {
    src: '/gallery/festival-booth.jpeg',
    label: 'Festival Booth',
    color: 'text-gold',
    span: '',
  },
  {
    src: '/gallery/charity-event-crowd.jpg',
    label: 'Packed House',
    color: 'text-cream',
    span: 'sm:row-span-2',
  },
  {
    src: '/gallery/corporate-event.jpg',
    label: 'Corporate Event',
    color: 'text-gold',
    span: '',
  },
  {
    src: '/gallery/airy-pointe-farms.png',
    label: 'Airy Pointe Farms',
    color: 'text-cream',
    span: '',
  },
  {
    src: '/gallery/festival-drink-station.jpeg',
    label: 'Behind the Bar',
    color: 'text-gold',
    span: '',
  },
  {
    src: '/gallery/charity-event-barn.jpg',
    label: 'Barn Party',
    color: 'text-cream',
    span: '',
  },
  {
    src: '/gallery/street-festival.jpg',
    label: 'Downtown Festival',
    color: 'text-gold',
    span: '',
  },
  {
    src: '/gallery/private-event-halloween.jpg',
    label: 'Halloween Party',
    color: 'text-cream',
    span: '',
  },
  {
    src: '/gallery/private-event-trick-or-treat.jpg',
    label: 'Trick-or-Treat Stop',
    color: 'text-gold',
    span: '',
  },
]

export function Gallery() {
  return (
    <div className="mx-auto max-w-4xl">
      <SectionHeading>Us in Action</SectionHeading>
      <p className="mt-4 text-center text-sm text-cream/70">
        Farmers markets, festivals, weddings, and everything in between.
      </p>

      <div className="mt-10 grid auto-rows-[200px] gap-4 sm:grid-cols-3">
        {photos.map((item) => (
          <div
            key={item.src}
            className={`group relative overflow-hidden rounded-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${item.span}`}
          >
            <img
              src={item.src}
              alt={item.label}
              loading="lazy"
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
    </div>
  )
}
