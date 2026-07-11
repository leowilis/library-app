import { Trash2 } from 'lucide-react';

interface DeleteReviewModalProps {
  onConfirm: () => void;
  onCancel: () => void;
  isLoading: boolean;
}

/**
 * Confirmation modal for deleting a review.
 * Fully optimized with strict accessibility configurations and fluid micro-interactions.
 */
export default function DeleteReviewModal({
  onConfirm,
  onCancel,
  isLoading,
}: DeleteReviewModalProps) {
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center px-4'>
      {/* Backdrop overlay */}
      <div
        aria-hidden='true'
        className='absolute inset-0 bg-black/40'
        onClick={onCancel}
      />

      {/* Card wrapper layout */}
      <div
        role='dialog'
        aria-modal='true'
        aria-labelledby='delete-review-title'
        aria-describedby='delete-review-description'
        className='relative w-full max-w-sm space-y-5 rounded-3xl bg-white p-6'
      >
        {/* Trash bin Icon */}
        <div className='flex justify-center'>
          <div className='w-14 h-14 rounded-full bg-red-50 flex items-center justify-center'>
            <Trash2 size={28} className='text-red-500' aria-hidden='true' />
          </div>
        </div>

        {/* Text guidelines description */}
        <div className='text-center space-y-2'>
          <h3
            id='delete-review-title'
            className='text-lg font-bold text-gray-900'
          >
            Delete Review?
          </h3>
          <p id='delete-review-description' className='text-sm text-gray-500'>
            Are you sure you want to delete this review? This action cannot be
            undone.
          </p>
        </div>

        {/* Button segment controls */}
        <div className='flex gap-3 pt-1'>
          <button
            type='button'
            onClick={onCancel}
            disabled={isLoading}
            className='flex-1 rounded-full border-2 border-gray-200 bg-white py-3 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
          >
            Cancel
          </button>
          <button
            type='button'
            onClick={onConfirm}
            disabled={isLoading}
            className='flex-1 rounded-full bg-red-500 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
          >
            {isLoading ? 'Deleting...' : 'Yes, Delete'}
          </button>
        </div>
      </div>
    </div>
  );
}
