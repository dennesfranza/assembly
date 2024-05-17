import { axiosInstance } from "boot/axios";


const getAllLocations = (state) => {
  axiosInstance.get('warehouse/').then(response => {
    if (response.status === 200) {
      state.locations = response.data
    }
  }).catch(() => {
    // error here
  })
}

export {
  getAllLocations
}
