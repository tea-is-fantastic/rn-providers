import React, { useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View } from 'react-native';
import { AuthUtils, AuthInterface } from '../models';
import type { ReactFC } from '../index';

function shouldRedirect(auth: AuthInterface | undefined, unauth: boolean): boolean {
  const authed = AuthUtils.isAuth(auth);
  console.log('auth', auth, 'unauth', unauth, 'authed', authed);
  return unauth ? authed : !authed;
}

interface IAuthOnly {
  unauth?: boolean;
}

export const AuthOnly: ReactFC<IAuthOnly> = ({children, unauth = false}) => {
  const navigation = useNavigation<any>();
  const route = useRoute();
  const [authed, setAuthed] = React.useState(false);

  const processRedirect = React.useCallback(async () => {
    const auth = await AuthUtils.init();
    const j = AuthUtils.simplify(auth);
    const sr = shouldRedirect(j, unauth);
    setAuthed(!sr);
    if (sr) {
      if (unauth) {
        navigation.replace('HomeScreen');
      } else {
        navigation.replace('AuthScreen', {
          screen: 'LoginStack',
          routeName: route.name,
        });
      }
    }
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      await processRedirect();
    });

    return unsubscribe;
  }, [navigation]);

  return authed ? <>{children}</> : <View />;
};
