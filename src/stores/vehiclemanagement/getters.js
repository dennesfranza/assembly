import state from "./state";

const defaultVehicleDetails = (state) => {
  console.log('HEEYYY')
  console.log('GETTTIN')
  state.addvehicledialog = false
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
  }
}

export default {
};
