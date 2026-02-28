import { useQuery } from "@tanstack/react-query";
import { getBooksApi, getRecommendedBooksApi, getCategoriesApi } from "./api";

export const useBooks = (params?: {
  page?: number;
  limit?: number;
  categoryId?: number;
  q?: string;
}) => {
  return useQuery({
    queryKey: ["books", params],
    queryFn: () => getBooksApi(params),
  });
};

export const useRecommendedBooks = (params?: {
  page?: number;
  limit?: number;
}) => {
  return useQuery({
    queryKey: ["books-recommend", params],
    queryFn: () => getRecommendedBooksApi(params),
  });
};

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategoriesApi,
  });
};
