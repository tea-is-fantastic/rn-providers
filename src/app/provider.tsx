import React, { PropsWithChildren } from 'react';
import RNBootSplash from 'react-native-bootsplash';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import type { IAppWrapper } from './app';

export const ThemeProvider: React.FC<PropsWithChildren<IAppWrapper>> = ({ children,
                                                                          theme,
                                                                        }) => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <NavigationContainer theme={theme} onReady={() => RNBootSplash && RNBootSplash.hide()}>
          {children}
        </NavigationContainer>
        <StatusBar />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};
