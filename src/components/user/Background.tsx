import { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

import bannerBg from '@/assets/background/background.png';

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
      <div className='relative overflow-hidden rounded-2xl'>
        <img
          src={banners[current]}
          alt={`Book promotion banner ${current + 1}`}
          loading='eager'
          draggable={false}
          className='w-full object-cover'
        />

        <div
          aria-label='Banner navigation'
          className='absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2'
        >
          {banners.map((_, index) => (
            <button
              key={index}
              type='button'
              onClick={() => setCurrent(index)}
              className={cn(
                'h-2 rounded-full transition-all duration-300',
                current === index
                  ? 'w-8 bg-white'
                  : 'w-2 bg-white/50 hover:bg-white/80',
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
