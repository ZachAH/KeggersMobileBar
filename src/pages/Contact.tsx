import { type FormEvent, useState, useEffect } from 'react'
import { Breadcrumbs } from '../components/Breadcrumbs'
import { SectionHeading } from '../components/SectionHeading'
import { useCreateInquiry } from '../hooks/useInquiries'
import { useSEO } from '../hooks/useSEO'
import type { NewInquiry } from '../types/inquiry'

const emptyForm: NewInquiry = {
  name: '',
  email: '',
  phone: '',
  message: '',
}

const inputClass = 'rounded border border-noir/20 bg-white px-3 py-2 text-noir focus:border-crimson focus:outline-none'

export function Contact() {
  useSEO({
    title: 'Contact',
    description:
      'Get in touch with Keggers Mobile Bar to book your wedding, private party, corporate event, or charitable event in Wisconsin.',
  })
  const createInquiry = useCreateInquiry()
  const [form, setForm] = useState<NewInquiry>(emptyForm)
  const [error, setError] = useState<string | null>(null)

  const [honeypot, setHoneypot] = useState('')
  const [captchaNum1, setCaptchaNum1] = useState(0)
  const [captchaNum2, setCaptchaNum2] = useState(0)
  const [captchaAnswer, setCaptchaAnswer] = useState('')

  useEffect(() => {
    setCaptchaNum1(Math.floor(Math.random() * 10) + 1)
    setCaptchaNum2(Math.floor(Math.random() * 10) + 1)
  }, [])

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    
    if (honeypot) {
      // Fake success for bots
      setForm(emptyForm)
      return
    }

    if (parseInt(captchaAnswer, 10) !== captchaNum1 + captchaNum2) {
      setError('Incorrect math answer. Please try again.')
      return
    }

    try {
      await createInquiry.mutateAsync(form)
      setForm(emptyForm)
      setCaptchaAnswer('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong — please try again.')
    }
  }

  return (
    <div className="mx-auto max-w-2xl">
      <Breadcrumbs current="Contact" href="/contact" />
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
          {/* Honeypot field - hidden from real users but bots will fill it */}
          <input
            type="text"
            name="address"
            tabIndex={-1}
            autoComplete="off"
            className="absolute -left-[9999px] h-0 w-0 opacity-0"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
          />

          <input
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
            minLength={2}
            maxLength={100}
            className={inputClass}
          />
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
            maxLength={150}
            className={inputClass}
          />
          <input
            type="tel"
            placeholder="Phone (optional)"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            maxLength={30}
            pattern="^[\d\s\-\+\(\)]*$"
            title="Please enter a valid phone number (numbers, spaces, dashes, or parentheses)"
            className={inputClass}
          />
          <textarea
            placeholder="Tell us about your event — headcount, location, vision..."
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            required
            minLength={15}
            rows={5}
            maxLength={2000}
            className={inputClass}
          />

          {/* Simple Math CAPTCHA */}
          <div className="flex items-center gap-3 mt-2">
            <span className="text-sm font-medium text-noir/80">
              What is {captchaNum1} + {captchaNum2}?
            </span>
            <input
              type="number"
              required
              value={captchaAnswer}
              onChange={(e) => setCaptchaAnswer(e.target.value)}
              className={`${inputClass} w-24`}
            />
          </div>

          {error && <p className="text-sm text-crimson">{error}</p>}

          <button
            type="submit"
            disabled={createInquiry.isPending}
            className="mt-2 self-start rounded-full bg-crimson px-8 py-3 text-sm font-bold tracking-wide text-white uppercase transition-colors hover:bg-noir disabled:opacity-50"
          >
            {createInquiry.isPending ? 'Sending…' : 'Send Inquiry'}
          </button>
        </form>
      )}
    </div>
  )
}
