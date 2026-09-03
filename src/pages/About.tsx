import { Breadcrumbs } from '../components/Breadcrumbs'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { useSEO } from '../hooks/useSEO'

export function About() {
  useSEO({
    title: 'About',
    description:
      "Meet Sandy Kagan, owner of Keggers Mobile Bar — a family-owned mobile bar service crafting handcrafted mocktails and cocktails for events throughout Wisconsin.",
  })

  return (
    <div className="mx-auto max-w-5xl">
      <Breadcrumbs current="About" href="/about" />
      <SectionHeading>About Kegger's Mobile Bar</SectionHeading>

      <div className="mt-12 grid gap-10 sm:grid-cols-2 sm:items-start sm:gap-16">
        <Reveal className="sm:sticky sm:top-28">
          <img
            src="/about_us/about_us.jpeg"
            alt="Sandy Kagan behind the Kegger's Mobile Bar trailer"
            className="w-full rounded-2xl object-cover shadow-xl"
          />
        </Reveal>

        <Reveal delay={150}>
          <div className="font-serif space-y-4 text-lg text-noir/80">
            <p>
              What started as a dream became a reality on June 1, 2024, when I launched Kegger's
              Mobile Bar. After more than 25 years of being self-employed, I've learned that
              building a successful business comes down to two things: offering a great product
              and creating genuine connections with great people.
            </p>
            <p>
              My background in finance has given me a strong foundation in business, but over the
              years, I realized I was missing something important — the joy of working with
              people and being part of their special moments.
            </p>
            <p>
              Kegger's has given me the opportunity to bring those two worlds together. I get to
              use my business experience while reconnecting with my creative side through
              handcrafted drinks, beautiful presentations, and unique experiences designed to make
              people smile.
            </p>
            <p>
              Whether we're serving a refreshing mocktail, crafting a signature cocktail, or
              simply creating a fun gathering place at an event, our goal is always the same: to
              bring a little more joy to every celebration we're part of.
            </p>
            <p>
              I'm incredibly grateful for the journey that brought me here, but I'm even more
              excited about where Kegger's Mobile Bar is headed. And I couldn't do it without my
              husband and family. They have been there to jump in, lend a hand, and help turn this
              dream into something truly special.
            </p>
            <p>After all, they say it takes a village — and Kegger's is definitely a family affair!</p>
            <p>
              Our philosophy is simple: Love what we do, serve it with heart, and create
              unforgettable memories for every guest we have the pleasure of serving.
            </p>
            <p className="text-right text-base font-semibold text-crimson not-italic">
              — Sandy Kagan, Owner, Kegger's Mobile Bar
            </p>
          </div>
        </Reveal>
      </div>
    </div>
  )
}
