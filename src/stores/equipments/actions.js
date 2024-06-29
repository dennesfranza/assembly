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
      state.listequipmentstableloading = false;
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
  formdata.append("description", state.createequipmentitem.type);
  formdata.append("image", state.createequipmentitem.serial_number);
  formdata.append("image", state.createequipmentitem.brand);
  formdata.append("image", state.createequipmentitem.remarks);
  formdata.append("image", state.createequipmentitem.location);
  formdata.append("image", state.createequipmentitem.image);
  axiosFormPost
    .post(`/consumables/`, formdata)
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
      state.equipmentitemdialog = false;
    });
};

export {
  actionGetAllEquipments,
  actionRetrieveEquipmentItem,
  actionPostEquipmentItem,
};
