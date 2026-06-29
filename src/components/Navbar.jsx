import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X, Scale, UserRound } from 'lucide-react'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/assistant', label: 'AI Assistant' },
  { to: '/petition', label: 'Petition' },
  { to: '/court', label: 'Court Guide' },
  { to: '/resources', label: 'Resources' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-md border-b border-pink-100/60">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <div className="flex items-center justify-between h-16">
          <Link
            to="/"
            className="flex items-center gap-2.5 group"
            onClick={() => setOpen(false)}
          >
            <div className="w-9 h-9 rounded-xl gradient-purple flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
              <Scale className="w-5 h-5 text-white" aria-hidden="true" />
            </div>
            <div className="text-left">
              <span className="font-bold text-lg text-gray-900 tracking-tight">
                HAQMarg
              </span>
              <span className="hidden sm:block text-[10px] text-primary-600 font-medium -mt-0.5">
                आपके हक़, आपकी आवाज़
              </span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `px-3.5 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-gray-600 hover:text-primary-700 hover:bg-primary-50'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-pink-50 text-pink-700 text-xs font-medium border border-pink-200">
              <UserRound className="w-3.5 h-3.5" aria-hidden="true" />
              Guest Mode
            </span>
          </div>

          <button
            type="button"
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-primary-50 hover:text-primary-700 transition-colors"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {open && (
          <div className="md:hidden pb-4 animate-fade-in">
            <div className="flex flex-col gap-1 pt-2 border-t border-pink-100">
              {navLinks.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-primary-100 text-primary-700'
                        : 'text-gray-600 hover:bg-primary-50'
                    }`
                  }
                >
                  {label}
                </NavLink>
              ))}
              <div className="px-4 pt-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-pink-50 text-pink-700 text-xs font-medium border border-pink-200">
                  <UserRound className="w-3.5 h-3.5" aria-hidden="true" />
                  Guest Mode — No login required
                </span>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
