import { useState } from 'react';
import { toast } from 'sonner';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

import StarPicker from '@/components/ui/starPicker';
import { useSubmitReview } from '@/hooks/useReviews';

import type { CreateReviewPayload, Review } from '@/types/review';

type ReviewModalProps =
  | {
      mode: 'create';
      bookId: number;
      onClose: () => void;
      onSuccess?: () => void;
    }
  | {
      mode: 'edit';
      review: Review;
      onClose: () => void;
      onSuccess?: () => void;
    };

export default function ReviewModal(props: ReviewModalProps) {
  const { mode, onClose, onSuccess } = props;
  const [rating, setRating] = useState(mode === 'edit' ? props.review.star : 0);
  const [comment, setComment] = useState(
    mode === 'edit' ? props.review.comment : '',
  );

  const { mutate: submitReview, isPending } = useSubmitReview();

  const handleSubmit = () => {
    if (rating === 0) {
      toast.error('Please give a rating.');
      return;
    }

    if (!comment.trim()) {
      toast.error('Please write a comment.');
      return;
    }

    const payload: CreateReviewPayload =
      mode === 'create'
        ? {
            bookId: props.bookId,
            star: rating,
            comment: comment.trim(),
          }
        : {
            bookId: props.review.book.id,
            star: rating,
            comment: comment.trim(),
          };

    submitReview(payload, {
      onSuccess: () => {
        onSuccess?.();
        onClose();
      },
    });
  };

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent className='max-w-md rounded-3xl'>
        <DialogHeader>
          <DialogTitle>
            {mode === 'create' ? 'Give Review' : 'Edit Your Review'}
          </DialogTitle>
        </DialogHeader>

        {/* Rating */}
        <div className='space-y-3 text-center'>
          <p className='text-sm font-semibold text-muted-foreground'>
            Give Rating
          </p>

          <StarPicker value={rating} onChange={setRating} size={40} />
        </div>

        {/* Comment */}
        <Textarea
          rows={5}
          value={comment}
          placeholder='Please share your thoughts about this book'
          onChange={(e) => setComment(e.target.value)}
          className='resize-none rounded-2xl'
        />

        <DialogFooter className='grid grid-cols-2 gap-3 sm:flex-row'>
          <Button
            variant='outline'
            onClick={onClose}
            disabled={isPending}
            className='rounded-full'
          >
            Cancel
          </Button>

          <Button
            onClick={handleSubmit}
            disabled={isPending}
            className='rounded-full'
          >
            {isPending
              ? mode === 'create'
                ? 'Submitting...'
                : 'Saving...'
              : mode === 'create'
                ? 'Submit'
                : 'Save Changes'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
