import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from '@/store/index'
import { logout } from '@/store/authSlice'
import { ROUTES } from '@/constants'
import Logo from '@/assets/logo/logo.svg'
import Search from '@/assets/icon/Search.svg'
import Bag from '@/assets/icon/Bag.svg'
import Menubar from '@/assets/icon/Menu.svg'
import AvatarIcon from '@/assets/avatar/avatar.svg'

export default function Navbar() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { token, user } = useSelector((state: RootState) => state.auth)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

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
    <nav className="w-full px-4 py-4 relative" ref={menuRef}>
      <div className="flex justify-between items-center">

        {/* Logo */}
        <img src={Logo} width={40} height={40} alt="logo" />

        {/* Icons */}
        <div className="flex items-center gap-5">
          <button>
            <img src={Search} width={24} height={24} alt="search" />
          </button>

          <button onClick={() => navigate(ROUTES.Cart)} className="relative">
            <img src={Bag} width={28} height={28} alt="checkout" />
          </button>

          {token ? (
            <button onClick={() => setMenuOpen((prev) => !prev)}>
              {user?.profilePhoto ? (
                <img src={user.profilePhoto} alt={user.name} className="w-11 h-11 rounded-full object-cover" />
              ) : (
                <img src={AvatarIcon} alt="profile" className="w-11 h-11 rounded-full" />
              )}
            </button>
          ) : (
            <button onClick={() => setMenuOpen((prev) => !prev)}>
              <img src={Menubar} width={28} height={28} alt="menu" />
            </button>
          )}
        </div>
      </div>

      {/* Dropdown */}
      {menuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-md z-50 px-4 py-2">
          {token ? (
            <div className="flex flex-col">
              {[
                { label: 'Profile', route: ROUTES.Profile },
                { label: 'Borrowed List', route: ROUTES.ProfileBorrowed },
                { label: 'Reviews', route: ROUTES.ProfileReviews },
              ].map(({ label, route }) => (
                <button
                  key={label}
                  onClick={() => handleNavigate(route)}
                  className="text-left py-3 text-sm text-gray-700 border-b border-gray-100"
                >
                  {label}
                </button>
              ))}
              <button
                onClick={handleLogout}
                className="text-left py-3 text-sm font-semibold"
                style={{ color: 'var(--accent-red)' }}
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex gap-3 py-2">
              <button
                onClick={() => handleNavigate(ROUTES.Login)}
                className="flex-1 py-2.5 rounded-full text-sm font-semibold border-2 text-gray-700"
                style={{ borderColor: 'var(--primary-300)' }}
              >
                Login
              </button>
              <button
                onClick={() => handleNavigate(ROUTES.Register)}
                className="flex-1 py-2.5 rounded-full text-sm font-semibold text-white"
                style={{ backgroundColor: 'var(--primary-300)' }}
              >
                Register
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  )
}