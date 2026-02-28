import { api } from "@/lib/axios";
import type { BooksResponse, CategoriesResponse } from "./type";

export const getBooksApi = async (params?: {
  page?: number;
  limit?: number;
  categoryId?: number;
  authorId?: number;
  minRating?: number;
  q?: string;
}): Promise<BooksResponse> => {
  const response = await api.get("/api/books", { params });
  return response.data;
};

export const getRecommendedBooksApi = async (params?: {
  page?: number;
  limit?: number;
}): Promise<BooksResponse> => {
  const response = await api.get("/api/books/recommended", { params });
  return response.data;
};

export const getCategoriesApi = async (): Promise<CategoriesResponse> => {
  const response = await api.get("/api/categories");
  return response.data;
};
