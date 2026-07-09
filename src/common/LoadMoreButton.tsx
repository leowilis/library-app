import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface LoadMoreButtonProps {
  show?: boolean;
  loading?: boolean;
  children?: React.ReactNode;
  loadingLabel?: string;
  className?: string;
  onClick: () => void;
}

export default function LoadMoreButton({
  onClick,
  show = true,
  loading = false,
  children = 'Load More',
  loadingLabel = 'Loading...',
  className = '',
}: LoadMoreButtonProps) {
  if (!show) return null;

  return (
    <div className='mt-6 flex justify-center'>
      <Button
        type='button'
        variant='outline'
        disabled={loading}
        onClick={onClick}
        className={cn('rounded-full px-10 py-2.5 font-semibold', className)}
      >
        {loading ? loadingLabel : children}
      </Button>
    </div>
  );
}
