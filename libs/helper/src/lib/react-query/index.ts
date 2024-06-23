import { QueryClient, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';


export const customQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 30,
      refetchOnWindowFocus: false,
      retry: (failureCount, error) => {
        if (isAxiosError(error)) {
          if (error.response?.status === 429) {
            return failureCount < 4;
          }
        }
        return false;
      },
      retryDelay: 3000,
    },
  },
});

export const useQueryInvalidator = (toInvalidate: unknown[][]) => {
  const queryClient = useQueryClient();

  return () => toInvalidate.forEach((item) => queryClient.invalidateQueries(item));
}
