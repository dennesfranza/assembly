export default {
  addvehicledialog: false,
  indextablefilter: "",
  indextableloading: false,
  addvehicleloading: false,
  savevehicledetailsloading: false,
  vehicledefaultdetails: {
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
  },
  vehicledetailsinput: [
    {
      name: "mv_file_number",
      label: "MV File Number",
      icon: "123",
      type: 'input'
    },
    {
      name: "series",
      label: "Series",
      icon: "light",
      type: 'input'
    },
    {
      name: "maker",
      label: "Maker",
      icon: "factory",
      type: 'input'
    },
    {
      name: "vehicle_model",
      label: "Model",
      icon: "pallet",
      type: 'input'
    },
    {
      name: "body_type",
      label: "Body Type",
      icon: "directions_car",
      type: 'input'
    },
    {
      name: "plate_number",
      label: "Plate Number",
      icon: "local_parking",
      type: 'input'
    },
    {
      name: "engine_number",
      label: "Engine Number",
      icon: "garage",
      type: 'input'
    },
    {
      name: "chassis_number",
      label: "Chassis Number",
      icon: "local_taxi",
      type: 'input'
    },
    {
      name: "year_model",
      label: "Year Model",
      icon: "verified",
      type: 'input'
    },
    {
      name: "or_date",
      label: "OR Date",
      icon: "calendar_month",
      type: 'date'
    },
    {
      name: "cr_number",
      label: "CR Number",
      icon: "tag",
      type: 'input'
    },
    {
      name: "vehicle_registration_date",
      label: "Vehicle Registration Date",
      icon: "calendar_month",
      type: 'date'
    },
    {
      name: "vehicle_registration_expiry_date",
      label: "Registration Expiry date",
      icon: "calendar_month",
      type: 'date'
    },
  ],
  tableindexcolumns: [
    {
      name: "vehicle_model",
      label: "Vehicle Model",
      field: "vehicle_model",
      align: "left",
    },
    {
      name: "body_type",
      label: "Body Type",
      field: "body_type",
      align: "left",
    },
    {
      name: "plate_number",
      label: "Plate Number",
      field: "plate_number",
      align: "left",
    },
    {
      name: "year_model",
      label: "Year Model",
      field: "year_model",
      align: "left",
    },
    {
      name: "status",
      label: "Status",
      field: "status",
      align: "left",
    },
    {
      name: "site",
      label: "Project Site",
      field: "site",
      align: "left",
    },
  ],
  tableindexrows: [
    // {
    //   id: 1,
    //   vehicle_model: "L300",
    //   body_type: "Box",
    //   plate_number: "FBD495",
    //   year_model: "2016",
    //   status: "Registered",
    //   site: "Project A",
    // },
    // {
    //   id: 2,
    //   vehicle_model: "Corolla",
    //   body_type: "Sedan",
    //   plate_number: "THE284",
    //   year_model: "2024",
    //   status: "Unregistered",
    //   site: "Project B",
    // },
  ],
};
