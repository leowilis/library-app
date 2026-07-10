import { Search } from 'lucide-react';

interface SearchBarProps {
  query: string;
  onChange: (value: string) => void;
  onKeyDown: React.KeyboardEventHandler<HTMLInputElement>;
}

export default function SearchBar({
  query,
  onChange,
  onKeyDown,
}: SearchBarProps) {
  return (
    <div className='hidden flex-1 items-center gap-2 mx-6 max-w-2xl rounded-full border border-gray-200 px-6 py-2 md:flex'>
      <Search size={18} className='text-gray-400' aria-hidden='true' />

      <input
        aria-label='Search books'
        type='text'
        value={query}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder='Search book'
        className='flex-1 bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400'
      />
    </div>
  );
}
