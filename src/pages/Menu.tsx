import { menu } from '../data/menu'

export function Menu() {
  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="font-display text-3xl">Menu</h1>
      <ul className="mt-6 divide-y divide-plum/10">
        {menu.map((item) => (
          <li key={item.name} className="flex items-start justify-between gap-4 py-4">
            <div>
              <p className="font-semibold">{item.name}</p>
              <p className="text-sm text-plum/70">{item.description}</p>
            </div>
            <span className="shrink-0 font-semibold">{item.price}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
