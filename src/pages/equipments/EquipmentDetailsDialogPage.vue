<template>
  <q-page class="q-pa-sm">
    <q-dialog
      v-model="equipmentstore.equipmentdetailsdialog"
      :backdrop-filter="'blur(4px)'"
      persistent
    >
      <q-card style="width: 700px; max-width: 80vw">
        <q-card-section><h6>Equipment Details Page</h6></q-card-section>
        <q-separator></q-separator>
        <q-card-section class="scroll">
          <div class="row items-center">
            <div class="col q-pa-sm">
              <q-input v-model="equipmentstore.equipmentdetailsitem.name" label="Name" readonly></q-input>
            </div>
          </div>
          <div class="row items-center">
            <div class="col q-pa-sm">
              <q-input v-model="equipmentstore.equipmentdetailsitem.type" label="Type" readonly></q-input>
            </div>
          </div>
          <div class="row items-center">
            <div class="col q-pa-sm">
              <q-input v-model="equipmentstore.equipmentdetailsitem.serial_number" label="Serial Number" readonly></q-input>
            </div>
          </div>
          <div class="row items-center">
            <div class="col q-pa-sm">
              <q-input v-model="equipmentstore.equipmentdetailsitem.brand" label="Brand" readonly></q-input>
            </div>
          </div>
          <div class="row items-center">
            <div class="col q-pa-sm">
              <q-input v-model="equipmentstore.equipmentdetailsitem.remarks" label="Remarks" readonly></q-input>
            </div>
          </div>
          <div class="row items-center">
            <div class="col q-pa-sm">
              <q-input v-model="equipmentstore.equipmentdetailsitem.location" label="Location" readonly></q-input>
            </div>
          </div>
          <div class="row items-center">
            <div class="col q-pa-sm">
              <q-img
                :src="equipmentstore.equipmentdetailsitem.image"
                spinner-color="white"
                style="height: 140px; max-width: 150px"
              />
            </div>
          </div>
        </q-card-section>
        <q-separator></q-separator>
        <q-card-actions align="left">
          <q-btn
            outline
            label="Close"
            color="red"
            @click="equipmentstore.closeEquipmentDetailsDialog()"
          ></q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import {
  defineComponent,
} from "vue";
import { useEquipmentStore } from "src/stores/equipments/index";

export default defineComponent({
  name: "equipmentdetails",
  setup() {
    const equipmentstore = useEquipmentStore();

    return {
      equipmentstore,
    };
  },
});
</script>
