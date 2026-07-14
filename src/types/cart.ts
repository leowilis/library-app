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
  message: string;
  data: {
    cartId: number;
    itemCount: number;
    items: CartItem[];
  };
}

export interface CheckoutResponse {
  success: boolean;
  message: string;
  data: {
    user: {
      id: number;
      name: string;
      email: string;
      nomorHandphone: string;
    };
    items: CartItem[];
    itemCount: number;
  };
}

export interface AddToCartPayload {
  bookId: number;
}
