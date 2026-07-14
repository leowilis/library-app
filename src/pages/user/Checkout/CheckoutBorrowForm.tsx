import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ROUTES } from '@/constants';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

import { useCheckoutBorrow } from '@/hooks/useCheckoutBorrow';

import type { CartItem } from '@/types/cart';

const BORROW_OPTIONS = [3, 7, 14, 30];

interface CheckoutBorrowFormProps {
  books: CartItem[];
}

export default function CheckoutBorrowForm({ books }: CheckoutBorrowFormProps) {
  const navigate = useNavigate();

  const [days, setDays] = useState(7);
  const [agreeReturn, setAgreeReturn] = useState(false);
  const [acceptPolicy, setAcceptPolicy] = useState(false);

  const borrowDate = useMemo(() => new Date(), []);

  const returnDate = useMemo(() => {
    const date = new Date();
    date.setDate(date.getDate() + days);

    return date;
  }, [days]);

  const { mutate: borrowBooks, isPending } = useCheckoutBorrow();

  const formatDate = (date: Date) =>
    date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });

  const handleConfirm = () => {
    borrowBooks(
      {
        days,
        itemIds: books.map((item) => item.id),
      },
      {
        onSuccess: () => {
          navigate(ROUTES.BorrowSuccess, {
            state: {
              returnDate: formatDate(returnDate),
            },
          });
        },
      },
    );
  };

  return (
    <section
      aria-labelledby='borrow-request-title'
      className='rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm'
    >
      <h2
        id='borrow-request-title'
        className='text-xl font-bold text-neutral-900'
      >
        Complete Your Borrow Request
      </h2>

      <div className='mt-6 space-y-8'>
        {/* Borrow Date */}
        <div>
          <p className='mb-2 text-sm font-semibold'>Borrow Date</p>

          <div className='rounded-xl border bg-neutral-100 px-4 py-3'>
            <p className='font-semibold'>{formatDate(borrowDate)}</p>
          </div>
        </div>

        {/* Borrow Duration */}
        <div>
          <p className='mb-3 text-sm font-semibold'>Borrow Duration</p>

          <div className='space-y-3'>
            {BORROW_OPTIONS.map((option) => (
              <label
                key={option}
                className='flex cursor-pointer items-center gap-3'
              >
                <input
                  type='radio'
                  checked={days === option}
                  onChange={() => setDays(option)}
                />

                <span className='text-sm'>{option} Days</span>
              </label>
            ))}
          </div>
        </div>

        {/* Return Date */}
        <div className='rounded-3xl bg-accent-blue p-6'>
          <div className='space-y-2'>
            <p className='text-sm font-semibold text-neutral-900'>
              Return Date
            </p>

            <p className='text-sm text-neutral-900'>
              Please return the book no later than
            </p>

            <p className='pt-1 text-lg font-bold text-red-500'>
              {formatDate(returnDate)}
            </p>
          </div>
        </div>

        {/* Agreement */}
        <div className='space-y-4'>
          <div className='flex items-start gap-3'>
            <Checkbox
              id='agree-return'
              checked={agreeReturn}
              onCheckedChange={(checked) => setAgreeReturn(Boolean(checked))}
            />

            <Label
              htmlFor='agree-return'
              className='cursor-pointer text-sm leading-relaxed'
            >
              I agree to return the books before the due date.
            </Label>
          </div>

          <div className='flex items-start gap-3'>
            <Checkbox
              id='accept-policy'
              checked={acceptPolicy}
              onCheckedChange={(checked) => setAcceptPolicy(Boolean(checked))}
            />

            <Label
              htmlFor='accept-policy'
              className='cursor-pointer text-sm leading-relaxed'
            >
              I accept the library borrowing policy.
            </Label>
          </div>
        </div>

        <Button
          type='button'
          className='w-full rounded-full'
          disabled={
            !agreeReturn || !acceptPolicy || isPending || books.length === 0
          }
          onClick={handleConfirm}
        >
          {isPending ? 'Borrowing...' : 'Confirm Borrow'}
        </Button>
      </div>
    </section>
  );
}
