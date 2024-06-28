import { defineStore } from "pinia";
import state from "./state";
import {
  actionGetAllWithdrawalItems,
  actionOpenDetailsDialog,
  actionCloseDetailsDialog,
  actionRetrieveWithdrawalItem,
} from "./actions";

export const useWithdrawalStore = defineStore("withdrawalslip", {
  state: () => state,
  getters: {},
  actions: {
    getAllItems() {
      actionGetAllWithdrawalItems(this);
    },
    openDetailsDialog() {
      actionOpenDetailsDialog(this);
    },
    closeDetailsDialog() {
      actionCloseDetailsDialog(this);
    },
    retrieveWithdrawalItem(id) {
      actionRetrieveWithdrawalItem(this, id)
    }
  },
});
