import { useState } from 'react'
import { Star, X } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { useCreateReview } from '@/hooks/useReviews'

interface ReviewModalProps {
  bookId: number
  onClose: () => void
}

export default function ReviewModal({ bookId, onClose }: ReviewModalProps) {
  const [rating, setRating] = useState(0)
  const [hovered, setHovered] = useState(0)
  const [comment, setComment] = useState('')
  const { mutate: createReview, isPending } = useCreateReview()

  const handleSend = () => {
    if (rating === 0) return toast.error('Please give a rating')
    if (!comment.trim()) return toast.error('Please write a comment')

    createReview(
      { bookId, star: rating, comment },
      {
        onSuccess: () => { toast.success('Review submitted!'); onClose() },
        onError: () => toast.error('Failed to submit review'),
      }
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white w-full max-w-md rounded-3xl p-6 space-y-5">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-900">Give Review</h3>
          <button onClick={onClose} className="text-gray-400"><X size={20} /></button>
        </div>

        <div className="space-y-2 text-center">
          <p className="text-sm font-semibold text-gray-700">Give Rating</p>
          <div className="flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <button
                key={i}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(0)}
                onClick={() => setRating(i)}
              >
                <Star
                  size={36}
                  fill={(hovered || rating) >= i ? 'var(--accent-yellow)' : '#e5e7eb'}
                  color={(hovered || rating) >= i ? 'var(--accent-yellow)' : '#e5e7eb'}
                />
              </button>
            ))}
          </div>
        </div>

        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Please share your thoughts about this book"
          rows={5}
          className="w-full border border-gray-200 rounded-2xl px-4 py-3 text-sm text-gray-700 focus:outline-none focus:border-blue-400 resize-none"
        />

        <Button
          onClick={handleSend}
          disabled={isPending}
          className="w-full rounded-full py-6 font-semibold text-white"
          style={{ backgroundColor: 'var(--primary-300)' }}
        >
          {isPending ? 'Sending...' : 'Send'}
        </Button>
      </div>
    </div>
  )
}