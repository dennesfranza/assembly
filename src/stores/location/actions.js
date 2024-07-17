import { axiosInstance } from "boot/axios";

const getAllLocations = (state) => {
  state.locationtableindexloading = true;
  axiosInstance
    .get("warehouse/")
    .then((response) => {
      if (response.status === 200) {
        state.locationtableindexrows = response.data.results;
      }
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      setTimeout(() => {
        state.locationtableindexloading = false;
      }, 2000);
    });
};

const actionOpenLocationDialog = (state) => {
  state.locationadddialog = true;
};

const actionCloseLocationDialog = (state) => {
  state.locationrequestitem = {
    name: "",
    location: "",
  };
  state.locationadddialog = false;
};

const actionPostLocationItem = (state) => {
  state.locationpostrequestitemloading = true;
  axiosInstance
    .post(`warehouse/`, state.locationrequestitem)
    .then((response) => {
      if (response.status === 201) {
        console.log(response);
        state.locationtableindexrows.push(response.data);
      }
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      state.locationrequestitem = {
        name: "",
        location: "",
      };
      setTimeout(() => {
        state.locationadddialog = false;
        state.locationpostrequestitemloading = false;
      }, 2000);
    });
};

const actionRemoveLocationItem = (state) => {
  let payload = state.selected[0];
  state.locationremoverequestitemloading = true;
  axiosInstance
    .delete(`warehouse/${payload.id}/`)
    .then((response) => {
      if (response.status === 204) {
        let locationRowsIndex = state.locationtableindexrows.findIndex(
          (item) => item.id === payload.id
        );
        state.locationtableindexrows.splice(locationRowsIndex, 1);
        state.selected = [];
      }
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      setTimeout(() => {
        state.locationremoverequestitemloading = false;
      }, 2000);
    });
};

const actionOpenLocationUpdateDialog = (state) => {
  let item = state.selected[0];
  state.locationrequestedititem.id = item.id
  state.locationrequestedititem.name = item.name
  state.locationrequestedititem.location = item.location
  state.locationeditdialog = true;
};

const actionCloseLocationUpdateDialog = (state) => {
  state.locationrequestedititem = {
    id: null,
    name: "",
    location: "",
  }
  state.locationeditdialog = false;
  state.selected = [];
};

const actionUpdateLocationItem = (state) => {
  let payload = state.locationrequestedititem;
  state.locationupdaterequestitemloading = true
  axiosInstance.put(`warehouse/${payload.id}/`, payload).then(response => {
    if (response.status === 200) {
      let objIndex = state.locationtableindexrows.findIndex(item => item.id === response.data.id)
      state.locationtableindexrows[objIndex].name = response.data.name
      state.locationtableindexrows[objIndex].location = response.data.location
    }
  }).catch(error => {
    console.log(error)
  }).finally(() => {
    setTimeout(() => {
      state.locationupdaterequestitemloading = false
      state.locationeditdialog = false
      state.selected = [];
      state.locationrequestedititem = {
        id: null,
        name: "",
        location: "",
      }
    }, 2000);
  })
};

export {
  getAllLocations,
  actionOpenLocationDialog,
  actionCloseLocationDialog,
  actionPostLocationItem,
  actionRemoveLocationItem,
  actionOpenLocationUpdateDialog,
  actionCloseLocationUpdateDialog,
  actionUpdateLocationItem
};
