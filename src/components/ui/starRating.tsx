import { Star } from "lucide-react"

interface StarRatingProps {
  rating: number
  size?: number
  showValue?: boolean
}

export default function StarRating({ rating, size = 16, showValue = false }: StarRatingProps) {
  if (showValue) {
    return (
      <div className="flex items-center gap-1">
        <Star size={size} fill="#fdb022" color="#fdb022" />
        <span className="text-sm font-semibold text-gray-700">{rating}</span>
      </div>
    )
  }

  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={size}
          fill={i <= Math.round(rating) ? "#fdb022" : "transparent"}
          color={i <= Math.round(rating) ? "#fdb022" : "#d1d5db"}
        />
      ))}
    </div>
  )
}