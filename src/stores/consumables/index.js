import { defineStore } from "pinia";
import state from "./state";


export const useConsumablesStore = defineStore('consumables', {
  state: () => state,
  getters: {},
  actions: {}
})
