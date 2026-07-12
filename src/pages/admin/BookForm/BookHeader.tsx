import { ChevronLeft } from 'lucide-react';

import { Button } from '@/components/ui/button';

interface BookHeaderProps {
  isEdit: boolean;
  onBack: () => void;
}

export default function BookHeader({ isEdit, onBack }: BookHeaderProps) {
  return (
    <div className='flex items-center gap-3'>
      <Button
        type='button'
        variant='ghost'
        size='icon'
        aria-label='Go back'
        onClick={onBack}
      >
        <ChevronLeft className='h-5 w-5' />
      </Button>

      <h1 className='text-2xl font-bold text-foreground'>
        {isEdit ? 'Edit Book' : 'Add Book'}
      </h1>
    </div>
  );
}
