<template>
  <q-page class="q-pa-sm">
    <q-dialog v-model="locationstore.locationeditdialog">
      <q-card style="width: 700px; max-width: 80vw">
        {{ locationrequestedititem }}
        <q-card-section><h6>Edit Warehouse/Project/Site</h6></q-card-section>
        <q-separator></q-separator>
        <q-card-section>
          <q-row class="q-gutter-xs">
            <q-input
              filled
              label="ID"
              v-model="locationrequestedititem.id"
              readonly
            >
              <template v-slot:prepend>
                <q-icon name="123" color="black" />
              </template>
            </q-input>
          </q-row>
          <q-row class="q-gutter-xs">
            <q-input filled label="Name" v-model="locationrequestedititem.name">
              <template v-slot:prepend>
                <q-icon name="123" color="black" />
              </template>
            </q-input>
          </q-row>
          <q-row class="q-gutter-xs">
            <q-input
              filled
              label="Address"
              v-model="locationrequestedititem.location"
            >
              <template v-slot:prepend>
                <q-icon name="map" color="black" />
              </template>
            </q-input>
          </q-row>
        </q-card-section>
        <q-separator></q-separator>
        <q-card-actions align="left">
          <q-btn
            outline
            color="red"
            label="Close"
            @click="locationstore.closeUpdateLocationDialog()"
          ></q-btn>
          <q-btn
            outline
            color="blue"
            label="Update"
            @click="locationstore.updateLocationItem()"
            :loading="locationupdaterequestitemloading"
          ></q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { defineComponent, computed, ref } from "vue";
import { useLocationStore } from "src/stores/location/index";

export default defineComponent({
  name: "addlocation",
  setup() {
    const locationstore = useLocationStore();
    const locationrequestitem = computed(
      () => locationstore.locationrequestitem
    );
    const locationupdaterequestitemloading = computed(
      () => locationstore.locationupdaterequestitemloading
    );
    const locationrequestedititem = computed(
      () => locationstore.locationrequestedititem
    );

    return {
      locationstore,
      locationrequestitem,
      locationupdaterequestitemloading,
      locationrequestedititem,
    };
  },
});
</script>
