import { defineStore } from "pinia";
import state from "./state";
import {
  actionGetAllDeliveryReceiptItems,
  actionRetrieveDeliveryItem,
  actionOpenDeliveryItemDialog,
  actionCloseDeliveryItemDialog,
  addItemToCreateDeliveryReceipt,
  actionPostDeliveryReceiptItem,
  actionOpenDeliveryDetailsDialog,
  actionCloseDeliveryDetailsDialog,
  actionSearchRsNumberOrConsumableItem,
  actionOpenAddQuantityRemarksDialog,
  actionCloseAddQuantityRemarksDialog
} from "./actions";

export const useDeliveryReceiptStore = defineStore("deliveryreceipt", {
  state: () => state,
  getters: {},
  actions: {
    getAllDeliveryItems() {
      actionGetAllDeliveryReceiptItems(this);
    },
    retrieveDeliveryItem(payload) {
      actionRetrieveDeliveryItem(this, payload);
    },
    openAddDeliveryDialog() {
      actionOpenDeliveryItemDialog(this);
    },
    closeAddDeliveryDialog() {
      actionCloseDeliveryItemDialog(this);
    },
    addDeliveryItem() {
      addItemToCreateDeliveryReceipt(this);
    },
    postItem() {
      actionPostDeliveryReceiptItem(this);
    },
    openDeliveryDetailsDialog() {
      actionOpenDeliveryDetailsDialog(this);
    },
    closeDeliveryDetailsDialog() {
      actionCloseDeliveryDetailsDialog(this);
    },
    searchDeliveryRsOrItem(payload) {
      actionSearchRsNumberOrConsumableItem(this, payload)
    },
    openQuantityRemarksDialog() {
      actionOpenAddQuantityRemarksDialog(this)
    },
    closeQuantityRemarksDialog() {
      actionCloseAddQuantityRemarksDialog(this)
    }
  },
});
