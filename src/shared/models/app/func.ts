import { AppInfo, useAppStore, AppState, PartialAppState } from './state';

export const generateAppInfo = (
  input: PartialAppState = {},
): AppState => {
  const generated: AppState = {
    secrets: {
      ...AppInfo.secrets,
      ...(input?.secrets || {}),
    },
    urls: {
      ...AppInfo.urls,
      ...(input?.urls || {}),
    },
    endpoints: {
      ...AppInfo.endpoints,
      ...(input?.endpoints || {}),
    }
  };
  useAppStore.setState(generated);
  return generated;
};

