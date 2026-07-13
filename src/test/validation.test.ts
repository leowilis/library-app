import { describe, expect, it } from 'vitest';
import { validateBookForm } from '@/pages/admin/BookForm/validation';

describe('validateBookForm', () => {
  const validForm = {
    title: 'Atomic Habits',
    authorName: 'James Clear',
    categoryId: '1',
    description: 'This is a long enough description for validation testing.',
    totalPages: '320',
    coverImage: 'https://example.com/book.jpg',
  };

  it('should return no errors for valid form', () => {
    expect(validateBookForm(validForm)).toEqual({});
  });

  it('should require title', () => {
    expect(
      validateBookForm({
        ...validForm,
        title: '',
      }).title,
    ).toBe('Title is required');
  });

  it('should require author', () => {
    expect(
      validateBookForm({
        ...validForm,
        authorName: '',
      }).authorName,
    ).toBe('Author is required');
  });

  it('should require category', () => {
    expect(
      validateBookForm({
        ...validForm,
        categoryId: '',
      }).categoryId,
    ).toBe('Category is required');
  });

  it('should reject invalid image url', () => {
    expect(
      validateBookForm({
        ...validForm,
        coverImage: 'abc',
      }).coverImage,
    ).toBe('Please enter a valid image URL');
  });

  it('should reject invalid total pages', () => {
    expect(
      validateBookForm({
        ...validForm,
        totalPages: '-5',
      }).totalPages,
    ).toBe('Total pages must be a positive whole number');
  });
});
