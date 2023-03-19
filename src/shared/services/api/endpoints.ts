import type {TEndpoint} from './types';

const endpoints: Record<string, TEndpoint> = {
  appInfo: ['app/info'],

  phoneExists: ['phones/exists'],
  firebaseConfirm: ['phones/firebase/confirm', 'post'],

  reset: ['/auth/reset', 'post'],
  register: ['/auth/register', 'post'],
  login: ['/auth/login', 'post'],
  socialLogin: ['/auth/social', 'post'],
  linkedInAuth: ['/auth/linkedin/access', 'get'],
  logout: ['/auth/logout'],

  getCurrentUser: ['/users/current'],

  getSingleAddress: ['/addresses/single'],

  membersPost: ['/members', 'post'],
  membersGet: ['/members'],

  actionsPost: ['/actions', 'post'],
  actionsGet: ['/actions'],

  protestPost: ['/protests', 'post'],
  protestGet: ['/protests'],
};

export type IEndpoint = keyof typeof endpoints;

export default endpoints;
