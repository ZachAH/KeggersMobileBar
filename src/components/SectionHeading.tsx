import type { ReactNode } from 'react'

export function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center justify-center gap-4">
      <span className="h-px w-10 bg-gold/40 sm:w-16" />
      <h1 className="font-script text-4xl text-gold sm:text-5xl">{children}</h1>
      <span className="h-px w-10 bg-gold/40 sm:w-16" />
    </div>
  )
}
