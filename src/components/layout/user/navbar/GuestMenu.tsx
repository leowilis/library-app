interface GuestMenuProps {
  onLogin: () => void;
  onRegister: () => void;
}

export default function GuestMenu({ onLogin, onRegister }: GuestMenuProps) {
  return (
    <div
      role='menu'
      className='absolute top-18 left-4 right-4 z-50 rounded-2xl border border-gray-100 bg-white px-4 py-3 shadow-lg'
    >
      <div className='flex gap-3'>
        <button
          type='button'
          role='menuitem'
          aria-label='Login'
          onClick={onLogin}
          className='flex-1 rounded-full border border-gray-300 py-2.5 text-sm font-bold'
        >
          Login
        </button>

        <button
          type='button'
          role='menuitem'
          aria-label='Register'
          onClick={onRegister}
          className='flex-1 rounded-full bg-blue-600 py-2.5 text-sm font-bold text-white'
        >
          Register
        </button>
      </div>
    </div>
  );
}
