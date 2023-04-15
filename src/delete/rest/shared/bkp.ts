// import { ContextType, useContext } from 'react';
// import { RestProviderCtx } from '../provider';
// import axios, { AxiosRequestConfig } from 'axios';
// import type { QueryFunction } from '@tanstack/react-query';
// import { useQuery } from '@tanstack/react-query';
// import { createQueryFn, sculptUrl, urlFromString } from './util';
// import type { IRestConfig, IUseQuery } from './types';
// import { AuthUtils } from '../../../shared';
// import type { FormikHelpers } from 'formik';
// import { Keyboard } from 'react-native';
//
// export const useRestProviderCtx = (): ContextType<typeof RestProviderCtx> =>
//   useContext(RestProviderCtx);
//
// export const useDefaultQuery = async (
//   url: string,
//   config: AxiosRequestConfig = {},
//   query?: IUseQuery
// ) => {
//   const { method, url: endpoint } = urlFromString(url);
//   return useQuery(
//     [endpoint],
//     () =>
//       createQueryFn({
//         method,
//         url: endpoint,
//         ...config,
//       }),
//     query
//   );
// };
//
// export const useComplexQuery = async ({
//   url,
//   data,
//   params,
//   urlParams,
//   onSuccess,
//   onError,
//   onSettled,
// }: IRestConfig) => {
//   const finalUrl = sculptUrl(url, urlParams);
//   const token = await AuthUtils.getToken();
//   const axiosConfig: AxiosRequestConfig = {
//     params,
//     data,
//   };
//   if (token) {
//     axiosConfig.headers = {
//       Authorization: `Bearer ${token}`,
//     };
//   }
//   return useDefaultQuery(finalUrl, axiosConfig, {
//     onSuccess,
//     onError,
//     onSettled,
//   });
// };
//
// export const useSimpleQuery = async (url: string, data?: any, params?: any) => {
//   return useComplexQuery({
//     url,
//     data,
//     params,
//     displaySpinner: true,
//     displayError: true,
//     displaySuccess: false,
//   });
// };
//
// export const useFormikQuery = async (
//   url: string,
//   data: any,
//   { setSubmitting, resetForm }: FormikHelpers<any>
// ) => {
//   Keyboard.dismiss();
//   return useComplexQuery({
//     url,
//     data,
//     setSubmitting,
//     displaySuccess: true,
//     displaySpinner: false,
//     onSuccess: () => {
//       resetForm();
//     },
//   });
// };
//
// export const handledQuery: QueryFunction = async ({ queryKey: [url] }) => {
//   const { data } = await axios.get(
//     `https://jsonplaceholder.typicode.com${url}`
//   );
//   return data;
// };
// export const uploadQuery: QueryFunction = async ({ queryKey: [url] }) => {
//   const { data } = await axios.get(
//     `https://jsonplaceholder.typicode.com${url}`
//   );
//   return data;
// };
//
// export const silentQuery: QueryFunction = async ({ queryKey: [url] }) => {
//   const { data } = await axios.get(
//     `https://jsonplaceholder.typicode.com${url}`
//   );
//   return data;
// };
//
// export const infiniteQuery: QueryFunction = async ({ queryKey: [url] }) => {
//   const { data } = await axios.get(
//     `https://jsonplaceholder.typicode.com${url}`
//   );
//   return data;
// };
//
// export const useLoadedQuery: QueryFunction = async ({ queryKey: [url] }) => {
//   const { data } = await axios.get(
//     `https://jsonplaceholder.typicode.com${url}`
//   );
//   return data;
// };
//
// export const standaloneQuery: QueryFunction = async ({ queryKey: [url] }) => {
//   const { data } = await axios.get(
//     `https://jsonplaceholder.typicode.com${url}`
//   );
//   return data;
// };
