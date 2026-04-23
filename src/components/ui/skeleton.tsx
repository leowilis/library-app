// Reusable skeleton loader for loading states
export function SkeletonCard() {
  return (
    <div className='bg-white rounded-2xl p-4 shadow-sm animate-pulse'>
      <div className='h-4 w-1/3 bg-gray-100 rounded mb-3' />
      <div className='h-20 bg-gray-100 rounded' />
    </div>
  );
}

export function SkeletonBookCard() {
  return <div className='h-56 rounded-2xl bg-gray-100 animate-pulse' />;
}

export function SkeletonReviewCard() {
  return (
    <div className='animate-pulse space-y-2 border-b border-gray-100 pb-6'>
      <div className='h-3 w-1/4 bg-gray-100 rounded' />
      <div className='flex gap-3'>
        <div className='w-14 h-20 bg-gray-100 rounded-xl' />
        <div className='flex-1 space-y-2'>
          <div className='h-3 w-1/3 bg-gray-100 rounded' />
          <div className='h-4 w-2/3 bg-gray-100 rounded' />
        </div>
      </div>
    </div>
  );
}

export function SkeletonProfileCard() {
  return (
    <div className='bg-white rounded-2xl p-5 shadow-sm space-y-6 md:p-8 md:max-w-2xl'>
      <div className='w-16 h-16 rounded-full bg-gray-100 animate-pulse' />
      {[1, 2, 3].map((i) => (
        <div key={i} className='flex justify-between py-4'>
          <div className='h-4 w-24 bg-gray-100 rounded animate-pulse' />
          <div className='h-4 w-32 bg-gray-100 rounded animate-pulse' />
        </div>
      ))}
      <div className='grid grid-cols-2 gap-3'>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className='h-20 bg-gray-100 rounded-2xl animate-pulse' />
        ))}
      </div>
    </div>
  );
}

export function SkeletonCategoryCard() {
  return <div className='h-28 rounded-2xl bg-gray-100 animate-pulse' />;
}

export function SkeletonAuthorCard() {
  return <div className='h-40 rounded-2xl bg-gray-100 animate-pulse' />
}