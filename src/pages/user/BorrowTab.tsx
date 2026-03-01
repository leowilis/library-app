import { useState } from 'react'
import { Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useMyLoansProfile } from '@/hooks/useMe'
import { formatDate } from '@/lib/utils'
import ReviewModal from './ReviewModal'

type LoanStatus = 'BORROWED' | 'LATE' | 'RETURNED' | undefined

const STATUS_FILTERS = [
  { label: 'All', value: undefined },
  { label: 'Active', value: 'BORROWED' as const },
  { label: 'Returned', value: 'RETURNED' as const },
  { label: 'Overdue', value: 'LATE' as const },
]

const STATUS_COLOR: Record<string, string> = {
  BORROWED: 'var(--accent-green)',
  RETURNED: '#6b7280',
  LATE: 'var(--accent-red)',
}

const STATUS_LABEL: Record<string, string> = {
  BORROWED: 'Active',
  RETURNED: 'Returned',
  LATE: 'Overdue',
}

export default function BorrowedTab() {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState<LoanStatus>(undefined)
  const [reviewBookId, setReviewBookId] = useState<number | null>(null)

  const { data: loansData } = useMyLoansProfile({ status, limit: 20 })
  const loans = loansData?.data?.loans ?? []

  const filtered = loans.filter((loan: any) =>
    loan.book?.title?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-gray-900">Borrowed List</h1>

      <div className="flex items-center gap-2 bg-white rounded-full px-4 py-3 border border-gray-200">
        <Search size={16} className="text-gray-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search book"
          className="flex-1 text-sm bg-transparent outline-none text-gray-700"
        />
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {STATUS_FILTERS.map(({ label, value }) => (
          <button
            key={label}
            onClick={() => setStatus(value)}
            className="flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold border-2 transition-all"
            style={{
              backgroundColor: status === value ? 'var(--primary-200)' : 'white',
              borderColor: status === value ? 'var(--primary-300)' : '#e5e7eb',
              color: status === value ? 'var(--primary-300)' : '#374151',
            }}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filtered.length === 0 ? (
          <p className="text-center text-gray-400 py-10">No loans found</p>
        ) : (
          filtered.map((loan: any) => (
            <div key={loan.id} className="bg-white rounded-2xl p-4 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">Status</span>
                  <span className="text-sm font-bold" style={{ color: STATUS_COLOR[loan.status] }}>
                    {STATUS_LABEL[loan.status]}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">Due Date</span>
                  <span className="text-sm font-bold" style={{ color: 'var(--accent-red)' }}>
                    {formatDate(loan.dueAt)}
                  </span>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-16 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
                  {loan.book?.coverImage ? (
                    <img src={loan.book.coverImage} alt={loan.book.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-2xl"
                      style={{ backgroundColor: 'var(--primary-200)' }}>📚</div>
                  )}
                </div>
                <div className="flex-1 min-w-0 space-y-1">
                  <span className="inline-block text-xs font-semibold px-2 py-0.5 rounded-full border border-gray-300 text-gray-500">
                    {loan.book?.category?.name}
                  </span>
                  <p className="text-sm font-bold text-gray-900">{loan.book?.title}</p>
                  <p className="text-xs text-gray-500">{loan.book?.author?.name}</p>
                  <p className="text-xs text-gray-400">
                    {formatDate(loan.borrowedAt)} · Duration {loan.durationDays} Days
                  </p>
                </div>
              </div>

              <Button
                onClick={() => setReviewBookId(loan.book?.id)}
                className="w-full rounded-full py-5 font-semibold text-white"
                style={{ backgroundColor: 'var(--primary-300)' }}
              >
                Give Review
              </Button>
            </div>
          ))
        )}
      </div>

      {reviewBookId && (
        <ReviewModal bookId={reviewBookId} onClose={() => setReviewBookId(null)} />
      )}
    </div>
  )
}