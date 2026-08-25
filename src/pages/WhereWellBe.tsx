import { useLocations } from '../hooks/useLocations'

export function WhereWellBe() {
  const { data: locations, isLoading, error } = useLocations()

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="font-display text-3xl">Where We'll Be</h1>

      {isLoading && <p className="mt-4">Loading…</p>}
      {error && <p className="mt-4 text-berry">Couldn't load upcoming stops right now.</p>}
      {locations && locations.length === 0 && (
        <p className="mt-4 text-plum/70">No upcoming stops posted yet — check back soon!</p>
      )}

      <ul className="mt-6 space-y-4">
        {locations?.map((loc) => (
          <li key={loc.id} className="rounded-lg border border-plum/10 p-4">
            <p className="font-semibold">{loc.venue_name}</p>
            <p className="text-sm text-plum/70">{loc.address}</p>
            <p className="text-sm text-plum/70">
              {new Date(loc.event_date).toLocaleDateString(undefined, {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
              })}{' '}
              · {loc.start_time}–{loc.end_time}
            </p>
            {loc.notes && <p className="mt-2 text-sm">{loc.notes}</p>}
          </li>
        ))}
      </ul>
    </div>
  )
}
