import { useState } from 'react';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Search } from 'lucide-react';
import type { RootState } from '@/store';
import { logout } from '@/store/authSlice';
import { ROUTES } from '@/constants';
import CartButton from '../CartButton';

import { NavbarLogo, SearchBar, MobileSearch, GuestMenu, UserMenu } from './';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const { token, user } = useSelector((state: RootState) => state.auth);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState(() => searchParams.get('q') ?? '');

  const handleSearchSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return;

    const value = query.trim();

    if (!value) return;

    navigate(`${ROUTES.Search}?q=${encodeURIComponent(value)}`);

    setSearchOpen(false);
  };

  const handleNavigate = (route: string) => {
    navigate(route);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate(ROUTES.Login);
  };

  return (
    <nav className='relative w-full bg-background px-4 py-4 shadow-sm md:px-30'>
      <div className='flex items-center justify-between'>
        <NavbarLogo />

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
              <Search size={24} className='text-muted-foreground' />
            </button>

            {token ? (
              <>
                <CartButton />

                <UserMenu
                  user={user}
                  onNavigate={handleNavigate}
                  onLogout={handleLogout}
                />
              </>
            ) : (
              <GuestMenu onNavigate={handleNavigate} />
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
