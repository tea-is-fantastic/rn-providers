import type { APIError, APIResponse, APISuccess, IRestConfig } from './types';
import { SnackbarFactory } from '../../shared';
import { hideSpinner, showSpinner } from '../overlays';

export const onErrorFn = async (
  response: APIError,
  { onError, displayError }: IRestConfig
): Promise<APIResponse<APIError>> => {
  if (displayError) {
    SnackbarFactory.e(response?.message);
  }
  if (onError) {
    await onError(response);
  }
  return { error: true, success: false, response };
};

export const onSuccessFn = async <T = unknown,>(
  response: APISuccess,
  { onSuccess, displaySuccess }: IRestConfig
): Promise<APIResponse<T>> => {
  if (displaySuccess) {
    SnackbarFactory.s(response.message);
  }
  if (onSuccess) {
    await onSuccess(response);
  }
  return { error: false, success: true, response: response as T };
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
