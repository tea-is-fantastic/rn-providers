import React from 'react';
import RNBootSplash from 'react-native-bootsplash';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import type { IAppWrapper } from './app';
import { generateRNThemes } from '../theme/shared';
import { Provider } from 'react-native-paper';

export const ThemeProvider: React.FC<IAppWrapper> = ({ children, theme }) => {
  const { nav, paper } = React.useMemo(() => generateRNThemes(theme), [theme]);
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <NavigationContainer theme={nav} onReady={() => RNBootSplash && RNBootSplash.hide()}>
          <Provider theme={paper}>
            {children}
          </Provider>
        </NavigationContainer>
        <StatusBar />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};
