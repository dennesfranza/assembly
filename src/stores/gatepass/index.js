import { defineStore } from "pinia";
import state from "./state";
import {
  actionGetAllGatePassItems,
  actionPostGatePassItem,
  actionRetrieveGatePassItem,
  actionUpdateGatePassItem,
  actionRemoveGatePassItem,
  actionOpenAddGatepassDialog,
  actionCloseAddGatepassDialog,
  actionResetGatepassCreate,
  actionRemoveItemFromCreateRequest,
} from "./actions";

export const useGatepassStore = defineStore("gatepass", {
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
    postGatePassItem(payload) {
      actionPostGatePassItem(this, payload);
    },
    removeCreateItem(data) {
      actionRemoveItemFromCreateRequest(this, data);
    },
    openAddGatepassDialog() {
      actionOpenAddGatepassDialog(this);
    },
    closeAddGatepassDialog() {
      actionCloseAddGatepassDialog(this);
    },
    reset() {
      actionResetGatepassCreate(this);
    },
  },
});
