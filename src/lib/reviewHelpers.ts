import type { Review, SubmitReviewPayload } from '@/types/review';

interface OptimisticUserParams {
  name: string;
  profilePhoto?: string | null;
}

export function createOptimisticReview(
  payload: SubmitReviewPayload,
  user: OptimisticUserParams,
): Review {
  return {
    id: Date.now(),
    bookId: payload.bookId,
    star: payload.star,
    comment: payload.comment ?? '',
    createdAt: new Date().toISOString(),

    user: {
      name: user.name,
      profilePhoto: user.profilePhoto ?? null,
    },

    book: {
      id: payload.bookId,
      title: '',
      coverImage: '',
      author: {
        name: '',
      },
      category: {
        name: '',
      },
    },
  };
}
