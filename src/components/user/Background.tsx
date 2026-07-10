import { useEffect, useState } from 'react';

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
    <section className='w-full' aria-label='Book promotion banners'>
      {/* Banner */}
      <div className='overflow-hidden rounded-2xl'>
        <img
          src={banners[current]}
          alt={`Book promotion banner ${current + 1}`}
          className='w-full object-cover'
        />
      </div>

      {/* Pagination */}
      <div
        className='mt-3 flex justify-center gap-1.5'
        aria-label='Banner navigation'
      >
        {banners.map((_, index) => (
          <button
            key={index}
            type='button'
            aria-label={`Go to banner ${index + 1}`}
            aria-current={index === current}
            onClick={() => setCurrent(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === current
                ? 'w-3 bg-blue-600'
                : 'w-2 bg-blue-300 hover:bg-blue-400'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
