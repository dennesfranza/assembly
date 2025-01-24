import { defineStore } from "pinia";
import state from "./state";
import {
  actionGetAllVehicles,
  actionOpenVehicleDetailsDialog,
  actionCloseVehicleDetailsDialog,
  actionOpenAddVehicleDialog,
  actionCloseAddVehicleDialog,
  actionPostVehicleItem
} from "./actions";

export const useVehicleStore = defineStore("vehicleStore", {
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
    getAllVehicles() {
      actionGetAllVehicles(this)
    },
    openVehicleDetailsDialog(payload) {
      actionOpenVehicleDetailsDialog(this, payload)
    },
    closeVehicleDetailsDialog() {
      actionCloseVehicleDetailsDialog(this)
    },
    openAddVehicleDialog() {
      actionOpenAddVehicleDialog(this)
    },
    closeAddVehicleDialog() {
      actionCloseAddVehicleDialog(this)
    },
    postVehicleItem() {
      actionPostVehicleItem(this)
    }
  }
});
