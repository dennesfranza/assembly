import { axiosInstance } from "boot/axios";
import { Notify } from "quasar";

const actionGetAllRequisitionItems = (state) => {
  state.listallitemstableloading = true;
  axiosInstance
    .get(`requisition/`)
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
        message: `Error: ${JSON.stringify(error.response)}`,
      });
    })
    .finally(() => {
      setTimeout(() => {
        state.listallitemstableloading = false;
      }, 500);
    });
};

const actionRetrieveRequisitionItem = (state, id) => {
  axiosInstance
    .get(`requisition/${id}/`)
    .then((response) => {
      if (response.status === 200) {
        state.requisitiondetails.id = response.data.id;
        state.requisitiondetails.location = response.data.location.name;
        state.requisitiondetails.requested_by = response.data.requested_by.name;
        state.requisitiondetails.rs_number = response.data.rs_number;
        state.requisitiondetails.date_requested = response.data.date_requested;
        state.requisitiondetails.date_needed = response.data.date_needed;
        state.requisitiondetailsitems = response.data.requisition_request_items;
        state.requisitiondetails.approved_by =
          response.data.approved_by != null
            ? response.data.approved_by.name
            : "";
      }
    })
    .catch((error) => {
      Notify.create({
        timeout: 1500,
        position: "center",
        color: "red",
        message: `Error: ${JSON.stringify(error.response)}`,
      });
    })
    .finally(() => {
      setTimeout(() => {
        state.requisitiondetailsloadingpage = false;
      }, 500);
    });
};

const postRequisitionItem = (state, payload) => {
  console.log(payload);
  state.postrequisitionrequestitemloading = true;
  axiosInstance
    .post(`requisition/`, payload)
    .then((response) => {
      if (response.status === 200) {
        Notify.create({
          timeout: 1500,
          position: "center",
          color: "primary",
          message: `Requisition Slip Saved`,
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
      state.createrequisitionrequest = {
        location: null,
        requested_by: null,
        approved_by: null,
        rs_number: "",
        date_requested: "",
        date_needed: "",
        requisition_request_items: [],
      };
      setTimeout(() => {
        state.postrequisitionrequestitemloading = false;
        state.router.push({ path: "/Requisition" });
      }, 1500);
    });
};

const actionOpenRequestItemDialog = (state) => {
  state.requisitionrequestdialog = true;
};

const actionCloseRequestItemDialog = (state) => {
  state.requisitionrequestdialog = false;
};

const setDefaultRequestItems = (state) => {
  state.requisition_request_item = {
    id: 0,
    item_number: null,
    quantity: null,
    unit: "",
    description: "",
    purpose: "",
  };
};

const addItemToCreateRequest = (state) => {
  let data = state.requisition_request_item;
  data.item_number =
    state.createrequisitionrequest.requisition_request_items.length + 1;
  state.createrequisitionrequest.requisition_request_items.push(data);
};

const removeItemFromCreateRequest = (state, data) => {
  let objindex =
    state.createrequisitionrequest.requisition_request_items.findIndex(
      (item) => item.item_number === data.item_number
    );
  state.createrequisitionrequest.requisition_request_items.splice(objindex, 1);
};

const rearrageItemNumberCreateRequest = (state) => {
  state.createrequisitionrequest.requisition_request_items.forEach(
    (item, index) => {
      item.item_number = index + 1;
    }
  );
};

const actionOpenRequestDetailsDialog = (state) => {
  state.requisitiondetailspagedialog = true;
  state.requisitiondetailsloadingpage = true;
};

const actionCloseRequestDetailsDialog = (state) => {
  state.requisitiondetailspagedialog = false;
  state.requisitioneditdialog = false;
  state.requisitiondetails = {};
  state.requisitiondetailsitems = [];
};

const actionSearchRsNumber = (state, rs_number) => {
  state.requisitionsearchrsnumberloading = true;
  axiosInstance
    .get(`requisition_search/?rs_number=${rs_number}`)
    .then((response) => {
      if (response.status === 200) {
        state.rsnumbersearchresults = response.data;
      }
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      setTimeout(() => {
        state.requisitionsearchrsnumberloading = false;
      }, 2000);
    });
};

const actionApproveRequest = (state, payload) => {
  axiosInstance
    .put(`requisition-approval/${payload.id}/`, payload)
    .then((response) => {
      if (response.status === 200) {
        let objindex = state.tableindexrows.findIndex(
          (item) => item.id === response.data.id
        );
        state.tableindexrows[objindex].is_approved = response.data.is_approved;
        state.tableindexrows[objindex].status = response.data.status;
        state.tableindexrows[objindex].approved_by = response.data.approved_by;
        console.log(response);
      }
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      setTimeout(() => {
        state.requisitiondisapprovalloading = false;
        state.requisitionapprovalloading = false;
        state.selected = [];
      }, 1500);
    });
};

const actionResetCreateItem = (state) => {
  state.createrequisitionrequest = {
    location: null,
    requested_by: null,
    approved_by: null,
    rs_number: "",
    date_requested: "",
    date_needed: "",
    requisition_request_items: [],
  };
};

const actionOpenEditDialog = (state) => {
  state.requisitioneditdialog = true;
  state.requisitionedit.id = state.selected[0].id;
  state.requisitionedit.location = state.selected[0].location.id;
  state.requisitionedit.location_label = state.selected[0].location.name;
  state.requisitionedit.requested_by = state.selected[0].requested_by.id;
  state.requisitionedit.requested_by_label =
    state.selected[0].requested_by.name;
  state.requisitionedit.rs_number = state.selected[0].rs_number;
  state.requisitionedit.date_requested = state.selected[0].date_requested;
  state.requisitionedit.date_needed = state.selected[0].date_needed;
  state.requisitionedit.requisition_request_items =
    state.selected[0].requisition_request_items.map((a) => ({
      id: a.id,
      description: a.description.id,
      description_label: a.description.name,
      item_number: a.item_number,
      quantity: a.quantity,
      unit: a.unit,
      purpose: a.purpose,
    }));
};

const actionRemoveRequisitionRequestItem = (state, id) => {
  state.deleterequisitionitemloading = true;
  axiosInstance
    .delete(`requisition/${id}/`)
    .then((response) => {
      if (response.status === 200) {
        let objindex = state.tableindexrows.findIndex((a) => a.id === id);
        state.tableindexrows.splice(objindex, 1);
        Notify.create({
          timeout: 1500,
          position: "center",
          color: "primary",
          message: `Requisition Deleted`,
        });
      }
    })
    .catch((error) => {
      Notify.create({
        timeout: 1500,
        position: "center",
        color: "red",
        message: `Error: ${JSON.stringify(error.response)}`,
      });
    })
    .finally(() => {
      setTimeout(() => {
        state.deleterequisitionitemloading = false;
      }, 500);
    });
};

const actionRemoveRequisitionItem = (state, id) => {
  state.removerequisitionitemloading = true;
  axiosInstance
    .delete(`requisition-items/${id}/`)
    .then((response) => {
      if (response.status === 204) {
        let objIndex =
          state.requisitionedit.requisition_request_items.findIndex(
            (a) => a.id === id
          );
        state.requisitionedit.requisition_request_items.splice(objIndex, 1);
        Notify.create({
          timeout: 1500,
          position: "center",
          color: "primary",
          message: `Item Deleted`,
        });
      }
    })
    .catch((error) => {
      Notify.create({
        timeout: 1500,
        position: "center",
        color: "red",
        message: `Error: ${JSON.stringify(error.response)}`,
      });
    })
    .finally(() => {
      setTimeout(() => {
        state.removerequisitionitemloading = false;
      }, 500);
    });
};

const actionOpenAddEditDialog = (state) => {
  state.requisitionaddeditdialog = true
}

const actionCloseAddEditDialog = (state) => {
  state.requisitionaddeditdialog = false
}

const actionUpdateRequisitionRequest = (state) => {
  console.log(state.requisitionedit)
  state.updaterequisitioneditloading = true
}

export {
  actionGetAllRequisitionItems,
  actionRetrieveRequisitionItem,
  postRequisitionItem,
  actionOpenRequestItemDialog,
  actionCloseRequestItemDialog,
  setDefaultRequestItems,
  addItemToCreateRequest,
  removeItemFromCreateRequest,
  rearrageItemNumberCreateRequest,
  actionOpenRequestDetailsDialog,
  actionCloseRequestDetailsDialog,
  actionSearchRsNumber,
  actionApproveRequest,
  actionResetCreateItem,
  actionOpenEditDialog,
  actionRemoveRequisitionRequestItem,
  actionRemoveRequisitionItem,
  actionOpenAddEditDialog,
  actionCloseAddEditDialog,
  actionUpdateRequisitionRequest
};
