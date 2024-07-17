<template>
  <q-page class="q-pa-sm">
    <q-dialog v-model="locationstore.locationadddialog">
      <q-card style="width: 700px; max-width: 80vw">
        <q-card-section><h6>Add Warehouse/Project/Site</h6></q-card-section>
        <q-separator></q-separator>
        <q-card-section>
          <q-row
            class="q-gutter-xs"
            v-for="item in locationstore.locationrequestinput"
            :key="item.name"
          >
            <q-input
              filled
              :label="item.label"
              v-model="locationrequestitem[item.name]"
            >
              <template v-slot:prepend>
                <q-icon :name="item.icon" color="black" />
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
            @click="locationstore.closeAddLocationDialog()"
          ></q-btn>
          <q-btn
            outline
            color="blue"
            label="Add"
            @click="locationstore.postLocationItem()"
            :loading="locationpostrequestitemloading"
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
    const locationpostrequestitemloading = computed(
      () => locationstore.locationpostrequestitemloading
    );

    return {
      locationstore,
      locationrequestitem,
      locationpostrequestitemloading,
    };
  },
});
</script>
