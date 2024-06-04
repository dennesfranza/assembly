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
  actionSearchRsNumber
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
    }
  },
});
