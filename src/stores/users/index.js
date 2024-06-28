import { defineStore } from "pinia";
import state from "./state";
import { getAllUsers } from "./actions";

export const useUserStore = defineStore("users", {
  state: () => state,
  getters: {
    approverOptions: (state) => {
      return state.users
        .filter((obj) => obj.is_approver === true)
        .map((a) => ({ label: a.name, value: a.id }));
    },
    usersOptions: (state) => {
      return state.users.map((a) => ({ label: a.name, value: a.id }));
    },
    securityOptions: (state) => {
      return state.users
      .filter((obj) => obj.is_security === true)
      .map((a) => ({ label: a.name, value: a.id }));
    },
    supervisorOptions: (state) => {
      return state.users
        .filter((obj) => obj.is_supervisor === true)
        .map((a) => ({ label: a.name, value: a.id }));
    },
  },
  actions: {
    loadAllUsers() {
      getAllUsers(this);
    },
  },
  persist: true,
});
