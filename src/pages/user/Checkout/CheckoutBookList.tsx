import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRemoveCartItem } from '@/hooks/useCart';
import type { CartItem } from '@/types/cart';

interface CheckoutBookListProps {
  books?: CartItem[];
}

export default function CheckoutBookList({
  books = [],
}: CheckoutBookListProps) {
  const { mutate: removeItem, isPending } = useRemoveCartItem();

  return (
    <div className="space-y-4">
      {books.map((item) => {
        const { book } = item;

        return (
          <div
            key={item.id}
            className="flex gap-4 rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm"
          >
            {/* Cover */}
            <div className="h-30 w-22 flex-shrink-0 overflow-hidden rounded-lg bg-neutral-100">
              {book.coverImage ? (
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div
                  aria-hidden="true"
                  className="flex h-full items-center justify-center"
                >
                  📚
                </div>
              )}
            </div>

            {/* Book Information */}
            <div className="flex flex-1 flex-col justify-between">
              <div>
                <span className="inline-block rounded-full bg-neutral-100 px-2 py-1 text-[10px] font-semibold text-neutral-600">
                  {book.category?.name}
                </span>

                <h3 className="mt-2 line-clamp-1 text-sm font-bold text-neutral-900">
                  {book.title}
                </h3>

                <p className="mt-1 text-xs text-neutral-500">
                  {book.author?.name}
                </p>
              </div>

              <div className="mt-4 flex justify-end">
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  aria-label={`Remove ${book.title} from checkout`}
                  disabled={isPending}
                  onClick={() => removeItem(item.id)}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  {isPending ? 'Removing...' : 'Remove'}
                </Button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}