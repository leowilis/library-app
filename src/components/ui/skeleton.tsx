import clsx from 'clsx';

interface SkeletonProps {
  className?: string;
}

/**
 * Skeleton Atom Component — The baseline pulsating placeholder engine.
 * Fully optimized with unified theme management classes.
 */
function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      aria-hidden='true'
      className={clsx('animate-pulse rounded bg-gray-100', className)}
    />
  );
}

// Reusable skeleton variants for layout loading states
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
          <Skeleton
            key={i}
            className='h-20 bg-gray-100 rounded-2xl animate-pulse'
          />
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

export function SkeletonBookPreview() {
  return (
    <section aria-label='Loading book preview' className='max-w-5xl space-y-8'>
      {/* Back Button */}
      <Skeleton className='h-5 w-36' />
      {/* Main Content */}
      <div className='md:flex md:gap-10'>
        {/* Cover */}
        <Skeleton className='h-80 w-full md:w-56' />
        {/* Book Information */}
        <div className='mt-6 flex-1 space-y-4 md:mt-0'>
          <Skeleton className='h-6 w-24' />
          <Skeleton className='h-9 w-3/4' />
          <Skeleton className='h-4 w-40' />
          <Skeleton className='h-5 w-32' />
          {/* Statistics */}
          <div className='flex gap-8 border-y border-gray-100 py-4'>
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className='space-y-2'>
                <Skeleton className='h-6 w-10' />
                <Skeleton className='h-3 w-14' />
              </div>
            ))}
          </div>
          {/* Description */}
          <div className='space-y-3'>
            <Skeleton className='h-5 w-28' />
            <div className='space-y-2'>
              <Skeleton className='h-4' />
              <Skeleton className='h-4' />
              <Skeleton className='h-4 w-3/4' />
            </div>
          </div>
        </div>
      </div>
      {/* Reviews */}
      <div className='space-y-4'>
        <Skeleton className='h-6 w-32' />
        <div className='grid gap-4 md:grid-cols-2'>
          {Array.from({ length: 2 }).map((_, index) => (
            <SkeletonReviewCard key={index} />
          ))}
        </div>
      </div>
      {/* Related Books */}
      <div className='space-y-4'>
        <Skeleton className='h-6 w-40' />
        <div className='grid grid-cols-2 gap-4 md:grid-cols-5'>
          {Array.from({ length: 5 }).map((_, index) => (
            <SkeletonBookCard key={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function BorrowedSkeleton() {
  return (
    <div className='space-y-3'>
      {Array.from({ length: 3 }).map((_, index) => (
        <Skeleton key={index} className='h-32 rounded-2xl' />
      ))}
    </div>
  );
}

export function UserSkeleton() {
  return (
    <div className='space-y-3'>
      {Array.from({ length: 10 }).map((_, index) => (
        <Skeleton
          key={index}
          className='h-14 rounded-xl bg-gray-100 animate-pulse'
        />
      ))}
    </div>
  );
}

export function SkeletonCheckout() {
  return (
    <section aria-labelledby='checkout-loading' className='space-y-8'>
      <h1 id='checkout-loading' className='sr-only'>
        Loading checkout
      </h1>
      <Skeleton className='h-10 w-48 rounded-xl' />
      <div className='grid gap-8 lg:grid-cols-[1fr_380px]'>
        {/* Left */}
        <div className='space-y-8'>
          {/* User Information */}
          <div className='rounded-2xl border bg-white p-6'>
            <Skeleton className='mb-6 h-6 w-48' />

            <div className='space-y-4'>
              <Skeleton className='h-14 w-full rounded-xl' />
              <Skeleton className='h-14 w-full rounded-xl' />
            </div>
          </div>
          {/* Book List */}
          <div className='rounded-2xl border bg-white p-6'>
            <Skeleton className='mb-6 h-6 w-40' />
            <div className='space-y-5'>
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className='flex gap-4'>
                  <Skeleton className='h-28 w-20 rounded-xl' />
                  <div className='flex-1 space-y-3'>
                    <Skeleton className='h-5 w-2/3' />
                    <Skeleton className='h-4 w-40' />
                    <Skeleton className='h-4 w-28' />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Right */}
        <aside className='rounded-2xl border bg-white p-6'>
          <Skeleton className='mb-6 h-6 w-56' />
          <div className='space-y-5'>
            <Skeleton className='h-5 w-40' />
            <div className='grid grid-cols-2 gap-3'>
              {Array.from({ length: 4 }).map((_, index) => (
                <Skeleton key={index} className='h-11 rounded-xl' />
              ))}
            </div>
            <Skeleton className='h-12 w-full rounded-xl' />
            <Skeleton className='h-5 w-3/4' />
            <Skeleton className='h-12 w-full rounded-full' />
          </div>
        </aside>
      </div>
    </section>
  );
}

export function SkeletonCartPage() {
  return (
    <section aria-labelledby='cart-loading' className='space-y-8'>
      <h1 id='cart-loading' className='sr-only'>
        Loading cart
      </h1>
      {/* Title */}
      <Skeleton className='h-10 w-40 rounded-xl' />
      <div className='grid gap-8 lg:grid-cols-[1fr_340px]'>
        {/* Cart Items */}
        <div className='space-y-5'>
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className='flex gap-4 rounded-2xl border bg-white p-4'
            >
              <Skeleton className='h-32 w-24 rounded-xl' />
              <div className='flex flex-1 flex-col justify-between'>
                <div className='space-y-3'>
                  <Skeleton className='h-5 w-3/4 rounded-md' />
                  <Skeleton className='h-4 w-40 rounded-md' />
                  <Skeleton className='h-4 w-28 rounded-md' />
                </div>
                <div className='flex items-center justify-between'>
                  <Skeleton className='h-8 w-24 rounded-full' />
                  <Skeleton className='h-10 w-10 rounded-full' />
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Summary */}
        <aside className='rounded-2xl border bg-white p-6'>
          <Skeleton className='mb-6 h-6 w-32 rounded-md' />
          <div className='space-y-4'>
            <div className='flex justify-between'>
              <Skeleton className='h-4 w-20 rounded-md' />
              <Skeleton className='h-4 w-10 rounded-md' />
            </div>
            <div className='flex justify-between'>
              <Skeleton className='h-4 w-28 rounded-md' />
              <Skeleton className='h-4 w-16 rounded-md' />
            </div>
            <Skeleton className='h-px w-full' />
            <Skeleton className='h-12 w-full rounded-full' />
          </div>
        </aside>
      </div>
    </section>
  );
}

export default Skeleton;
