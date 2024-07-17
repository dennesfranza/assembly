import { axiosInstance, axiosFormPost } from "boot/axios";

const actionGetAllEquipments = (state) => {
  state.listequipmentstableloading = true;
  axiosInstance
    .get(`equipments/`)
    .then((response) => {
      if (response.status === 200) {
        state.equipmenttableindexrows = response.data.results;
      }
    })
    .catch((error) => {})
    .finally(() => {
      setTimeout(() => {
        state.listequipmentstableloading = false;
      }, 1500);
    });
};

const actionRetrieveEquipmentItem = (state, id) => {
  state.retrievedetailspageloading = true;
  axiosInstance
    .get(`equipments/${id}/`)
    .then((response) => {
      if (response.status === 200) {
      }
    })
    .catch((error) => {})
    .then(() => {
      state.retrievedetailspageloading = false;
    });
};

const actionPostEquipmentItem = (state) => {
  state.postequipmentitemloading = true;
  let formdata = new FormData();
  formdata.append("name", state.createequipmentitem.name);
  formdata.append("type", state.createequipmentitem.type);
  formdata.append("serial_number", state.createequipmentitem.serial_number);
  formdata.append("brand", state.createequipmentitem.brand);
  formdata.append("remarks", state.createequipmentitem.remarks);
  formdata.append("location", state.createequipmentitem.location);
  formdata.append("image", state.createequipmentitem.image);
  axiosFormPost
    .post(`/equipments/`, formdata)
    .then((response) => {
      if (response.status === 201) {
        state.equipmenttableindexrows.unshift(response.data);
      }
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      state.createequipmentitem = {
        name: "",
        type: "",
        serial_number: "",
        brand: "",
        remarks: "",
        location: null,
        image: null,
        imageurl: "",
      };
      state.postequipmentitemloading = false;
      state.addequipmentdialog = false;
    });
};

const actionSearchEquipment = (state, name) => {
  axiosInstance
    .get(`equipments-search/?name=${name}&location`)
    .then((response) => {
      if (response === 200) {
        console.log(response);
      }
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      console.log("Close");
    });
};

const actionOpenEquipmentDetailsDialogPage = (state, payload) => {
  state.equipmentdetailsdialog = true;
  state.equipmentdetailsitem.name = payload.name;
  state.equipmentdetailsitem.type = payload.type;
  state.equipmentdetailsitem.serial_number = payload.serial_number;
  state.equipmentdetailsitem.brand = payload.brand;
  state.equipmentdetailsitem.remarks = payload.remarks;
  state.equipmentdetailsitem.location = payload.location.name;
  state.equipmentdetailsitem.image = payload.image;
};

const actionCloseEquipmentDetailsDialogPage = (state) => {
  state.equipmentdetailsitem = {
    name: "",
    type: "",
    serial_number: "",
    brand: "",
    remarks: "",
    location: "",
    image: "",
  };
  state.equipmentdetailsdialog = false;
};

const actionOpenAddEquipmentDialog = (state) => {
  state.addequipmentdialog = true
}

const actionCloseAddEquipmentDialog = (state) => {
  state.createequipmentitem = {
    name: "",
    type: "",
    serial_number: "",
    brand: "",
    remarks: "",
    location: null,
    image: null,
    imageurl: "",
  },
  state.addequipmentdialog = false
}

const actionDestroyEquipmentItem = (state, id) => {
  state.deleteequipmentitemloading = true
  axiosInstance.delete(`equipments/${id}/`).then(response => {
    if (response.status === 204) {
      let objindex = state.equipmenttableindexrows.findIndex(
        item => item.id === id
      )
      state.equipmenttableindexrows.splice(objindex, 1)
      state.selected = []
    }
  }).catch(error => {
    console.log(error)
  }).finally(() => {
    setTimeout(() => {
      state.deleteequipmentitemloading = false
    }, 1500);
  })
}

export {
  actionGetAllEquipments,
  actionRetrieveEquipmentItem,
  actionPostEquipmentItem,
  actionSearchEquipment,
  actionOpenEquipmentDetailsDialogPage,
  actionCloseEquipmentDetailsDialogPage,
  actionOpenAddEquipmentDialog,
  actionCloseAddEquipmentDialog,
  actionDestroyEquipmentItem
};
