import { axiosInstance } from "boot/axios";
import { Notify } from "quasar";

const actionGetAllEquipmentTransferItems = (state) => {};

const actionOpenCreateDialog = (state) => {
  state.addequipmenttransferitemdialog = true;
};

const actionCloseCreateDialog = (state) => {
  state.addequipmenttransferitemdialog = false;
  state.createequipmenttransferitems = {
    item: null,
    quantity: null,
    ids: null,
    returns: null,
    remarks: null,
    description: null,
    rs_number: null,
  }
};

const actionEquipmentSearch = (state) => {
  // equipments-search
}

export {
  actionGetAllEquipmentTransferItems,
  actionOpenCreateDialog,
  actionCloseCreateDialog,
};
