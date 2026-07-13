import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface BookSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export default function BookSearch({ value, onChange }: BookSearchProps) {
  return (
    <div className='relative w-full'>
      <Search
        size={18}
        aria-hidden='true'
        className='absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground'
      />

      <Input
        type='text'
        aria-label='Search books'
        placeholder='Search book...'
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className='h-12 rounded-full pl-12 pr-4 md:max-w-5xl'
      />
    </div>
  );
}
