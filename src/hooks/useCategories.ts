import { useQuery } from '@tanstack/react-query'
import { EndPoints, Query_Keys } from '@/constants'
import api from '@/lib/api'

export const useCategories = () => {
  return useQuery({
    queryKey: [Query_Keys.Categories],
    queryFn: async () => {
      const data = await api.get(EndPoints.Categories)
      return data.data.categories
    },
  })
}