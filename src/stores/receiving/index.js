import { defineStore } from "pinia";
import state from "./state";
import {
  actionGetAllReceivingItems,
  actionRetrieveReceivingItem,
  actionCreateReceivingItem,
  actionUpdateReceivingItem,
  actionDeleteReceivingItem,
  actionOpenAddReceivingItemDialog,
  actionCloseAddReceivingItemDialog,
  actionAddItemToCreateReceiving,
  actionOpenReceivingDetailsDialog,
  actionCloseReceivingDetailsDialog,
  actionUpdateConfirmedBy,
  actionUpdateVerifiedBy,
  actionSearchDeliveryNumber,
  actionOpenAddSupplierDialog,
  actionOpenAddRemarksDialog,
  actionCloseAddSupplierDialog,
  actionCloseAddRemarksDialog,
  actionAddSupplierToItems,
  actionAddRemarksToItems,
  actionReset,
  actionUpdateConfirmed,
  actionUpdateVerified
} from "./actions";

export const useReceivingStore = defineStore("receiving", {
  state: () => state,
  getters: {
    deliveryNumberOptions: (state) => {
      return state.deliverynumbersearchresults.map((a) => ({
        label: a.invoice_number,
        value: a.id,
      }));
    },
    hasSelectedReportItems: (state) => {
      if (state.receivingpayload.receiving_report_items.length > 0) {
        return true
      }
      return false
    },
    hasSelection: (state) => {
      if (state.selected.length > 0) {
        return true;
      } else {
        return false;
      }
    },
  },
  actions: {
    getAllReceivingReportItems() {
      actionGetAllReceivingItems(this);
    },
    retrieveReceivingReportItem(id) {
      actionRetrieveReceivingItem(this, id);
    },
    createReceivingReportItem() {
      actionCreateReceivingItem(this);
    },
    updateReceivingReportItem() {
      actionUpdateReceivingItem(this);
    },
    removeReceivingReportItem() {
      actionDeleteReceivingItem(this);
    },
    openAddReceivingItemDialog() {
      actionOpenAddReceivingItemDialog(this);
    },
    closeAddReceivingItemDialog() {
      actionCloseAddReceivingItemDialog(this);
    },
    addItemToCreate(payload) {
      actionAddItemToCreateReceiving(this, payload);
    },
    openReceivingDetailsDialog() {
      actionOpenReceivingDetailsDialog(this);
    },
    closeReceivingDetailsDialog() {
      actionCloseReceivingDetailsDialog(this);
    },
    updateConfirmedBy() {
      actionUpdateConfirmedBy(this);
    },
    updateVerifiedBy() {
      actionUpdateVerifiedBy(this);
    },
    searchDeliveryNumber(payload) {
      actionSearchDeliveryNumber(this, payload);
    },
    openAddSupplierDialog() {
      actionOpenAddSupplierDialog(this);
    },
    openAddRemarksDialog() {
      actionOpenAddRemarksDialog(this);
    },
    closeAddSupplierDialog() {
      actionCloseAddSupplierDialog(this);
    },
    closeAddRemarksDialog() {
      actionCloseAddRemarksDialog(this);
    },
    addSupplierToItems(payload) {
      actionAddSupplierToItems(this, payload)
    },
    addRemarksToItems(payload) {
      actionAddRemarksToItems(this, payload)
    },
    reset() {
      actionReset(this)
    },
    updateConfirmedBy(id) {
      actionUpdateConfirmed(this, id)
    },
    updateVerifiedBy(id) {
      actionUpdateVerified(this, id)
    },
  },
});
