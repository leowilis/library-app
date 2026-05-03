import { useQuery } from '@tanstack/react-query'
import { EndPoints, Query_Keys } from '@/constants'
import { api } from '@/lib/api'
import type { Category } from '@/types/category'

/**
 * Fetches all available book categories.
 * Response is normalized to always return a flat Category array.
 */
export const useCategories = () => {
  return useQuery<Category[]>({
    queryKey: [Query_Keys.Categories],
    queryFn: async () => {
      const res = await api.get<{ data: { categories: Category[] } }>(EndPoints.Categories)
      return res.data?.data?.categories ?? []
    },
  })
}