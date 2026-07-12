import { Search } from 'lucide-react';

import { Input } from '@/components/ui/input';

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
    <div className='relative mb-10 w-full md:max-w-3xl'>
      <Search
        size={20}
        aria-hidden='true'
        className='absolute left-4 top-1/2 z-10 -translate-y-1/2 text-muted-foreground'
      />

      <Input
        type='text'
        aria-label={placeholder}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className='pl-12'
      />
    </div>
  );
}
