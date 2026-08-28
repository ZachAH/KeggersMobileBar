import { type FormEvent, useState } from 'react'
import { SectionHeading } from '../components/SectionHeading'
import { useCreateInquiry } from '../hooks/useInquiries'
import type { NewInquiry } from '../types/inquiry'

const emptyForm: NewInquiry = {
  name: '',
  email: '',
  phone: '',
  event_type: 'Corporate Event',
  event_date: '',
  message: '',
}

const eventTypes = [
  'Corporate Event',
  'Wedding',
  'Private Party',
  'Festival / Farmers Market',
  'Other',
]

export function Contact() {
  const createInquiry = useCreateInquiry()
  const [form, setForm] = useState<NewInquiry>(emptyForm)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    try {
      await createInquiry.mutateAsync(form)
      setForm(emptyForm)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong — please try again.')
    }
  }

  return (
    <div className="mx-auto max-w-2xl">
      <SectionHeading>Get In Touch</SectionHeading>
      <p className="font-serif mt-4 text-center text-lg text-cream/70 italic">
        Tell us about your event, and we'll follow up to build something elegant together.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-center text-sm">
        <a href="mailto:sandy@keggersmobilebar.com" className="text-gold underline">
          sandy@keggersmobilebar.com
        </a>
        <a href="tel:+12623435789" className="text-gold underline">
          (262) 343-5789
        </a>
      </div>

      {createInquiry.isSuccess ? (
        <div className="mt-10 rounded-lg border border-gold/20 bg-black/35 p-8 text-center backdrop-blur-md">
          <p className="font-script text-3xl text-gold">Thank you!</p>
          <p className="font-serif mt-3 text-cream/85">
            Your inquiry is in — we'll be in touch soon to talk through the details.
          </p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="mt-10 flex flex-col gap-3 rounded-lg border border-gold/20 bg-black/35 p-6 backdrop-blur-md sm:p-8"
        >
          <input
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
            className="rounded border border-ink/20 bg-cream px-3 py-2 text-ink"
          />
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
            className="rounded border border-ink/20 bg-cream px-3 py-2 text-ink"
          />
          <input
            type="tel"
            placeholder="Phone (optional)"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="rounded border border-ink/20 bg-cream px-3 py-2 text-ink"
          />
          <div className="flex gap-3">
            <select
              value={form.event_type}
              onChange={(e) => setForm({ ...form, event_type: e.target.value })}
              className="flex-1 rounded border border-ink/20 bg-cream px-3 py-2 text-ink"
            >
              {eventTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <input
              type="date"
              value={form.event_date}
              onChange={(e) => setForm({ ...form, event_date: e.target.value })}
              className="flex-1 rounded border border-ink/20 bg-cream px-3 py-2 text-ink"
            />
          </div>
          <textarea
            placeholder="Tell us about your event — headcount, location, vision..."
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            required
            rows={5}
            className="rounded border border-ink/20 bg-cream px-3 py-2 text-ink"
          />

          {error && <p className="text-sm text-gold">{error}</p>}

          <button
            type="submit"
            disabled={createInquiry.isPending}
            className="self-start rounded-full bg-gold px-8 py-3 text-sm font-bold tracking-wide text-plum uppercase transition-colors hover:bg-cream disabled:opacity-50"
          >
            {createInquiry.isPending ? 'Sending…' : 'Send Inquiry'}
          </button>
        </form>
      )}
    </div>
  )
}
