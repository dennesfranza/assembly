import { defineStore } from "pinia";
import state from "./state";
import {
  actionGetAllGatePassItems,
  actionRetrieveGatePassItem,
  actionUpdateGatePassItem,
  actionRemoveGatePassItem,
  actionOpenAddGatepassDialog,
  actionCloseAddGatepassDialog,
  actionResetGatepassCreate
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
    //
    openAddGatepassDialog() {
      actionOpenAddGatepassDialog(this)
    },
    closeAddGatepassDialog() {
      actionCloseAddGatepassDialog(this)
    },
    reset() {
      actionResetGatepassCreate(this)
    }
  }
})
