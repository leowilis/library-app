import clsx from 'clsx';

interface SkeletonProps {
  className?: string;
}

function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      aria-hidden='true'
      className={clsx('animate-pulse rounded bg-gray-100', className)}
    />
  );
}

// Reusable skeleton loader for loading states
export function SkeletonCard() {
  return (
    <div className='bg-white rounded-2xl p-4 shadow-sm animate-pulse'>
      <Skeleton className='h-4 w-1/3 bg-gray-100 rounded mb-3' />
      <Skeleton className='h-20 bg-gray-100 rounded' />
    </div>
  );
}

export function SkeletonBookCard() {
  return <Skeleton className='h-56 rounded-2xl bg-gray-100 animate-pulse' />;
}

export function SkeletonReviewCard() {
  return (
    <div className='animate-pulse space-y-2 border-b border-gray-100 pb-6'>
      <Skeleton className='h-3 w-1/4 bg-gray-100 rounded' />
      <div className='flex gap-3'>
        <Skeleton className='w-14 h-20 bg-gray-100 rounded-xl' />
        <div className='flex-1 space-y-2'>
          <Skeleton className='h-3 w-1/3 bg-gray-100 rounded' />
          <Skeleton className='h-4 w-2/3 bg-gray-100 rounded' />
        </div>
      </div>
    </div>
  );
}

export function SkeletonProfileCard() {
  return (
    <div className='bg-white rounded-2xl p-5 shadow-sm space-y-6 md:p-8 md:max-w-2xl'>
      <Skeleton className='w-16 h-16 rounded-full bg-gray-100 animate-pulse' />
      {[1, 2, 3].map((i) => (
        <div key={i} className='flex justify-between py-4'>
          <Skeleton className='h-4 w-24 bg-gray-100 rounded animate-pulse' />
          <Skeleton className='h-4 w-32 bg-gray-100 rounded animate-pulse' />
        </div>
      ))}
      <div className='grid grid-cols-2 gap-3'>
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className='h-20 bg-gray-100 rounded-2xl animate-pulse' />
        ))}
      </div>
    </div>
  );
}

export function SkeletonCategoryCard() {
  return <Skeleton className='h-28 rounded-2xl bg-gray-100 animate-pulse' />;
}

export function SkeletonAuthorCard() {
  return <Skeleton className='h-40 rounded-2xl bg-gray-100 animate-pulse' />;
}

export function SkeletonBookDetail() {
  return (
    <div className='space-y-4 px-4 py-4 animate-pulse'>
      <Skeleton className='h-64 rounded-2xl bg-gray-100' />
      <Skeleton className='h-6 w-2/3 rounded bg-gray-100' />
      <Skeleton className='h-4 w-1/3 rounded bg-gray-100' />
    </div>
  );
}

export function SkeletonTable({
  rows = 5,
  columns = 6,
}: {
  rows?: number;
  columns?: number;
}) {
  return (
    <>
      {Array.from({ length: rows }).map((_, row) => (
        <tr key={row}>
          {Array.from({ length: columns }).map((_, col) => (
            <td key={col} className='bg-white px-4 py-3'>
              <Skeleton className='h-4 w-full' />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}

export default Skeleton;
