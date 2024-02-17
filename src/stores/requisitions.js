import { defineStore } from "pinia";

export const useRequisitionStore = defineStore("requisition", {
  state: () => ({
    rsNumber: "",
    dateRequested: "",
    dateNeeded: "",
    requisitionItems: [],
    item: {
      number: "",
      quantity: "",
      unit: "",
      description: "",
      purpose: "",
    },
    requestor: "",
  }),
  actions: {
    addItemInRequisition (payload) {
      this.requisitionItems.push(payload);
    }
  },
});
