import { axiosInstance } from "boot/axios";

const actionGetAllRequisitionItems = (state) => {
  state.requisitionlogsheettableindexloading = true
  axiosInstance.get(`requisitionslip-logsheet-view/`).then(response => {
    if (response.status === 200) {
      console.log(response)
      state.requisitionlogsheetrows = response.data
    }
  }).catch(error => {
    console.log(error)
  }).finally(() => {
    state.requisitionlogsheettableindexloading = false
  })
}

export {
  actionGetAllRequisitionItems
}
