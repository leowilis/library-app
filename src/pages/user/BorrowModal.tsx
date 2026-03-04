import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ROUTES } from "@/constants"

interface BorrowModalProps {
  bookId: number
  bookTitle: string
  book: any
  onClose: () => void
}

const DAY_OPTIONS = [3, 7, 14, 30]

export default function BorrowModal({ bookId, bookTitle, book, onClose }: BorrowModalProps) {
  const [days, setDays] = useState(7)
  const navigate = useNavigate()

  const handleBorrow = () => {
    onClose()
    navigate(ROUTES.CheckOut, {
      state: {
        books: [{ ...book, id: bookId, title: bookTitle }],
        defaultDays: { [bookId]: days },
      },
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center md:items-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white w-full md:w-[420px] rounded-t-3xl md:rounded-3xl p-6 space-y-5">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-900">Borrow Book</h3>
          <button onClick={onClose} className="text-gray-400 text-2xl leading-none">x</button>
        </div>
        <p className="text-sm text-gray-500 line-clamp-2">{bookTitle}</p>
        <div className="space-y-2">
          <p className="text-sm font-semibold text-gray-700">Borrow Duration</p>
          <div className="grid grid-cols-4 gap-2">
            {DAY_OPTIONS.map((d) => (
              <button
                key={d}
                onClick={() => setDays(d)}
                className="py-2 rounded-xl text-sm font-semibold border-2 transition-all"
                style={{
                  backgroundColor: days === d ? "#E0ECFF" : "white",
                  borderColor: days === d ? "#1c65da" : "#e5e7eb",
                  color: days === d ? "#1c65da" : "#374151",
                }}
              >
                {d} days
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-sm font-semibold text-gray-700">Or enter custom days</p>
          <input
            type="number"
            min={1}
            max={90}
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-blue-400"
          />
        </div>
        <button
          onClick={handleBorrow}
          className="w-full py-3.5 rounded-full font-semibold text-white text-sm"
          style={{ backgroundColor: "#1c65da" }}
        >
          Borrow for {days} days
        </button>
      </div>
    </div>
  )
}