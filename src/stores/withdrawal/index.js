import { defineStore } from "pinia";
import state from "./state";
import {
  actionGetAllWithdrawalItems,
  actionOpenDetailsDialog,
  actionCloseDetailsDialog,
  actionRetrieveWithdrawalItem,
  actionPostWithdrawalItem,
  actionOpenAddWithdrawalSlipDialog,
  actionCloseAddWithdrawalSlipDialog,
  addItemToCreateRequest,
  setDefaultWithdrawalItems,
  removeItemFromCreateRequest,
  actionApproveRequest
} from "./actions";

export const useWithdrawalStore = defineStore("withdrawalslip", {
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
    },
    postWithdrawalItem(payload) {
      actionPostWithdrawalItem(this, payload)
    },
    openAddWithdrawalSlipDialog() {
      actionOpenAddWithdrawalSlipDialog(this)
    },
    closeAddWithdrawalSlipDialog() {
      actionCloseAddWithdrawalSlipDialog(this)
      setDefaultWithdrawalItems(this)
    },
    addWithdrawalItem() {
      addItemToCreateRequest(this)
      actionCloseAddWithdrawalSlipDialog(this)
      setDefaultWithdrawalItems(this)
    },
    removeWithdrawalItem(item) {
      removeItemFromCreateRequest(this, item)
    },
    approveRequest(payload) {
      state.withdrawalslipapprovalloading = true
      actionApproveRequest(this, payload)
    },
    disapproveRequest(payload) {
      state.withdrawalslipdisapprovalloading = true
      actionApproveRequest(this, payload)
    }
  },
});
