import type {APIError, APIResponse, APISuccess, IRestConfig} from './types';
import {RestConfig} from './config';
import {AuthUtils} from '../../models';
import {hideSpinner, showSpinner} from '../../../components';
import { SnackbarFactory } from '../../../shared';

export const manageToken = async (
  config: IRestConfig,
): Promise<string | undefined> => {
  if (config.unauth) {
    return;
  }
  if (config.token) {
    return config.token;
  }
  return AuthUtils.getToken();
};

export const manageConfig = async <T,>(
  config: IRestConfig,
  notoken?: boolean,
): Promise<RestConfig<T>> => {
  const output = new RestConfig<T>(config);
  if (notoken) {
    return output;
  }
  output.token = await manageToken(config);
  return output;
};

export const manageLoading = async (
  config: IRestConfig,
  loading: boolean,
): Promise<void> => {
  if (loading) {
    if (config.loadingStart) {
      config.loadingStart();
    } else if (config.displaySpinner) {
      showSpinner();
    }
  } else if (config.loadingEnd) {
    config.loadingEnd();
  } else if (config.displaySpinner) {
    hideSpinner();
  }
};

export const manageError = async (
  iConfig: IRestConfig,
  error: APIError,
): Promise<APIResponse<APIError>> => {
  const config = await manageConfig(iConfig, true);
  if (config.displayError) {
    SnackbarFactory.e(error.message);
  }
  if (config.onError) {
    config.onError(error);
  }
  await manageLoading(iConfig, false);
  return {
    error: true,
    success: false,
    response: error,
  };
};

export const manageSuccess = async <T,>(
  iConfig: IRestConfig,
  success: T,
): Promise<APIResponse<T>> => {
  const config = await manageConfig<T>(iConfig, true);
  if (config.displaySuccess) {
    SnackbarFactory.s((success as APISuccess).message);
  }
  if (config.onSuccess) {
    config.onSuccess(success);
  }
  await manageLoading(iConfig, false);
  return {
    error: false,
    success: true,
    response: success,
  };
};
