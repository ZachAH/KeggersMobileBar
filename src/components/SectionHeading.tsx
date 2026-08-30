import type { ReactNode } from 'react'

export function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <div className="text-center">
      <span className="mx-auto block h-0.5 w-12 bg-crimson" />
      <h1 className="font-serif mt-4 text-4xl font-semibold text-noir sm:text-5xl">{children}</h1>
    </div>
  )
}
