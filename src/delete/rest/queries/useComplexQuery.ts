import type { IRestConfig, IUseMutation, IUseQuery } from '../shared/types';
import { onErrorFn, onLoadFn, onSuccessFn } from '../shared/managers';
import { createQueryFn, createQueryOpt } from '../shared/util';
import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from '@tanstack/react-query';

export const useComplexQuery = (
  key: string,
  config: IRestConfig,
  options: IUseQuery = {}
): UseQueryResult => {
  const queryFn = createQueryFn(key, config);
  const opt = createQueryOpt(config, options);
  return useQuery([key], queryFn, opt);
};

export const useComplexMutation = (
  key: string,
  config: IRestConfig,
  options: IUseMutation = {}
): UseMutationResult => {
  const {
    onSuccess,
    onError,
    loading,
    displaySuccess,
    displaySpinner,
    displayError,
  } = config;
  const queryFn = createQueryFn(key, config);
  return useMutation([key], queryFn, {
    onSuccess: onSuccessFn(onSuccess, displaySuccess),
    onError: onErrorFn(onError, displayError),
    onSettled: () => onLoadFn(false, loading, displaySpinner),
    ...options,
  });
};
