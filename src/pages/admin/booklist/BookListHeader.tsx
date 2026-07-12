import { Button } from '@/components/ui/button';

interface BookListHeaderProps {
  onAddBook: () => void;
}

export default function BookListHeader({ onAddBook }: BookListHeaderProps) {
  return (
    <div className='mb-6 flex items-center justify-between'>
      <div>
        <h1 className='text-2xl font-bold text-foreground'>Book List</h1>
        <p className='mt-1 text-sm text-gray-500'>
          Manage all books in the library.
        </p>
      </div>

      <Button
        type='button'
        size='lg'
        onClick={onAddBook}
        className='rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
      >
        Add Book
      </Button>
    </div>
  );
}
