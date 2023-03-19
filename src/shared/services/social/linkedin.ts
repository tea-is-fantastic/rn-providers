import type {LinkedInToken} from 'react-native-linkedin';
import type {SocialLoginOutput} from './types';
import { apiPromise, apiResponse, IRestConfig } from '../api';

export const loginLinkedIn = async (
  code: LinkedInToken,
): Promise<SocialLoginOutput> => {
  const token = code.authentication_code;
  const config: IRestConfig = {
    endpoint: 'linkedInAuth',
    queryParams: {token},
  };
  try {
    const resp = await apiPromise(config);
    const res = await apiResponse<any>(config, resp);
    const r = res.response;
    return {
      provider: 'linkedin',
      firstName: r.firstName,
      lastName: r.lastName,
      token: r.token,
      email: r.email,
    };
  } catch (e) {
    console.log(e);
    throw Error('Login Failed');
  }
};
