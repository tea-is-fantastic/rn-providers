import { create } from 'zustand';

export const AppInfo = {
  secrets: {
    onesignal: '',
    facebookAppId: '',
    googleMapsApiKey: '',
    recaptcha: '',
    googleAnalyticsCode: '',
    googleAppId: '',
    googleWebAppId: '',
    linkedInAppId: '',
    linkedInRedirectUri: '',
  },
  urls: {
    api: '',
    web: '',
    mobile: '',
    protocol: '',
    CDN: '',
    imageCDN: '',
    videoCDN: '',
  },
  endpoints: {
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
  },
};

export interface AppState {
  secrets: typeof AppInfo.secrets;
  urls: typeof AppInfo.urls;
  endpoints: typeof AppInfo.endpoints;
}

export interface PartialAppState {
  secrets?: Partial<AppState['secrets']>;
  urls?: Partial<AppState['urls']>;
  endpoints?: Partial<AppState['endpoints']>;
}

export const useAppStore = create<AppState>(() => AppInfo);
