import type { FormikHelpers } from 'formik';
import { onErrorFn, onLoadFn, onSuccessFn } from '../shared/managers';
import { createQueryFn } from '../shared/util';
import { useMutation } from '@tanstack/react-query';
import type { IRestConfig } from '../shared/types';

export interface IFormikConfig
  extends Pick<IRestConfig, 'data' | 'onSuccess' | 'onError'> {
  helpers: FormikHelpers<any>;
  reset?: boolean;
}

export const useFormMutation = async (
  key: string,
  data: any,
  config: IFormikConfig
) => {
  const { onSuccess, onError, helpers, reset } = config;
  const { setSubmitting, resetForm } = helpers;
  const queryFn = createQueryFn(key, {
    data,
    loading: setSubmitting,
  });
  return useMutation([key], queryFn, {
    onError: onErrorFn(onError, true),
    onSuccess: onSuccessFn(reset ? resetForm : onSuccess, true),
    onSettled: () => onLoadFn(false, setSubmitting),
  });
};
