import { defineStore } from "pinia";
import state from "./state";
import baseUrl from '../../config/index'
import {
  actionGetAllConsumables,
  actionRetrieveConsumableItem,
  actionDestroyConsumableItem,
  actionUpdateConsumableItem,
  actionOpenConsumableDetailsPage,
  actionCloseConsumableDetailsPage
} from "./actions";

export const useConsumablesStore = defineStore("consumables", {
  state: () => state,
  getters: {
    consumableItems: (state) => {
      return state.tableindexrows.map(a => ({
        id: a.id,
        name: a.name,
        description: a.description,
        image: `${baseUrl.baseUrl}${a.image}`,
        created_at: a.created_at,
      }))
    }
  },
  actions: {
    getAllItems() {
      actionGetAllConsumables(this)
    },
    openConsumableDetailsDialog(payload) {
      actionOpenConsumableDetailsPage(this, payload)
    },
    closeConsumableDetailsDialog() {
      actionCloseConsumableDetailsPage(this)
    }
  },
});
