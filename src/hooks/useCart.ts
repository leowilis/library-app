import { useSelector } from 'react-redux';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { api } from '@/lib/api';
import { EndPoints } from '@/constants';
import { cartKeys } from '@/lib/queryKeys';
import type { RootState } from '@/store';

import type {
  AddToCartPayload,
  CartResponse,
  CheckoutResponse,
} from '@/types/cart';

// Invalidates all cart-related queries.
async function invalidateCart(queryClient: ReturnType<typeof useQueryClient>) {
  await Promise.all([
    queryClient.invalidateQueries({
      queryKey: cartKeys.detail(),
    }),
    queryClient.invalidateQueries({
      queryKey: cartKeys.checkout(),
    }),
  ]);
}

// Fetches the authenticated user's cart.
export function useCart() {
  const token = useSelector((state: RootState) => state.auth.token);

  return useQuery({
    queryKey: cartKeys.detail(),
    queryFn: async () => {
      const { data } = await api.get<CartResponse>(EndPoints.Cart);
      return data.data;
    },
    enabled: !!token,
  });
}

// Fetches checkout preview data.
export function useCheckout() {
  const token = useSelector((state: RootState) => state.auth.token);

  return useQuery({
    queryKey: cartKeys.checkout(),
    queryFn: async () => {
      const { data } = await api.get<CheckoutResponse>(EndPoints.CartCheckout);

      return data.data;
    },
    enabled: !!token,
  });
}

// Adds a book to the authenticated user's cart.
export function useAddToCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: AddToCartPayload) => {
      await api.post(EndPoints.CartItems, payload);
    },

    onSuccess: async () => {
      toast.success('Book added to cart');
      await invalidateCart(queryClient);
    },

    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : 'Failed to add book to cart',
      );
    },
  });
}

// Removes a single item from the authenticated user's cart.
export function useRemoveCartItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (itemId: number) => {
      await api.delete(EndPoints.Cart_Item(itemId));
    },

    onSuccess: async () => {
      toast.success('Book removed from cart');
      await invalidateCart(queryClient);
    },

    onError: (error) => {
      toast.error(
        error instanceof Error
          ? error.message
          : 'Failed to remove book from cart',
      );
    },
  });
}

// Clears all items from the authenticated user's cart.
export function useClearCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await api.delete(EndPoints.Cart);
    },

    onSuccess: async () => {
      toast.success('Cart cleared');
      await invalidateCart(queryClient);
    },

    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : 'Failed to clear cart',
      );
    },
  });
}
