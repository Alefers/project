const localStorageExists = typeof localStorage !== 'undefined';

export const useLocalStorage = {
  set(fieldName: string, value: string) {
    if (localStorageExists) {
      localStorage.setItem(fieldName, value);
    }
  },
  get(fieldName: string) {
    if (localStorageExists) {
      return localStorage.getItem(fieldName);
    } else {
      return;
    }
  },
  remove(fieldName: string) {
    if (localStorageExists) {
      localStorage.removeItem(fieldName);
    }
  },
  clear() {
    if (localStorageExists) {
      localStorage.clear();
    }
  }
};
