import { defineStore } from "pinia";
import state from "./state";
import {
  actionGetAllRequisitionItems,
  actionRetrieveRequisitionItem,
  postRequisitionItem,
  actionOpenRequestItemDialog,
  actionCloseRequestItemDialog,
  setDefaultRequestItems,
  addItemToCreateRequest,
  removeItemFromCreateRequest,
  rearrageItemNumberCreateRequest,
  actionOpenRequestDetailsDialog,
  actionCloseRequestDetailsDialog,
  actionSearchRsNumber,
  actionApproveRequest,
  actionResetCreateItem,
  actionOpenEditDialog,
  actionRemoveRequisitionRequestItem,
  actionRemoveRequisitionItem,
  actionOpenAddEditDialog,
  actionCloseAddEditDialog,
  actionUpdateRequisitionRequest
} from "./actions";

export const useRequisitionStore = defineStore("requisitionslip", {
  state: () => state,
  getters: {
    hasSelection: (state) => {
      if (state.selected.length > 0) {
        return true;
      } else {
        return false;
      }
    },
    hasEditItemSelection: (state) => {
      if (state.itemselected.length > 0) {
        return true;
      } else {
        return false;
      }
    },
    rsNumberOptions: (state) => {
      return state.rsnumbersearchresults.map((a) => ({
        label: a.rs_number,
        value: a.id,
      }));
    },
  },
  actions: {
    getAllItems() {
      actionGetAllRequisitionItems(this);
    },
    retrieveRequisitionItem(payload) {
      actionRetrieveRequisitionItem(this, payload);
    },
    postItem(payload) {
      postRequisitionItem(this, payload);
    },
    openAddRequisitionDialog() {
      actionOpenRequestItemDialog(this);
    },
    closeAddRequisitionDialog() {
      actionCloseRequestItemDialog(this);
      setDefaultRequestItems(this);
    },
    addRequestItem() {
      addItemToCreateRequest(this);
      actionCloseRequestItemDialog(this);
      setDefaultRequestItems(this);
    },
    removeRequesItem(item) {
      removeItemFromCreateRequest(this, item);
      rearrageItemNumberCreateRequest(this);
    },
    openRequisitionDetailsDialog() {
      actionOpenRequestDetailsDialog(this);
    },
    closeRequisitionDetailsDialog() {
      actionCloseRequestDetailsDialog(this);
    },
    searchRsNumber(payload) {
      actionSearchRsNumber(this, payload)
    },
    approveRequest(payload) {
      state.requisitionapprovalloading = true
      actionApproveRequest(this, payload)
    },
    disapproveRequest(payload) {
      state.requisitiondisapprovalloading = true
      actionApproveRequest(this, payload)
    },
    resetCreateItem() {
      setDefaultRequestItems(this);
      actionResetCreateItem(this)
    },
    openEditDialog() {
      actionOpenEditDialog(this)
    },
    removeRequesitionRequestItem(id) {
      actionRemoveRequisitionRequestItem(this, id)
    },
    removeRequisitionItem(id) {
      actionRemoveRequisitionItem(this, id)
    },
    openAddEditDialog() {
      actionOpenAddEditDialog(this)
    },
    closeAddEditDialog() {
      actionCloseAddEditDialog(this)
    },
    updateRequisitionRequest() {
      actionUpdateRequisitionRequest(this)
    }
  },
});
