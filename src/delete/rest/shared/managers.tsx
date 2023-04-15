import type { APIError, APISuccess, IRestConfig } from './types';
import { SnackbarFactory } from '../../../shared';
import { hideSpinner, showSpinner } from '../../../components/overlays';

export const onErrorFn =
  (onError?: IRestConfig['onError'], display?: IRestConfig['displayError']) =>
  async (response: unknown) => {
    if (display) {
      SnackbarFactory.e((response as APIError).message);
    }
    if (onError) {
      await onError(response);
    }
    return response;
  };

export const onSuccessFn =
  (
    onSuccess?: IRestConfig['onSuccess'],
    display?: IRestConfig['displaySuccess']
  ) =>
  async (response: unknown) => {
    if (display) {
      SnackbarFactory.s((response as APISuccess).message);
    }
    if (onSuccess) {
      await onSuccess(response);
    }
    return response;
  };

export const onLoadFn = (
  isLoading: boolean,
  loadingFn?: IRestConfig['loading'],
  spinner?: boolean
) => {
  loadingFn && loadingFn(isLoading);
  if (spinner) {
    isLoading ? showSpinner() : hideSpinner();
  }
};
