import { SectionHeading } from '../components/SectionHeading'

export function About() {
  return (
    <div className="mx-auto max-w-2xl">
      <SectionHeading>About Us</SectionHeading>
      <div className="font-serif mt-8 space-y-4 rounded-lg border border-gold/20 bg-black/35 p-6 text-lg text-cream/80 backdrop-blur-md sm:p-8">
        <p>
          Keggers Mobile Bar is a craft mocktail bar built for gathering — corporate events,
          weddings, private parties, and farmers markets alike. Every drink is alcohol-free, made
          from scratch, and polished enough for a black-tie affair while still being just as good
          for the kids as it is for the grown-ups.
        </p>
        <p>
          We travel to you with a full mobile bar setup, from intimate family gatherings to
          large-scale corporate outings — bringing the same seasonal, small-batch drinks whether
          you're on the show floor or in your own backyard.
        </p>
      </div>
    </div>
  )
}
