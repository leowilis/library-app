import EmptyState from '@/common/EmptyState';
import ErrorState from '@/common/ErrorState';

import { SkeletonCheckout } from '@/components/ui/skeleton';

import { useCheckout } from '@/hooks/useCart';
import CheckoutUserInfo from './CheckoutUserInfo';
import CheckoutBookList from './CheckoutBookList';
import CheckoutBorrowForm from './CheckoutBorrowForm';
import { useLocation } from 'react-router-dom';

export default function CheckoutPage() {
  const { data, isLoading, isError } = useCheckout();
  const location = useLocation();
  const selectedCartItemIds: number[] =
    location.state?.selectedCartItemIds ?? [];

  const selectedBooks =
    selectedCartItemIds.length === 0
      ? (data?.items ?? [])
      : (data?.items ?? []).filter((item) =>
          selectedCartItemIds.includes(item.id),
        );

  if (isLoading) {
    return <SkeletonCheckout />;
  }

  if (isError) {
    return (
      <ErrorState
        title='Failed to load checkout'
        description='Please try again later.'
      />
    );
  }

  if (!data) {
    return (
      <EmptyState
        title='Checkout is empty'
        description='Please add books first.'
      />
    );
  }

  return (
    <section aria-labelledby='checkout-title' className='space-y-8'>
      <h1 id='checkout-title' className='text-3xl font-bold'>
        Checkout
      </h1>

      <div className='grid gap-10 lg:grid-cols-2'>
        <div className='space-y-8'>
          <CheckoutUserInfo user={data.user} />

          <CheckoutBookList books={selectedBooks} />
        </div>

        <CheckoutBorrowForm books={selectedBooks} />
      </div>
    </section>
  );
}
