import { defineStore } from "pinia";
import state from "./state";
import getters from "./getters";
import {
  actionCloseAddVehicleDialog,
  actionOpenAddVehicleDialog,
  updateTableIndexRowsToFirst,
  setDefaultVehicleDetails,
  getAllVehicles,
} from "./actions";

export const useVehicleManagementStore = defineStore("vehiclemanagement", {
  state: () => state,
  getters: { getters },
  actions: {
    getVehicles() {
      getAllVehicles(this);
    },
    openAddVehicleDialog() {
      actionOpenAddVehicleDialog(this);
      let p = {
        id: 3,
        vehicle_model: "Eon",
        body_type: "Hatchback",
        plate_number: "FBD495",
        year_model: "2016",
        status: "Registered",
        site: "Project C",
      };
      updateTableIndexRowsToFirst(this, p);
    },
    closeAddVehicleDialog() {
      actionCloseAddVehicleDialog(this);
      setDefaultVehicleDetails(this);
    },
  },
});
