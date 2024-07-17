import { axiosInstance } from "boot/axios";

const actionGetAllVehicles = (state) => {
  state.vehicleindextableloading = true;
  axiosInstance
    .get(`vehicle/`)
    .then((response) => {
      if (response.status === 200) {
        console.log(response);
        state.tableindexrows = response.data.results;
      }
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      setTimeout(() => {
        state.vehicleindextableloading = false;
      }, 1500);
    });
};

const actionOpenVehicleDetailsDialog = (state, payload) => {
  state.vehicledetailsdialog = true;
  state.vehicledefaultdetails.mv_file_number = payload.mv_file_number;
  state.vehicledefaultdetails.series = payload.series;
  state.vehicledefaultdetails.maker = payload.maker;
  state.vehicledefaultdetails.vehicle_model = payload.vehicle_model;
  state.vehicledefaultdetails.body_type = payload.body_type;
  state.vehicledefaultdetails.plate_number = payload.plate_number;
  state.vehicledefaultdetails.engine_number = payload.engine_number;
  state.vehicledefaultdetails.chassis_number = payload.chassis_number;
  state.vehicledefaultdetails.year_model = payload.year_model;
  state.vehicledefaultdetails.or_date = payload.or_date;
  state.vehicledefaultdetails.cr_number = payload.cr_number;
  state.vehicledefaultdetails.vehicle_registration_date = payload.vehicle_registration_date;
  state.vehicledefaultdetails.vehicle_registration_expiry_date = payload.vehicle_registration_expiry_date;
  state.vehicledefaultdetails.location = payload.location.name;
  state.vehicledefaultdetails.image = payload.image;
};

const actionCloseVehicleDetailsDialog = (state) => {
  state.vehicledetailsdialog = false;
  state.vehicledefaultdetails = {
    mv_file_number: "",
    series: "",
    maker: "",
    vehicle_model: "",
    body_type: "",
    plate_number: "",
    engine_number: "",
    chassis_number: "",
    year_model: "",
    or_date: "",
    cr_number: "",
    vehicle_registration_date: "",
    vehicle_registration_expiry_date: "",
    location: "",
    image: "",
  };
};

const actionOpenAddVehicleDialog = (state) => {
  state.vehicleadditemdialog = true
}

const actionCloseAddVehicleDialog = (state) => {
  state.vehicleadditemdialog = false
}

export {
  actionGetAllVehicles,
  actionOpenVehicleDetailsDialog,
  actionCloseVehicleDetailsDialog,
  actionOpenAddVehicleDialog,
  actionCloseAddVehicleDialog
};
