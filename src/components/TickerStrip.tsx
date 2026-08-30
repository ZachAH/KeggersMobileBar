const items = [
  'Weddings',
  'Corporate Events',
  'Farmers Markets',
  'Charity Events',
  'Private Parties',
  'Festivals',
]

export function TickerStrip() {
  return (
    <div className="overflow-hidden border-y border-noir/10 bg-crimson py-3">
      <div className="marquee-track flex w-max gap-12">
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-3 text-sm font-semibold whitespace-nowrap text-white uppercase tracking-[0.2em]"
          >
            {item}
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-white/70" aria-hidden="true" />
          </span>
        ))}
      </div>
    </div>
  )
}
