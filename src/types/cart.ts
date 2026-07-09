import type { Book } from './book';

export interface CartItem {
  id: number;
  bookId: number;
  userId: number;
  createdAt: string;
  book: Book;
}

export interface CartResponse {
  success: boolean;
  data: CartItem[];
}

export interface CheckoutResponse {
  success: boolean;
  data: {
    user: {
      id: number;
      name: string;
      email: string;
    };
    books: CartItem[];
  };
}

export interface AddToCartPayload {
  bookId: number;
}