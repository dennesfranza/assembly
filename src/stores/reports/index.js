import { defineStore } from "pinia";
import state from "./state";
import {
  actionGetAllRequisitionItems
} from "./actions";

export const useReportsStore = defineStore('reports', {
  state: () => state,
  getters: {},
  actions: {
    getAllRequestLogsheetItems() {
      actionGetAllRequisitionItems(this)
    }
  }
})
