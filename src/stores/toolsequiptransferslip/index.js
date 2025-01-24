import { defineStore } from "pinia";
import state from "./state";
import {
  actionGetAllEquipmentTransferItems,
  actionOpenCreateDialog,
  actionCloseCreateDialog,
} from "./actions";

export const useEquipTransferSlipStore = defineStore('equipmenttransfer', {
  state: () => state,
  getters: {},
  actions: {
    getAllItems() {
      actionGetAllEquipmentTransferItems(this)
    },
    openCreateDialog() {
      actionOpenCreateDialog(this)
    },
    closeCreateDialog() {
      actionCloseCreateDialog(this)
    }
  }
})
