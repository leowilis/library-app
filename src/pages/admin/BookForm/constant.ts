import type { BookFormState } from './type';

export const INITIAL_FORM: BookFormState = {
  title: '',
  authorName: '',
  categoryId: '',
  description: '',
  totalPages: '',
  coverImage: '',
};

export const inputClass =
  'w-full rounded-xl border border-gray-200 px-4 py-3 text-sm font-medium text-gray-800 transition-colors placeholder:text-gray-400 focus:border-blue-500 focus:outline-none';
