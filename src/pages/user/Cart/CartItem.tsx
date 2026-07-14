import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRemoveCartItem } from '@/hooks/useCart';
import type { CartItem } from '@/types/cart';

interface CartItemCardProps {
  item: CartItem;
}

export default function CartItemCard({ item }: CartItemCardProps) {
  const { mutate: removeItem, isPending } = useRemoveCartItem();
  const { book } = item;

  return (
    <div className='flex gap-5 rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm'>
      {/* Cover */}
      <div className='h-36 w-24 flex-shrink-0 overflow-hidden rounded-xl bg-neutral-100'>
        {book.coverImage ? (
          <img
            src={book.coverImage}
            alt={book.title}
            className='h-full w-full object-cover'
          />
        ) : (
          <div
            aria-hidden='true'
            className='flex h-full items-center justify-center'
          >
            📚
          </div>
        )}
      </div>

      {/* Book Information */}
      <div className='flex flex-1 flex-col justify-between'>
        <div className='space-y-2'>
          <span className='inline-block rounded-full bg-neutral-100 px-3 py-1 text-xs font-semibold text-neutral-600'>
            {book.category?.name}
          </span>
          <h3 className='text-lg font-bold text-neutral-900'>{book.title}</h3>
          <p className='text-sm text-neutral-500'>{book.author?.name}</p>
          <p className='line-clamp-2 text-sm text-neutral-600'>
            {book.description ?? 'No description available.'}
          </p>
        </div>

        {/* Remove Button */}
        <div className='mt-5 flex justify-end'>
          <Button
            type='button'
            variant='destructive'
            size='sm'
            aria-label={`Remove ${book.title} from cart`}
            disabled={isPending}
            onClick={() => removeItem(item.id)}
          >
            <Trash2 className='mr-2 h-4 w-4' />
            {isPending ? 'Removing...' : 'Remove'}
          </Button>
        </div>
      </div>
    </div>
  );
}
