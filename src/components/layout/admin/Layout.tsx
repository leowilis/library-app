import { useRef, useState, useEffect } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { useLogout } from '@/hooks/useAuth';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store/index';
import Logo from '@/assets/logo/logo.svg';
import AvatarIcon from '@/assets/avatar/avatar.svg';

// Tabs List

const TABS = [
  { label: 'Dashboard', path: '/admin/dashboard' },
  { label: 'Borrowed List', path: '/admin/borrowed' },
  { label: 'User', path: '/admin/users' },
  { label: 'Book List', path: '/admin/books' },
];

// Profile Dropdown

interface ProfileDropdownProps {
  avatar: string;
  name: string;
  onNavigate: (path: string) => void;
  onLogout: () => void;
}

/**
 * Avatar button that opens a dropdown with nav links and a logout option.
 * Closes automatically on outside click or item selection.
 */
function ProfileDropdown({
  avatar,
  name,
  onNavigate,
  onLogout,
}: ProfileDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className='relative' ref={ref}>
      {/* Trigger */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className='flex items-center gap-3 cursor-pointer'
      >
        <img
          src={avatar}
          alt='avatar'
          className='w-9 h-9 rounded-full object-cover'
        />
        <span className='text-sm font-semibold text-gray-900'>{name}</span>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className='absolute -right-4 mt-3 w-50 bg-white rounded-2xl shadow-lg border border-gray-100 py-1 z-50'>
          {/* Dropdown list */}
          {TABS.map((item) => (
            <button
              key={item.path}
              onClick={() => {
                onNavigate(item.path);
                setIsOpen(false);
              }}
              className='w-full text-left px-4 py-2.5 text-sm transition-all rounded-xl relative after:absolute after:bottom-1 after:left-4 after:right-4 after:h-[2px] after:bg-blue-500 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left'
            >
              {item.label}
            </button>
          ))}
          {/* Logout */}
          <div className='border-t border-gray-100 mt-1 pt-1'>
            <button
              onClick={() => {
                onLogout();
                setIsOpen(false);
              }}
              className='w-full text-left px-4 py-2.5 text-sm rounded-xl text-red-500 hover:bg-red-50 transition-colors'
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// AdminLayout

/**
 * Root layout for all admin pages.
 *
 * - Navbar: logo (links to dashboard) + profile dropdown (nav + logout).
 * - Tab bar: hidden on book form (/add, /edit) and book preview pages.
 * - Renders child routes via `<Outlet />`.
 */
export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const logout = useLogout();
  const { user } = useSelector((state: RootState) => state.auth);

  const isFormPage =
    location.pathname.includes('/edit') || location.pathname.includes('/add');

  const isPreviewPage = !!location.pathname.match(/\/admin\/books\/\d+$/);

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Navbar */}
      <nav className='w-full bg-white shadow-sm px-6 py-4 flex items-center justify-between'>
        {/* Logo */}
        <div
          className='flex items-center gap-2 cursor-pointer'
          onClick={() => navigate('/admin/dashboard')}
        >
          <img src={Logo} alt='logo' className='w-8 h-8' />
          <span className='text-xl font-bold text-gray-900'>Booky</span>
        </div>

        {/* Profile Dropdown */}
        <ProfileDropdown
          avatar={(user as any)?.profilePhoto ?? AvatarIcon}
          name={(user as any)?.name ?? 'Admin'}
          onNavigate={navigate}
          onLogout={logout}
        />
      </nav>

      {/* Tabs - Hidden on Edit/Add AND Preview Pages */}
      {!isFormPage && !isPreviewPage && (
        <div className='px-4 pt-4 md:px-15 md:pt-12 md:m-4'>
          <div className='flex bg-neutral-100 rounded-2xl p-1.5 md:max-w-3xl'>
            {TABS.map((tab) => {
              const active = location.pathname.startsWith(tab.path);
              return (
                <button
                  key={tab.path}
                  onClick={() => navigate(tab.path)}
                  className='flex-1 py-2.5 px-1 rounded-xl text-xs transition-all whitespace-nowrap'
                  style={{
                    backgroundColor: active ? 'white' : 'transparent',
                    color: active ? '#1c65da' : '#6b7280',
                    fontWeight: active ? 600 : 400,
                    boxShadow: active ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                  }}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Content */}
      <main className='px-4 py-6 max-w-7xl mx-auto md:mx-12'>
        <Outlet />
      </main>
    </div>
  );
}
