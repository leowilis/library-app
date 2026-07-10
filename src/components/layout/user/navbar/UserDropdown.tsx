import { ROUTES } from '@/constants';

interface UserDropdownProps {
  onNavigate: (route: string) => void;
  onLogout: () => void;
}

const MENU_ITEMS = [
  { label: 'Profile', route: ROUTES.Profile },
  { label: 'Borrowed List', route: ROUTES.ProfileBorrowed },
  { label: 'Reviews', route: ROUTES.ProfileReviews },
];

export default function UserDropdown({
  onNavigate,
  onLogout,
}: UserDropdownProps) {
  return (
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
            className='py-3.5 text-left text-sm font-semibold text-gray-900'
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
  );
}
