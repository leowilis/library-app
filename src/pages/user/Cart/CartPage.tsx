import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EmptyState from '@/common/EmptyState';
import ErrorState from '@/common/ErrorState';
import { ROUTES } from '@/constants';
import { SkeletonCartPage } from '@/components/ui/skeleton';
import { useCart } from '@/hooks/useCart';
import CartFooter from './CartFooter';
import CartSummary from './CartSummary';
import SelectAll from './SelectAll';
import CartItemCard from './CartItem';

export default function CartPage() {
  const navigate = useNavigate();

  const { data: cartItems = [], isLoading, isError } = useCart();

  /**
   * Stores selected cart item ids.
   * Default: all items selected.
   */
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  // Keep selection synchronized whenever cart changes.
  useEffect(() => {
    setSelectedIds(cartItems.map((item) => item.id));
  }, [cartItems]);

  const totalItems = cartItems.length;

  const totalSelected = selectedIds.length;

  const isAllSelected = totalItems > 0 && totalSelected === totalItems;

  // Toggle all items.
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(cartItems.map((item) => item.id));
      return;
    }

    setSelectedIds([]);
  };

  // Toggle single item.
  const handleToggleSelectItem = (id: number, checked: boolean) => {
    setSelectedIds((prev) => {
      if (checked) {
        return [...new Set([...prev, id])];
      }

      return prev.filter((itemId) => itemId !== id);
    });
  };

  // Continue checkout with selected items.
  const handleCheckout = () => {
    if (selectedIds.length === 0) return;

    navigate(ROUTES.CheckOut, {
      state: {
        selectedCartItemIds: selectedIds,
      },
    });
  };

  // Loading state
  if (isLoading) {
    return <SkeletonCartPage />;
  }

  // Error state
  if (isError) {
    return (
      <ErrorState
        title='Failed to load cart'
        description='Please try again later.'
      />
    );
  }

  // Empty state
  if (cartItems.length === 0) {
    return (
      <EmptyState
        title='Your cart is empty'
        description='Add books before checkout.'
      />
    );
  }

  return (
    <section aria-labelledby='cart-title' className='space-y-6 pb-24 md:pb-0'>
      <h1 id='cart-title' className='text-3xl font-bold text-neutral-900'>
        My Cart
      </h1>

      <div className='grid gap-8 lg:grid-cols-[1fr_320px]'>
        {/* LEFT */}
        <div className='space-y-5'>
          <SelectAll checked={isAllSelected} onChange={handleSelectAll} />

          {cartItems.map((item) => (
            <CartItemCard
              key={item.id}
              item={item}
              isSelected={selectedIds.includes(item.id)}
              onToggleSelect={(checked) =>
                handleToggleSelectItem(item.id, checked)
              }
            />
          ))}
        </div>

        {/* Desktop Summary */}
        <div className='hidden lg:block'>
          <CartSummary totalBooks={totalSelected} onCheckout={handleCheckout} />
        </div>
      </div>

      {/* Mobile Footer */}
      <CartFooter
        totalBooks={totalSelected}
        disabled={totalSelected === 0}
        onBorrow={handleCheckout}
      />
    </section>
  );
}
