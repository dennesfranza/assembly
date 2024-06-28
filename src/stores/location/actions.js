import { axiosInstance } from "boot/axios";

const getAllLocations = (state) => {
  state.locationtableindexloading = true
  axiosInstance.get('warehouse/').then(response => {
    if (response.status === 200) {
      state.locations = response.data.results
      state.locationtableindexrows = response.data.results
    }
  }).catch(error => {
    console.log(error)
  }).finally(() => {
    state.locationtableindexloading = false
  })
}

export {
  getAllLocations
}
