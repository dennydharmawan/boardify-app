import { useQuery } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { type ExtractFnReturnType, type QueryConfig } from '@/lib/react-query';

import { type User } from '../types';

export const getUsers = (): Promise<User | null> => {
  return axios.get(`/auth/users/me`);
};

type QueryFnType = typeof getUsers;

type UseUsersOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useCurrentUser = ({ config }: UseUsersOptions = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['currentUser'],
    queryFn: () => getUsers()
  });
};
