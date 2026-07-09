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

export type BookFormChangeEvent =
  React.ChangeEvent<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  >;

export type BookFormChangeHandler = (e: BookFormChangeEvent) => void;