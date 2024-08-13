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

const actionOpenAddGatepassDialog = (state) => {
  state.addgatepassdialog = true
}

const actionCloseAddGatepassDialog = (state) => {
  state.addgatepassdialog = false
  state.gate_pass_items = {
    item: "",
    description: null,
    quantity: 0,
  }
}

const actionResetGatepassCreate = (state) => {
  state.gate_pass_items = {
    item: "",
    description: null,
    quantity: 0,
  }
  state.gatepasscreateitem = {
    gp_number: "",
    please_allow: "",
    date: "",
    purpose: "",
    prepared_by: null,
    noted_by: null,
    checked_by: null,
    location: null,
    date_time_in: "",
    date_time_out: "",
    remarks: "",
    gate_pass_items: []
  }
}

export {
  actionGetAllGatePassItems,
  actionRetrieveGatePassItem,
  actionUpdateGatePassItem,
  actionRemoveGatePassItem,
  actionOpenAddGatepassDialog,
  actionCloseAddGatepassDialog,
  actionResetGatepassCreate
}
