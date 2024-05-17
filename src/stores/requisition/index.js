import { defineStore } from "pinia";
import state from "./state";
import getters from "./getters";
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
  actionCloseRequestDetailsDialog
} from "./actions";

export const useRequisitionStore = defineStore("requisitionslip", {
  state: () => state,
  getters: getters,
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
      removeItemFromCreateRequest(this, item)
      rearrageItemNumberCreateRequest(this)
    },
    openRequisitionDetailsDialog() {
      actionOpenRequestDetailsDialog(this)
    },
    closeRequisitionDetailsDialog() {
      actionCloseRequestDetailsDialog(this)
    }
  },
});
