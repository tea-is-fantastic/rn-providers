import React from 'react';
import { DialogProvider } from './dialog';
import { SpinnerProvider } from './spinner';
import FlashMessage from 'react-native-flash-message';
import type { ReactFC } from '../../shared';

export const OverlayProvider: ReactFC<any> = ({
  children,
}) => {
  return (
    <DialogProvider>
      <SpinnerProvider>{children}</SpinnerProvider>
      <FlashMessage position="bottom" duration={3000} titleStyle={{
        fontFamily: "bold"
      }} textStyle={{
        fontFamily: "regular"
      }} />
    </DialogProvider>
  );
};
