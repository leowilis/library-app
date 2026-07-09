import { useQuery } from '@tanstack/react-query';

import { EndPoints } from '@/constants';
import { api } from '@/lib/api';
import { categoryKeys } from '@/lib/queryKeys';

import type { Category } from '@/types/category';

// Fetch all available book categories.
export function useCategories() {
  return useQuery<Category[]>({
    queryKey: categoryKeys.all,

    queryFn: async () => {
      const { data } = await api.get<{
        data: {
          categories: Category[];
        };
      }>(EndPoints.Categories);

      return data.data.categories;
    },
  });
}
