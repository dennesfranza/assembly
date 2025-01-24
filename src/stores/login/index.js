import { defineStore } from "pinia";
import state from "./state";
import { actionLogin, actionLogout, actionRefreshToken } from "./actions";

export const useLoginStore = defineStore("login", {
  state: () => state,
  getters: {
    preparedByOptions: (state) => {
      return [{label: state.login.name, value: state.login.id}]
    },
    currentUserId: (state) => {
      return state.login.id
    }
  },
  actions: {
    userLogin() {
      actionLogin(this, this.credentials);
    },
    userLogout() {
      actionLogout(this);
    },
    userRefreshToken() {
      actionRefreshToken(this);
    },
  },
  persist: true,
});
