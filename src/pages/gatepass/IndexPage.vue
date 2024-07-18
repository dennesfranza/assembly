<template>
  <q-page class="q-pa-sm">
    <div class="row items-center">
      <div class="col items-center">
        <div class="row">
          <h2 v-if="$q.platform.is.desktop">Gate Pass</h2>
          <h6 v-if="$q.platform.is.mobile">Gate Pass</h6>
        </div>
      </div>
    </div>
    <q-table
      title="Gate Pass List"
      auto-width
      flat
      bordered
      selection="single"
      v-model:selected="selected"
      :separator="'vertical'"
      :filter="indextablefilter"
      :columns="tableindexcolumns"
      :rows="tableindexrows"
      :loading="tableindexloading"
    >
      <template v-slot:top-right>
        <q-input
          class="q-mr-sm"
          dense
          debounce="500"
          placeholder="Search"
          outlined
          v-model="indextablefilter"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
        <q-btn
          class="q-mr-sm"
          color="primary"
          icon="add"
        >
          <q-tooltip class="bg-accent">Add Item</q-tooltip>
        </q-btn>
        <q-btn
          class="q-mr-sm"
          color="primary"
          icon="remove"
          v-if="hasSelection"
        >
          <q-tooltip class="bg-accent">Remove Item</q-tooltip>
        </q-btn>
        <!-- <q-btn
          class="q-mr-sm"
          color="primary"
          icon="thumb_up"
        >
          <q-tooltip class="bg-accent">Approve Request</q-tooltip>
        </q-btn>
        <q-btn
          class="q-mr-sm"
          color="primary"
          icon="thumb_down"
        >
          <q-tooltip class="bg-accent">Disapprove Request</q-tooltip>
        </q-btn> -->
        <q-btn
          class="q-mr-sm"
          color="primary"
          icon="sync"
        >
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
import { useGatepassStore } from "src/stores/gatepass";
import { useLocationStore } from "src/stores/location";

export default defineComponent({
  name: 'gatepass',
  setup() {
    const gatepassstore = useGatepassStore()
    const locationstore = useLocationStore()
    const tableindexcolumns = computed(() => gatepassstore.tableindexcolumns)
    const tableindexrows = computed(() => gatepassstore.tableindexrows)
    const tableindexloading = computed(() => gatepassstore.tableindexloading)
    const hasSelection = computed(() => gatepassstore.hasSelection)
    const selected = computed({
      get: () => gatepassstore.selected,
      set: (value) => (gatepassstore.selected = value),
    });

    return {
      gatepassstore,
      locationstore,
      tableindexcolumns,
      tableindexrows,
      tableindexloading,
      hasSelection,
      selected,
      indextablefilter: ref('')
    }
  }
})
</script>
