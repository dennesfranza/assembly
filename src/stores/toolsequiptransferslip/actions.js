import { axiosInstance } from "boot/axios";

const actionGetAllEquipmentTransferItems = (state) => {};

const actionOpenCreateDialog = (state) => {
  state.addequipmenttransferitemdialog = true;
};

const actionCloseCreateDialog = (state) => {
  state.addequipmenttransferitemdialog = false;
};

export {
  actionGetAllEquipmentTransferItems,
  actionOpenCreateDialog,
  actionCloseCreateDialog,
};
