import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

import type { Loan } from '@/types/loan';

interface ReturnConfirmModalProps {
  loan: Loan;
  isLoading: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ReturnConfirmModal({
  loan,
  isLoading,
  onConfirm,
  onCancel,
}: ReturnConfirmModalProps) {
  return (
    <Dialog open onOpenChange={(open) => !open && !isLoading && onCancel()}>
      <DialogContent className='max-w-sm rounded-3xl'>
        <DialogHeader className='items-center text-center space-y-4'>
          <div className='flex h-14 w-14 items-center justify-center rounded-full bg-primary-100'>
            <AlertTriangle size={28} className='text-primary-300' />
          </div>

          <DialogTitle>Return Book?</DialogTitle>

          <DialogDescription>
            Are you sure you want to return this book?
          </DialogDescription>

          <p className='text-sm font-semibold text-gray-900 line-clamp-2'>
            "{loan.book?.title}"
          </p>
        </DialogHeader>

        <DialogFooter className='flex-col gap-3 sm:flex-row'>
          <Button
            variant='outline'
            onClick={onCancel}
            disabled={isLoading}
            className='flex-1 rounded-full'
          >
            Cancel
          </Button>

          <Button
            onClick={onConfirm}
            disabled={isLoading}
            className='flex-1 rounded-full'
          >
            {isLoading ? 'Returning...' : 'Yes, Return'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
