import { useEffect, useMemo, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

import { api } from '@/lib/api';
import { EndPoints, Query_Keys, ROUTES } from '@/constants';
import { bookKeys } from '@/lib/queryKeys';

import { useBookDetail } from '@/hooks/useBookDetail';
import { useCategories } from '@/hooks/useCategories';

import { INITIAL_FORM } from './constant';
import { buildBookPayload } from './helpers';
import { validateBookForm } from './validation';

import type { BookFormState, FormErrors, BookFormChangeHandler } from './type';

export function useBookForm() {
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [form, setForm] = useState<BookFormState>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const { data: categoriesData } = useCategories();
  const categories = categoriesData ?? [];
  const { data: book } = useBookDetail(Number(id));

  useEffect(() => {
    if (!isEdit || !book) return;

    setForm({
      title: book.title ?? '',
      authorName: book.author?.name ?? '',
      categoryId: String(book.categoryId ?? ''),
      description: book.description ?? '',
      totalPages: String(book.totalPages ?? ''),
      coverImage: book.coverImage ?? '',
    });

    setErrors({});
  }, [book, isEdit]);

  const { mutate: saveBook, isPending } = useMutation({
    mutationFn: async () => {
      const payload = buildBookPayload(form);

      if (isEdit) {
        await api.put(EndPoints.BooksDetail(Number(id)), payload);
      } else {
        await api.post(EndPoints.AdminBooks, payload);
      }
    },

    onSuccess: () => {
      toast.success(
        isEdit ? 'Book updated successfully.' : 'Book added successfully.',
      );

      queryClient.invalidateQueries({
        queryKey: [Query_Keys.AdminBooks],
      });

      queryClient.invalidateQueries({
        queryKey: bookKeys.lists(),
        exact: false,
      });

      if (isEdit) {
        queryClient.invalidateQueries({
          queryKey: bookKeys.detail(Number(id)),
        });
      }

      navigate(ROUTES.AdminBooks);
    },

    onError: () => {
      toast.error(isEdit ? 'Failed to update book.' : 'Failed to add book.');
    },
  });

  const handleChange: BookFormChangeHandler = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: undefined,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors = validateBookForm(form);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    saveBook();
  };

  const goBack = () => {
    navigate(ROUTES.AdminBooks);
  };

  return {
    form,
    errors,
    categories,
    isEdit,
    isPending,
    setForm,
    handleChange,
    handleSubmit,
    goBack,
  };
}
