<template>
  <q-page class="q-pa-sm">
    <div class="row items-center">
      <div class="col items-center">
        <div class="row">
          <h2 v-if="$q.platform.is.desktop">Equipment Transfer Slip</h2>
          <h6 v-if="$q.platform.is.mobile">Equipment Transfer Slip</h6>
        </div>
      </div>
    </div>
    <q-table
      title="Equipment Transfer Slips"
      row-key="id"
      selection="single"
      :columns="tableindexcolumns"
      :rows="tableindexrows"
      :separator="'vertical'"
      :loading="tableindexloading"
      auto-width
      flat
      bordered
    >
      <template v-slot:loading>
        <q-inner-loading showing color="primary" />
      </template>
      <template v-slot:top-right>
        <q-input
          class="q-mr-sm"
          dense
          debounce="500"
          placeholder="Search"
          outlined
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
        <q-btn class="q-mr-sm" color="primary" icon="add">
          <q-tooltip class="bg-accent">Add Item</q-tooltip>
        </q-btn>
        <q-btn class="q-mr-sm" color="primary" icon="remove">
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
import { useEquipTransferSlipStore } from 'src/stores/toolsequiptransferslip/index'

export default defineComponent({
  name: "equipmenttransfer",
  setup() {
    const equipmenttransferstore = useEquipTransferSlipStore()
    const tableindexcolumns = computed(() => equipmenttransferstore.tableindexcolumns)
    const tableindexrows = computed(() => equipmenttransferstore.tableindexrows)
    const tableindexloading = computed(() => equipmenttransferstore.tableindexloading)

    return {
      equipmenttransferstore,
      tableindexcolumns,
      tableindexrows,
      tableindexloading
    };
  },
});
</script>
