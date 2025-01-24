<template>
  <q-page class="q-pa-sm">
    <q-dialog
      v-model="vehicleadditemdialog"
      persistent
      :backdrop-filter="'blur(4px)'"
    >
      <q-card style="width: 700px; max-width: 80vw">
        <q-card-section>
          <h6>Add Vehicle</h6>
        </q-card-section>
        <q-separator />
        <q-card-section class="scroll">
          <q-row
            class="q-gutter-xs"
            v-for="item in vehicledetailsinput"
            :key="item.name"
          >
            <q-input
              filled
              :label="item.label"
              v-model="createvehicleitem[item.name]"
              v-if="item.type === 'input' && item.name != 'location'"
            >
              <template v-slot:prepend>
                <q-icon :name="item.icon" color="black" />
              </template>
            </q-input>
            <q-input
              v-if="item.type === 'date'"
              class="fit"
              filled
              v-model="createvehicleitem[item.name]"
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
                      v-model="createvehicleitem[item.name]"
                      :mask="vehiclestore.dateFormat"
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
            <q-select
              v-if="item.name === 'location'"
              label="Location"
              :options="locationstore.locationOptions"
              map-options
              emit-value
              class="fit"
              filled
              v-model="createvehicleitem.location"
            >
              <template v-slot:prepend>
                <q-icon name="map" color="black" />
              </template>
            </q-select>
            <q-file
              v-if="item.type === 'file'"
              v-model="createvehicleitem.image"
              label="Image"
              @update:model-value="onSelected()"
              clearable
              filled
            >
              <template v-slot:prepend>
                <q-icon name="attach_file" />
              </template>
            </q-file>
          </q-row>
          <div class="row items-center">
            <div class="col q-pa-sm">
              <q-img
                :src="createvehicleitem.imageurl"
                spinner-color="black"
                style="height: 140px; max-width: 150px"
              />
            </div>
          </div>
        </q-card-section>
        <q-separator />
        <q-card-actions align="left">
          <q-btn
            outline
            label="Close"
            color="red"
            @click="vehiclestore.closeAddVehicleDialog()"
          />
          <q-btn
            outline
            label="Save"
            color="blue"
            :loading="vehiclestore.vehicleadditemloading"
            @click="vehiclestore.postVehicleItem()"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { defineComponent, computed, ref } from "vue";
import { useVehicleStore } from "src/stores/vehiclemanagement/index";
import { useLocationStore } from "src/stores/location/index";

export default defineComponent({
  name: "addvehicle",
  setup() {
    const vehiclestore = useVehicleStore();
    const locationstore = useLocationStore();
    const vehicleadditemdialog = computed(
      () => vehiclestore.vehicleadditemdialog
    );
    const createvehicleitem = computed(() => vehiclestore.createvehicleitem);
    const vehicledetailsinput = computed(
      () => vehiclestore.vehicledetailsinput
    );

    return {
      vehiclestore,
      locationstore,
      vehicleadditemdialog,
      createvehicleitem,
      vehicledetailsinput,
    };
  },
  methods: {
    onSelected() {
      if (this.createvehicleitem.image != null) {
        this.createvehicleitem.imageurl = window.URL.createObjectURL(
          this.createvehicleitem.image
        );
      } else {
        this.createvehicleitem.imageurl = null;
      }
    },
  },
});
</script>
