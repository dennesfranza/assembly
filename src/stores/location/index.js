import { defineStore } from "pinia";
import state from "./state";
import locationOptions from "./getters";
import {
  getAllLocations
} from './actions'

export const useLocationStore = defineStore("locationstore", {
  state: () => state,
  getters: {
    locationOptions: (state) => {
      return state.locations.map(a => ({label: a.name, value: a.id}))
    }
  },
  actions: {
    loadLocations () {
      getAllLocations(this)
    }
  }
})
