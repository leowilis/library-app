import { Trash2 } from 'lucide-react'

interface DeleteReviewModalProps {
  onConfirm: () => void
  onCancel: () => void
  isLoading: boolean
}

export default function DeleteReviewModal({ onConfirm, onCancel, isLoading }: DeleteReviewModalProps) {
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center px-4'>
      <div className='absolute inset-0 bg-black/40' onClick={onCancel} />
      <div className='relative bg-white w-full max-w-sm rounded-3xl p-6 space-y-5'>
        <div className='flex justify-center'>
          <div className='w-14 h-14 rounded-full bg-red-50 flex items-center justify-center'>
            <Trash2 size={28} className='text-red-500' />
          </div>
        </div>
        <div className='text-center space-y-2'>
          <h3 className='text-lg font-bold text-gray-900'>Delete Review?</h3>
          <p className='text-sm text-gray-500'>Are you sure you want to delete this review? This action cannot be undone.</p>
        </div>
        <div className='flex gap-3 pt-1'>
          <button
            onClick={onCancel}
            disabled={isLoading}
            className='flex-1 py-3 rounded-full text-sm font-semibold border-2 transition-all hover:bg-gray-50 disabled:opacity-50'
            style={{ borderColor: '#e5e7eb', color: '#374151' }}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className='flex-1 py-3 rounded-full text-sm font-semibold text-white transition-all hover:bg-red-600 disabled:opacity-50 bg-red-500'
          >
            {isLoading ? 'Deleting...' : 'Yes, Delete'}
          </button>
        </div>
      </div>
    </div>
  )
}