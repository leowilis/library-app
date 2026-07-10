export interface Review {
  id: number;
  bookId: number;
  star: number;
  rating?: number;
  comment: string;
  createdAt: string;

  user?: {
    name: string;
    profilePhoto?: string | null;
  };

  book: {
    id: number;
    title: string;
    coverImage: string;

    author: {
      name: string;
    };

    category: {
      name: string;
    };
  };
}

export interface CreateReviewPayload {
  bookId: number;
  star: number;
  comment?: string;
}

export interface UpdateReviewPayload extends CreateReviewPayload {
  id: number;
}

export type SubmitReviewPayload =
  | CreateReviewPayload
  | UpdateReviewPayload;
