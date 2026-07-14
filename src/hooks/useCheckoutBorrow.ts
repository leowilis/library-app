import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { api } from '@/lib/api';
import { EndPoints } from '@/constants';
import { cartKeys } from '@/lib/queryKeys';

interface BorrowFromCartPayload {
  days: number;
  itemIds: number[];
}

export function useCheckoutBorrow() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ days, itemIds }: BorrowFromCartPayload) => {
      const { data } = await api.post(EndPoints.LoansFromCart, {
        days,
        itemIds,
      });

      return data;
    },
    onSuccess: async () => {
      toast.success('Books borrowed successfully!');

      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: cartKeys.detail(),
        }),

        queryClient.invalidateQueries({
          queryKey: cartKeys.checkout(),
        }),
      ]);
    },

    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : 'Failed to borrow books',
      );
    },
  });
}
