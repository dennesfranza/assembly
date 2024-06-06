import { axiosInstance } from "boot/axios";
import { useRequisitionStore } from "src/stores/requisition/index";

const actionGetAllDeliveryReceiptItems = (state) => {
  state.listallitemstableloading = true
  axiosInstance.get(`deliveryreceipt/`).then(response => {
    console.log(response)
    state.tableindexrows  = response.data
  }).catch(error => {
    console.log(error)
  }).finally(() => {
    state.listallitemstableloading = false
  })
};

const actionOpenDeliveryItemDialog = (state) => {
  state.deliveryreceiptdialog = true;
};

const actionCloseDeliveryItemDialog = (state) => {
  const requisitionstore = useRequisitionStore()
  state.deliveryreceiptdialog = false
  requisitionstore.rsnumbersearchresults = []
  state.deliveryreceiptpayloaditem = {
    rs_number: null,
    rs_number_label: null,
    quantity: null,
    quantity_int: null,
    description: null,
  }
};

const addItemToCreateDeliveryReceipt = (state) => {
  let data = state.delivery_receipt_item
  state.deliveryreceiptpayload.delivery_receipt_items.push(data)
}

const actionPostDeliveryReceiptItem = (state) => {
  state.postdeliveryreceiptitemloading = true
  axiosInstance.post('deliveryreceipt/', state.deliveryreceiptpayload).then(response => {
    console.log(response)
  }).catch(error => {
    console.log(error)
  }).finally(() => {
    state.postdeliveryreceiptitemloading = false
  })
}

export {
  actionGetAllDeliveryReceiptItems,
  actionOpenDeliveryItemDialog,
  actionCloseDeliveryItemDialog,
  addItemToCreateDeliveryReceipt,
  actionPostDeliveryReceiptItem
};
