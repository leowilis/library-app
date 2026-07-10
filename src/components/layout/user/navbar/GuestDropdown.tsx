import { ROUTES } from '@/constants';

interface GuestDropdownProps {
  onNavigate: (route: string) => void;
}

export default function GuestDropdown({ onNavigate }: GuestDropdownProps) {
  return (
    <div className='absolute top-18 left-4 right-4 z-50 rounded-2xl border border-gray-100 bg-white px-4 py-3 shadow-lg'>
      <div className='flex gap-3'>
        <button
          type='button'
          aria-label='Login'
          onClick={() => onNavigate(ROUTES.Login)}
          className='flex-1 rounded-full border border-gray-300 py-2.5 text-sm font-bold'
        >
          Login
        </button>

        <button
          type='button'
          aria-label='Register'
          onClick={() => onNavigate(ROUTES.Register)}
          className='flex-1 rounded-full bg-blue-600 py-2.5 text-sm font-bold text-white hover:bg-blue-700'
        >
          Register
        </button>
      </div>
    </div>
  );
}
