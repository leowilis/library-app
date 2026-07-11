import { Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className='flex items-center gap-2 bg-white rounded-full px-4 py-3 border border-neutral-300 md:max-w-2xl'>
      <Search size={20} className='text-neutral-600' />

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder='Search book'
        className='flex-1 bg-transparent outline-none text-sm text-neutral-600'
      />
    </div>
  );
}
