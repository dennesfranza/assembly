<template>
  <q-page class="q-pa-sm">
    <div class="row items-center">
      <div class="col items-center">
        <div class="row">
          <h2 v-if="$q.platform.is.desktop">Site Management</h2>
          <h6 v-if="$q.platform.is.mobile">Site Management</h6>
        </div>
      </div>
    </div>
    <q-table
      title="Warehouse/Project/Site List"
      selection="single"
      row-key="id"
      :filter="indextablefilter"
      :columns="locationstore.locationtableindexcolumns"
      :rows="locationstore.locationtableindexrows"
      :loading="locationstore.locationtableindexloading"
      :separator="'vertical'"
      auto-width
      flat
      bordered
      v-model:selected="selected"
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
          @click="locationstore.openAddLocationDialog()"
        >
          <q-tooltip class="bg-accent">Add Item</q-tooltip>
        </q-btn>
        <q-btn
          class="q-mr-sm"
          color="primary"
          v-if="hasSelection"
          icon="remove"
          :loading="locationremoverequestitemloading"
          @click="locationstore.removeLocationItem()"
        >
          <q-tooltip class="bg-accent">Remove Item</q-tooltip>
        </q-btn>
        <q-btn
          class="q-mr-sm"
          color="primary"
          v-if="hasSelection"
          icon="update"
          @click="locationstore.openUpdateLocationDialog()"
        >
          <q-tooltip class="bg-accent">Update Item</q-tooltip>
        </q-btn>
        <q-btn
          class="q-mr-sm"
          color="primary"
          icon="sync"
          @click="locationstore.loadLocations()"
        >
          <q-tooltip class="bg-accent">Get Latest Data</q-tooltip>
        </q-btn>
      </template>
    </q-table>
    <AddLocationDialog></AddLocationDialog>
    <EditLocationDialog></EditLocationDialog>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted, computed } from "vue";
import { useLocationStore } from "src/stores/location/index";
import AddLocationDialog from "./AddLocationDialog.vue";
import EditLocationDialog from "./EditLocationDialog.vue";

export default defineComponent({
  name: "location",
  setup() {
    const locationstore = useLocationStore();
    const selected = computed({
      get: () => locationstore.selected,
      set: (value) => (locationstore.selected = value),
    });
    const hasSelection = computed(() => locationstore.hasSelection);
    const locationremoverequestitemloading = computed(
      () => locationstore.locationremoverequestitemloading
    );

    onMounted(() => locationstore.loadLocations());

    return {
      locationstore,
      selected,
      hasSelection,
      locationremoverequestitemloading,
    };
  },
  components: {
    AddLocationDialog,
    EditLocationDialog
  },
});
</script>
