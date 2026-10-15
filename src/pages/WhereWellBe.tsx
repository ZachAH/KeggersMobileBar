import { Breadcrumbs } from '../components/Breadcrumbs'
import { SectionHeading } from '../components/SectionHeading'
import { useLocations } from '../hooks/useLocations'
import { useSEO } from '../hooks/useSEO'
import type { AppearanceLocation } from '../types/location'
import { formatDate, formatTimeRange, splitLocationsByDate } from '../utils/time'

function LocationCard({ loc, isPast }: { loc: AppearanceLocation; isPast?: boolean }) {
  const timeFormatted = formatTimeRange(loc.start_time, loc.end_time)

  return (
    <li
      className={`flex items-start gap-4 rounded-lg border border-noir/10 bg-white p-4 shadow-sm ${
        isPast ? 'opacity-90' : ''
      }`}
    >
      {loc.image_url && (
        <img
          src={loc.image_url}
          alt={loc.venue_name}
          className="h-20 w-20 shrink-0 rounded-md object-cover sm:h-24 sm:w-24"
        />
      )}
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <p className="font-semibold text-noir">{loc.venue_name}</p>
          {isPast && (
            <span className="rounded bg-noir/10 px-2 py-0.5 text-[11px] font-semibold tracking-wide text-noir/60 uppercase">
              Completed
            </span>
          )}
        </div>
        <p className="text-sm text-noir/60">{loc.address}</p>
        <p className="text-sm font-medium text-noir/70">
          {formatDate(loc.event_date)}
          {timeFormatted && ` · ${timeFormatted}`}
        </p>
        {loc.notes && <p className="mt-2 text-sm text-noir/75">{loc.notes}</p>}
      </div>
    </li>
  )
}

export function WhereWellBe() {
  useSEO({
    title: "Where We'll Be",
    description:
      "See where Keggers Mobile Bar is pouring next — upcoming farmers markets, festivals, and public events across Wisconsin.",
  })
  const { data: locations, isLoading, error } = useLocations()
  const { upcoming, past } = splitLocationsByDate(locations)

  return (
    <div className="mx-auto max-w-2xl">
      <Breadcrumbs current="Where We'll Be" href="/where-well-be" />
      <SectionHeading>Where We'll Be</SectionHeading>

      {isLoading && <p className="mt-6 text-center text-noir/70">Loading…</p>}
      {error && <p className="mt-6 text-center text-crimson">Couldn't load stops right now.</p>}

      {!isLoading && !error && (
        <>
          {upcoming.length > 0 ? (
            <ul className="mt-8 space-y-4">
              {upcoming.map((loc) => (
                <LocationCard key={loc.id} loc={loc} />
              ))}
            </ul>
          ) : (
            <p className="mt-6 text-center text-noir/70">
              No upcoming stops posted yet — check back soon!
            </p>
          )}

          {past.length > 0 && (
            <div className="mt-14">
              <h2 className="font-serif text-2xl font-semibold text-noir">Completed Stops</h2>
              <p className="mt-1 text-sm text-noir/60">
                Where we've poured previously across Wisconsin.
              </p>
              <ul className="mt-6 space-y-4">
                {past.map((loc) => (
                  <LocationCard key={loc.id} loc={loc} isPast />
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  )
}
