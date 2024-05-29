import { axiosInstance } from "boot/axios";

const actionGetAllConsumables = (state) => {
  state.listallitemstableloading = true;
  axiosInstance
    .get(`consumables/`)
    .then((response) => {
      if (response.status === 200) {
        state.tableindexrows = response.data
      }
    })
    .catch((error) => {})
    .finally(() => {
      setTimeout(() => {
        state.listallitemstableloading = false;
      }, 2000)
    });
};

const actionRetrieveConsumableItem = (state, id) => {
  state.retrievedetailspageloading = true;
  axiosInstance
    .get(`/${id}/`)
    .then((response) => {
      if (response.status === 200) {
      }
    })
    .catch((error) => {})
    .then(() => {
      state.retrievedetailspageloading = false;
    });
};

const actionDestroyConsumableItem = (state, id) => {
  state.deleteconsumableitemloading = true;
  axiosInstance
    .delete(`/${id}/`)
    .then((response) => {
      if (response.status === 200) {
      }
    })
    .catch((error) => {})
    .finally(() => {
      state.deleteconsumableitemloading = false;
    });
};

const actionUpdateConsumableItem = (state, payload) => {
  state.updateconsumableitemloading = true;
  axiosInstance
    .put(`/${payload.id}/`, payload)
    .then((response) => {
      if (response.status === 200) {
      }
    })
    .catch((error) => {})
    .finally(() => {
      state.updateconsumableitemloading = false;
    });
};

const actionOpenConsumableDetailsPage = (state, payload) => {
  state.consumabledetailsdialog = true
  state.consumabledetailsloadingpage = true
  state.consumabledetailsitem.id = payload.id
  state.consumabledetailsitem.name = payload.name
  state.consumabledetailsitem.description = payload.description
  state.consumabledetailsitem.image = payload.image
  state.consumabledetailsitem.created_at = payload.created_at
}

const actionCloseConsumableDetailsPage = (state) => {
  state.consumabledetailsitem = {
    id: null,
    name: null,
    description: null,
    image: null,
    created_at: null
  }
  state.consumabledetailsdialog = false
}

export {
  actionGetAllConsumables,
  actionRetrieveConsumableItem,
  actionDestroyConsumableItem,
  actionUpdateConsumableItem,
  actionOpenConsumableDetailsPage,
  actionCloseConsumableDetailsPage
};
