import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useBookDetail } from '@/hooks/useBooks'
import { useRecommendedBooks } from '@/hooks/useBooks'
import { useCreateReview } from '@/hooks/useReviews'
import { useSelector } from 'react-redux'
import type { RootState } from '@/store/index'
import { ROUTES } from '@/constants'
import { toast } from 'sonner'
import { Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import BookCard from '@/common/BookCard'
import AvatarIcon from '@/assets/avatar/avatar.svg'
import { formatDate } from '@/lib/utils'

function StarRating({ rating, size = 16 }: { rating: number; size?: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={size}
          fill={i <= Math.round(rating) ? '#fdb022' : 'transparent'}
          color={i <= Math.round(rating) ? '#fdb022' : '#d1d5db'}
        />
      ))}
    </div>
  )
}

function ReviewModal({ bookId, onClose }: { bookId: number; onClose: () => void }) {
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
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white w-full rounded-t-3xl p-6 space-y-5">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-900">Give Review</h3>
          <button onClick={onClose} className="text-gray-400 text-2xl leading-none">×</button>
        </div>
        <div className="space-y-2 text-center">
          <p className="text-sm font-semibold text-gray-700">Give Rating</p>
          <div className="flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <button key={i} onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(0)} onClick={() => setRating(i)}>
                <Star size={36} fill={(hovered || rating) >= i ? '#fdb022' : '#e5e7eb'} color={(hovered || rating) >= i ? '#fdb022' : '#e5e7eb'} />
              </button>
            ))}
          </div>
        </div>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Please share your thoughts about this book"
          rows={4}
          className="w-full border border-gray-200 rounded-2xl px-4 py-3 text-sm text-gray-700 focus:outline-none focus:border-blue-400 resize-none"
        />
        <Button onClick={handleSend} disabled={isPending} className="w-full rounded-full py-6 font-semibold text-white" style={{ backgroundColor: 'var(--primary-300)' }}>
          {isPending ? 'Sending...' : 'Send'}
        </Button>
      </div>
    </div>
  )
}

export default function BookDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { token } = useSelector((state: RootState) => state.auth)
  const [showReview, setShowReview] = useState(false)
  const [reviewPage, setReviewPage] = useState(1)

  const { data: bookData, isLoading } = useBookDetail(Number(id))
  const book = bookData?.data?.book ?? bookData?.data

  const { data: relatedBooks } = useRecommendedBooks({
    by: 'rating',
    categoryId: book?.categoryId,
    limit: 6,
  })

  if (isLoading) {
    return (
      <div className="space-y-4 px-4 py-4">
        <div className="h-64 rounded-2xl bg-gray-100 animate-pulse" />
        <div className="h-6 w-2/3 rounded bg-gray-100 animate-pulse" />
        <div className="h-4 w-1/3 rounded bg-gray-100 animate-pulse" />
      </div>
    )
  }

  if (!book) return <p className="text-center py-10 text-gray-400">Book not found</p>

  const reviews = book.reviews ?? []
  const visibleReviews = reviews.slice(0, reviewPage * 3)

  return (
    <div className="pb-32">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1 px-4 py-3 text-xs text-blue-500">
        <button onClick={() => navigate(ROUTES.Home)} className="hover:text-gray-600">Home</button>
        <span>›</span>
        <span>{book.category?.name}</span>
        <span>›</span>
        <span className="text-gray-600 line-clamp-1">{book.title}</span>
      </div>

      {/* Cover */}
      <div className="px-4">
        <div className="w-full rounded-2xl overflow-hidden ">
          <img src={book.coverImage} alt={book.title} className="w-full object-contain max-h-[420px]" />
        </div>
      </div>

      {/* Info */}
      <div className="px-4 mt-4 space-y-3">
        <p className="text-xs font-semibold text-gray-400">{book.category?.name}</p>
        <h1 className="text-2xl font-bold text-gray-900">{book.title}</h1>
        <p className="text-sm text-gray-500">{book.author?.name}</p>

        <div className="flex items-center gap-1">
          <Star size={16} fill="#fdb022" color="#fdb022" />
          <span className="text-sm font-bold text-gray-800">{book.rating}</span>
        </div>

        {/* Stats */}
        <div className="flex gap-6 py-3 border-t border-b border-gray-100">
          {[
            { label: 'Page', value: book.totalPages ?? '-' },
            { label: 'Rating', value: book.reviewCount ?? 0 },
            { label: 'Reviews', value: book.reviewCount ?? 0 },
          ].map(({ label, value }) => (
            <div key={label} className="flex flex-col items-center gap-0.5">
              <span className="text-base font-bold text-gray-900">{value}</span>
              <span className="text-xs text-gray-400">{label}</span>
            </div>
          ))}
        </div>

        {/* Description */}
        <div>
          <h2 className="text-base font-bold text-gray-900 mb-2">Description</h2>
          <p className="text-sm text-gray-600 leading-relaxed">{book.description}</p>
        </div>
      </div>

      {/* Reviews */}
      <div className="px-4 mt-6 space-y-4">
        <div className="flex items-center gap-2">
          <h2 className="text-base font-bold text-gray-900">Review</h2>
          <div className="flex items-center gap-1">
            <Star size={14} fill="#fdb022" color="#fdb022" />
            <span className="text-sm font-bold text-gray-800">{book.rating}</span>
            <span className="text-xs text-gray-400">({book.reviewCount} Ulasan)</span>
          </div>
        </div>

        <div className="space-y-5">
          {reviews.length === 0 ? (
            <p className="text-sm text-gray-400">No reviews yet</p>
          ) : (
            visibleReviews.map((review: any) => (
              <div key={review.id} className="space-y-2">
                <div className="flex items-center gap-2">
                  <img src={review.user?.profilePhoto ?? AvatarIcon} alt={review.user?.name} className="w-9 h-9 rounded-full object-cover" />
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{review.user?.name}</p>
                    <p className="text-xs text-gray-400">{formatDate(review.createdAt)}</p>
                  </div>
                </div>
                <StarRating rating={review.star ?? review.rating} />
                <p className="text-sm text-gray-600 leading-relaxed">{review.comment}</p>
              </div>
            ))
          )}
        </div>

        {visibleReviews.length < reviews.length && (
          <div className="flex justify-center">
            <button
              onClick={() => setReviewPage((p) => p + 1)}
              className="px-8 py-2 rounded-full text-sm font-semibold text-gray-700 border border-gray-300"
            >
              Load More
            </button>
          </div>
        )}
      </div>

      {/* Related Books */}
      {relatedBooks && relatedBooks.length > 0 && (
        <div className="px-4 mt-8 space-y-4">
          <h2 className="text-base font-bold text-gray-900">Related Books</h2>
          <div className="grid grid-cols-2 gap-4">
            {relatedBooks
              .filter((b: any) => b.id !== book.id)
              .slice(0, 4)
              .map((b: any) => (
                <BookCard key={b.id} book={b} onClick={() => navigate(ROUTES.BookDetail(b.id))} />
              ))}
          </div>
        </div>
      )}

      {/* Fixed bottom buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-4 py-4 flex gap-3">
        <Button
          variant="outline"
          className="flex-1 rounded-full py-6 font-semibold border-2"
          style={{ borderColor: 'var(--primary-300)', color: 'var(--primary-300)' }}
          onClick={() => navigate(ROUTES.Cart)}
        >
          Add to Cart
        </Button>
        <Button
          className="flex-1 rounded-full py-6 font-semibold text-white"
          style={{ backgroundColor: 'var(--primary-300)' }}
          onClick={() => {
            if (!token) return navigate(ROUTES.Login)
            setShowReview(true)
          }}
        >
          Borrow Book
        </Button>
      </div>

      {showReview && <ReviewModal bookId={book.id} onClose={() => setShowReview(false)} />}
    </div>
  )
}