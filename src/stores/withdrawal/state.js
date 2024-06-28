export default {
  dateFormat: "YYYY-MM-DD",
  tableindexcolumns: [
    {
      name: "ws_number",
      label: "WS Number",
      field: "ws_number",
      align: "left",
    },
    {
      name: "date",
      label: "Date",
      field: "date",
      align: "left",
    },
    {
      name: "location",
      label: "Location",
      field: (row) => row.location.name,
      align: "left",
    },
    {
      name: "requested_by",
      label: "Requested By",
      field: (row) => row.requested_by.name,
      align: "left",
    },
  ],
  tableindexrows: [],
  tablecreatecolumns: [
    {
      name: "description_label",
      label: "Description",
      field: "description_label",
      align: "left",
    },
    {
      name: "quantity",
      label: "Quantity",
      field: "quantity",
      align: "left",
    },
    {
      name: "purpose",
      label: "Purpose",
      field: "purpose",
      align: "left",
    },
  ],
  tablecreaterows: [],
  createwithdrawalitem: {
    ws_number: "",
    date: "",
    location: null,
    requested_by: null,
    noted_by: null,
    issued_by: null,
    withdrawal_slip_items: [],
  },
  createwithdrawalitems: {
    description: null,
    description_label: "",
    quantity: 0,
    purpose: "",
  },
  selected: [],
  tableindexloading: false,
  withdrawalslipdetailsdialog: false,
  withdrawalslipdetailsloadingpage: false,
  withdrawalslipdetails: {
    location: null,
    requested_by: null,
    noted_by: null,
    issued_by: null,
    ws_number: null,
    date: null
  },
  withdrawalslipdetailsitems: [],
  withdrawalslipdetailscolumns: [
    {
      name: "description",
      label: "Description",
      field: row => row.description.name,
      align: "left",
    },
    {
      name: "quantity",
      label: "Quantity",
      field: "quantity",
      align: "left",
    },
    {
      name: "purpose",
      label: "Purpose",
      field: "purpose",
      align: "left",
    },
  ]
};
