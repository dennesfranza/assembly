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
        <q-input class="q-mr-sm" dense debounce="500" v-model="indextablefilter" placeholder="Search" outlined>
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
        <q-btn class="q-mr-sm" color="primary" :disable="loading" icon="add" @click="consumablesstore.openAddConsumableItemDialog()">
          <q-tooltip class="bg-accent">Add Item</q-tooltip>
        </q-btn>
        <q-btn class="q-mr-sm" color="primary" :disable="loading" icon="remove" @click="clickRemoveItem()">
          <q-tooltip class="bg-accent">Remove Item</q-tooltip>
        </q-btn>
        <q-btn class="q-mr-sm" color="primary" icon="sync" @click="consumablesstore.getAllItems()">
          <q-tooltip class="bg-accent">Get Latest Data</q-tooltip>
        </q-btn>
      </template>
    </q-table>
    <ConsumableDetailsDialogPage />
    <AddConsumableDialog />
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
import AddConsumableDialog from './AddConsumableDialog.vue'

export default defineComponent({
  name: "consumables",
  setup() {
    const consumablesstore = useConsumablesStore();
    const tableindexcolumns = computed(
      () => consumablesstore.tableindexcolumns
    );
    const tableindexrows = computed(() => consumablesstore.consumableItems);
    const listallitemstableloading = computed(() => consumablesstore.listallitemstableloading)
    const selected = computed({
      get: () => consumablesstore.selected,
      set: (value) =>  (consumablesstore.selected = value)
    })

    onMounted(() => consumablesstore.getAllItems())

    return {
      consumablesstore,
      tableindexcolumns,
      tableindexrows,
      selected,
      listallitemstableloading
    };
  },
  methods: {
    onRowClick(event, row, index) {
      this.consumablesstore.openConsumableDetailsDialog(row)
    },
    clickRemoveItem() {
      console.log(this.selected[0])
      this.consumablesstore.deleteConsumableItem(this.selected[0])
    }
  },
  components: {
    ConsumableDetailsDialogPage,
    AddConsumableDialog
  }
});
</script>
