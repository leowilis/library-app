import { useQuery } from '@tanstack/react-query'
import { EndPoints, Query_Keys } from '@/constants'
import api from '@/lib/api'

export const useAuthors = (q?: string) => {
  return useQuery({
    queryKey: [Query_Keys.Authors, q],
    queryFn: async () => {
      const data = await api.get(EndPoints.Authors, { params: { q } })
      return data
    },
  })
}

export const usePopularAuthors = (limit?: number) => {
  return useQuery({
    queryKey: [Query_Keys.AuthorsPopular],
    queryFn: async () => {
      const data = await api.get(EndPoints.AuthorsPopular, { params: { limit } })
      return data.data.Authors
    },
  })
}

export const useAuthorBooks = (id: number, params?: { page?: number; limit?: number }) => {
  return useQuery({
    queryKey: [Query_Keys.AuthorsBook, id, params],
    queryFn: async () => {
      const data = await api.get(EndPoints.AuthorBooks(id), { params })
      return data
    },
    enabled: !!id,
  })
}