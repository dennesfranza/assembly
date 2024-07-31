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
  actionCloseAddQuantityRemarksDialog,
  actionReset,
  actionRemoveItem,
  actionAddRemarksToItems,
  actionCloseAddRemarksDialog,
  actionOpenAddRemarksDialog,
  actionGenerateDeliveryNumber
} from "./actions";

export const useDeliveryReceiptStore = defineStore("deliveryreceipt", {
  state: () => state,
  getters: {
    deliveryGetItems: (state) => {
      return state.deliveryreceiptdetailsitems.map((item) => ({
        id: item.id,
        description: item.description.id,
        description_label: item.description.name,
        quantity: item.quantity,
        remarks: "",
        suppliers_name: "",
      }));
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
      actionSearchRsNumberOrConsumableItem(this, payload);
    },
    openQuantityRemarksDialog() {
      actionOpenAddQuantityRemarksDialog(this);
    },
    closeQuantityRemarksDialog() {
      actionCloseAddQuantityRemarksDialog(this);
    },
    resetCreateItem() {
      actionReset(this);
    },
    removeItem() {
      actionRemoveItem(this);
    },
    addRemarksToItems(payload) {
      actionAddRemarksToItems(this, payload);
    },
    closeAddRemarksDialog() {
      actionCloseAddRemarksDialog(this)
    },
    openAddRemarksDialog() {
      actionOpenAddRemarksDialog(this)
    },
    generateDeliveryNumber() {
      actionGenerateDeliveryNumber(this)
    }
  },
});
