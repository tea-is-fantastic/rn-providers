import React from 'react';
import RNBootSplash from 'react-native-bootsplash';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { generateRNThemes } from '../../shared/theme/shared';
import { Provider } from 'react-native-paper';
import type { ReactFC } from '../../shared';
import type { PartialTheme } from '../../shared/theme/theme';

export type IThemeProvider = {
  theme?: PartialTheme;
};

export const ThemeProvider: ReactFC<IThemeProvider> = ({ children, theme }) => {
  const { nav, paper } = React.useMemo(() => generateRNThemes(theme), [theme]);
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <NavigationContainer theme={nav} onReady={() => RNBootSplash.hide()}>
          <Provider theme={paper}>
            {children}
          </Provider>
        </NavigationContainer>
        <StatusBar />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};
