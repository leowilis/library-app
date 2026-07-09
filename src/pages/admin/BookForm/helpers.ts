import type { BookFormState } from './type';

export function buildBookPayload(form: BookFormState) {
  const parsedCategoryId = Number(form.categoryId);
  const parsedTotalPages = Number(form.totalPages);

  return {
    title: form.title.trim(),
    authorName: form.authorName.trim(),
    categoryId: Number.isNaN(parsedCategoryId) ? 0 : parsedCategoryId,
    description: form.description.trim(),
    totalPages: Number.isNaN(parsedTotalPages) ? 0 : parsedTotalPages,
    coverImage: form.coverImage.trim() || null,
  };
}
