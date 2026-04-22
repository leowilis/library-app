import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Trash2 } from 'lucide-react'
import { useMyReviews } from '@/hooks/useMe'
import { useDeleteReview } from '@/hooks/useReviews'
import { ROUTES } from '@/constants'
import { formatDateTime } from '@/lib/utils'
import { toast } from 'sonner'
import StarRating from '@/components/ui/starRating'
import DeleteReviewModal from '@/components/user/DeleteReviewModal'

export default function ReviewsTab() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [deleteReviewId, setDeleteReviewId] = useState<number | null>(null)
  const { data: reviewsData, isLoading } = useMyReviews({ q: search })
  const { mutate: deleteReview, isPending: isDeleting } = useDeleteReview()
  const reviews = reviewsData?.data?.reviews ?? []

  const handleConfirmDelete = () => {
    if (!deleteReviewId) return
    deleteReview(deleteReviewId, {
      onSuccess: () => {
        toast.success('Review deleted!')
        setDeleteReviewId(null)
      },
      onError: () => toast.error('Failed to delete review'),
    })
  }

  return (
    <div className='space-y-4'>
      <h1 className='text-2xl font-bold text-gray-900'>Reviews</h1>

      <div className='flex items-center gap-2 bg-white rounded-full px-4 py-3 border border-gray-200'>
        <Search size={16} className='text-gray-400' />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder='Search book'
          className='flex-1 text-sm bg-transparent outline-none text-gray-700'
        />
      </div>

      {isLoading && (
        <div className='space-y-4'>
          {[1, 2, 3].map((i) => (
            <div key={i} className='animate-pulse space-y-2 border-b border-gray-100 pb-6'>
              <div className='h-3 w-1/4 bg-gray-100 rounded' />
              <div className='flex gap-3'>
                <div className='w-14 h-20 bg-gray-100 rounded-xl' />
                <div className='flex-1 space-y-2'>
                  <div className='h-3 w-1/3 bg-gray-100 rounded' />
                  <div className='h-4 w-2/3 bg-gray-100 rounded' />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {!isLoading && reviews.length === 0 && (
        <div className='flex flex-col items-center py-16 gap-3 text-gray-400'>
          <span className='text-4xl'>⭐</span>
          <p className='text-sm font-semibold'>No reviews yet</p>
        </div>
      )}

      {!isLoading && reviews.length > 0 && (
        <div className='space-y-6'>
          {reviews.map((review: any) => (
            <div key={review.id} className='space-y-3 border-b border-gray-100 pb-6'>
              <div className='flex items-center justify-between'>
                <p className='text-sm text-gray-400'>{formatDateTime(review.createdAt)}</p>
                <button
                  onClick={() => setDeleteReviewId(review.id)}
                  className='p-1.5 text-gray-400 hover:text-red-500 transition-colors'
                >
                  <Trash2 size={16} />
                </button>
              </div>

              <div
                className='flex gap-3 cursor-pointer'
                onClick={() => navigate(ROUTES.BookDetail(review.book?.id))}
              >
                <div className='w-14 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100'>
                  {review.book?.coverImage ? (
                    <img src={review.book.coverImage} alt={review.book.title} className='w-full h-full object-cover' />
                  ) : (
                    <div className='w-full h-full flex items-center justify-center text-xl bg-blue-50'>📚</div>
                  )}
                </div>
                <div className='flex-1 min-w-0 space-y-1'>
                  <span className='inline-block text-xs font-semibold px-2 py-0.5 rounded-full border border-gray-300 text-gray-500'>
                    {review.book?.category?.name}
                  </span>
                  <p className='text-sm font-bold text-gray-900'>{review.book?.title}</p>
                  <p className='text-xs text-gray-500'>{review.book?.author?.name}</p>
                </div>
              </div>

              <StarRating rating={review.star ?? review.rating} />
              <p className='text-sm text-gray-600 leading-relaxed'>{review.comment}</p>
            </div>
          ))}
        </div>
      )}

      {deleteReviewId && (
        <DeleteReviewModal
          isLoading={isDeleting}
          onConfirm={handleConfirmDelete}
          onCancel={() => setDeleteReviewId(null)}
        />
      )}
    </div>
  )
}