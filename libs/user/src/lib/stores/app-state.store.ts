import { create } from 'zustand';
import { axiosInstance } from '@lib/helper';


const USER_URL = '/v1/users/user';

interface IAppStateStore {
  isAuth: boolean;
  appReady: boolean;
  displayAppLoader: boolean;

  setAppReady: () => void;
  fetchUserData: () => void;
  setAppLoaderState: (state: boolean) => void;
}

export const appStateStore = create<IAppStateStore>()((set) => ({
  isAuth: false,
  appReady: false,
  displayAppLoader: false,

  setAppReady: () => set({ appReady: true }),
  fetchUserData: async () => {
    try {
      const userData = (await axiosInstance.get(USER_URL)).data;
      if (userData) {
        set({
          isAuth: true,
          appReady: true,
          displayAppLoader: false,
        });
      }
    } catch (e) {
      console.log(e);
    }
  },
  setAppLoaderState: (displayAppLoader) => set({ displayAppLoader }),
}));
