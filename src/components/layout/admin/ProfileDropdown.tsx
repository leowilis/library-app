import { useEffect, useRef, useState } from 'react';

interface TabItem {
  label: string;
  path: string;
}

interface ProfileDropdownProps {
  avatar: string;
  name: string;
  tabs: TabItem[];
  onNavigate: (path: string) => void;
  onLogout: () => void;
}

export default function ProfileDropdown({
  avatar,
  name,
  tabs,
  onNavigate,
  onLogout,
}: ProfileDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  return (
    <div ref={ref} className='relative'>
      <button
        type='button'
        aria-label='Open profile menu'
        aria-haspopup='menu'
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
        className='flex cursor-pointer items-center gap-3'
      >
        <img
          src={avatar}
          alt='Profile'
          className='h-9 w-9 rounded-full object-cover'
        />

        <span className='text-sm font-semibold text-gray-900'>{name}</span>
      </button>

      {isOpen && (
        <div
          role='menu'
          className='absolute -right-4 z-50 mt-3 w-52 rounded-2xl border border-gray-100 bg-white py-1 shadow-lg'
        >
          {tabs.map((tab) => (
            <button
              key={tab.path}
              type='button'
              role='menuitem'
              onClick={() => {
                onNavigate(tab.path);
                setIsOpen(false);
              }}
              className='relative w-full rounded-xl px-4 py-2.5 text-left text-sm transition-all after:absolute after:bottom-1 after:left-4 after:right-4 after:h-[2px] after:origin-left after:scale-x-0 after:bg-blue-500 after:transition-transform hover:after:scale-x-100'
            >
              {tab.label}
            </button>
          ))}

          <div className='mt-1 border-t border-gray-100 pt-1'>
            <button
              type='button'
              role='menuitem'
              onClick={() => {
                onLogout();
                setIsOpen(false);
              }}
              className='w-full rounded-xl px-4 py-2.5 text-left text-sm text-red-500 transition-colors hover:bg-red-50'
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
