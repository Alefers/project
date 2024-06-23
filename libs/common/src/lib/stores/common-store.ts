import { create } from 'zustand';


interface ICommonStore {

}

const initialCommonStore = {

}

export const commonStore = create<ICommonStore>()((set) => ({
  ...initialCommonStore,
}));
