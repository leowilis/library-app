import { useState, useRef, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import type { RootState } from "@/store/index"
import { logout } from "@/store/authSlice"
import { ROUTES } from "@/constants"
import { Search } from "lucide-react"
import Logo from "@/assets/logo/logo.svg"
import Menubar from "@/assets/icon/Menu.svg"
import AvatarIcon from "@/assets/avatar/avatar.svg"

/**
 * Top navigation bar for all user-facing pages.
 *
 * Handles:
 * - Logo linking to home
 * - Book search (desktop inline, mobile overlay)
 * - User dropdown (profile, borrowed list, reviews, logout)
 * - Guest dropdown (login, register)
 *
 * Auth state is read from Redux (`state.auth`).
 * Search navigates to `ROUTES.Search?q=<query>` on Enter.
 */
export default function Navbar() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { token, user } = useSelector((state: RootState) => state.auth)
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false) // mobile search overlay
  const [query, setQuery] = useState("")
  const searchRef = useRef<HTMLInputElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside the navbar
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Auto-focus search input when mobile overlay opens
  useEffect(() => {
    if (searchOpen) searchRef.current?.focus()
  }, [searchOpen])

  // Navigate to search page on Enter key
  const handleSearchSubmit = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && query.trim()) {
      navigate(`${ROUTES.Search}?q=${query.trim()}`)
      setSearchOpen(false)
      setQuery("")
    }
  }

  const handleNavigate = (route: string) => {
    navigate(route)
    setMenuOpen(false)
  }

  const handleLogout = () => {
    dispatch(logout())
    setMenuOpen(false)
    navigate(ROUTES.Login)
  }

  return (
    <nav className="w-full px-4 py-4 relative bg-white shadow-sm md:px-30" ref={menuRef}>
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 flex-shrink-0 md:gap-4">
          <img src={Logo} alt="Booky" className="h-10 w-10" />
          <span className="hidden md:block text-xl font-bold md:text-2xl">Booky</span>
        </Link>

        {/* Desktop Search — only visible when logged in */}
        {token && (
          <div className="hidden md:flex items-center gap-2 border border-gray-200 rounded-full px-6 py-2 flex-1 max-w-2xl mx-6">
            <Search size={18} className="text-gray-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleSearchSubmit}
              placeholder="Search book"
              className="flex-1 bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400"
            />
          </div>
        )}

        {/* Mobile Search Overlay */}
        {searchOpen ? (
          <div className="flex-1 flex items-center gap-2 mx-3 bg-gray-50 border border-gray-200 rounded-full px-4 py-2 md:hidden">
            <Search size={18} className="text-gray-400" />
            <input
              ref={searchRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleSearchSubmit}
              placeholder="Search book"
              className="flex-1 bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400"
            />
            <button
              onClick={() => { setSearchOpen(false); setQuery("") }}
              className="text-gray-400 text-xl leading-none hover:text-gray-600"
            >
              ×
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3 md:gap-5">
            {/* Search Icon - Mobile */}
            <button onClick={() => setSearchOpen(true)} className="md:hidden">
              <Search size={24} className="text-gray-700" />
            </button>

            {/* Logged in: avatar + chevron (desktop) / avatar only (mobile) */}
            {token ? (
              <>
                <div className="hidden md:flex items-center gap-2">
                  <img
                    src={user?.profilePhoto ?? AvatarIcon}
                    alt="profile"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <span className="text-sm font-semibold">{user?.name}</span>
                  <button onClick={() => setMenuOpen((p) => !p)}>
                    <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                      <path d="M1 1.5L6 6.5L11 1.5" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
                <button onClick={() => setMenuOpen((p) => !p)} className="md:hidden">
                  <img src={user?.profilePhoto ?? AvatarIcon} alt="profile" className="w-10 h-10 rounded-full object-cover" />
                </button>
              </>
            ) : (
              /* Guest: hamburger menu */
              <button onClick={() => setMenuOpen((p) => !p)}>
                <img src={Menubar} width={28} height={28} alt="menu" />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Guest dropdown — login / register */}
      {menuOpen && !token && (
        <div className="absolute top-18 left-4 right-4 rounded-2xl shadow-lg z-50 px-4 py-3 bg-white border border-gray-100">
          <div className="flex gap-3">
            <button onClick={() => handleNavigate(ROUTES.Login)} className="flex-1 py-2.5 rounded-full text-sm font-bold border border-gray-300">
              Login
            </button>
            <button onClick={() => handleNavigate(ROUTES.Register)} className="flex-1 py-2.5 rounded-full text-sm font-bold text-white bg-blue-600">
              Register
            </button>
          </div>
        </div>
      )}

      {/* Authenticated dropdown — profile nav + logout */}
      {menuOpen && token && (
        <div className="absolute top-18 right-4 w-52 rounded-2xl shadow-lg z-50 px-4 py-2 bg-white border border-gray-100 md:top-16 md:right-28">
          <div className="flex flex-col">
            {[
              { label: "Profile", route: ROUTES.Profile },
              { label: "Borrowed List", route: ROUTES.ProfileBorrowed },
              { label: "Reviews", route: ROUTES.ProfileReviews },
            ].map(({ label, route }) => (
              <button key={label} onClick={() => handleNavigate(route)} className="text-left py-3.5 text-sm text-gray-900 font-semibold border-gray-100 last:border-0">
                {label}
              </button>
            ))}
            <button onClick={handleLogout} className="text-left py-3 text-sm font-semibold text-red-500">
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}