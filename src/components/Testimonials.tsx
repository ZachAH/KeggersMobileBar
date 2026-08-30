import { testimonials } from '../data/testimonials'

export function Testimonials() {
  if (testimonials.length === 0) return null

  return (
    <div>
      <h2 className="font-serif text-center text-4xl font-semibold text-white">Kind Words</h2>
      <div className="mx-auto mt-10 flex max-w-3xl flex-col gap-8">
        {testimonials.map((testimonial) => (
          <figure key={testimonial.author} className="border border-white/15 p-6 sm:p-8">
            <span className="font-serif text-6xl leading-none text-crimson" aria-hidden="true">
              &ldquo;
            </span>
            <blockquote className="-mt-6 space-y-4 text-lg text-white/80 italic">
              {testimonial.quote.split('\n\n').map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </blockquote>
            <figcaption className="mt-4 text-right text-sm font-semibold tracking-wide text-crimson uppercase">
              — {testimonial.author}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  )
}
