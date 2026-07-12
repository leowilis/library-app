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

interface BookDeleteModalProps {
  isLoading: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function BookDeleteModal({
  isLoading,
  onCancel,
  onConfirm,
}: BookDeleteModalProps) {
  return (
    <Dialog open onOpenChange={(open) => !open && !isLoading && onCancel()}>
      <DialogContent className='max-w-sm rounded-3xl'>
        <DialogHeader className='items-center text-center space-y-4'>
          <div className='flex h-14 w-14 items-center justify-center rounded-full bg-red-50'>
            <Trash2 size={28} className='text-red-500' />
          </div>

          <DialogTitle>Delete Book?</DialogTitle>

          <DialogDescription>This action cannot be undone.</DialogDescription>
        </DialogHeader>

        <DialogFooter className='flex-col gap-3 sm:flex-row'>
          <Button
            variant='outline'
            disabled={isLoading}
            onClick={onCancel}
            className='flex-1 rounded-full'
          >
            Cancel
          </Button>

          <Button
            variant='destructive'
            disabled={isLoading}
            onClick={onConfirm}
            className='flex-1 rounded-full'
          >
            {isLoading ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
