import { defineStore } from "pinia";
import state from "./state";
import {
  actionOpenDeliveryItemDialog,
  actionCloseDeliveryItemDialog,
  addItemToCreateDeliveryReceipt,
  actionPostDeliveryReceiptItem
} from './actions'

export const useDeliveryReceiptStore = defineStore("deliveryreceipt", {
  state: () => state,
  getters: {},
  actions: {
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
