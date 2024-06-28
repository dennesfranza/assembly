import { defineStore } from "pinia";
import state from "./state";
import baseUrl from "../../config/index";
import {} from "./actions";

export const useEquipmentStore = defineStore("equipments", {
  state: () => state,
  getters: {},
  actions: {},
});
