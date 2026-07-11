import { AlertTriangle } from 'lucide-react';
import type { Loan } from '@/types/loan';

interface ReturnConfirmModalProps {
  loan: Loan;
  isLoading: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

// ReturnConfirmModal — Consumer confirmation drawer for returning a rented book.
export default function ReturnConfirmModal({
  loan,
  isLoading,
  onConfirm,
  onCancel,
}: ReturnConfirmModalProps) {
  return (
    <div
      role='dialog'
      aria-modal='true'
      aria-labelledby='return-modal-title'
      className='fixed inset-0 z-50 flex items-center justify-center px-4'
    >
      {/* Backdrop Overlay */}
      <div
        className='absolute inset-0 bg-black/40'
        onClick={isLoading ? undefined : onCancel}
        aria-hidden='true'
      />

      {/* Modal */}
      <div className='relative w-full max-w-sm space-y-6 rounded-3xl bg-white p-6'>
        {/* Alert Icon */}
        <div className='flex justify-center'>
          <div className='flex h-14 w-14 items-center justify-center rounded-full bg-blue-50'>
            <AlertTriangle
              size={28}
              className='text-[#1c65da]'
              aria-hidden='true'
            />
          </div>
        </div>

        {/* Content */}
        <div className='space-y-2 text-center'>
          <h3 className='text-lg font-bold text-gray-900'>Return Book?</h3>

          <p className='text-sm text-gray-500'>
            Are you sure you want to return this book?
          </p>

          <p className='line-clamp-2 text-sm font-semibold text-gray-900'>
            "{loan.book?.title}"
          </p>
        </div>

        {/* Action Button Row */}
        <div className='flex gap-3 pt-1'>
          <button
            type='button'
            onClick={onCancel}
            disabled={isLoading}
            className='flex-1 rounded-full border-2 border-gray-200 py-3 text-sm font-semibold transition-all text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed'
          >
            Cancel
          </button>

          <button
            type='button'
            onClick={onConfirm}
            disabled={isLoading}
            className='flex-1 rounded-full bg-[#1c65da] py-3 text-sm font-semibold text-white transition-all hover:bg-[#1550b8] disabled:opacity-50 disabled:cursor-not-allowed'
          >
            {isLoading ? 'Returning...' : 'Yes, Return'}
          </button>
        </div>
      </div>
    </div>
  );
}
