
import { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { useScrollY } from '../hooks/useCountUp'

const links = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/membership', label: 'Packages' },
  { to: '/about', label: 'About Us' },
  { to: '/contact', label: 'Contact' },
]

export function Logo({ dark = true }) {
  return (
    <Link
      to="/"
      data-testid="navbar-logo"
      className="flex items-center"
    >
      <span
        className={`whitespace-nowrap font-display text-xl font-extrabold tracking-tight ${
          dark ? 'text-navy-900' : 'text-white'
        }`}
      >
        RVsolutions24
      </span>
    </Link>
  )
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const scrolled = useScrollY(30)
  const { pathname } = useLocation()

  const overlay = pathname === '/' && !scrolled && !open

  const textCls = overlay
    ? 'text-white/90 hover:text-white'
    : 'text-slate-600 hover:text-brand-600'

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-[background-color,box-shadow] duration-300 ${
        overlay
          ? 'bg-transparent'
          : 'bg-white/95 shadow-soft backdrop-blur-md'
      }`}
      data-testid="navbar"
    >
      <nav className="container-x flex h-16 items-center justify-between lg:h-20">

        {/* Logo */}
        <Logo dark={!overlay} />

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              data-testid={`nav-link-${l.label
                .toLowerCase()
                .replace(/\s+/g, '-')}`}
              className={({ isActive }) =>
                `rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${textCls} ${
                  isActive
                    ? overlay
                      ? 'text-white underline decoration-brand-400 decoration-2 underline-offset-8'
                      : 'text-brand-600'
                    : ''
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          data-testid="mobile-menu-btn"
          aria-label="Toggle menu"
          className={`rounded-lg p-2 lg:hidden ${
            overlay ? 'text-white' : 'text-navy-900'
          }`}
        >
          {open ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {open && (
        <div
          className="border-t border-slate-100 bg-white px-4 pb-6 pt-3 shadow-lift lg:hidden"
          data-testid="mobile-menu"
        >
          <div className="flex flex-col gap-1">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                data-testid={`mobile-nav-link-${l.label
                  .toLowerCase()
                  .replace(/\s+/g, '-')}`}
                className={({ isActive }) =>
                  `rounded-xl px-4 py-2.5 text-sm font-medium ${
                    isActive
                      ? 'bg-brand-50 text-brand-700'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
