import { Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface DeleteReviewModalProps {
  onConfirm: () => void;
  onCancel: () => void;
  isLoading: boolean;
}

export default function DeleteReviewModal({
  onConfirm,
  onCancel,
  isLoading,
}: DeleteReviewModalProps) {
  return (
    <Dialog open onOpenChange={(open) => !open && !isLoading && onCancel()}>
      <DialogContent className='max-w-sm rounded-3xl'>
        <DialogHeader className='items-center space-y-4 text-center'>
          <div className='flex h-14 w-14 items-center justify-center rounded-full bg-red-50'>
            <Trash2 size={28} className='text-red-500' />
          </div>

          <DialogTitle>Delete Review?</DialogTitle>

          <DialogDescription>
            Are you sure you want to delete this review? This action cannot be
            undone.
          </DialogDescription>
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
            variant='destructive'
            onClick={onConfirm}
            disabled={isLoading}
            className='flex-1 rounded-full'
          >
            {isLoading ? 'Deleting...' : 'Yes, Delete'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
