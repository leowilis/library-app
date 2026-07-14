import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';

import { ROUTES } from '@/constants';

interface CartSummaryProps {
  totalBooks: number;
  onCheckout: () => void;
}

/**
 * Checkout summary displayed on the cart page.
 * Shows total books and navigates users to checkout.
 */
export default function CartSummary({ totalBooks }: CartSummaryProps) {
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate(ROUTES.CheckOut);
  };

  return (
    <aside
      aria-labelledby='checkout-summary-title'
      className='sticky top-24 h-fit rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm'
    >
      <h2
        id='checkout-summary-title'
        className='text-xl font-bold text-neutral-900'
      >
        Checkout
      </h2>

      {/* Summary */}
      <div className='mt-6 space-y-5'>
        {/* Total */}
        <div className='flex items-center justify-between'>
          <span className='text-neutral-500'>Total Books</span>

          <span className='font-bold text-neutral-900'>{totalBooks}</span>
        </div>

        <div className='border-t border-neutral-200' />
        {/* Description */}
        <p className='text-sm leading-relaxed text-neutral-500'>
          Continue to checkout to choose the borrowing duration and confirm your
          borrowing.
        </p>

        {/* Continue Button */}
        <Button
          type='button'
          className='mt-2 w-full rounded-full'
          disabled={totalBooks === 0}
          onClick={handleCheckout}
        >
          Continue Checkout
        </Button>
      </div>
    </aside>
  );
}
