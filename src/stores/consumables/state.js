export default {
  listallitemstableloading: false,
  retrievedetailspageloading: false,
  deleteconsumableitemloading: false,
  updateconsumableitemloading: false,
  tableindexrows: [],
  tableindexcolumns: [
    {
      name: 'name',
      label: 'Name',
      field: 'name',
      align: 'left'
    },
    {
      name: 'description',
      label: 'Description',
      field: 'description',
      align: 'left'
    },
    {
      name: 'created_at',
      label: 'Added',
      field: 'created_at',
      align: 'left'
    },
  ],
  consumablesinput: [
    {
      name: 'name',
      label: 'Name',
      icon: '',
      type: 'input'
    },
    {
      name: 'description',
      label: 'Description',
      icon: '',
      type: 'input'
    },
    {
      name: 'image',
      label: 'Image',
      icon: '',
      type: 'file'
    }
  ],
  createconsumableitem: {
    name: null,
    description: '',
    image: null
  },
  consumabledetailsitem: {
    id: null,
    name: null,
    description: null,
    image: null,
    created_at: null
  },
  consumabledetailsdialog: false,
  consumabledetailsloadingpage: false
};
