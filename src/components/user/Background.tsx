import { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

import bannerBg from '@/assets/background/background.svg';

// Banner images to cycle through
const banners = [bannerBg, bannerBg, bannerBg];

/**
 * Auto-rotating image banner with pagination dots.
 *
 * - Automatically rotates every 3 seconds.
 * - Pagination dots support manual navigation.
 * - Auto rotation is disabled when only one banner exists.
 */
export default function Background() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (banners.length <= 1) return;

    const timer = window.setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 3000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section aria-label='Book promotion banners' className='w-full'>
      <div className='overflow-hidden rounded-2xl'>
        <img
          src={banners[current]}
          alt={`Book promotion banner ${current + 1}`}
          loading='eager'
          draggable={false}
          className='w-full object-cover'
        />
      </div>

      <div
        aria-label='Banner navigation'
        className='mt-3 flex justify-center gap-1.5'
      >
        {banners.map((_, index) => (
          <button
            key={index}
            type='button'
            aria-label={`Go to banner ${index + 1}`}
            aria-current={index === current ? 'true' : undefined}
            onClick={() => setCurrent(index)}
            className={cn(
              'h-2 rounded-full transition-all duration-300',
              index === current
                ? 'w-3 bg-primary'
                : 'w-2 bg-primary/30 hover:bg-primary/50',
            )}
          />
        ))}
      </div>
    </section>
  );
}
