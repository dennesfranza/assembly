import { defineStore } from "pinia";
import state from "./state";
import {
  actionGetAllDeliveryReceiptItems,
  actionOpenDeliveryItemDialog,
  actionCloseDeliveryItemDialog,
  addItemToCreateDeliveryReceipt,
  actionPostDeliveryReceiptItem
} from './actions'

export const useDeliveryReceiptStore = defineStore("deliveryreceipt", {
  state: () => state,
  getters: {},
  actions: {
    getAllDeliveryItems () {
      actionGetAllDeliveryReceiptItems(this)
    },
    openAddDeliveryDialog() {
      actionOpenDeliveryItemDialog(this)
    },
    closeAddDeliveryDialog() {
      actionCloseDeliveryItemDialog(this)
    },
    addDeliveryItem() {
      addItemToCreateDeliveryReceipt(this)
      actionCloseDeliveryItemDialog(this)
    },
    postItem() {
      actionPostDeliveryReceiptItem(this)
    }
  }
})
