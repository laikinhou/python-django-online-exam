import { defineStore } from 'pinia';
import { store } from '../index';
import { BasicInfo } from '../types';

const useBasicStore = defineStore({
  id: 'basic',
  state: (): BasicInfo => ({}),
  getters: {},
  actions: {},
});

const useBasictoreWithOut = () => useBasicStore(store);

export default useBasictoreWithOut;
