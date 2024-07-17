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
      title="Vehicle List"
      auto-width
      flat
      bordered
      selection="single"
      v-model:selected="selected"
      :columns="tableindexcolumns"
      :rows="tableindexrows"
      :separator="'vertical'"
      :filter="indextablefilter"
      :loading="vehiclestore.vehicleindextableloading"
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
          icon="add"
          @click="vehiclestore.openAddVehicleDialog()"
        >
          <q-tooltip class="bg-accent">Add Item</q-tooltip>
        </q-btn>
        <q-btn
          class="q-mr-sm"
          color="primary"
          icon="remove"
          v-if="hasSelection"
          @click="clickRemoveItem()"
        >
          <q-tooltip class="bg-accent">Remove Item</q-tooltip>
        </q-btn>
        <q-btn
          class="q-mr-sm"
          color="primary"
          icon="sync"
          @click="vehiclestore.getAllVehicles()"
        >
          <q-tooltip class="bg-accent">Get Latest Data</q-tooltip>
        </q-btn>
      </template>
    </q-table>
    <VehicleDetailsDialog />
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
import { useVehicleStore } from "src/stores/vehiclemanagement/index";
import VehicleDetailsDialog from "./VehicleDetailsDialog.vue";
import AddVehicleDialog from "./AddVehicleDialog.vue";

export default defineComponent({
  name: "vehiclemanagement",
  setup() {
    const vehiclestore = useVehicleStore();
    const tableindexcolumns = computed(() => vehiclestore.tableindexcolumns);
    const tableindexrows = computed(() => vehiclestore.tableindexrows);
    const selected = computed({
      get: () => vehiclestore.selected,
      set: (value) => (vehiclestore.selected = value),
    });
    const hasSelection = computed(() => vehiclestore.hasSelection);

    onMounted(() => vehiclestore.getAllVehicles());

    return {
      vehiclestore,
      tableindexcolumns,
      tableindexrows,
      selected,
      hasSelection,
    };
  },
  methods: {
    onRowClick(event, row, index) {
      console.log(row);
      this.vehiclestore.openVehicleDetailsDialog(row);
    },
    clickRemoveItem() {
      console.log(this.selected[0]);
      // this.consumablesstore.deleteConsumableItem(this.selected[0]);
    },
  },
  components: {
    VehicleDetailsDialog,
    AddVehicleDialog
  },
});
</script>
