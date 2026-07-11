import { Search } from 'lucide-react';

interface BorrowedSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function BorrowedSearch({
  value,
  onChange,
  placeholder = 'Search',
}: BorrowedSearchProps) {
  return (
    <div className='flex w-full items-center gap-2 rounded-full border border-neutral-300 bg-white px-4 py-2.5 md:max-w-[750px]'>
      <Search size={20} className='text-neutral-600' />

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className='flex-1 bg-transparent text-md text-neutral-600 outline-none'
      />
    </div>
  );
}
