import { Link } from 'react-router-dom'

const SITE_URL = 'https://keggersmobilebar.com'

export function Breadcrumbs({ current, href }: { current: string; href: string }) {
  const items = [
    { label: 'Home', href: '/' },
    { label: current, href },
  ]

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.label,
      item: `${SITE_URL}${item.href}`,
    })),
  }

  return (
    <nav aria-label="Breadcrumb" className="mb-6 text-xs text-noir/50">
      <ol className="flex flex-wrap items-center justify-center gap-1.5">
        <li>
          <Link to="/" className="transition-colors hover:text-crimson">
            Home
          </Link>
        </li>
        <li aria-hidden="true">/</li>
        <li className="text-noir/70" aria-current="page">
          {current}
        </li>
      </ol>
      {/* biome-ignore lint: JSON-LD requires raw HTML injection */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </nav>
  )
}
