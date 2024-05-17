import { axiosInstance } from "boot/axios";

let b = {
  headers: {
    Accept: "*/*",
    Authorization:
      "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE1ODQwMzY0LCJpYXQiOjE3MTU4MTc2MTcsImp0aSI6IjczNmFiZDlmMTM5ZTQzZjE4OTMzYjRiMjdjNTUwMmIxIiwidXNlcl9pZCI6MSwiZW1haWwiOiJkZW5uZXNmcmFuemFAZ21haWwuY29tIiwibW9iaWxlIjpudWxsLCJuYW1lIjoiRGVubmVzIEZyYW56YSJ9.nkRWj9bQCJo3CVWrUosE1YZRRY3kIhSAnjT9wR0nZjw"
  },
};

const actionGetAllRequisitionItems = (state) => {
  state.listallitemstableloading = true;
  axiosInstance
    .get(`requisition/`, b)
    .then((response) => {
      if (response.status === 200) {
        state.tableindexrows = response.data;
      }
    })
    .catch(() => {
      // catch error
    })
    .finally(() => {
      setTimeout(() => {
        state.listallitemstableloading = false;
      }, 3000)
    });
};

const actionRetrieveRequisitionItem = (state, id) => {
  axiosInstance
    .get(`requisition/${id}/`, b)
    .then((response) => {
      if (response.status === 200) {
        console.log(response)
        state.requisitiondetails.location = response.data.location.name
        state.requisitiondetails.requested_by = response.data.requested_by.name
        state.requisitiondetails.approved_by = response.data.approved_by.name
        state.requisitiondetails.rs_number = response.data.rs_number
        state.requisitiondetails.date_requested = response.data.date_requested
        state.requisitiondetails.date_needed = response.data.date_needed
        state.requisitiondetailsitems = response.data.requisition_request_items;
      }
    })
    .catch(() => {
      // error
    })
    .finally(() => {
      setTimeout(() => {
        state.requisitiondetailsloadingpage = false;
      }, 3000)
    });
};

const postRequisitionItem = (state, payload) => {
  console.log(payload);
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
  console.log("INDEX", objindex);
  state.createrequisitionrequest.requisition_request_items.splice(objindex, 1);
};

const rearrageItemNumberCreateRequest = (state) => {
  state.createrequisitionrequest.requisition_request_items.forEach(
    (item, index) => {
      console.log(item, index);
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
  state.requisitiondetails = {};
  state.requisitiondetailsitems = [];
};

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
};
