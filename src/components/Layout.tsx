import { NavLink, Outlet } from 'react-router-dom'

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `text-sm font-medium tracking-wide uppercase transition-colors hover:text-gold ${
    isActive ? 'text-gold' : 'text-cream/80'
  }`

export function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-cream/15 px-6 py-4">
        <NavLink to="/" className="shrink-0">
          <img
            src="/logo-header-gold.png"
            alt="Keggers Mobile Bar"
            className="h-16 w-auto transition-transform duration-300 ease-out hover:-rotate-3 hover:scale-110"
          />
        </NavLink>
        <nav className="flex flex-wrap gap-x-6 gap-y-2">
          <NavLink to="/" end className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to="/what-we-offer" className={navLinkClass}>
            What We Offer
          </NavLink>
          <NavLink to="/menu" className={navLinkClass}>
            Seasonal Menu
          </NavLink>
          <NavLink to="/gallery" className={navLinkClass}>
            Gallery
          </NavLink>
          <NavLink to="/where-well-be" className={navLinkClass}>
            Where We'll Be
          </NavLink>
          <NavLink to="/about" className={navLinkClass}>
            About
          </NavLink>
          <NavLink to="/contact" className={navLinkClass}>
            Contact
          </NavLink>
        </nav>
      </header>
      <main className="flex-1 px-6 py-12">
        <Outlet />
      </main>
      <footer className="border-t border-cream/15 px-6 py-6 text-center text-sm text-cream/60">
        © {new Date().getFullYear()} Keggers Mobile Bar — mocktails, cocktails &amp; full bar
        service
      </footer>
    </div>
  )
}
