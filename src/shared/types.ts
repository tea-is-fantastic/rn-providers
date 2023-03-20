import type { FC, PropsWithChildren } from 'react';
export type { ImageSource } from 'react-native-vector-icons/Icon';
export type { CountryCode } from 'react-native-country-picker-modal';

export type ReactFC<T = unknown> = FC<PropsWithChildren<T>>;

export type ThenFunction<R, E> = (arg: R | null, err?: E) => void;

export type NavigateToProps<T = Record<string, any>> = {
  route: string;
  params?: T;
};
