export default {
  locationtableindexcolumns: [
    {
      name: "name",
      label: "Warehouse/Site Name",
      field: "name",
      align: "left",
    },
    {
      name: "location",
      label: "Address",
      field: "location",
      align: "left",
    },
  ],
  locationtableindexrows: [],
  locationtableindexloading: false,
  locationadddialog: false,
  locationrequestinput: [
    {
      name: "name",
      label: "Warehouse/Project/Site",
      icon: "123",
      type: "input",
    },
    {
      name: "location",
      label: "Address",
      icon: "map",
      type: "input",
    },
  ],
  locationrequestitem: {
    name: "",
    location: "",
  },
  locationrequestedititem: {
    id: null,
    name: "",
    location: "",
  },
  locationpostrequestitemloading: false,
  locationremoverequestitemloading: false,
  locationupdaterequestitemloading: false,
  locationeditdialog: false,
  selected: []
};
