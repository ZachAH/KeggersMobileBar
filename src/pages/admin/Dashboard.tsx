import { signOut } from 'firebase/auth'
import { type FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCreateLocation, useDeleteLocation, useLocations } from '../../hooks/useLocations'
import { auth } from '../../lib/firebase'

const emptyForm = {
  venue_name: '',
  address: '',
  event_date: '',
  start_time: '',
  end_time: '',
  notes: '',
}

export function Dashboard() {
  const navigate = useNavigate()
  const { data: locations, isLoading } = useLocations()
  const createLocation = useCreateLocation()
  const deleteLocation = useDeleteLocation()
  const [form, setForm] = useState(emptyForm)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    await createLocation.mutateAsync(form)
    setForm(emptyForm)
  }

  async function handleSignOut() {
    await signOut(auth)
    navigate('/admin/login')
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl">Manage "Where We'll Be"</h1>
        <button onClick={handleSignOut} className="text-sm underline">
          Sign out
        </button>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3 rounded-lg border border-plum/10 p-4">
        <h2 className="font-semibold">Add a stop</h2>
        <input
          placeholder="Venue name"
          value={form.venue_name}
          onChange={(e) => setForm({ ...form, venue_name: e.target.value })}
          required
          className="rounded border border-plum/20 px-3 py-2"
        />
        <input
          placeholder="Address"
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
          required
          className="rounded border border-plum/20 px-3 py-2"
        />
        <div className="flex gap-3">
          <input
            type="date"
            value={form.event_date}
            onChange={(e) => setForm({ ...form, event_date: e.target.value })}
            required
            className="flex-1 rounded border border-plum/20 px-3 py-2"
          />
          <input
            type="time"
            value={form.start_time}
            onChange={(e) => setForm({ ...form, start_time: e.target.value })}
            required
            className="flex-1 rounded border border-plum/20 px-3 py-2"
          />
          <input
            type="time"
            value={form.end_time}
            onChange={(e) => setForm({ ...form, end_time: e.target.value })}
            required
            className="flex-1 rounded border border-plum/20 px-3 py-2"
          />
        </div>
        <textarea
          placeholder="Notes (optional)"
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
          className="rounded border border-plum/20 px-3 py-2"
        />
        <button
          type="submit"
          disabled={createLocation.isPending}
          className="self-start rounded bg-plum px-4 py-2 text-cream disabled:opacity-50"
        >
          {createLocation.isPending ? 'Adding…' : 'Add stop'}
        </button>
      </form>

      <div className="mt-8">
        <h2 className="font-semibold">Upcoming stops</h2>
        {isLoading && <p className="mt-2">Loading…</p>}
        <ul className="mt-2 space-y-3">
          {locations?.map((loc) => (
            <li
              key={loc.id}
              className="flex items-start justify-between gap-4 rounded-lg border border-plum/10 p-4"
            >
              <div>
                <p className="font-semibold">{loc.venue_name}</p>
                <p className="text-sm text-plum/70">
                  {loc.event_date} · {loc.start_time}–{loc.end_time}
                </p>
              </div>
              <button
                onClick={() => deleteLocation.mutate(loc.id)}
                className="text-sm text-berry underline"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
