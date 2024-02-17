import { defineStore } from "pinia"
import state from "./state"
import getters from "./getters"
import actions from "./actions"

export const useFormHeadersStore = defineStore("formheaders", {
  state: () => state,
  getters: getters,
  actions: actions,
})
