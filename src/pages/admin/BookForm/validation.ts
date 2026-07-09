import type { BookFormState, FormErrors } from './type';

export function validateBookForm(form: BookFormState): FormErrors {
  const errors: FormErrors = {};

  const title = form.title.trim();
  const authorName = form.authorName.trim();
  const description = form.description.trim();
  const coverImage = form.coverImage.trim();

  // Title
  if (!title) {
    errors.title = 'Title is required';
  } else if (title.length < 3) {
    errors.title = 'Title must be at least 3 characters';
  }

  // Author
  if (!authorName) {
    errors.authorName = 'Author is required';
  } else if (authorName.length < 3) {
    errors.authorName = 'Author name must be at least 3 characters';
  }

  // Category
  if (!form.categoryId) {
    errors.categoryId = 'Category is required';
  }

  // Description (optional)
  if (description && description.length < 20) {
    errors.description = 'Description must be at least 20 characters';
  }

  // Cover Image URL (optional)
  if (coverImage) {
    try {
      new URL(coverImage);

      if (!/\.(jpg|jpeg|png|webp)(\?.*)?$/i.test(coverImage)) {
        errors.coverImage =
          'Image URL must end with .jpg, .jpeg, .png, or .webp';
      }
    } catch {
      errors.coverImage = 'Please enter a valid image URL';
    }
  }

  // Total Pages (optional)
  if (form.totalPages.trim()) {
    const pages = Number(form.totalPages);

    if (!Number.isInteger(pages) || pages <= 0) {
      errors.totalPages = 'Total pages must be a positive whole number';
    }
  }

  return errors;
}
