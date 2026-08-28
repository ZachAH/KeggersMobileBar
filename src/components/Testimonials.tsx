import { testimonials } from '../data/testimonials'

export function Testimonials() {
  if (testimonials.length === 0) return null

  return (
    <div>
      <h2 className="text-center font-script text-4xl text-gold">Kind Words</h2>
      <div className="mx-auto mt-8 flex max-w-3xl flex-col gap-8">
        {testimonials.map((testimonial) => (
          <figure
            key={testimonial.author}
            className="rounded-lg border border-gold/20 bg-black/35 p-6 backdrop-blur-md sm:p-8"
          >
            <span className="font-script text-6xl leading-none text-gold/50" aria-hidden="true">
              &ldquo;
            </span>
            <blockquote className="font-serif -mt-6 space-y-4 text-lg text-cream/85 italic">
              {testimonial.quote.split('\n\n').map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </blockquote>
            <figcaption className="mt-4 text-right text-sm font-semibold tracking-wide text-gold uppercase">
              — {testimonial.author}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  )
}
