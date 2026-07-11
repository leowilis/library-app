import { Trash2 } from 'lucide-react';

interface BookDeleteModalProps {
  isLoading: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

/**
 * BookDeleteModal — Safeguards administrative catalogue drops.
 * Features bulletproof accessibility bindings and double submission blocks.
 */
export default function BookDeleteModal({
  isLoading,
  onCancel,
  onConfirm,
}: BookDeleteModalProps) {
  return (
    <div
      role='dialog'
      aria-modal='true'
      aria-labelledby='delete-book-title'
      aria-describedby='delete-book-description'
      className='fixed inset-0 z-50 flex items-center justify-center px-4'
    >
      {/* Click Away Backdrop Overlay Container */}
      <div
        className='absolute inset-0 bg-black/40'
        onClick={isLoading ? undefined : onCancel}
        aria-hidden='true'
      />

      {/* Body Wrapper Grid */}
      <div className='relative w-full max-w-sm space-y-5 rounded-3xl bg-white p-6'>
        <div className='flex justify-center'>
          <div className='flex h-14 w-14 items-center justify-center rounded-full bg-red-50'>
            <Trash2 size={28} className='text-red-500' aria-hidden='true' />
          </div>
        </div>

        <div className='space-y-2 text-center'>
          <h3
            id='delete-book-title'
            className='text-lg font-bold text-gray-900'
          >
            Delete Book?
          </h3>

          <p id='delete-book-description' className='text-sm text-gray-500'>
            This action cannot be undone.
          </p>
        </div>

        {/* Action Button Section Control Rules */}
        <div className='flex gap-3'>
          <button
            type='button'
            onClick={onCancel}
            disabled={isLoading}
            className='flex-1 rounded-full border border-gray-300 py-3 text-sm font-semibold transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50'
          >
            Cancel
          </button>

          <button
            type='button'
            onClick={onConfirm}
            disabled={isLoading}
            className='flex-1 rounded-full bg-red-500 py-3 text-sm font-semibold text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50'
          >
            {isLoading ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
}
