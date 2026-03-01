import bannerBg from '@/assets/background/background.svg'

export default function HeroBanner() {
  return (
    <div className="relative w-full rounded-2xl overflow-hidden">
      <img
        src={bannerBg}
        alt="Welcome to Booky"
        className="w-full object-cover"
      />
    </div>
  )
}