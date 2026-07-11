import { Search } from 'lucide-react';

interface BookSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export default function BookSearch({ value, onChange }: BookSearchProps) {
  return (
    <div className='relative mb-6 w-full md:max-w-sm'>
      <Search
        size={18}
        aria-hidden='true'
        className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400'
      />

      <input
        type='text'
        aria-label='Search books'
        placeholder='Search book...'
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className='w-full rounded-xl border border-gray-200 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-blue-500'
      />
    </div>
  );
}
