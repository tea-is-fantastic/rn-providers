import React from 'react';
import { DialogProvider } from './dialog';
import { SpinnerProvider } from './spinner';
import FlashMessage from 'react-native-flash-message';
import type { ReactFC } from '../../shared';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { MenuProvider } from 'react-native-popup-menu';

export const OverlayProvider: ReactFC<any> = ({ children }) => {
  return (
    <BottomSheetModalProvider>
      <MenuProvider style={{ flex: 1, minHeight: '100%' }}>
        <DialogProvider>
          <SpinnerProvider>{children}</SpinnerProvider>
          <FlashMessage
            position="bottom"
            duration={3000}
            titleStyle={{
              fontFamily: 'bold',
            }}
            textStyle={{
              fontFamily: 'regular',
            }}
          />
        </DialogProvider>
      </MenuProvider>
    </BottomSheetModalProvider>
  );
};
