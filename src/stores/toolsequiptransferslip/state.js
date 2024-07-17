export default {
  dateFormat: "YYYY-MM-DD",
  tableindexcolumns: [
    {
      name: "tets_number",
      label: "Tets Number",
      field: "tets_number",
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
      name: "prepared_by",
      label: "Prepared By",
      field: (row) => row.prepared_by.name,
      align: "left",
    },
  ],
  tableindexrows: [],
  tableindexloading: false,
  tablecreatecolumns: [
    {
      name: "item",
      label: "Item",
      field: "item",
      align: "left",
    },
    {
      name: "quantity",
      label: "Quantity",
      field: "quantity",
      align: "left",
    },
    {
      name: "description_label",
      label: "Description",
      field: "description_label",
      align: "left",
    },
    {
      name: "id",
      label: "ID",
      field: "id",
      align: "left",
    },
    {
      name: "rs_number",
      label: "RS Number",
      field: "rs_number",
      align: "left",
    },
    {
      name: "return",
      label: "Return",
      field: "return",
      align: "left",
    },
    {
      name: "remarks",
      label: "Remarks",
      field: "remarks",
      align: "left",
    }
  ],
  tablecreaterows: [],
  createequipmenttransferitem: {
    tets_number: null,
    date: null,
    location_from: null,
    location_to: null,
    prepared_by: null
  },
  createequipmenttransferitems: {
    item: null,
    quantity: null,
    ids: null,
    returns: null,
    remarks: null,
    description: null,
    rs_number: null,
  },
  equipmentitemsinput: [
    {
      name: "item",
      label: "Item",
      icon: "123",
      type: "input",
    },
    {
      name: "quantity",
      label: "Quantity",
      icon: "123",
      type: "input",
    },
    {
      name: "ids",
      label: "IDs",
      icon: "123",
      type: "input",
    },
    {
      name: "returns",
      label: "Returns",
      icon: "123",
      type: "input",
    },
    {
      name: "remarks",
      label: "Remarks",
      icon: "123",
      type: "input",
    },
    {
      name: "description",
      label: "Description",
      icon: "search",
      type: "select",
    },
    {
      name: "rs_number",
      label: "RS Number",
      icon: "123",
      type: "input",
    },
  ],
  addequipmenttransferitemdialog: false
}
