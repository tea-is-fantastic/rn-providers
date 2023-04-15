import type { APIError, APISuccess, IRestConfig } from './types';
import { SnackbarFactory } from '../../shared';
import { hideSpinner, showSpinner } from '../overlays';

export const onErrorFn = async (
  response: APIError,
  { onError, displayError }: IRestConfig
): Promise<APIError> => {
  if (displayError) {
    SnackbarFactory.e(response?.message);
  }
  if (onError) {
    await onError(response);
  }
  return response;
};

export const onSuccessFn = async <T = unknown,>(
  response: APISuccess,
  { onSuccess, displaySuccess }: IRestConfig
): Promise<T> => {
  if (displaySuccess) {
    SnackbarFactory.s(response.message);
  }
  if (onSuccess) {
    await onSuccess(response);
  }
  return response as T;
};

export const onLoadFn = (
  isLoading: boolean,
  { loading, displaySpinner }: IRestConfig
) => {
  loading && loading(isLoading);
  if (displaySpinner) {
    isLoading ? showSpinner() : hideSpinner();
  }
};
