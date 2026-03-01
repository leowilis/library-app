import { useState, useEffect } from 'react'
import bannerBg from '@/assets/background/background.svg'

const banners = [bannerBg, bannerBg, bannerBg]

export default function Background() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (banners.length <= 1) return
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="w-full">
      {/* Banner image */}
      <div className="w-full rounded-2xl overflow-hidden">
        <img
          src={banners[current]}
          alt="Banner"
          className="w-full object-cover"
        />
      </div>

      {/* Pagination dots */}
      <div className="flex justify-center gap-1.5 mt-3">
        {banners.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === current ? '12px' : '8px',
              height: '8px',
              backgroundColor: i === current ? '#1c65da' : '#93c5fd',
            }}
          />
        ))}
      </div>
    </div>
  )
}