import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useRemoveCartItem } from '@/hooks/useCart';
import type { CartItem } from '@/types/cart';

interface CartItemCardProps {
  item: CartItem;
  isSelected: boolean;
  onToggleSelect: (checked: boolean) => void;
}

export default function CartItemCard({
  item,
  isSelected,
  onToggleSelect,
}: CartItemCardProps) {
  const { mutate: removeItem, isPending } = useRemoveCartItem();

  const { book } = item;

  return (
    <article className='flex items-start gap-4 rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm md:gap-5'>
      {/* Select */}
      <div className='pt-1'>
        <Checkbox
          id={`cart-item-${item.id}`}
          checked={isSelected}
          onCheckedChange={(checked) =>
            onToggleSelect(checked === true)
          }
          aria-label={`Select ${book.title}`}
        />
      </div>

      {/* Cover */}
      <div className='h-36 w-24 flex-shrink-0 overflow-hidden rounded-xl border border-neutral-200 bg-neutral-100'>
        {book.coverImage ? (
          <img
            src={book.coverImage}
            alt={book.title}
            className='h-full w-full object-cover'
          />
        ) : (
          <div
            aria-hidden='true'
            className='flex h-full items-center justify-center text-2xl'
          >
            📚
          </div>
        )}
      </div>

      {/* Content */}
      <div className='flex min-w-0 flex-1 flex-col justify-between self-stretch'>
        <div className='space-y-2'>
          <span className='inline-block rounded-full bg-neutral-100 px-3 py-1 text-xs font-semibold text-neutral-600'>
            {book.category?.name ?? 'Uncategorized'}
          </span>

          <h3 className='truncate text-lg font-bold text-neutral-900'>
            {book.title}
          </h3>

          <p className='truncate text-sm text-neutral-500'>
            {book.author?.name ?? 'Unknown Author'}
          </p>

          <p className='line-clamp-2 text-sm leading-relaxed text-neutral-600'>
            {book.description ?? 'No description available.'}
          </p>
        </div>

        <div className='mt-5 flex justify-end'>
          <Button
            type='button'
            variant='destructive'
            size='sm'
            disabled={isPending}
            aria-label={`Remove ${book.title} from cart`}
            onClick={() => removeItem(item.id)}
          >
            <Trash2 className='mr-2 h-4 w-4' />

            {isPending ? 'Removing...' : 'Remove'}
          </Button>
        </div>
      </div>
    </article>
  );
}