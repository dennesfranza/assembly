<template>
  <q-page class="q-pa-sm">
    <div class="row items-center">
      <div class="col items-center">
        <div class="row">
          <h2 v-if="$q.platform.is.desktop">Delivery Receipts</h2>
          <h6 v-if="$q.platform.is.mobile">Delivery Receipts</h6>
        </div>
      </div>
    </div>
    <q-table
      title="Delivery Receipts"
      :columns="deliveryreceiptstore.tableindexcolumns"
      :rows="deliveryreceiptstore.tableindexrows"
      row-key="id"
      :separator="'vertical'"
      auto-width
      flat
      bordered
      :loading="deliveryreceiptstore.listallitemstableloading"
      @row-click="onRowClick"
    >
      <template v-slot:top-right>
        <q-input class="q-mr-sm" dense v-model="filter" placeholder="Search" outlined>
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
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
import { useDeliveryReceiptStore } from "src/stores/deliveryreceipt/index";

export default defineComponent({
  name: "deliveryreceipt",
  setup() {
    const deliveryreceiptstore = useDeliveryReceiptStore()

    onMounted(() => deliveryreceiptstore.getAllDeliveryItems())

    return {
      deliveryreceiptstore,
      filter: ref('')
    }
  },
  methods: {
    onRowClick (event, row, index) {
      this.requeststore.openRequisitionDetailsDialog()
      this.requisitionid = row.id
      this.requeststore.retrieveRequisitionItem(row.id)
    }
  },
  components: {
  }
});
</script>
