import { Search } from 'lucide-react';

interface UserSearchProps {
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
}

export default function UserSearch({
  value,
  placeholder = 'Search user',
  onChange,
}: UserSearchProps) {
  return (
    <div className='flex w-full items-center gap-2 rounded-full border border-neutral-300 bg-white px-4 py-2.5 md:max-w-[750px] md:mb-10'>
      <Search size={20} className='text-neutral-600' />

      <input
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className='flex-1 bg-transparent text-sm text-neutral-600 outline-none'
      />
    </div>
  );
}
