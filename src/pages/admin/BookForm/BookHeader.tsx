import { ChevronLeft } from 'lucide-react';

interface BookHeaderProps {
  isEdit: boolean;
  onBack: () => void;
}

export default function BookHeader({ isEdit, onBack }: BookHeaderProps) {
  return (
    <div className='flex items-center gap-3'>
      <button
        type='button'
        onClick={onBack}
        className='rounded-xl p-2 transition-colors hover:bg-gray-100'
      >
        <ChevronLeft size={22} className='text-neutral-700' />
      </button>

      <h1 className='text-2xl font-bold text-gray-900'>
        {isEdit ? 'Edit Book' : 'Add Book'}
      </h1>
    </div>
  );
}
