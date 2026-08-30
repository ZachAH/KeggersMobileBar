import { useEffect, useState } from 'react'
import { SectionHeading } from '../components/SectionHeading'

const photos = [
  { src: '/gallery/mobile-bar-trailer.jpeg', alt: 'The Mobile Bar', span: 'sm:row-span-2' },
  { src: '/gallery/wedding.jpg', alt: 'Wedding', span: '' },
  { src: '/gallery/signature-pour.jpeg', alt: 'Signature Pour', span: '' },
  { src: '/gallery/charity-event-bar-setup.jpg', alt: 'Charity Event Setup', span: '' },
  { src: '/gallery/festival-booth.jpeg', alt: 'Festival Booth', span: '' },
  { src: '/gallery/charity-event-crowd.jpg', alt: 'Packed House', span: 'sm:row-span-2' },
  { src: '/gallery/corporate-event.jpg', alt: 'Corporate Event', span: '' },
  { src: '/gallery/airy-pointe-farms.png', alt: 'Airy Pointe Farms', span: '' },
  { src: '/gallery/festival-drink-station.jpeg', alt: 'Behind the Bar', span: '' },
  { src: '/gallery/charity-event-barn.jpg', alt: 'Barn Party', span: '' },
  { src: '/gallery/street-festival.jpg', alt: 'Downtown Festival', span: '' },
  { src: '/gallery/private-event-halloween.jpg', alt: 'Halloween Party', span: '' },
  { src: '/gallery/private-event-trick-or-treat.jpg', alt: 'Trick-or-Treat Stop', span: '' },
]

export function Gallery() {
  const [selected, setSelected] = useState<{ src: string; alt: string } | null>(null)

  useEffect(() => {
    if (!selected) return

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setSelected(null)
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [selected])

  return (
    <div className="mx-auto max-w-4xl">
      <SectionHeading>Us in Action</SectionHeading>
      <p className="mt-4 text-center text-sm text-noir/70">
        Farmers markets, festivals, weddings, and everything in between.
      </p>

      <div className="mt-10 grid auto-rows-[200px] gap-4 sm:grid-cols-3">
        {photos.map((item) => (
          <button
            key={item.src}
            type="button"
            onClick={() => setSelected(item)}
            className={`group relative block cursor-pointer overflow-hidden rounded-2xl p-0 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${item.span}`}
          >
            <img
              src={item.src}
              alt={item.alt}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
            />
          </button>
        ))}
      </div>

      {selected && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={selected.alt}
          onClick={() => setSelected(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 sm:p-8"
        >
          <button
            type="button"
            onClick={() => setSelected(null)}
            aria-label="Close"
            className="absolute top-4 right-4 text-4xl leading-none text-white/80 transition-colors hover:text-white"
          >
            &times;
          </button>
          <img
            src={selected.src}
            alt={selected.alt}
            onClick={(e) => e.stopPropagation()}
            className="max-h-full max-w-full rounded-2xl object-contain shadow-2xl"
          />
        </div>
      )}
    </div>
  )
}
