import { defineStore } from 'pinia';
import { store } from '../index';
import { UserInfo } from '../types';

const useUserStore = defineStore({
  id: 'user',
  state: (): UserInfo => ({
    username: '',
    token: '',
  }),
  getters: {
    userToken(): string {
      return this.token;
    },

    userName(): string {
      return this.username;
    },
  },
  actions: {
    hasToken(): boolean {
      if (!this.token) {
        return false;
      }

      return this.token !== '';
    },

    setToken(token: string): void {
      this.token = token;
    },

    setUsername(username: string): void {
      this.username = username;
    },
  },
});

const useUserStoreWithOut = () => useUserStore(store);

export default useUserStoreWithOut;
