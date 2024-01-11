import { type AxiosError } from 'axios';

import { notifications } from '@mantine/notifications';
import {
  QueryCache,
  QueryClient,
  type UseMutationOptions,
  type UseQueryOptions
} from '@tanstack/react-query';

export const queryClient = new QueryClient({
  // change this as needed
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: true
    }
  },
  queryCache: new QueryCache({
    onError: (error, query) => {
      // https://tkdodo.eu/blog/breaking-react-querys-api-on-purpose

      if (query.meta?.errorMessage) {
        notifications.show({
          title: 'Error',
          message: query.meta.errorMessage as string,
          color: 'error'
        });
      } else {
        notifications.show({
          title: 'Error',
          message: `Something went wrong when getting data from the server.`,
          color: 'error'
        });
      }
    }
  })
});

export type ExtractFnReturnType<FnType extends (...args: any) => any> = Awaited<ReturnType<FnType>>;

export type QueryConfig<QueryFnType extends (...args: any) => any> = Omit<
  UseQueryOptions<ExtractFnReturnType<QueryFnType>>,
  'queryKey' | 'queryFn'
>;

export type MutationConfig<MutationFnType extends (...args: any) => any> = UseMutationOptions<
  ExtractFnReturnType<MutationFnType>,
  AxiosError,
  Parameters<MutationFnType>[0]
>;
