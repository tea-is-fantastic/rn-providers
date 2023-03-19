import {GoogleSignin} from '@react-native-google-signin/google-signin';
import type { SocialLoginOutput } from './types';
import { useAppStore } from '../../models/app';

function _beforeGoogle() {
  const secrets = useAppStore.getState().secrets
  GoogleSignin.configure({
    webClientId: secrets.googleWebAppId,
    // @ts-ignore
    androidClientId: secrets.googleAppId,
    offlineAccess: true,
    scopes: ['email', 'profile'],
  });
}

export const loginGoogle = async (): Promise<SocialLoginOutput | undefined> => {
  try {
    _beforeGoogle();
    await GoogleSignin.hasPlayServices();
    const res = await GoogleSignin.signIn();
    const {user} = res;
    const tokens = await GoogleSignin.getTokens();
    const {accessToken, idToken} = tokens;
    if (!accessToken) {
      throw Error('No Token');
    }
    return {
      token: `${accessToken}`,
      idToken,
      provider: 'google',
      firstName: `${user.givenName}`,
      lastName: `${user.familyName}`,
      email: `${user.email}`,
    };
  } catch (error) {
    console.log(error);
    return undefined;
  }
};
