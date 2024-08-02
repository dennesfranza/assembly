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
    prepared_by: null,
    equipment_transfer_items: []
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
      name: "rs_number",
      label: "RS Number",
      icon: "search",
      type: "select",
    },
    {
      name: "quantity",
      label: "Quantity",
      icon: "123",
      type: "input",
    },
    {
      name: "description",
      label: "Description",
      icon: "description",
      type: "input",
    },
    {
      name: "item",
      label: "Item",
      icon: "category",
      type: "input",
    },
    {
      name: "ids",
      label: "IDs",
      icon: "chevron_left",
      type: "input",
    },
    {
      name: "returns",
      label: "Returns",
      icon: "circle",
      type: "input",
    },
    {
      name: "remarks",
      label: "Remarks",
      icon: "done_outline",
      type: "input",
    },
  ],
  addequipmenttransferitemdialog: false
}
