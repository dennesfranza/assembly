<template>
  <q-page class="q-pa-sm">
    <div class="row items-center">
      <div class="col items-center">
        <div class="row">
          <h2 v-if="$q.platform.is.desktop">Vehicle Management</h2>
          <h6 v-if="$q.platform.is.mobile">Vehicle Management</h6>
          {{ vehiclestore.addvehicledialog }}
          {{ vehiclestore.indextableloading }}
          {{ vehiclestore.vehicledefaultdetails }}
        </div>
      </div>
    </div>
    <q-table
      :filter="indextablefilter"
      title="Vehicle Management"
      :columns="tableindexcolumns"
      :rows="tableindexrows"
      row-key="id"
      :separator="'vertical'"
      auto-width
      flat
      bordered
      :loading="indextableloading"
      @row-click="onRowClick"
    >
      <template v-slot:top-left>
        <div class="q-gutter-xs">
          <q-btn
            color="primary"
            label="Add Item"
            @click="vehiclestore.openAddVehicleDialog()"
          />
        </div>
      </template>
      <template v-slot:loading>
        <q-inner-loading showing color="primary" />
      </template>
      <template v-slot:top-right>
        <q-input
          dense
          debounce="500"
          v-model="indextablefilter"
          placeholder="Search"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
    </q-table>
    <AddVehicleDialog />
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
import { useVehicleManagementStore } from "src/stores/vehiclemanagement/index";
import AddVehicleDialog from "./AddVehicleDialog.vue";

export default defineComponent({
  name: "vehiclemanagement",
  setup() {
    const vehiclestore = useVehicleManagementStore();

    const indextablefilter = computed({
      get: () => vehiclestore.indextablefilter,
      set: (value) => (vehiclestore.indextablefilter = value),
    });
    const indextableloading = computed(() => vehiclestore.indextableloading);
    const savevehicledetailsloading = computed(
      () => vehiclestore.savevehicledetailsloading
    );
    const vehicledefaultdetails = computed(
      () => vehiclestore.vehicledefaultdetails
    );
    const tableindexcolumns = computed(() => vehiclestore.tableindexcolumns);
    const tableindexrows = computed(() => vehiclestore.tableindexrows);

    function onRowClick(event, row) {
      console.log(event, row);
    }

    onMounted(() => vehiclestore.getVehicles());

    return {
      vehiclestore,
      onRowClick,
      indextablefilter,
      indextableloading,
      savevehicledetailsloading,
      vehicledefaultdetails,
      tableindexcolumns,
      tableindexrows,
    };
  },
  components: {
    AddVehicleDialog,
  },
});
</script>
