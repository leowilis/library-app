import { ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';

import { useCart } from '@/hooks/useCart';
import { ROUTES } from '@/constants';

export default function CartButton() {
  const navigate = useNavigate();

  const { data: cartItems = [] } = useCart();

  return (
    <Button
      type='button'
      variant='ghost'
      size='icon'
      aria-label='Open cart'
      onClick={() => navigate(ROUTES.Cart)}
      className='relative'
    >
      <ShoppingCart className='h-5 w-5' />

      {cartItems.length > 0 && (
        <span
          className='
            absolute
            -right-1
            -top-1
            flex
            h-5
            min-w-[25px]
            items-center
            justify-center
            rounded-full
            bg-red-500
            px-1
            text-[10px]
            font-bold
            text-white
          '
        >
          {cartItems.length}
        </span>
      )}
    </Button>
  );
}
