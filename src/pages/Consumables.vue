<template>
  <q-page class="q-pa-sm">
    <div class="row items-center">
      <div class="col items-center">
        <div class="row">
          <h2 v-if="$q.platform.is.desktop">Consumables</h2>
          <h6 v-if="$q.platform.is.mobile">Consumables</h6>
        </div>
      </div>
    </div>
    <q-table
      title="Consumables List"
      auto-width
      flat
      bordered
      :separator="'vertical'"
      :columns="tableindexcolumns"
      :rows="tableindexrows"
    >
      <template v-slot:top-right>
        <q-btn class="q-mr-sm" color="primary" :disable="loading" icon="add">
            <q-tooltip class="bg-accent">Add Item</q-tooltip>
          </q-btn>
          <q-btn class="q-mr-sm" color="primary" :disable="loading" icon="remove">
            <q-tooltip class="bg-accent">Remove Item</q-tooltip>
          </q-btn>
        <q-btn class="q-mr-sm" color="primary" icon="sync">
          <q-tooltip class="bg-accent">Get Latest Data</q-tooltip>
        </q-btn>
      </template>
    </q-table>
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
import { useConsumablesStore } from "src/stores/consumables/index";

export default defineComponent({
  name: "consumables",
  setup() {
    const consumablesstore = useConsumablesStore();
    const tableindexcolumns = computed(
      () => consumablesstore.tableindexcolumns
    );
    const tableindexrows = computed(() => consumablesstore.tableindexrows);

    return {
      consumablesstore,
      tableindexcolumns,
      tableindexrows,
    };
  },
});
</script>
