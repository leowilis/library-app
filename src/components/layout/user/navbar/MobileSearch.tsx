import { Search } from 'lucide-react';
import { useEffect, useRef } from 'react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

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
    <div className='mx-3 flex flex-1 items-center gap-2 rounded-full border bg-muted px-4 py-2 md:hidden'>
      <Search size={18} aria-hidden='true' className='text-muted-foreground' />

      <Input
        ref={searchRef}
        type='text'
        aria-label='Search books'
        placeholder='Search book'
        value={query}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        className='h-auto flex-1 border-0 bg-transparent p-0 shadow-none focus-visible:ring-0'
      />

      <Button
        type='button'
        variant='ghost'
        size='icon'
        onClick={onClose}
        aria-label='Close search'
        className='h-7 w-7 rounded-full'
      >
        ×
      </Button>
    </div>
  );
}
