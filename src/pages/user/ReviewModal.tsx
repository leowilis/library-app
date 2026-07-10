import { useState } from 'react';
import { X } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
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
            bookId: props.review.bookId,
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
    <div
      role='dialog'
      aria-modal='true'
      aria-labelledby='review-modal-title'
      className='fixed inset-0 z-50 flex items-center justify-center px-4'
    >
      <div className='absolute inset-0 bg-black/40' onClick={onClose} />

      <div className='relative w-full max-w-md rounded-3xl bg-white p-6 space-y-5'>
        {/* Header */}
        <div className='flex items-center justify-between'>
          <h2
            id='review-modal-title'
            className='text-lg font-bold text-gray-900'
          >
            {mode === 'create' ? 'Give Review' : 'Edit Your Review'}
          </h2>

          <button
            type='button'
            onClick={onClose}
            disabled={isPending}
            className='text-gray-400 transition-colors hover:text-gray-700'
          >
            <X size={24} />
          </button>
        </div>

        {/* Rating */}
        <div className='space-y-3 text-center'>
          <p className='text-sm font-semibold text-gray-700'>Give Rating</p>

          <StarPicker value={rating} onChange={setRating} size={40} />
        </div>

        {/* Comment */}
        <textarea
          rows={5}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder='Please share your thoughts about this book'
          className='w-full resize-none rounded-2xl border border-gray-200 px-4 py-3 text-sm text-gray-700 outline-none transition-colors focus:border-blue-500'
        />

        {/* Actions */}
        <div className='flex gap-3'>
          <Button
            type='button'
            variant='outline'
            onClick={onClose}
            disabled={isPending}
            className='flex-1 rounded-full'
          >
            Cancel
          </Button>

          <Button
            type='button'
            onClick={handleSubmit}
            disabled={isPending}
            className='flex-1 rounded-full bg-blue-600 text-white hover:bg-blue-700'
          >
            {isPending
              ? mode === 'create'
                ? 'Submitting...'
                : 'Saving...'
              : mode === 'create'
                ? 'Submit'
                : 'Save Changes'}
          </Button>
        </div>
      </div>
    </div>
  );
}
