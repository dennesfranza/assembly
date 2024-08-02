import { axiosInstance, axiosFormPost } from "boot/axios";
import { Notify } from "quasar";

const actionGetAllGatePassItems = (state) => {
  // gatepass
  state.tableindexloading = true
  axiosInstance.get(`gatepass/`).then(response => {
    if (response.status === 200) {
      state.tableindexrows = response.data.results
    }
  }).catch(error => {
    Notify.create({
      timeout: 1500,
      position: "center",
      color: "red",
      message: `Error: ${JSON.stringify(error.response.data)}`,
    });
  }).finally(() => {
    state.tableindexloading = false
  })
}

const actionRetrieveGatePassItem = (state, id) => {}

const actionUpdateGatePassItem = (state, id) => {}

const actionRemoveGatePassItem = (state, id) => {}

export {
  actionGetAllGatePassItems,
  actionRetrieveGatePassItem,
  actionUpdateGatePassItem,
  actionRemoveGatePassItem
}
