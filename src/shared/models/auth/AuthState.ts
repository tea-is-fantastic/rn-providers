import { create } from 'zustand';
import {AuthUtils} from './AuthUtils';
import type {AxiosError, AxiosResponse} from 'axios';
import {useUserStore} from '../user';
import type { AuthInterface } from './AuthInterface';
import { hideSpinner, showSpinner } from '../../../components';
import { apiPromise } from '../../services/api/funcs';
import type { ThenFunction } from '../../types';
import { useAddressStore } from '../address';

interface AuthState extends AuthInterface {
  update: (input?: AuthInterface) => void;
  isAuth: () => boolean;
  logout: (then?: ThenFunction<AxiosResponse, AxiosError>) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  update: (input: AuthInterface = {}) =>
    set(
      state => ({
        ...input,
        update: state.update,
        isAuth: state.isAuth,
        logout: state.logout,
      }),
      true,
    ),
  isAuth: () => !!get().token,
  logout: async (then?: ThenFunction<AxiosResponse, AxiosError>) => {
    const {token, update} = get();
    await AuthUtils.remove();
    update({
      loggedOut: true,
    });
    await showSpinner();
    useUserStore.getState().update();
    useAddressStore.getState().update();

    return apiPromise({
      endpoint: 'logout',
      token,
      displayError: false,
      displaySuccess: false,
    })
      .then(response => {
        hideSpinner();
        then && then(response);
      })
      .catch(err => {
        hideSpinner();
        then && then(null, err);
      })
      .finally(() => hideSpinner());
  },
}));
