


export interface Review {
  id: number;
  bookId: number;
  star: number;
  comment: string;
  createdAt: string;
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
  bookId: number
  star: number
  comment?: string
}

