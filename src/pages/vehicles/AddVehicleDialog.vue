<template>
  <q-page class="q-pa-sm">
    <q-dialog v-model="addvehicledialog" persistent maximized>
      <q-card>
        <q-card-section>
          <h6>Add Vehicle</h6>
        </q-card-section>

        <q-separator />

        <q-card-section class="scroll">
          <q-row
            class="q-gutter-xs"
            v-for="item in vehiclestore.vehicledetailsinput"
            :key="item.name"
          >
            <q-input
              filled
              :label="item.label"
              v-model="vehiclestore.vehicledefaultdetails[item.name]"
              v-if="item.type === 'input'"
            >
              <template v-slot:prepend>
                <q-icon :name="item.icon" color="black" />
              </template>
            </q-input>
            <q-input
              v-if="item.type === 'date'"
              class="fit"
              filled
              v-model="vehiclestore.vehicledefaultdetails[item.name]"
              :label="item.label"
            >
              <template v-slot:prepend>
                <q-icon :name="item.icon" color="black" class="cursor-pointer">
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date
                      v-model="vehiclestore.vehicledefaultdetails[item.name]"
                      :mask="dateFormat"
                      today-btn
                    >
                      <div class="row items-center justify-end">
                        <q-btn
                          v-close-popup
                          label="Close"
                          color="primary"
                          flat
                        />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </q-row>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn
            outline
            label="Close"
            color="red"
            @click="vehiclestore.closeAddVehicleDialog()"
          />
          <q-btn outline label="Save" color="blue" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { defineComponent, computed, ref } from "vue";
import { useVehicleManagementStore } from "src/stores/vehiclemanagement/index";
import { date } from "quasar";

export default defineComponent({
  name: "addvehicle",
  setup() {
    const vehiclestore = useVehicleManagementStore();
    const addvehicledialog = computed(() => vehiclestore.addvehicledialog);

    return {
      text: ref(""),
      dateNeeded: ref(date.formatDate(new Date(), "MMMM DD, YYYY HH:mm:ss")),
      dateFormat: "MMMM DD, YYYY",
      vehiclestore,
      addvehicledialog,
    };
  },
});
</script>
