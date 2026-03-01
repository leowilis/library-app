import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search } from 'lucide-react'
import { useMyReviews } from '@/hooks/useMe'
import { ROUTES } from '@/constants'
import { formatDateTime } from '@/lib/utils'
import StarRating from '@/assets/icon/Star.svg'

export default function ReviewsTab() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const { data: reviewsData } = useMyReviews({ q: search })
  const reviews = reviewsData?.data?.reviews ?? []

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-gray-900">Reviews</h1>

      <div className="flex items-center gap-2 bg-white rounded-full px-4 py-3 border border-gray-200">
        <Search size={16} className="text-gray-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search book"
          className="flex-1 text-sm bg-transparent outline-none text-gray-700"
        />
      </div>

      <div className="space-y-6">
        {reviews.length === 0 ? (
          <p className="text-center text-gray-400 py-10">No reviews yet</p>
        ) : (
          reviews.map((review: any) => (
            <div key={review.id} className="space-y-3 border-b border-gray-100 pb-6">
              <p className="text-sm text-gray-400">{formatDateTime(review.createdAt)}</p>

              <div
                className="flex gap-3 cursor-pointer"
                onClick={() => navigate(ROUTES.BookDetail(review.book?.id))}
              >
                <div className="w-14 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
                  {review.book?.coverImage ? (
                    <img src={review.book.coverImage} alt={review.book.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xl"
                      style={{ backgroundColor: 'var(--primary-200)' }}>📚</div>
                  )}
                </div>
                <div className="flex-1 min-w-0 space-y-1">
                  <span className="inline-block text-xs font-semibold px-2 py-0.5 rounded-full border border-gray-300 text-gray-500">
                    {review.book?.category?.name}
                  </span>
                  <p className="text-sm font-bold text-gray-900">{review.book?.title}</p>
                  <p className="text-xs text-gray-500">{review.book?.author?.name}</p>
                </div>
              </div>

              <StarRating />
              <p className="text-sm text-gray-600 leading-relaxed">{review.comment}</p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}