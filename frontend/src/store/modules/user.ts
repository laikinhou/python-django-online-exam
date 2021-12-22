import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';
import { store } from '../index';
import { UserStore } from '../types';
import userLoginApi from '@/api/common/login';
import { UserInfo } from '@/api/user/types';
import getUserInfoApi from '@/api/user';

const useUserStore = defineStore({
  id: 'user',
  state: (): UserStore => ({
    userInfo: {
      username: '',
      email: '',
      nickname: '',
      avatar: '',
      description: '',
      telephone: '',
    },
    token: '',
  }),
  getters: {
    userToken(): string {
      const storageToken = useStorage(import.meta.env.VITE_AUTH_TOKEN as string, this.token);
      return storageToken.value;
    },

    userInfos(): UserInfo {
      return this.userInfo;
    },
  },
  actions: {
    hasToken(): boolean {
      const storageToken = useStorage(import.meta.env.VITE_AUTH_TOKEN as string, this.token);
      this.token = storageToken.value;
      return !!this.token;
    },

    setToken(token: string): void {
      const storageToken = useStorage(import.meta.env.VITE_AUTH_TOKEN as string, token);
      storageToken.value = token;
      this.token = token;
    },

    async userLogin(username: string, password: string): Promise<boolean> {
      try {
        const token = await userLoginApi({ username, password });
        this.setToken(token);
        return this.hasToken();
      } catch (e) {
        return false;
      }
    },

    userLogout(): void {
      this.setToken('');
      this.clearUserInfo();
    },

    setUserInfo(): void {
      getUserInfoApi().then((resp: UserInfo) => {
        this.userInfo = {
          username: resp.username,
          email: resp.email,
          nickname: resp.nickname,
          avatar: resp.avatar,
          description: resp.description,
          telephone: resp.telephone,
        };
      });
    },

    clearUserInfo(): void {
      this.userInfo = {
        username: '',
        email: '',
        nickname: '',
        avatar: '',
        description: '',
        telephone: '',
      };
    },
  },
});

const useUserStoreWithOut = () => useUserStore(store);

export default useUserStoreWithOut;
