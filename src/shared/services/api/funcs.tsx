import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import type { APIError, APIResponse, IRestConfig } from './types';
import { defaultError } from './utils';
import { sculpt } from './config';
import { manageError, manageLoading, manageSuccess } from './managers';
import { AlertFactory } from '../../factories';

export const apiPromise = async <T,>(config: IRestConfig): Promise<AxiosResponse> => {
  const options = await sculpt<T>(config);

  axios.interceptors.request.use( (request: InternalAxiosRequestConfig) => {
    console.log(
      'Starting Request',
      JSON.stringify(
        {url: request.url, data: request.data, params: request.params},
        null,
        2,
      ),
    );
    return request;
  });

  axios.interceptors.response.use(
     (response) => {
      console.log('Response:', JSON.stringify(response.data, null, 2));
      return response;
    },
    (error) => {
      console.log(
        'Response:',
        JSON.stringify(error?.response?.data || {}, null, 2),
      );
      return Promise.reject(error);
    },
  );
  return axios(options);
};

export const apiResponse = async <T = unknown,>(
  config: IRestConfig,
  r: AxiosResponse<{
    response?: any;
    error?: any;
  }>,
): Promise<APIResponse<T | APIError>> => {
  const {response, error} = r.data;
  if (error || response === undefined) {
    return manageError(config, error || defaultError);
  }
  return manageSuccess<T>(config, response);
};

export const apiStandalone = async <T = any,>(
  config: IRestConfig,
): Promise<APIResponse<T | APIError>> => {
  await manageLoading(config, true);
  try {
    const resp = await apiPromise<T>(config);
    return apiResponse<T>(config, resp);
  } catch (e) {
    AlertFactory.l(e);
    return manageError(config, defaultError);
  }
};
