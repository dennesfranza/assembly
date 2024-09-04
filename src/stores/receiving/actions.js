import { axiosInstance } from "boot/axios";
import { Notify } from "quasar";

const actionGetAllReceivingItems = (state) => {
  state.listitemsloading = true;
  axiosInstance
    .get(`receivingreport/`)
    .then((response) => {
      if (response.status === 200) {
        state.tableindexrows = response.data.results;
      }
    })
    .catch((error) => {
      Notify.create({
        timeout: 1500,
        position: "center",
        color: "red",
        message: `Error: ${error}`,
      });
    })
    .finally(() => {
      state.listitemsloading = false;
    });
};

const actionRetrieveReceivingItem = (state, id) => {
  state.retrieveitemloading = true;
  axiosInstance
    .get(`receivingreport/${id}/`)
    .then((response) => {
      if (response.status === 200) {
        state.receivingdetails = response.data;
        state.receivingdetails = {
          rr_no: response.data.rr_no,
          date: response.data.date,
          report_from: response.data.report_from.name,
          invoice_dr_no: response.data.invoice_dr_no.invoice_number,
          received_by:
            response.data.received_by === null
              ? ""
              : response.data.received_by.name,
          confirmed_by:
            response.data.confirmed_by === null
              ? ""
              : response.data.confirmed_by.name,
          verified_by:
            response.data.verified_by === null
              ? ""
              : response.data.verified_by.name,
          receiving_report_items: response.data.receiving_report_items,
        };
      }
    })
    .catch((error) => {
      Notify.create({
        timeout: 1500,
        position: "center",
        color: "red",
        message: `Error: ${error}`,
      });
    })
    .finally(() => {
      state.retrieveitemloading = false;
    });
};

const actionCreateReceivingItem = (state) => {
  state.postitemloading = true;
  axiosInstance
    .post(`receivingreport/`, state.receivingpayload)
    .then((response) => {
      if (response.status === 200) {
        console.log(response);
        Notify.create({
          timeout: 1500,
          position: "center",
          color: "primary",
          message: `Receiving Report Saved`,
        });
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
      state.postitemloading = false;
      state.receivingpayload = {
        rr_no: null,
        date: null,
        report_from: null,
        invoice_dr_no: null,
        received_by: null,
        receiving_report_items: [],
      };
      state.tablecreaterows = [];
      state.router.push({ path: "/ReceivingReport" });
    });
};

const actionUpdateReceivingItem = (state, payload) => {};

const actionDeleteReceivingItem = (state, id) => {};

const actionOpenAddReceivingItemDialog = (state) => {
  state.additemdialog = true;
};

const actionCloseAddReceivingItemDialog = (state) => {
  state.additemdialog = false;
};

const actionAddItemToCreateReceiving = (state, payload) => {
  state.tablecreaterows = payload;
  state.receivingpayload.receiving_report_items = payload;
  state.deliverynumbersearchresults = [];
  state.deliveryresultitems = [];
  state.additemdialog = false;
};

const actionOpenReceivingDetailsDialog = (state) => {
  state.detailsdialog = true;
};

const actionCloseReceivingDetailsDialog = (state) => {
  state.detailsdialog = false;
};

const actionUpdateConfirmedBy = (state, payload) => {};

const actionUpdateVerifiedBy = (state, payload) => {};

const actionSearchDeliveryNumber = (state, payload) => {
  state.deliverynumbersearchloading = true;
  axiosInstance
    .get(`delivery-number-search/?search=${payload}`)
    .then((response) => {
      if (response.status === 200) {
        console.log(response);
        state.deliverynumbersearchresults = response.data.results;
      }
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      state.deliverynumbersearchloading = false;
    });
};

const actionOpenAddSupplierDialog = (state) => {
  state.addsupplierdialog = true;
};

const actionOpenAddRemarksDialog = (state) => {
  state.addremarksdialog = true;
};

const actionCloseAddSupplierDialog = (state) => {
  state.addsupplierdialog = false;
};

const actionCloseAddRemarksDialog = (state) => {
  state.addremarksdialog = false;
};

const actionAddSupplierToItems = (state, suppliers_name) => {
  let objArr = state.receivingpayload.receiving_report_items;
  objArr.forEach((item) => {
    item.suppliers_name = suppliers_name;
  });
  state.addsupplierdialog = false;
};

const actionAddRemarksToItems = (state, remarks) => {
  let objArr = state.receivingpayload.receiving_report_items;
  objArr.forEach((item) => {
    item.remarks = remarks;
  });
  state.addremarksdialog = false;
};

const actionReset = (state) => {
  state.receivingpayload = {
    rr_no: null,
    date: null,
    report_from: null,
    invoice_dr_no: null,
    received_by: null,
    receiving_report_items: [],
  };
  state.tablecreaterows = [];
};

const actionUpdateConfirmed = (state, id) => {
  state.confirmedloading = true;
  axiosInstance
    .put(`receivingreport-confirmed/${id}/`)
    .then((response) => {
      if (response.status === 200) {
        let objindex = state.tableindexrows.findIndex(
          (item) => item.id === response.data.id
        );
        console.log(response);
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
      state.confirmedloading = false;
    });
};

const actionUpdateVerified = (state, id) => {
  state.verifiedloading = true;
  axiosInstance
    .put(`receivingreport-verified/${id}/`)
    .then((response) => {
      if (response.status === 200) {
        console.log(response);
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
      state.verifiedloading = false;
    });
};

export {
  actionGetAllReceivingItems,
  actionRetrieveReceivingItem,
  actionCreateReceivingItem,
  actionUpdateReceivingItem,
  actionDeleteReceivingItem,
  actionOpenAddReceivingItemDialog,
  actionCloseAddReceivingItemDialog,
  actionAddItemToCreateReceiving,
  actionOpenReceivingDetailsDialog,
  actionCloseReceivingDetailsDialog,
  actionUpdateConfirmedBy,
  actionUpdateVerifiedBy,
  actionSearchDeliveryNumber,
  actionOpenAddSupplierDialog,
  actionOpenAddRemarksDialog,
  actionCloseAddSupplierDialog,
  actionCloseAddRemarksDialog,
  actionAddSupplierToItems,
  actionAddRemarksToItems,
  actionReset,
  actionUpdateConfirmed,
  actionUpdateVerified,
};
