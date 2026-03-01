import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { EndPoints, Query_Keys } from '@/constants'
import type { Book, CreateBookPayload, UpdateBookPayload } from '@/types/book'
import api from '@/lib/api'

export const useBooks = (params?: {
  q?: string
  categoryId?: number
  authorId?: number
  minRating?: number
  page?: number
  limit?: number
}) => {
  return useQuery({
    queryKey: [Query_Keys.Books, params],
    queryFn: async () => {
      const data = await api.get(EndPoints.Book, { params })
      return data
    },
  })
}

export const useBookDetail = (id: number) => {
  return useQuery({
    queryKey: [Query_Keys.BooksDetail, id],
    queryFn: async () => {
      const data = await api.get(EndPoints.BooksDetail(id))
      return data
    },
    enabled: !!id,
  })
}

export const useRecommendedBooks = (params?: {
  by?: 'rating' | 'popular'
  categoryId?: number
  page?: number
  limit?: number
}) => {
  return useQuery({
    queryKey: [Query_Keys.BooksRecommend, params],
    queryFn: async () => {
      const data = await api.get(EndPoints.BooksRecommend, { params })
      return data
    },
    select: (data: any) => data.data.Books as Book[],
  })
}

export const useCreateBook = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (payload: CreateBookPayload) => {
      const data = await api.post(EndPoints.Book, payload)
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [Query_Keys.Books] })
    },
  })
}

export const useUpdateBook = (id: number) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (payload: UpdateBookPayload) => {
      const data = await api.put(EndPoints.BooksDetail(id), payload)
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [Query_Keys.Books] })
      queryClient.invalidateQueries({ queryKey: [Query_Keys.BooksDetail, id] })
    },
  })
}

export const useDeleteBook = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (id: number) => {
      const data = await api.delete(EndPoints.BooksDetail(id))
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [Query_Keys.Books] })
    },
  })
}