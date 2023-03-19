import React from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { BackHandler, Platform } from 'react-native';
import { SnackbarFactory, ReactFC } from '../index';

interface IWithBack {
  noback?: boolean;
}

export const WithBack: ReactFC<IWithBack> = function({ children, noback }) {
  const navigation = useNavigation<any>();

  useFocusEffect(
    React.useCallback(() => {
      let currentCount = 0;
      const onBackPress = () => {
        if (navigation.canGoBack()) {
          navigation.goBack();
          return true;
        }
        if (Platform.OS !== 'ios' && !noback) {
          if (currentCount < 1) {
            currentCount += 1;
            SnackbarFactory.t('Press again to close!');
            setTimeout(() => (currentCount = 0), 2000);
          } else {
            BackHandler.exitApp();
          }
          return true;
        }
        return false;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [navigation]),
  );

  return (
    <>
      {children}
    </>
  );
};
