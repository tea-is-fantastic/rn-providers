import { onErrorFn, onLoadFn } from '../managers';
import { defaultError } from '../util';
import type { IRestConfig, PickedFile } from '../types';
import { axiosInstance, handleResponse, handleUpload } from '../funcs/funcs';
import { useCallback } from 'react';
import { AlertFactory } from '@tisf/rn-providers';

export const useUploadMutation = (key: string, config: IRestConfig) => {
  const instance = axiosInstance(key, config);
  return useCallback(
    async (data: any, files: PickedFile[]) => {
      const formData = handleUpload(files, data);
      onLoadFn(true, config);
      try {
        const resp = await instance(formData);
        return handleResponse(resp, config);
      } catch (e) {
        AlertFactory.l(e);
        await onErrorFn(defaultError, config);
        return { error: true, success: false, response: defaultError };
      } finally {
        onLoadFn(false, config);
      }
    },
    [instance, config]
  );
};
