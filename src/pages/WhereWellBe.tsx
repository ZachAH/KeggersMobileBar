import { SectionHeading } from '../components/SectionHeading'
import { useLocations } from '../hooks/useLocations'

export function WhereWellBe() {
  const { data: locations, isLoading, error } = useLocations()

  return (
    <div className="mx-auto max-w-2xl">
      <SectionHeading>Where We'll Be</SectionHeading>

      {isLoading && <p className="mt-6 text-center text-cream/80">Loading…</p>}
      {error && (
        <p className="mt-6 text-center text-gold">Couldn't load upcoming stops right now.</p>
      )}
      {locations && locations.length === 0 && (
        <p className="mt-6 text-center text-cream/70">
          No upcoming stops posted yet — check back soon!
        </p>
      )}

      <ul className="mt-8 space-y-4">
        {locations?.map((loc) => (
          <li
            key={loc.id}
            className="flex items-start gap-4 rounded-lg border border-gold/20 bg-black/35 p-4 backdrop-blur-md"
          >
            {loc.image_url && (
              <img
                src={loc.image_url}
                alt={loc.venue_name}
                className="h-20 w-20 shrink-0 rounded-md object-cover sm:h-24 sm:w-24"
              />
            )}
            <div>
              <p className="font-semibold text-cream">{loc.venue_name}</p>
              <p className="text-sm text-cream/65">{loc.address}</p>
              <p className="text-sm text-cream/65">
                {new Date(loc.event_date).toLocaleDateString(undefined, {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric',
                })}{' '}
                · {loc.start_time}–{loc.end_time}
              </p>
              {loc.notes && <p className="mt-2 text-sm text-cream/80">{loc.notes}</p>}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
