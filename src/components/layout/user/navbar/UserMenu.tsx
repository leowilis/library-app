import AvatarIcon from '@/assets/avatar/avatar.svg';
import { ROUTES } from '@/constants';
import type { User } from '@/types/user';

interface UserMenuProps {
  user: User | null;
  menuOpen: boolean;
  onToggle: () => void;
  onNavigate: (route: string) => void;
  onLogout: () => void;
}

const MENU_ITEMS = [
  {
    label: 'Profile',
    route: ROUTES.Profile,
  },
  {
    label: 'Borrowed List',
    route: ROUTES.ProfileBorrowed,
  },
  {
    label: 'Reviews',
    route: ROUTES.ProfileReviews,
  },
];

export default function UserMenu({
  user,
  menuOpen,
  onToggle,
  onNavigate,
  onLogout,
}: UserMenuProps) {
  return (
    <>
      {/* Desktop */}
      <div className='hidden items-center gap-2 md:flex'>
        <img
          src={user?.profilePhoto ?? AvatarIcon}
          alt='Profile'
          className='h-10 w-10 rounded-full object-cover'
        />

        <span className='text-sm font-semibold'>{user?.name ?? 'User'}</span>

        <button
          type='button'
          aria-label='Open user menu'
          aria-haspopup='menu'
          aria-expanded={menuOpen}
          onClick={onToggle}
        >
          <svg width='12' height='8' viewBox='0 0 12 8' fill='none'>
            <path
              d='M1 1.5L6 6.5L11 1.5'
              stroke='black'
              strokeWidth='1.5'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </button>
      </div>

      {/* Mobile */}
      <button
        type='button'
        aria-label='Open user menu'
        aria-haspopup='menu'
        aria-expanded={menuOpen}
        onClick={onToggle}
        className='md:hidden'
      >
        <img
          src={user?.profilePhoto ?? AvatarIcon}
          alt='Profile'
          className='h-10 w-10 rounded-full object-cover'
        />
      </button>

      {/* Dropdown */}
      {menuOpen && (
        <div
          role='menu'
          className='absolute top-18 right-4 z-50 w-52 rounded-2xl border border-gray-100 bg-white px-4 py-2 shadow-lg md:top-16 md:right-28'
        >
          <div className='flex flex-col'>
            {MENU_ITEMS.map((item) => (
              <button
                key={item.route}
                type='button'
                role='menuitem'
                aria-label={item.label}
                onClick={() => onNavigate(item.route)}
                className='border-gray-100 py-3.5 text-left text-sm font-semibold text-gray-900 last:border-0'
              >
                {item.label}
              </button>
            ))}

            <button
              type='button'
              role='menuitem'
              aria-label='Logout'
              onClick={onLogout}
              className='py-3 text-left text-sm font-semibold text-red-500'
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </>
  );
}
