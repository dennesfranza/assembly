import { defineStore } from "pinia";
import state from "./state";
import { getAllUsers } from "./actions";

export const useUserStore = defineStore("users", {
  state: () => state,
  getters: {
    approverOptions: (state) => {
      return state.users.map((a) => ({ label: a.name, value: a.id }));
    },
    usersOptions: (state) => {
      return state.users.map((a) => ({ label: a.name, value: a.id }));
    },
  },
  actions: {
    loadAllUsers() {
      getAllUsers(this);
    },
  },
  persist: true,
});
