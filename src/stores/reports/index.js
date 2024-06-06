import { defineStore } from "pinia";
import state from "./state";

export const useReportsStore = defineStore('reports', {
  state: () => state,
  getters: {},
  actions: {
    
  }
})
