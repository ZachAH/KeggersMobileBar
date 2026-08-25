import { NavLink, Outlet } from 'react-router-dom'

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `hover:text-berry ${isActive ? 'text-berry font-semibold' : 'text-plum'}`

export function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex items-center justify-between px-6 py-4">
        <NavLink to="/" className="text-xl font-display font-semibold">
          Keggers Mocktails
        </NavLink>
        <nav className="flex gap-6">
          <NavLink to="/" end className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to="/menu" className={navLinkClass}>
            Menu
          </NavLink>
          <NavLink to="/where-well-be" className={navLinkClass}>
            Where We'll Be
          </NavLink>
          <NavLink to="/about" className={navLinkClass}>
            About
          </NavLink>
        </nav>
      </header>
      <main className="flex-1 px-6 py-8">
        <Outlet />
      </main>
      <footer className="px-6 py-4 text-center text-sm text-plum/60">
        © {new Date().getFullYear()} Keggers Mocktails
      </footer>
    </div>
  )
}
