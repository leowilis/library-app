export interface BookFormState {
  title: string;
  authorName: string;
  categoryId: string;
  description: string;
  totalPages: string;
  coverImage: string;
}

export interface FormErrors {
  title?: string;
  authorName?: string;
  categoryId?: string;
  description?: string;
  totalPages?: string;
  coverImage?: string;
}