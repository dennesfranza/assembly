import { axiosInstance } from "boot/axios";

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
      console.log(error);
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
      state.withdrawalslipdetails.noted_by = response.data.noted_by.name
      state.withdrawalslipdetails.issued_by = response.data.issued_by.name
      state.withdrawalslipdetails.ws_number = response.data.ws_number
      state.withdrawalslipdetails.date = response.data.date
      state.withdrawalslipdetailsitems = response.data.withdrawalslip_items
    }
  }).catch(error => {
    console.log(error)
  }).finally(() => {
    setTimeout(() => {
      state.withdrawalslipdetailsloadingpage = false
    }, 2000);
  })
}

export {
  actionGetAllWithdrawalItems,
  actionOpenDetailsDialog,
  actionCloseDetailsDialog,
  actionRetrieveWithdrawalItem
};
