import { axiosInstance } from "boot/axios";
import { Notify } from "quasar";

const actionGetAllWithdrawalItems = (state) => {
  state.tableindexloading = true;
  axiosInstance
    .get(`withdrawalslip/`)
    .then((response) => {
      if (response.status === 200) {
        state.tableindexrows = response.data;
      }
    })
    .catch((error) => {
      Notify.create({
        timeout: 1500,
        position: "center",
        color: "red",
        message: `Error: ${JSON.stringify(error.response.data)}`,
      });
    })
    .finally(() => {
      state.tableindexloading = false;
    });
};

const actionOpenDetailsDialog = (state) => {
  state.withdrawalslipdetailsdialog = true;
  state.withdrawalslipdetailsloadingpage = true
};

const actionCloseDetailsDialog = (state) => {
  state.withdrawalslipdetailsdialog = false;
  state.withdrawalslipdetails = {
    location: null,
    requested_by: null,
    noted_by: null,
    issued_by: null,
    ws_number: null,
    date: null
  }
  state.withdrawalslipdetailsitems = []
};

const actionRetrieveWithdrawalItem = (state, id) => {
  axiosInstance.get(`withdrawalslip/${id}/`).then(response => {
    if (response.status === 200) {
      state.withdrawalslipdetails.location = response.data.location.name
      state.withdrawalslipdetails.requested_by = response.data.requested_by.name
      state.withdrawalslipdetails.noted_by = response.data.noted_by === null ? response.data.noted_by.name : ''
      state.withdrawalslipdetails.issued_by = response.data.issued_by === null ? response.data.issued_by.name : ''
      state.withdrawalslipdetails.ws_number = response.data.ws_number
      state.withdrawalslipdetails.date = response.data.date
      state.withdrawalslipdetailsitems = response.data.withdrawal_slip_items
    }
  }).catch(error => {
    Notify.create({
      timeout: 1500,
      position: "center",
      color: "red",
      message: `Error: ${JSON.stringify(error.response.data)}`,
    });
  }).finally(() => {
    state.withdrawalslipdetailsloadingpage = false
  })
}

const actionPostWithdrawalItem = (state, payload) => {
  state.postwithdrawalslipitemloading = true
  axiosInstance.post(`withdrawalslip/`, payload).then(response => {
    if (response.status === 200) {
      Notify.create({
        timeout: 1500,
        position: "center",
        color: "primary",
        message: `Withdrawal Slip Saved`,
      });
    }
  }).catch(error => {
    Notify.create({
      timeout: 1500,
      position: "center",
      color: "red",
      message: `Error: ${JSON.stringify(error.response.data)}`,
    });
  }).finally(() => {
    state.postwithdrawalslipitemloading = false
    state.createwithdrawalitem = {
      ws_number: "",
      date: "",
      location: null,
      requested_by: null,
      noted_by: null,
      issued_by: null,
      withdrawal_slip_items: [],
    }
    state.router.push({ path: "/WithdrawalSlip" });
  })
}

const actionOpenAddWithdrawalSlipDialog = (state) => {
  state.addwithdrawalslipitemdialog = true
}

const actionCloseAddWithdrawalSlipDialog = (state) => {
  state.addwithdrawalslipitemdialog = false
}

const addItemToCreateRequest = (state) => {
  let data = state.createwithdrawalitems
  state.createwithdrawalitem.withdrawal_slip_items.push(data)
}

const setDefaultWithdrawalItems = (state) => {
  state.createwithdrawalitems = {
    description: null,
    description_label: "",
    quantity: 0,
    purpose: ""
  }
}

const removeItemFromCreateRequest = (state, data) => {
  let objindex = state.createwithdrawalitem.withdrawal_slip_items.findIndex(
    item => item.description === data.description
  )
  state.createwithdrawalitem.withdrawal_slip_items.splice(objindex, 1)
}

const actionApproveRequest = (state, payload) => {
  axiosInstance.put(`withdrawalslip-approval/${payload.id}/`, payload).then(response => {
    if (response.status === 200) {
      let objindex = state.tableindexrows.findIndex(item => item.id === response.data.id)
      state.tableindexrows[objindex].is_approved = response.data.is_approved
      state.tableindexrows[objindex].status = response.data.status
      state.tableindexrows[objindex].noted_by = response.data.noted_by
    }
    Notify.create({
      timeout: 1500,
      position: "center",
      color: "primary",
      message: `Approval Sent`,
    });
  }).catch(error => {
    Notify.create({
      timeout: 1500,
      position: "center",
      color: "red",
      message: `Error: ${JSON.stringify(error.response.data)}`,
    });
  }).finally(() => {
    state.withdrawalslipapprovalloading = false
    state.withdrawalslipdisapprovalloading = false
    state.selected = []
  })
}

export {
  actionGetAllWithdrawalItems,
  actionOpenDetailsDialog,
  actionCloseDetailsDialog,
  actionRetrieveWithdrawalItem,
  actionPostWithdrawalItem,
  actionOpenAddWithdrawalSlipDialog,
  actionCloseAddWithdrawalSlipDialog,
  addItemToCreateRequest,
  setDefaultWithdrawalItems,
  removeItemFromCreateRequest,
  actionApproveRequest
};
