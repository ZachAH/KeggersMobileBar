import { signOut } from 'firebase/auth'
import { type FormEvent, useRef, useState } from 'react'
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

const MAX_IMAGE_BYTES = 5 * 1024 * 1024

export function Dashboard() {
  const navigate = useNavigate()
  const { data: locations, isLoading } = useLocations()
  const createLocation = useCreateLocation()
  const deleteLocation = useDeleteLocation()
  const [form, setForm] = useState(emptyForm)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null
    setError(null)

    if (file && file.size > MAX_IMAGE_BYTES) {
      setError('Image is too large — please choose one under 5MB.')
      setImageFile(null)
      setImagePreview(null)
      if (fileInputRef.current) fileInputRef.current.value = ''
      return
    }

    setImageFile(file)
    setImagePreview(file ? URL.createObjectURL(file) : null)
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    try {
      await createLocation.mutateAsync({ ...form, imageFile })
      setForm(emptyForm)
      setImageFile(null)
      setImagePreview(null)
      if (fileInputRef.current) fileInputRef.current.value = ''
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add stop.')
    }
  }

  async function handleSignOut() {
    await signOut(auth)
    navigate('/admin/login')
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="flex items-center justify-between">
        <h1 className="font-script text-4xl text-gold">Manage "Where We'll Be"</h1>
        <button onClick={handleSignOut} className="text-sm text-cream/80 underline">
          Sign out
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-6 flex flex-col gap-3 rounded-lg border border-gold/20 bg-black/35 p-4 backdrop-blur-md"
      >
        <h2 className="font-semibold text-cream">Add a stop</h2>
        <input
          placeholder="Venue name"
          value={form.venue_name}
          onChange={(e) => setForm({ ...form, venue_name: e.target.value })}
          required
          className="rounded border border-ink/20 bg-cream px-3 py-2 text-ink"
        />
        <input
          placeholder="Address"
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
          required
          className="rounded border border-ink/20 bg-cream px-3 py-2 text-ink"
        />
        <div className="flex gap-3">
          <input
            type="date"
            value={form.event_date}
            onChange={(e) => setForm({ ...form, event_date: e.target.value })}
            required
            className="flex-1 rounded border border-ink/20 bg-cream px-3 py-2 text-ink"
          />
          <input
            type="time"
            value={form.start_time}
            onChange={(e) => setForm({ ...form, start_time: e.target.value })}
            required
            className="flex-1 rounded border border-ink/20 bg-cream px-3 py-2 text-ink"
          />
          <input
            type="time"
            value={form.end_time}
            onChange={(e) => setForm({ ...form, end_time: e.target.value })}
            required
            className="flex-1 rounded border border-ink/20 bg-cream px-3 py-2 text-ink"
          />
        </div>
        <textarea
          placeholder="Notes (optional)"
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
          className="rounded border border-ink/20 bg-cream px-3 py-2 text-ink"
        />

        <label className="text-sm font-medium text-cream">
          Photo (optional)
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mt-1 block w-full text-sm text-cream/70 file:mr-3 file:rounded file:border-0 file:bg-gold file:px-3 file:py-2 file:text-sm file:font-semibold file:text-plum hover:file:bg-cream"
          />
        </label>
        {imagePreview && (
          <img src={imagePreview} alt="Selected preview" className="h-24 w-24 rounded object-cover" />
        )}

        {error && <p className="text-sm text-gold">{error}</p>}

        <button
          type="submit"
          disabled={createLocation.isPending}
          className="self-start rounded bg-gold px-4 py-2 text-plum transition-colors hover:bg-cream disabled:opacity-50"
        >
          {createLocation.isPending ? 'Adding…' : 'Add stop'}
        </button>
      </form>

      <div className="mt-8">
        <h2 className="font-semibold text-gold">Upcoming stops</h2>
        {isLoading && <p className="mt-2 text-cream/80">Loading…</p>}
        <ul className="mt-2 space-y-3">
          {locations?.map((loc) => (
            <li
              key={loc.id}
              className="flex items-start justify-between gap-4 rounded-lg border border-gold/20 bg-black/35 p-4 backdrop-blur-md"
            >
              <div className="flex items-start gap-3">
                {loc.image_url && (
                  <img
                    src={loc.image_url}
                    alt={loc.venue_name}
                    className="h-14 w-14 shrink-0 rounded object-cover"
                  />
                )}
                <div>
                  <p className="font-semibold text-cream">{loc.venue_name}</p>
                  <p className="text-sm text-cream/65">
                    {loc.event_date} · {loc.start_time}–{loc.end_time}
                  </p>
                </div>
              </div>
              <button
                onClick={() => deleteLocation.mutate(loc)}
                className="shrink-0 text-sm text-gold underline"
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
