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
      selection="single"
      v-model:selected="selected"
      :loading="listallitemstableloading"
      @row-click="onRowClick"
    >
      <template v-slot:top-right>
        <q-btn class="q-mr-sm" color="primary" :disable="loading" icon="add">
            <q-tooltip class="bg-accent">Add Item</q-tooltip>
          </q-btn>
          <q-btn class="q-mr-sm" color="primary" :disable="loading" icon="remove">
            <q-tooltip class="bg-accent">Remove Item</q-tooltip>
          </q-btn>
        <q-btn class="q-mr-sm" color="primary" icon="sync" @click="consumablesstore.getAllItems()">
          <q-tooltip class="bg-accent">Get Latest Data</q-tooltip>
        </q-btn>
      </template>
    </q-table>
    <ConsumableDetailsDialogPage />
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
import ConsumableDetailsDialogPage from './ConsumableDetailsDialogPage.vue'

export default defineComponent({
  name: "consumables",
  setup() {
    const consumablesstore = useConsumablesStore();
    const tableindexcolumns = computed(
      () => consumablesstore.tableindexcolumns
    );
    const tableindexrows = computed(() => consumablesstore.consumableItems);
    const listallitemstableloading = computed(() => consumablesstore.listallitemstableloading)

    onMounted(() => consumablesstore.getAllItems())

    return {
      consumablesstore,
      tableindexcolumns,
      tableindexrows,
      selected: ref([]),
      listallitemstableloading
    };
  },
  methods: {
    onRowClick(event, row, index) {
      console.log(row)
      console.log(row.image)
      this.consumablesstore.openConsumableDetailsDialog(row)
    }
  },
  components: {
    ConsumableDetailsDialogPage
  }
});
</script>
