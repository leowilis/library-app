import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '@/store';
import { logout } from '@/store/authSlice';
import { ROUTES } from '@/constants';
import { Search } from 'lucide-react';

import Menubar from '@/assets/icon/Menu.svg';

import NavbarLogo from './NavbarLogo';
import SearchBar from './SearchBar';
import MobileSearch from './MobileSearch';
import GuestMenu from './GuestMenu';
import UserMenu from './UserMenu';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const { token, user } = useSelector((state: RootState) => state.auth);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState(() => searchParams.get('q') ?? '');
  const menuRef = useRef<HTMLDivElement>(null);

  // Sync search input with URL while on the search page.
  useEffect(() => {
    if (location.pathname !== ROUTES.Search) return;

    setQuery(searchParams.get('q') ?? '');
  }, [location.pathname, searchParams]);

  // Close menu when clicking outside.
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearchSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return;
    const value = query.trim();
    if (!value) return;
    navigate(`${ROUTES.Search}?q=${encodeURIComponent(value)}`);
    setSearchOpen(false);
  };

  const handleNavigate = (route: string) => {
    navigate(route);
    setMenuOpen(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    setMenuOpen(false);
    navigate(ROUTES.Login);
  };

  return (
    <nav
      ref={menuRef}
      className='relative w-full border-b border-gray-100 bg-white px-4 py-4 shadow-sm md:px-30'
    >
      <div className='flex items-center justify-between'>
        {/* Logo */}
        <NavbarLogo />

        {/* Search bar */}
        <SearchBar
          query={query}
          onChange={setQuery}
          onKeyDown={handleSearchSubmit}
        />

        {searchOpen ? (
          <MobileSearch
            query={query}
            onChange={setQuery}
            onKeyDown={handleSearchSubmit}
            onClose={() => {
              setSearchOpen(false);

              if (location.pathname === ROUTES.Search) {
                setQuery(searchParams.get('q') ?? '');
              } else {
                setQuery('');
              }
            }}
          />
        ) : (
          <div className='flex items-center gap-3 md:gap-5'>
            <button
              type='button'
              aria-label='Open search'
              onClick={() => setSearchOpen(true)}
              className='rounded-lg p-1 transition-transform active:scale-95 md:hidden'
            >
              <Search size={24} className='text-gray-700' />
            </button>

            {token ? (
              <UserMenu
                user={user}
                menuOpen={menuOpen}
                onToggle={() => setMenuOpen((prev) => !prev)}
                onNavigate={handleNavigate}
                onLogout={handleLogout}
              />
            ) : (
              <GuestMenu
                menuOpen={menuOpen}
                onToggle={() => setMenuOpen((prev) => !prev)}
                onNavigate={handleNavigate}
              />
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
