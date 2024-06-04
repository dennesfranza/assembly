import { defineStore } from "pinia";
import state from "./state";
import baseUrl from "../../config/index";
import {
  actionGetAllConsumables,
  actionRetrieveConsumableItem,
  actionDestroyConsumableItem,
  actionUpdateConsumableItem,
  actionOpenConsumableDetailsPage,
  actionCloseConsumableDetailsPage,
  actionOpenAddConsumableItemDialog,
  actionCloseAddConsumableItemDialog,
  actionPostConsumableItem,
  actionSearchConsumable,
} from "./actions";

export const useConsumablesStore = defineStore("consumables", {
  state: () => state,
  getters: {
    consumableItems: (state) => {
      return state.tableindexrows.map((a) => ({
        id: a.id,
        name: a.name,
        description: a.description,
        image: `${baseUrl.baseUrl}${a.image}`,
        created_at: a.created_at,
      }));
    },
    consumableOptions: (state) => {
      return state.consumablesearchresults.map(a => ({
        label: a.name,
        value: a.id
      }))
    }
  },
  actions: {
    getAllItems() {
      actionGetAllConsumables(this);
    },
    getConsumableItem(payload) {
      actionRetrieveConsumableItem(this, payload.id);
    },
    deleteConsumableItem(payload) {
      actionDestroyConsumableItem(this, payload.id);
    },
    updateConsumableItem(payload) {
      actionUpdateConsumableItem(this, payload);
    },
    openConsumableDetailsDialog(payload) {
      actionOpenConsumableDetailsPage(this, payload);
    },
    closeConsumableDetailsDialog() {
      actionCloseConsumableDetailsPage(this);
    },
    openAddConsumableItemDialog() {
      actionOpenAddConsumableItemDialog(this);
    },
    closeAddConsumableItemDialog() {
      actionCloseAddConsumableItemDialog(this);
    },
    postConsumableItem() {
      actionPostConsumableItem(this);
    },
    searchConsumable(payload) {
      actionSearchConsumable(this, payload)
    }
  },
});
