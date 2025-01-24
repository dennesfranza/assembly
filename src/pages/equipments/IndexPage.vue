<template>
  <q-page class="q-pa-sm">
    <div class="row items-center">
      <div class="col items-center">
        <div class="row">
          <h2 v-if="$q.platform.is.desktop">Equipment Management</h2>
          <h6 v-if="$q.platform.is.mobile">Equipment Management</h6>
        </div>
      </div>
    </div>
    <q-table
      title="Equipment List"
      auto-width
      flat
      bordered
      row-key="id"
      selection="single"
      v-model:selected="selected"
      :filter="indextablefilter"
      :separator="'vertical'"
      :columns="equipmenttableindexcolumns"
      :rows="equipmenttableindexrows"
      :loading="equipmentstore.listequipmentstableloading"
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
          @click="equipmentstore.openAddEquipmentItemDialog()"
        >
          <q-tooltip class="bg-accent">Add Item</q-tooltip>
        </q-btn>
        <q-btn
          class="q-mr-sm"
          color="primary"
          icon="remove"
          v-if="equipmentstore.hasSelected"
          :loading="equipmentstore.deleteequipmentitemloading"
          @click="clickRemoveItem()"
        >
          <q-tooltip class="bg-accent">Remove Item</q-tooltip>
        </q-btn>
        <q-btn class="q-mr-sm" color="primary" icon="sync" @click="equipmentstore.getAllItems()">
          <q-tooltip class="bg-accent">Get Latest Data</q-tooltip>
        </q-btn>
      </template>
    </q-table>
    <EquipmentDetailsDialogPage />
    <AddEquipmentDialog />
  </q-page>
</template>

<script>
import { defineComponent, ref, getCurrentInstance, computed, onMounted } from "vue";
import { useEquipmentStore } from "src/stores/equipments/index";
import EquipmentDetailsDialogPage from "./EquipmentDetailsDialogPage.vue";
import AddEquipmentDialog from './AddEquipmentDialog.vue'

export default defineComponent({
  name: "equipments",
  setup() {
    const equipmentstore = useEquipmentStore();
    const equipmenttableindexcolumns = computed(
      () => equipmentstore.equipmenttableindexcolumns
    );
    const equipmenttableindexrows = computed(
      () => equipmentstore.equipmenttableindexrows
    );
    const selected = computed({
      get: () => equipmentstore.selected,
      set: (value) => (equipmentstore.selected = value),
    });

    onMounted(() => equipmentstore.getAllItems())

    return {
      equipmentstore,
      equipmenttableindexcolumns,
      equipmenttableindexrows,
      selected,
      indextablefilter: ref('')
    };
  },
  methods: {
    onRowClick(event, row, index) {
      this.equipmentstore.openEquipmentDetailsDialog(row)
    },
    clickRemoveItem() {
      console.log(this.selected)
      this.equipmentstore.deleteEquipmentItem(this.selected[0].id)
    }
  },
  components: {
    EquipmentDetailsDialogPage,
    AddEquipmentDialog
  },
});
</script>
