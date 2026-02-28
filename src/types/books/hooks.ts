import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export const fetchBooks = {
  Book: "books",
  Books_Detail: "bookDetail",
  Books_Recommended: "booksRecommended",
}

export const endPoints = {
  Book: "/api/books",
  Books_Detail: (id: number) => `/api/books/${id}`,
  Books_Recommended: "/api/books/recommended",
}

export const useBooks = (params?: {
  q?: string;
  categoryId?: number;
  authorId?: number;
  minRating?: number;
  page?: number;
  limit?: number;
}) => {
  return useQuery({
    queryKey: [fetchBooks.Book, params],
    queryFn: async () => {
      const data = await api.get(endPoints.Book, { params })
      return data;
},
  })
}
  