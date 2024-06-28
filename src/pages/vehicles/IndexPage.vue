<template>
  <q-page class="q-pa-sm">
    <div class="row items-center">
      <div class="col items-center">
        <div class="row">
          <h2 v-if="$q.platform.is.desktop">Vehicle Management</h2>
          <h6 v-if="$q.platform.is.mobile">Vehicle Management</h6>
        </div>
      </div>
    </div>
    <q-table
      :filter="indextablefilter"
      title="Vehicle List"
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
      <template v-slot:loading>
        <q-inner-loading showing color="primary" />
      </template>
      <template v-slot:top-right>
        <q-input
          class="q-mr-sm"
          dense
          debounce="500"
          v-model="indextablefilter"
          placeholder="Search"
          outlined
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
        <q-btn
          class="q-mr-sm"
          color="primary"
          :disable="loading"
          icon="add"
          @click="vehiclestore.openAddVehicleDialog()"
        >
          <q-tooltip class="bg-accent">Add Item</q-tooltip>
        </q-btn>
        <q-btn
          class="q-mr-sm"
          color="primary"
          :disable="loading"
          icon="remove"
          @click="clickRemoveItem()"
        >
          <q-tooltip class="bg-accent">Remove Item</q-tooltip>
        </q-btn>
        <q-btn class="q-mr-sm" color="primary" icon="sync">
          <q-tooltip class="bg-accent">Get Latest Data</q-tooltip>
        </q-btn>
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
