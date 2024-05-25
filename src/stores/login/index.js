import { defineStore } from "pinia";
import state from "./state";
import { actionLogin, actionLogout } from "./actions";

export const useLoginStore = defineStore("login", {
  state: () => state,
  actions: {
    userLogin() {
      actionLogin(this, this.credentials);
    },
    userLogout() {
      actionLogout(this)
    }
  },
});
