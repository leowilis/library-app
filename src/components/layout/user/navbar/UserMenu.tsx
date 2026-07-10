import AvatarIcon from '@/assets/avatar/avatar.svg';
import type { User } from '@/types/user';
import UserDropdown from './UserDropdown';

interface UserMenuProps {
  user: User | null;
  menuOpen: boolean;
  onToggle: () => void;
  onNavigate: (route: string) => void;
  onLogout: () => void;
}

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
      {menuOpen && <UserDropdown onNavigate={onNavigate} onLogout={onLogout} />}
    </>
  );
}
