import type { ThenFunction } from '../../types';
import { create } from 'zustand';
import {useAuthStore} from '../auth';
import type { UserInterface } from './UserInterface';
import type { APIError } from '../../services/api/types';
import { apiStandalone } from '../../services/api/funcs';

interface UserState extends UserInterface {
  update: (input?: UserInterface) => void;
  current: (then?: ThenFunction<UserInterface, APIError>) => Promise<void>;
}

export const useUserStore = create<UserState>((set, get) => ({
  update: (input: UserInterface = {}) =>
    set(
      state => ({
        ...input,
        update: state.update,
        current: state.current,
      }),
      true,
    ),
  current: async (then?: ThenFunction<UserInterface, APIError>) => {
    const authState = useAuthStore.getState();
    const {token} = authState;
    await apiStandalone<UserState>({
      endpoint: 'getCurrentUser', displayError: false, displaySuccess: false,
      token,
      onSuccess: user => {
        get().update(user);
        then && then(user);
      },
      onError: error => {
        then && then(null, error);
      },
    });
  },
}));
