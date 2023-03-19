import type { FC, PropsWithChildren } from 'react';

export type ReactFC<T = unknown> = FC<PropsWithChildren<T>>;

export type ThenFunction<R, E> = (arg: R | null, err?: E) => void;

export type NavigateToProps<T = Record<string, any>> = {
  route: string;
  params?: T;
};
