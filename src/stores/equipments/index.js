import { defineStore } from "pinia";
import state from "./state";
import baseUrl from "../../config/index";
import {
  actionGetAllEquipments,
  actionRetrieveEquipmentItem,
  actionPostEquipmentItem,
  actionSearchEquipment,
  actionOpenEquipmentDetailsDialogPage,
  actionCloseEquipmentDetailsDialogPage,
  actionOpenAddEquipmentDialog,
  actionCloseAddEquipmentDialog,
  actionDestroyEquipmentItem
} from "./actions";

export const useEquipmentStore = defineStore("equipments", {
  state: () => state,
  getters: {
    equipmentItems: (state) => {
      return state.equipmenttableindexrows.map(a => ({
        id: a.id,
        name: a.name,
        type: a.type,
        serial_number: a.serial_number,
        brand: a.brand,
        remarks: a.remarks,
        location: a.location.name,
        image: `${baseUrl.baseUrl}${a.image}`,
        created_at: a.created_at,
      }))
    },
    equipmentOptions: (state) => {
      return state
    },
    hasSelected: (state) => {
      if (state.selected.length > 0) {
        return true
      }
      return false
    }
  },
  actions: {
    getAllItems() {
      actionGetAllEquipments(this)
    },
    getEquipmentItem(payload) {
      actionRetrieveEquipmentItem(this, payload.id)
    },
    postEquipmentItem() {
      actionPostEquipmentItem(this)
    },
    searchEquipmentItem(payload) {
      actionSearchEquipment(this, payload)
    },
    openEquipmentDetailsDialog(payload) {
      actionOpenEquipmentDetailsDialogPage(this, payload)
    },
    closeEquipmentDetailsDialog() {
      actionCloseEquipmentDetailsDialogPage(this)
    },
    openAddEquipmentItemDialog() {
      actionOpenAddEquipmentDialog(this)
    },
    closeAddEquipmentItemDialog() {
      actionCloseAddEquipmentDialog(this)
    },
    deleteEquipmentItem(payload) {
      actionDestroyEquipmentItem(this, payload)
    }
  },
});
