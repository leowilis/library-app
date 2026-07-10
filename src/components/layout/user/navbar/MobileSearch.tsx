import { Search } from 'lucide-react';
import { useEffect, useRef } from 'react';

interface MobileSearchProps {
  query: string;
  onChange: (value: string) => void;
  onClose: () => void;
  onKeyDown: React.KeyboardEventHandler<HTMLInputElement>;
}

export default function MobileSearch({
  query,
  onChange,
  onClose,
  onKeyDown,
}: MobileSearchProps) {
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    searchRef.current?.focus();
  }, []);

  return (
    <div className='flex flex-1 items-center gap-2 mx-3 rounded-full border border-gray-200 bg-gray-50 px-4 py-2 md:hidden'>
      <Search size={18} className='text-gray-400' />

      <input
        ref={searchRef}
        type='text'
        aria-label='Search books'
        value={query}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder='Search book'
        className='flex-1 bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400'
      />

      <button
        type='button'
        aria-label='Close search'
        onClick={onClose}
        className='text-xl leading-none text-gray-400 transition-colors hover:text-gray-600'
      >
        ×
      </button>
    </div>
  );
}
