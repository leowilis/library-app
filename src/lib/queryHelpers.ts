import type { QueryClient } from '@tanstack/react-query';
import { cartKeys } from './queryKeys';

export async function invalidateCart(queryClient: QueryClient) {
  await Promise.all([
    queryClient.invalidateQueries({
      queryKey: cartKeys.detail(),
    }),
    queryClient.invalidateQueries({
      queryKey: cartKeys.checkout(),
    }),
  ]);
}