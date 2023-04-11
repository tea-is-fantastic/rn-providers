import { onErrorFn, onLoadFn, onSuccessFn } from '../shared/managers';
import { createQueryFn, handleUpload } from '../shared/util';
import { useMutation } from '@tanstack/react-query';
import type { IRestConfig, PickedFile } from '../shared/types';

export const useUploadMutation = async (
  key: string,
  files: PickedFile[],
  data: any,
  config?: IRestConfig
) => {
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
  });
};
