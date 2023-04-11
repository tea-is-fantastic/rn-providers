import type { IRestConfig } from '../shared/types';
import { onErrorFn, onLoadFn, onSuccessFn } from '../shared/managers';
import { createQueryFn } from '../shared/util';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useComplexQuery = (key: string, config: IRestConfig) => {
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
  });
};

export const useComplexMutation = (key: string, config: IRestConfig) => {
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
  });
};
