import {
  AccessToken,
  GraphRequest,
  GraphRequestManager,
  LoginManager,
} from 'react-native-fbsdk-next';
import type {SocialLoginOutput} from './types';

function _afterFb(accessToken: string): Promise<Record<string, any>> {
  return new Promise((resolve, reject) => {
    const infoRequest = new GraphRequest(
      '/me',
      {
        accessToken,
        parameters: {
          fields: {
            string: 'email,name,first_name,last_name',
          },
        },
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else if (result) {
          resolve(result);
        } else {
          reject(Error('Login cancelled'));
        }
      },
    );
    new GraphRequestManager().addRequest(infoRequest).start();
  });
}

export const loginFacebook = async (): Promise<
  SocialLoginOutput | undefined
> => {
  try {
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);

    if (result.isCancelled) {
      throw Error('Login cancelled');
    } else {
      let data = await AccessToken.getCurrentAccessToken();
      // let data = await AccessToken.getCurrentAccessToken();
      let token = data?.accessToken?.toString();

      if(!token) {
        throw Error('Login cancelled');
      }

      const res = await _afterFb(token);
      return {
        token,
        provider: 'facebook',
        firstName: res.first_name,
        lastName: res.last_name,
        email: res.email,
      };
    }
  } catch (error) {
    throw Error('Login Failed');
  }
};
