import { create } from 'zustand';
import {useAuthStore} from '../auth';
import type { AddressInterface } from './AddressInterface';
import type { ThenFunction } from '../../types';
import { apiStandalone, APIError } from '../../services';

interface AddressState extends AddressInterface {
  update: (input?: AddressInterface) => void;
  current: (then?: ThenFunction<AddressInterface, APIError>) => Promise<void>;
}

export const useAddressStore = create<AddressState>((set, get) => ({
  update: (input: AddressInterface = {}) =>
    set(
      state => ({
        ...input,
        update: state.update,
        current: state.current,
      }),
      true,
    ),
  current: async (then?: ThenFunction<AddressInterface, APIError>) => {
    const authState = useAuthStore.getState();
    const {token} = authState;
    await apiStandalone<AddressState>({
      endpoint: 'getSingleAddress', displayError: false, displaySuccess: false,
      token,
      onSuccess: address => {
        get().update(address);
        then && then(address);
      },
      onError: error => {
        then && then(null, error);
      },
    });
  },
}));
