import React, {useContext, useEffect, useState} from 'react';
import shallow from 'zustand/shallow';
import type { AddressModel, AuthInterface } from '../models';
import type { ReactFC } from '../types';
import { AuthUtils, useAddressStore, useAuthStore, useUserStore } from '../models';
import LocationFactory from '../factories/LocationFactory';

export interface ICurrentUserConfig {
  location?: AddressModel;
  initialPing: () => Promise<void>;
  getLocation: () => Promise<void>;
  logout: () => Promise<void>;
  initAuth: () => Promise<void>;
  login: (_auth: AuthInterface) => Promise<void>;
}

export const GetCurrentUserCtx = React.createContext<ICurrentUserConfig>({
  initialPing: async () => {},
  getLocation: async () => {},
  logout: async () => {},
  login: async () => {},
  initAuth: async () => {},
});

export const useCurrentUser = () => useContext(GetCurrentUserCtx);

const GetCurrentUser: ReactFC = ({children}) => {
  const [isAuth, updateAuth, token] = useAuthStore(s => [s.isAuth, s.update, s.token], shallow);
  const [getCurrentUser, updateUser, userId] = useUserStore(
    s => [s.current, s.update, s.id],
    shallow,
  );
  const [getCurrentAdd, updateAddress, addressId] = useAddressStore(
    s => [s.current, s.update, s.id],
    shallow,
  );
  const [location, setLocation] = useState<AddressModel>();

  async function _getUser() {
    await getCurrentUser();
  }

  async function _getAddress() {
    await getCurrentAdd();
  }

  async function getLocation() {
    try {
      await LocationFactory.getCurrentLocation(add => {
        if (add) {
          setLocation(add);
        }
      });
    } catch (e) {
      console.log(e);
    }
  }

  async function _getInitialData() {
    if (isAuth()) {
      await _getUser();
      await _getAddress();
    }
  }

  async function initAuth() {
    const a = await AuthUtils.init();
    const j = AuthUtils.simplify(a);
    await updateAuth(j);
  }

  async function _init() {
    await initAuth();
    await _getInitialData();
  }

  async function initialPing() {
    if (!token) {
      await initAuth();
    }
    if (!userId || !addressId) {
      await _getInitialData();
    }
    // try {
    //   await getLocation();
    // } catch (e) {
    //   console.log(e);
    // }
  }

  async function login(_auth: AuthInterface) {
    try {
      await _getInitialData();
    } catch (e) {
      console.log(e);
    }
  }

  async function logout() {
    await AuthUtils.remove();
    await updateAuth();
    await updateUser();
    await updateAddress();
  }

  useEffect(() => {
    _init();
  }, []);

  return (
    <GetCurrentUserCtx.Provider
      value={{
        location,
        initialPing,
        logout,
        login,
        getLocation,
        initAuth,
      }}>
      {children}
    </GetCurrentUserCtx.Provider>
  );
};

export default GetCurrentUser;
