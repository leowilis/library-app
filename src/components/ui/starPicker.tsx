import { useState } from "react"
import { Star } from "lucide-react"

interface StarPickerProps {
  value: number
  onChange: (value: number) => void
  size?: number
}

export default function StarPicker({ value, onChange, size = 36 }: StarPickerProps) {
  const [hovered, setHovered] = useState(0)

  return (
    <div className="flex justify-center gap-2">
      {[1, 2, 3, 4, 5].map((i) => (
        <button
          key={i}
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(0)}
          onClick={() => onChange(i)}
        >
          <Star
            size={size}
            fill={(hovered || value) >= i ? "#fdb022" : "#e5e7eb"}
            color={(hovered || value) >= i ? "#fdb022" : "#e5e7eb"}
          />
        </button>
      ))}
    </div>
  )
}