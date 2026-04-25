import { useQuery } from '@tanstack/react-query'
import { EndPoints, Query_Keys } from '@/constants'
import { api } from '@/lib/api'

/**
 * Fetches all available book categories
 * Response is normalized to always return a flat array of categories
 */
export const useCategories = () => {
  return useQuery({
    queryKey: [Query_Keys.Categories],
    queryFn: async () => {
  const data = await api.get(EndPoints.Categories)
  return data?.data?.data?.categories ?? data?.data?.categories ?? []
},
  })
}