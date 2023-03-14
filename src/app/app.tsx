import React, { FC, PropsWithChildren } from 'react';
import useCachedResources from './useCachedResources';
import type { Theme } from '@react-navigation/native';
import { MenuProvider, OverlayProvider } from '../overlays';
import { ThemeProvider } from './provider';

export type IAppWrapper = {
  theme: Theme;
};

export const AppWrapper: FC<PropsWithChildren<IAppWrapper>> = ({
  children,
  theme,
}) => {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <ThemeProvider theme={theme}>
        <MenuProvider>
          <OverlayProvider>{children}</OverlayProvider>
        </MenuProvider>
      </ThemeProvider>
    );
  }
};
