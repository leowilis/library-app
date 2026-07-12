import { Search } from 'lucide-react';

import { Input } from '@/components/ui/input';

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
    <div className='relative w-full md:max-w-[750px]'>
      <Search
        size={20}
        aria-hidden='true'
        className='absolute left-4 top-1/2 z-10 -translate-y-1/2 text-muted-foreground'
      />

      <Input
        type='text'
        aria-label={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className='pl-12'
      />
    </div>
  );
}
