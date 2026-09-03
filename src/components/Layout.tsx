import { NavLink, Outlet } from 'react-router-dom'

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `nav-link text-sm font-medium tracking-wide uppercase transition-colors hover:text-crimson ${
    isActive ? 'active-link text-crimson' : 'text-noir/70'
  }`

export function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-paper">
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-noir/10 bg-white px-6 py-4">
        <NavLink to="/" className="shrink-0">
          <img
            src="/logo-header.png"
            alt="Keggers Mobile Bar"
            className="h-14 w-auto transition-transform duration-300 ease-out hover:scale-105"
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
            Handcrafted Mocktails
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
      <footer className="bg-noir px-6 py-12 text-sm text-white/70">
        <div className="mx-auto grid max-w-5xl gap-10 sm:grid-cols-3">
          <div>
            <img src="/logo-header.png" alt="Keggers Mobile Bar" className="h-14 w-auto brightness-0 invert" />
            <p className="mt-4 max-w-xs text-white/50">
              Elevated mobile bar experiences for weddings, private parties, corporate events, and
              charitable events throughout Wisconsin.
            </p>
          </div>
          <div>
            <p className="font-semibold tracking-wide text-crimson uppercase">Explore</p>
            <nav className="mt-4 flex flex-col gap-2">
              <NavLink to="/" end className="transition-colors hover:text-crimson">
                Home
              </NavLink>
              <NavLink to="/what-we-offer" className="transition-colors hover:text-crimson">
                What We Offer
              </NavLink>
              <NavLink to="/menu" className="transition-colors hover:text-crimson">
                Handcrafted Mocktails
              </NavLink>
              <NavLink to="/gallery" className="transition-colors hover:text-crimson">
                Gallery
              </NavLink>
              <NavLink to="/where-well-be" className="transition-colors hover:text-crimson">
                Where We'll Be
              </NavLink>
              <NavLink to="/about" className="transition-colors hover:text-crimson">
                About
              </NavLink>
              <NavLink to="/contact" className="transition-colors hover:text-crimson">
                Contact
              </NavLink>
            </nav>
          </div>
          <div>
            <p className="font-semibold tracking-wide text-crimson uppercase">Get In Touch</p>
            <div className="mt-4 flex flex-col gap-2">
              <a href="mailto:sandy@keggersmobilebar.com" className="transition-colors hover:text-crimson">
                sandy@keggersmobilebar.com
              </a>
              <a href="tel:+12623435789" className="transition-colors hover:text-crimson">
                (262) 343-5789
              </a>
              <p className="text-white/50">Serving Wisconsin &amp; surrounding areas</p>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-10 flex max-w-5xl flex-col items-center gap-2 border-t border-white/15 pt-6 text-center text-xs text-white/40 sm:flex-row sm:justify-between sm:text-left">
          <p>
            © {new Date().getFullYear()} Keggers Mobile Bar — mocktails, cocktails &amp; full bar
            service
          </p>
          <p>
            Site by{' '}
            <a
              href="https://zachhowell.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-crimson underline transition-colors hover:text-white"
            >
              ZH Web Solutions
            </a>
          </p>
        </div>
      </footer>
    </div>
  )
}
