import { type FormEvent, useState } from 'react'
import { SectionHeading } from '../components/SectionHeading'
import { useCreateInquiry } from '../hooks/useInquiries'
import type { NewInquiry } from '../types/inquiry'

const emptyForm: NewInquiry = {
  name: '',
  email: '',
  phone: '',
  message: '',
}

const inputClass = 'rounded border border-noir/20 bg-white px-3 py-2 text-noir focus:border-crimson focus:outline-none'

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
      <p className="font-serif mt-4 text-center text-lg text-noir/70 italic">
        Tell us about your event, and we'll follow up to build something elegant together.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-center text-sm">
        <a href="mailto:sandy@keggersmobilebar.com" className="text-crimson underline">
          sandy@keggersmobilebar.com
        </a>
        <a href="tel:+12623435789" className="text-crimson underline">
          (262) 343-5789
        </a>
      </div>

      {createInquiry.isSuccess ? (
        <div className="mt-10 rounded-lg border border-noir/10 bg-white p-8 text-center shadow-sm">
          <p className="font-serif text-3xl font-semibold text-crimson">Thank you!</p>
          <p className="font-serif mt-3 text-noir/75">
            Your inquiry is in — we'll be in touch soon to talk through the details.
          </p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="mt-10 flex flex-col gap-3 rounded-lg border border-noir/10 bg-white p-6 shadow-sm sm:p-8"
        >
          <input
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
            className={inputClass}
          />
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
            className={inputClass}
          />
          <input
            type="tel"
            placeholder="Phone (optional)"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className={inputClass}
          />
          <textarea
            placeholder="Tell us about your event — headcount, location, vision..."
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            required
            rows={5}
            className={inputClass}
          />

          {error && <p className="text-sm text-crimson">{error}</p>}

          <button
            type="submit"
            disabled={createInquiry.isPending}
            className="self-start rounded-full bg-crimson px-8 py-3 text-sm font-bold tracking-wide text-white uppercase transition-colors hover:bg-noir disabled:opacity-50"
          >
            {createInquiry.isPending ? 'Sending…' : 'Send Inquiry'}
          </button>
        </form>
      )}
    </div>
  )
}
