import { axiosInstance } from "boot/axios";
import { useRequisitionStore } from "src/stores/requisition/index";

const actionGetAllDeliveryReceiptItems = (state) => {
  state.listallitemstableloading = true;
  axiosInstance
    .get(`deliveryreceipt/`)
    .then((response) => {
      console.log(response);
      state.tableindexrows = response.data.results;
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      state.listallitemstableloading = false;
    });
};

const actionRetrieveDeliveryItem = (state, id) => {
  axiosInstance
    .get(`deliveryreceipt/${id}/`)
    .then((response) => {
      if (response.status === 200) {
        console.log(response);
        state.deliveryreceiptdetails.id = response.data.id
        state.deliveryreceiptdetails.date = response.data.date
        state.deliveryreceiptdetails.invoice_number = response.data.invoice_number
        state.deliveryreceiptdetails.received_date = response.data.received_date
        state.deliveryreceiptdetails.address = response.data.address.name
        state.deliveryreceiptdetails.delivered_by = response.data.delivered_by
        // state.deliveryreceiptdetails.noted_by = response.data.noted_by.name
        state.deliveryreceiptdetails.prepared_by = response.data.prepared_by.name
        state.deliveryreceiptdetails.received_by = response.data.received_by.name
        state.deliveryreceiptdetailsitems = response.data.delivery_receipt_items
      }
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      setTimeout(() => {
        state.deliveryreceiptdetailsloadingpage = false;
      }, 2000);
    });
};

const actionOpenDeliveryItemDialog = (state) => {
  state.deliveryreceiptdialog = true;
};

const actionCloseDeliveryItemDialog = (state) => {
  const requisitionstore = useRequisitionStore();
  state.deliveryreceiptdialog = false;
  requisitionstore.rsnumbersearchresults = [];
  state.delivery_receipt_item = {
    rs_number: null,
    rs_number_label: null,
    quantity: null,
    description: null,
  };
};

const addItemToCreateDeliveryReceipt = (state, payload) => {
  let data = state.delivery_receipt_item;
  state.deliveryreceiptpayload.delivery_receipt_items.push(data);
  state.delivery_receipt_item = {
    rs_number: null,
    rs_number_label: null,
    quantity: 0,
    description: null,
    description_label: null,
    remarks: null
  };
};

const actionPostDeliveryReceiptItem = (state) => {
  state.postdeliveryreceiptitemloading = true;
  axiosInstance
    .post("deliveryreceipt/", state.deliveryreceiptpayload)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      state.postdeliveryreceiptitemloading = false;
    });
};

const actionOpenDeliveryDetailsDialog = (state) => {
  state.deliveryreceiptdetailspagedialog = true;
  state.deliveryreceiptdetailsloadingpage = true;
};

const actionCloseDeliveryDetailsDialog = (state) => {
  state.deliveryreceiptdetails = {
    id: null,
    date: null,
    delivered_to: null,
    received_date: null,
    address: null,
    delivered_by: null,
    noted_by: null,
    prepared_by: null,
    received_by: null,
  };
  state.deliveryreceiptdetailsitems = [];
  state.deliveryreceiptdetailspagedialog = false;
};

const actionSearchRsNumberOrConsumableItem = (state, payload) => {
  state.deliveryreceiptsearchtableloading = true
  axiosInstance.get(`delivery-search-rsnumber-consumable/?search=${payload}`).then(response => {
    if (response.status === 200) {
      console.log(response.data)
      state.deliveryreceiptsearchrows = response.data
    }
  }).catch(error => {
    console.log(error)
  }).finally(() => {
    setTimeout(() => {
      state.deliveryreceiptsearchtableloading = false
    }, 2000)
  })
}

const actionOpenAddQuantityRemarksDialog = (state) => {
  state.deliveryreceiptaddquantityremarksdialog = true
}

const actionCloseAddQuantityRemarksDialog = (state) => {
  state.deliveryreceiptaddquantityremarksdialog = false
  state.delivery_receipt_item = {
    rs_number: null,
    rs_number_label: null,
    quantity: 0,
    description: null,
    description_label: null,
    remarks: null
  }
}

export {
  actionGetAllDeliveryReceiptItems,
  actionRetrieveDeliveryItem,
  actionOpenDeliveryItemDialog,
  actionCloseDeliveryItemDialog,
  addItemToCreateDeliveryReceipt,
  actionPostDeliveryReceiptItem,
  actionOpenDeliveryDetailsDialog,
  actionCloseDeliveryDetailsDialog,
  actionSearchRsNumberOrConsumableItem,
  actionOpenAddQuantityRemarksDialog,
  actionCloseAddQuantityRemarksDialog
};
