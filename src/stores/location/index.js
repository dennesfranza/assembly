import { defineStore } from "pinia";
import state from "./state";
import {
  getAllLocations,
  actionOpenLocationDialog,
  actionCloseLocationDialog,
  actionPostLocationItem,
  actionRemoveLocationItem,
  actionOpenLocationUpdateDialog,
  actionCloseLocationUpdateDialog,
  actionUpdateLocationItem
} from "./actions";

export const useLocationStore = defineStore("locationstore", {
  state: () => state,
  getters: {
    hasSelection: (state) => {
      if (state.selected.length > 0) {
        return true;
      } else {
        return false;
      }
    },
    locationOptions: (state) => {
      return state.locationtableindexrows.map((a) => ({ label: a.name, value: a.id }));
    },
  },
  actions: {
    loadLocations() {
      getAllLocations(this);
    },
    openAddLocationDialog() {
      actionOpenLocationDialog(this);
    },
    closeAddLocationDialog() {
      actionCloseLocationDialog(this);
    },
    postLocationItem() {
      actionPostLocationItem(this)
    },
    removeLocationItem() {
      actionRemoveLocationItem(this)
    },
    openUpdateLocationDialog() {
      actionOpenLocationUpdateDialog(this)
    },
    closeUpdateLocationDialog() {
      actionCloseLocationUpdateDialog(this)
    },
    updateLocationItem() {
      actionUpdateLocationItem(this)
    }
  },
  persist: true,
});
