import { QueryClient } from '@tanstack/react-query';

/**
 * Global QueryClient configuration instance.
 * Optimizes network layout data caching, garbage collection, and aggressive retry policies.
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 0,
      gcTime: 1000 * 60 * 5,
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
      refetchOnMount: true,
    },

    mutations: {
      retry: 0,
    },
  },
});
