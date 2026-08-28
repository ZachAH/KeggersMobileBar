import { SectionHeading } from '../components/SectionHeading'
import { faq } from '../data/faq'
import { services, whyChooseFeatures } from '../data/services'

export function WhatWeOffer() {
  return (
    <div className="mx-auto max-w-4xl">
      <SectionHeading>What We Offer</SectionHeading>
      <p className="font-serif mx-auto mt-4 max-w-xl text-center text-lg text-cream/80 italic">
        More than a bar. It's an experience.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-3">
        {services.map((service) => (
          <div
            key={service.title}
            className="flex flex-col rounded-lg border border-gold/20 bg-black/35 p-5 backdrop-blur-md"
          >
            <p className="text-xs font-semibold tracking-wide text-gold uppercase">
              {service.tagline}
            </p>
            <p className="mt-1 text-lg font-semibold text-cream">{service.title}</p>
            <p className="font-serif mt-2 text-sm text-cream/70 italic">{service.headline}</p>
            <p className="mt-3 text-sm text-cream/75">{service.description}</p>
            {service.bullets && (
              <ul className="mt-3 space-y-1 text-sm text-cream/65">
                {service.bullets.map((bullet) => (
                  <li key={bullet}>&middot; {bullet}</li>
                ))}
              </ul>
            )}
            {service.footer && (
              <p className="mt-3 text-xs text-cream/60">{service.footer}</p>
            )}
          </div>
        ))}
      </div>

      <h2 className="mt-16 text-center font-script text-4xl text-gold">Why Choose Kegger's?</h2>
      <p className="mt-2 text-center text-sm text-cream/70">
        Because your bar should be more than just a place to get a drink — it should be part of
        the experience.
      </p>
      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {whyChooseFeatures.map((feature) => (
          <div
            key={feature.title}
            className="rounded-lg border border-gold/20 bg-black/35 p-5 backdrop-blur-md"
          >
            <p className="font-semibold text-cream">{feature.title}</p>
            <p className="mt-2 text-sm text-cream/70">{feature.description}</p>
          </div>
        ))}
      </div>

      <h2 className="mt-16 text-center font-script text-4xl text-gold">Frequently Asked Questions</h2>
      <div className="mx-auto mt-8 flex max-w-2xl flex-col gap-3">
        {faq.map((item) => (
          <details
            key={item.question}
            className="group rounded-lg border border-gold/20 bg-black/35 p-4 backdrop-blur-md open:bg-black/45"
          >
            <summary className="cursor-pointer list-none font-semibold text-cream marker:content-none">
              <span className="flex items-center justify-between gap-4">
                {item.question}
                <span className="shrink-0 text-gold transition-transform group-open:rotate-45">
                  +
                </span>
              </span>
            </summary>
            <p className="mt-3 text-sm text-cream/75">{item.answer}</p>
          </details>
        ))}
      </div>
    </div>
  )
}
