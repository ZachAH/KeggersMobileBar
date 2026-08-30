import { signOut } from 'firebase/auth'
import { type FormEvent, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MenuManager } from '../../components/admin/MenuManager'
import { NotificationSettings } from '../../components/admin/NotificationSettings'
import { useDeleteInquiry, useInquiries } from '../../hooks/useInquiries'
import { useCreateLocation, useDeleteLocation, useLocations } from '../../hooks/useLocations'
import { auth } from '../../lib/firebase'
import type { Inquiry } from '../../types/inquiry'

function buildReplyMailto(inquiry: Inquiry) {
  const subject = 'Re: Your Inquiry — Keggers Mobile Bar'
  const body = `Hi ${inquiry.name},\n\nThanks so much for reaching out to Keggers Mobile Bar!\n\n`
  return `mailto:${inquiry.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

const actionButtonClass =
  'rounded-full border border-crimson/40 px-4 py-1.5 text-xs font-semibold tracking-wide text-crimson uppercase transition-colors hover:bg-crimson hover:text-white'

const inputClass = 'rounded border border-noir/20 bg-white px-3 py-2 text-noir focus:border-crimson focus:outline-none'

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
  const { data: inquiries, isLoading: inquiriesLoading } = useInquiries()
  const deleteInquiry = useDeleteInquiry()
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
        <h1 className="font-serif text-4xl font-semibold text-noir">Manage "Where We'll Be"</h1>
        <button onClick={handleSignOut} className="text-sm text-noir/60 underline">
          Sign out
        </button>
      </div>

      <NotificationSettings />

      <form
        onSubmit={handleSubmit}
        className="mt-6 flex flex-col gap-3 rounded-lg border border-noir/10 bg-white p-4 shadow-sm"
      >
        <h2 className="font-semibold text-noir">Add a stop</h2>
        <input
          placeholder="Venue name"
          value={form.venue_name}
          onChange={(e) => setForm({ ...form, venue_name: e.target.value })}
          required
          className={inputClass}
        />
        <input
          placeholder="Address"
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
          required
          className={inputClass}
        />
        <div className="flex gap-3">
          <input
            type="date"
            value={form.event_date}
            onChange={(e) => setForm({ ...form, event_date: e.target.value })}
            required
            className={`flex-1 ${inputClass}`}
          />
          <input
            type="time"
            value={form.start_time}
            onChange={(e) => setForm({ ...form, start_time: e.target.value })}
            required
            className={`flex-1 ${inputClass}`}
          />
          <input
            type="time"
            value={form.end_time}
            onChange={(e) => setForm({ ...form, end_time: e.target.value })}
            required
            className={`flex-1 ${inputClass}`}
          />
        </div>
        <textarea
          placeholder="Notes (optional)"
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
          className={inputClass}
        />

        <label className="text-sm font-medium text-noir">
          Photo (optional)
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mt-1 block w-full text-sm text-noir/70 file:mr-3 file:rounded file:border-0 file:bg-crimson file:px-3 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-noir"
          />
        </label>
        {imagePreview && (
          <img src={imagePreview} alt="Selected preview" className="h-24 w-24 rounded object-cover" />
        )}

        {error && <p className="text-sm text-crimson">{error}</p>}

        <button
          type="submit"
          disabled={createLocation.isPending}
          className="self-start rounded bg-crimson px-4 py-2 text-white transition-colors hover:bg-noir disabled:opacity-50"
        >
          {createLocation.isPending ? 'Adding…' : 'Add stop'}
        </button>
      </form>

      <div className="mt-8">
        <h2 className="font-semibold text-noir">Upcoming stops</h2>
        {isLoading && <p className="mt-2 text-noir/70">Loading…</p>}
        <ul className="mt-2 space-y-3">
          {locations?.map((loc) => (
            <li
              key={loc.id}
              className="flex items-start justify-between gap-4 rounded-lg border border-noir/10 bg-white p-4 shadow-sm"
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
                  <p className="font-semibold text-noir">{loc.venue_name}</p>
                  <p className="text-sm text-noir/60">
                    {loc.event_date} · {loc.start_time}–{loc.end_time}
                  </p>
                </div>
              </div>
              <button
                onClick={() => deleteLocation.mutate(loc)}
                className="shrink-0 text-sm text-crimson underline"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>

      <MenuManager />

      <div className="mt-8">
        <h2 className="font-semibold text-noir">Recent Inquiries</h2>
        {inquiriesLoading && <p className="mt-2 text-noir/70">Loading…</p>}
        {inquiries && inquiries.length === 0 && (
          <p className="mt-2 text-sm text-noir/60">No inquiries yet.</p>
        )}
        <ul className="mt-2 space-y-3">
          {inquiries?.map((inquiry) => (
            <li key={inquiry.id} className="rounded-lg border border-noir/10 bg-white p-4 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-semibold text-noir">{inquiry.name}</p>
                  <p className="text-sm text-noir/60">
                    {inquiry.email}
                    {inquiry.phone && ` · ${inquiry.phone}`}
                  </p>
                </div>
                <button
                  onClick={() => deleteInquiry.mutate(inquiry.id)}
                  className="shrink-0 text-sm text-crimson underline"
                >
                  Remove
                </button>
              </div>
              {inquiry.message && (
                <p className="mt-2 text-sm whitespace-pre-wrap text-noir/75">{inquiry.message}</p>
              )}
              <div className="mt-3 flex flex-wrap gap-2">
                <a href={buildReplyMailto(inquiry)} className={actionButtonClass}>
                  Reply by Email
                </a>
                {inquiry.phone && (
                  <a href={`tel:${inquiry.phone}`} className={actionButtonClass}>
                    Call {inquiry.phone}
                  </a>
                )}
              </div>
              <p className="mt-3 text-xs text-noir/40">
                Submitted {new Date(inquiry.created_at).toLocaleString(undefined, {
                  dateStyle: 'medium',
                  timeStyle: 'short',
                })}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
