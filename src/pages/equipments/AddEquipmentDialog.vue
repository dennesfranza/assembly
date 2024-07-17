<template>
  <q-page class="q-pa-sm">
    <q-dialog
      v-model="equipmentstore.addequipmentdialog"
      :backdrop-filter="'blur(4px)'"
      persistent
    >
      <q-card style="width: 700px; max-width: 80vw">
        <q-card-section><h6>Add Equipment Item</h6></q-card-section>
        <q-separator></q-separator>
        <q-card-section class="scroll">
          <div class="row items-center">
            <div class="col q-pa-sm">
              <q-input label="Name" filled v-model="createequipmentitem.name">
                <template v-slot:prepend>
                  <q-icon name="badge"></q-icon>
                </template>
              </q-input>
            </div>
          </div>
          <div class="row items-center">
            <div class="col q-pa-sm">
              <q-input label="Type" filled v-model="createequipmentitem.type">
                <template v-slot:prepend>
                  <q-icon name="text_format"></q-icon>
                </template>
              </q-input>
            </div>
          </div>
          <div class="row items-center">
            <div class="col q-pa-sm">
              <q-input label="Serial Number" filled v-model="createequipmentitem.serial_number">
                <template v-slot:prepend>
                  <q-icon name="tag"></q-icon>
                </template>
              </q-input>
            </div>
          </div>
          <div class="row items-center">
            <div class="col q-pa-sm">
              <q-input label="Brand" filled v-model="createequipmentitem.brand">
                <template v-slot:prepend>
                  <q-icon name="branding_watermark"></q-icon>
                </template>
              </q-input>
            </div>
          </div>
          <div class="row items-center">
            <div class="col q-pa-sm">
              <q-input label="Remarks" filled v-model="createequipmentitem.remarks">
                <template v-slot:prepend>
                  <q-icon name="task"></q-icon>
                </template>
              </q-input>
            </div>
          </div>
          <div class="row items-center">
            <div class="col q-pa-sm">
              <q-select
                label="Location"
                filled
                :options="locationstore.locationOptions"
                map-options
                emit-value
                v-model="createequipmentitem.location"
              >
                <template v-slot:prepend>
                  <q-icon name="map" color="black" />
                </template>
              </q-select>
            </div>
          </div>
          <div class="row items-center">
            <div class="col q-pa-sm">
              <q-file v-model="createequipmentitem.image" label="Image" @update:model-value="onSelected()" clearable filled>
                <template v-slot:prepend>
                  <q-icon name="attach_file" />
                </template>
              </q-file>
            </div>
          </div>
          <div class="row items-center">
            <div class="col q-pa-sm">
              <q-img
                :src="createequipmentitem.imageurl"
                spinner-color="black"
                style="height: 140px; max-width: 150px"
              ></q-img>
            </div>
          </div>
        </q-card-section>
        <q-separator></q-separator>
        <q-card-actions align="left">
          <q-btn
            outline
            label="Close"
            color="red"
            @click="equipmentstore.closeAddEquipmentItemDialog()"
          ></q-btn>
          <q-btn
            outline
            label="Save"
            color="blue"
            :loading="equipmentstore.postequipmentitemloading"
            @click="equipmentstore.postEquipmentItem()"
          ></q-btn>
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
import { useEquipmentStore } from 'src/stores/equipments/index'
import { useLocationStore } from "src/stores/location/index";

export default defineComponent({
  name: 'addequipment',
  setup() {
    const equipmentstore = useEquipmentStore()
    const locationstore = useLocationStore();
    const createequipmentitem = computed(() => equipmentstore.createequipmentitem)

    return {
      equipmentstore,
      locationstore,
      createequipmentitem
    }
  },
  methods: {
    onSelected() {
      if (this.createequipmentitem.image != null) {
        this.createequipmentitem.imageurl = window.URL.createObjectURL(this.createequipmentitem.image)
      } else {
        this.createequipmentitem.imageurl = null
      }
    }
  }
})
</script>
