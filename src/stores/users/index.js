import { defineStore } from "pinia"
import state from "./state"
import getters from "./getters"
import {
  getAllUsers
} from "./actions"

export const useUserStore = defineStore('users', {
  state: () => state,
  getters: getters,
  actions: {
    loadAllUsers () {
      getAllUsers(this)
    }
  },
  persist: true
})
