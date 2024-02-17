import { defineStore } from "pinia"
import state from "./state"
import getters from "./getters"
import actions from "./actions"

export const useRequisitionStore = defineStore("requisition", {
  state: () => state,
  getters: getters,
  actions: actions,
})
