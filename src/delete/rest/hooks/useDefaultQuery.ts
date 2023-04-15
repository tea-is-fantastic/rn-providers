import type { AxiosRequestConfig } from 'axios';
import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from '@tanstack/react-query';
import { createQueryFn } from '../shared/util';
import type { IUseQuery } from '../shared/types';
import type { IUseMutation } from '../shared/types';

export const useDefaultQuery = (
  queryKey: string,
  config?: AxiosRequestConfig,
  query?: IUseQuery
): UseQueryResult => {
  const { data, params, headers } = config || {};
  const queryFn = createQueryFn(queryKey, { data, headers, params });
  return useQuery([queryKey], queryFn, query);
};

export const useDefaultMutation = (
  queryKey: string,
  config?: AxiosRequestConfig,
  query?: IUseMutation
): UseMutationResult => {
  const { data, params, headers } = config || {};
  const queryFn = createQueryFn(queryKey, { data, headers, params });
  return useMutation([queryKey], queryFn, query);
};
