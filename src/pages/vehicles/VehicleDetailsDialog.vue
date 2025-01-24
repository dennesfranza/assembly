<template>
  <q-page class="q-pa-sm">
    <q-dialog
      v-model="vehicledetailsdialog"
      :backdrop-filter="'blur(4px)'"
      persistent
    >
      <q-card style="width: 700px; max-width: 80vw">
        <q-card-section>
          <h6>Vehicle Details</h6>
        </q-card-section>
        <q-separator></q-separator>
        <q-card-section class="scroll">
          <div
            class="row items-center"
            v-for="item in vehicledetailsinput"
            :key="item.key"
          >
            <div class="col q-pa-sm">
              <q-input
                :label="item.label"
                readonly
                v-model="vehicledefaultdetails[item.name]"
                v-if="item.name != 'image'"
              >
                <template v-slot:prepend>
                  <q-icon :name="item.icon" />
                </template>
              </q-input>
              <q-img
                v-if="item.name === 'image'"
                :src="vehicledefaultdetails[item.name]"
                spinner-color="white"
                style="height: 140px; max-width: 150px"
              ></q-img>
            </div>
          </div>
        </q-card-section>
        <q-separator></q-separator>
        <q-card-actions align="left">
          <q-btn outline label="Close" color="red" @click="vehiclestore.closeVehicleDetailsDialog()"></q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import {
  defineComponent,
  ref,
  getCurrentInstance,
  computed,
  onMounted,
} from "vue";
import { useVehicleStore } from "src/stores/vehiclemanagement/index";

export default defineComponent({
  name: "vehicledetails",
  setup() {
    const vehiclestore = useVehicleStore();
    const vehicledetailsdialog = computed(
      () => vehiclestore.vehicledetailsdialog
    );
    const vehicledetailsinput = computed(
      () => vehiclestore.vehicledetailsinput
    );
    const vehicledefaultdetails = computed(
      () => vehiclestore.vehicledefaultdetails
    );

    return {
      vehiclestore,
      vehicledetailsdialog,
      vehicledetailsinput,
      vehicledefaultdetails,
    };
  },
});
</script>
