import { axiosInstance, axiosFormPost } from "boot/axios";

const actionGetAllConsumables = (state) => {
  state.listallitemstableloading = true;
  axiosInstance
    .get(`consumables/`)
    .then((response) => {
      if (response.status === 200) {
        let obj = response.data.map(item => ({
          id: item.id,
          created_at: item.created_at,
          description: item.description,
          name: item.name,
          image: item.image.split('/').filter(x => x).join('/')
        }))
        state.tableindexrows = obj;
      }
    })
    .catch((error) => {})
    .finally(() => {
      setTimeout(() => {
        state.listallitemstableloading = false;
      }, 2000);
    });
};

const actionRetrieveConsumableItem = (state, id) => {
  state.retrievedetailspageloading = true;
  axiosInstance
    .get(`consumables/${id}/`)
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
    .delete(`consumables/${id}/`)
    .then((response) => {
      if (response.status === 204) {
        let objindex = state.tableindexrows.findIndex(
          (item) => item.id === id
        )
        state.tableindexrows.splice(objindex, 1)
        state.selected = []
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
    .put(`consumables/${payload.id}/`, payload)
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
  state.consumabledetailsdialog = true;
  state.consumabledetailsloadingpage = true;
  state.consumabledetailsitem.id = payload.id;
  state.consumabledetailsitem.name = payload.name;
  state.consumabledetailsitem.description = payload.description;
  state.consumabledetailsitem.image = payload.image;
  state.consumabledetailsitem.created_at = payload.created_at;
};

const actionCloseConsumableDetailsPage = (state) => {
  state.consumabledetailsitem = {
    id: null,
    name: null,
    description: null,
    image: null,
    created_at: null,
  };
  state.consumabledetailsdialog = false;
};

const actionOpenAddConsumableItemDialog = (state) => {
  state.addconsumableitemdialog = true;
};

const actionCloseAddConsumableItemDialog = (state) => {
  state.createconsumableitem = {
    name: "",
    description: "",
    image: null,
    imageurl: ""
  };
  state.addconsumableitemdialog = false;
};

const actionPostConsumableItem = (state) => {
  state.postconsumableitemloading = true
  let formdata = new FormData()
  formdata.append('name', state.createconsumableitem.name)
  formdata.append('description', state.createconsumableitem.description)
  formdata.append('image', state.createconsumableitem.image)
  axiosFormPost.post(`/consumables/`, formdata).then(response => {
    if (response.status === 201) {
      console.log(response.data)
      state.tableindexrows.unshift(response.data)
    }
  }).catch(error => {
    console.log(error)
  }).finally(() => {
    state.createconsumableitem = {
      name: "",
      description: "",
      image: null,
      imageurl: ""
    };
    state.postconsumableitemloading = false
    state.addconsumableitemdialog = false;
  })
};

const actionSearchConsumable = (state, name) => {
  axiosInstance.get(`consumables_search/?name=${name}`).then(response => {
    if (response.status === 200) {
      state.consumablesearchresults = response.data
    }
  })
}

export {
  actionGetAllConsumables,
  actionRetrieveConsumableItem,
  actionDestroyConsumableItem,
  actionUpdateConsumableItem,
  actionOpenConsumableDetailsPage,
  actionCloseConsumableDetailsPage,
  actionOpenAddConsumableItemDialog,
  actionCloseAddConsumableItemDialog,
  actionPostConsumableItem,
  actionSearchConsumable
};
