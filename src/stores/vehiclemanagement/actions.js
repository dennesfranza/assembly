import { axiosInstance } from "boot/axios";

const setIndexTableLoading = (payload) => {
  state.indextableloading = payload;
};

const setAddVehicleLoading = (payload) => {
  state.addvehicleloading = payload;
};

const setSaveVehicleDetailsLoading = (payload) => {
  state.savevehicledetailsloading = payload;
};

const setAddVehicleDialog = (payload) => {
  state.addvehicledialog = payload;
};

const updateTableIndexRowsToFirst = (state, payload) => {
  state.tableindexrows.unshift(payload);
};

const actionOpenAddVehicleDialog = (state) => {
  state.addvehicledialog = true;
};

const actionCloseAddVehicleDialog = (state) => {
  state.addvehicledialog = false;
};

const setDefaultVehicleDetails = (state) => {
  state.vehicledefaultdetails = {
    mv_file_number: "",
    series: "",
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
  };
};

const getAllVehicles = (state) => {
  axiosInstance.get("vehicle/").then((response) => {
    console.log(typeof response);
    console.log(response);
    state.tableindexrows = response.data;
  });
};

export {
  setIndexTableLoading,
  setAddVehicleLoading,
  setSaveVehicleDetailsLoading,
  setAddVehicleDialog,
  updateTableIndexRowsToFirst,
  actionOpenAddVehicleDialog,
  actionCloseAddVehicleDialog,
  setDefaultVehicleDetails,
  getAllVehicles,
};
