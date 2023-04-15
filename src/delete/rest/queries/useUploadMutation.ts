import { onErrorFn, onLoadFn, onSuccessFn } from '../shared/managers';
import { createQueryFn, handleUpload } from '../shared/util';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import type { IRestConfig, IUseMutation, PickedFile } from '../shared/types';

export const useUploadMutation = (
  key: string,
  files: PickedFile[],
  data: any,
  config?: IRestConfig,
  options: IUseMutation = {}
): UseMutationResult => {
  const { onSuccess, onError, loading } = config || {};
  const formData = handleUpload(files, data);
  const queryFn = createQueryFn(key, {
    ...formData,
    loading,
  });
  return useMutation([key], queryFn, {
    onError: onErrorFn(onError, true),
    onSuccess: onSuccessFn(onSuccess, true),
    onSettled: () => onLoadFn(false, loading),
    ...options,
  });
};
