import type { IRestConfig, IUseMutation, IUseQuery } from '../shared/types';
import { onErrorFn, onLoadFn, onSuccessFn } from '../shared/managers';
import { createQueryFn } from '../shared/util';
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
  const {
    onSuccess,
    onError,
    loading,
    displaySuccess,
    displaySpinner,
    displayError,
  } = config;
  const queryFn = createQueryFn(key, config);
  return useQuery([key], queryFn, {
    onSuccess: onSuccessFn(onSuccess, displaySuccess),
    onError: onErrorFn(onError, displayError),
    onSettled: () => onLoadFn(false, loading, displaySpinner),
    enabled: false,
    ...options,
  });
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
