import { Breadcrumbs } from '../components/Breadcrumbs'
import { SectionHeading } from '../components/SectionHeading'
import { faq } from '../data/faq'
import { services, whyChooseFeatures } from '../data/services'
import { useSEO } from '../hooks/useSEO'

export function WhatWeOffer() {
  useSEO({
    title: 'What We Offer',
    description:
      'Mocktail bar service, cocktail bar service, and beer & wine service for weddings, corporate events, and private parties throughout Wisconsin — plus frequently asked questions.',
  })

  return (
    <div className="mx-auto max-w-4xl">
      <Breadcrumbs current="What We Offer" href="/what-we-offer" />
      <SectionHeading>What We Offer</SectionHeading>
      <p className="font-serif mx-auto mt-4 max-w-xl text-center text-lg text-noir/70 italic">
        More than a bar. It's an experience.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-3">
        {services.map((service) => (
          <div
            key={service.title}
            className="flex flex-col rounded-lg border border-noir/10 bg-white p-5 shadow-sm"
          >
            <p className="text-xs font-semibold tracking-wide text-crimson uppercase">
              {service.tagline}
            </p>
            <p className="mt-1 text-lg font-semibold text-noir">{service.title}</p>
            <p className="font-serif mt-2 text-sm text-noir/70 italic">{service.headline}</p>
            <p className="mt-3 text-sm text-noir/75">{service.description}</p>
            {service.bullets && (
              <ul className="mt-3 space-y-1 text-sm text-noir/65">
                {service.bullets.map((bullet) => (
                  <li key={bullet}>&middot; {bullet}</li>
                ))}
              </ul>
            )}
            {service.footer && <p className="mt-3 text-xs text-noir/50">{service.footer}</p>}
          </div>
        ))}
      </div>

      <h2 className="font-serif mt-16 text-center text-4xl font-semibold text-noir">
        Why Choose Kegger's?
      </h2>
      <p className="mt-2 text-center text-sm text-noir/70">
        Because your bar should be more than just a place to get a drink — it should be part of
        the experience.
      </p>
      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {whyChooseFeatures.map((feature) => (
          <div key={feature.title} className="rounded-lg border border-noir/10 bg-white p-5 shadow-sm">
            <p className="font-semibold text-noir">{feature.title}</p>
            <p className="mt-2 text-sm text-noir/70">{feature.description}</p>
          </div>
        ))}
      </div>

      <h2 className="font-serif mt-16 text-center text-4xl font-semibold text-noir">
        Frequently Asked Questions
      </h2>
      <div className="mx-auto mt-8 flex max-w-2xl flex-col gap-3">
        {faq.map((item) => (
          <details
            key={item.question}
            className="group rounded-lg border border-noir/10 bg-white p-4 shadow-sm open:shadow-md"
          >
            <summary className="cursor-pointer list-none font-semibold text-noir marker:content-none">
              <span className="flex items-center justify-between gap-4">
                {item.question}
                <span className="shrink-0 text-crimson transition-transform group-open:rotate-45">
                  +
                </span>
              </span>
            </summary>
            <p className="mt-3 text-sm text-noir/70">{item.answer}</p>
          </details>
        ))}
      </div>
    </div>
  )
}
