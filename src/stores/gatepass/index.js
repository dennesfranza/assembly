import { defineStore } from "pinia";
import state from "./state";
import {

} from "./actions";

export const useGatepassStore = defineStore('gatepass', {
  state: () => state,
  getters: {
    hasSelection: (state) => {
      if (state.selected.length > 0) {
        return true;
      } else {
        return false;
      }
    },
  },
  actions: {

  }
})
