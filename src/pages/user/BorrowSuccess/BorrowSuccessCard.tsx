import { CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BorrowSuccessCardProps {
  returnDate?: string;
  onBackHome: () => void;
}

export default function BorrowSuccessCard({
  returnDate,
  onBackHome,
}: BorrowSuccessCardProps) {
  return (
    <section
      aria-labelledby='borrow-success-title'
      className='mx-auto flex max-w-md flex-col items-center rounded-3xl bg-white px-8 py-12 text-center shadow-sm'
    >
      <CheckCircle2
        aria-hidden='true'
        className='mb-6 h-20 w-20 text-primary'
      />

      <h1
        id='borrow-success-title'
        className='text-2xl font-bold text-neutral-900'
      >
        Borrowing Successful!
      </h1>

      <p className='mt-3 text-sm leading-6 text-neutral-500'>
        Your books have been successfully borrowed.
      </p>

      <p className='mt-4 text-sm'>
        Please return your books before{' '}
        <span className='font-semibold text-red-500'>
          {returnDate ?? 'the due date shown in your borrowed books'}
        </span>
      </p>

      <Button
        type='button'
        className='mt-8 w-full rounded-full'
        onClick={onBackHome}
      >
        Back to Home
      </Button>
    </section>
  );
}
