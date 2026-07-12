import { Search } from 'lucide-react';

import { Input } from '@/components/ui/input';

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
    <div className='mx-6 hidden max-w-2xl flex-1 items-center gap-2 rounded-full border bg-background px-6 py-2 md:flex'>
      <Search size={18} aria-hidden='true' className='text-muted-foreground' />

      <Input
        type='text'
        aria-label='Search books'
        placeholder='Search book'
        value={query}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        className='h-auto border-0 bg-transparent p-0 shadow-none focus-visible:ring-0'
      />
    </div>
  );
}
