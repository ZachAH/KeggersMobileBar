import type { ReactNode } from 'react'

export function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <div className="text-center">
      <div className="flex items-center justify-center gap-3">
        <span className="h-px w-8 bg-noir/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-crimson" aria-hidden="true" />
        <span className="h-px w-8 bg-noir/15" />
      </div>
      <h1 className="font-serif mt-4 text-4xl font-semibold text-noir sm:text-5xl">{children}</h1>
    </div>
  )
}
