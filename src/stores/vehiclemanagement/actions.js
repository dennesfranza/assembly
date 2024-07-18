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
  state.createvehicleitem = {
    mv_file_number: "",
    series: "",
    make: "",
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
    imageurl: ""
  }
}

const actionPostVehicleItem = (state) => {
  state.vehicleadditemloading = true
  let formdata = new FormData()
  formdata.append('mv_file_number', state.createvehicleitem.mv_file_number)
  formdata.append('series', state.createvehicleitem.series)
  formdata.append('make', state.createvehicleitem.make)
  formdata.append('vehicle_model', state.createvehicleitem.vehicle_model)
  formdata.append('body_type', state.createvehicleitem.body_type)
  formdata.append('plate_number', state.createvehicleitem.plate_number)
  formdata.append('engine_number', state.createvehicleitem.engine_number)
  formdata.append('chassis_number', state.createvehicleitem.chassis_number)
  formdata.append('year_model', state.createvehicleitem.year_model)
  formdata.append('or_date', state.createvehicleitem.or_date)
  formdata.append('cr_number', state.createvehicleitem.cr_number)
  formdata.append('vehicle_registration_date', state.createvehicleitem.vehicle_registration_date)
  formdata.append('vehicle_registration_expiry_date', state.createvehicleitem.vehicle_registration_expiry_date)
  formdata.append('location', state.createvehicleitem.location)
  formdata.append('image', state.createvehicleitem.image)
  axiosInstance.post(`vehicle/`, formdata).then(response => {
    if (response.status === 201) {
      console.log(response)
      state.tableindexrows.unshift(response.data)
    }
  }).catch(error => {
    console.log(error)
  }).finally(() => {
    setTimeout(() => {
      state.vehicleadditemloading = false
      state.vehicleadditemdialog = false
      state.createvehicleitem = {
        mv_file_number: "",
        series: "",
        make: "",
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
        imageurl: ""
      }
    }, 1500);
  })
}

export {
  actionGetAllVehicles,
  actionOpenVehicleDetailsDialog,
  actionCloseVehicleDetailsDialog,
  actionOpenAddVehicleDialog,
  actionCloseAddVehicleDialog,
  actionPostVehicleItem
};
