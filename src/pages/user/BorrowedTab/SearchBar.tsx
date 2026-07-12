import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

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
        className='absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground'
      />

      <Input
        type='text'
        aria-label='Search books'
        placeholder='Search book...'
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className='pl-11'
      />
    </div>
  );
}
