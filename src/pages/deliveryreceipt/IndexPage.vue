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
      selection="single"
      v-model:selected="selected"
    >
      <template v-slot:top-right>
        <q-input
          class="q-mr-sm"
          dense
          v-model="filter"
          placeholder="Search"
          outlined
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
        <q-btn class="q-mr-sm" color="primary" icon="sync">
          <q-tooltip class="bg-accent">Get Latest Data</q-tooltip>
        </q-btn>
      </template>
    </q-table>
    <delivery-details-page />
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
import DeliveryDetailsPage from "./DeliveryDetailsPage.vue";

export default defineComponent({
  name: "deliveryreceipt",
  setup() {
    const deliveryreceiptstore = useDeliveryReceiptStore();
    const selected = computed({
      get: () => deliveryreceiptstore.selected,
      set: (value) => (deliveryreceiptstore.selected = value)
    })

    onMounted(() => deliveryreceiptstore.getAllDeliveryItems());

    return {
      deliveryreceiptstore,
      filter: ref(""),
      selected
    };
  },
  methods: {
    onRowClick(event, row, index) {
      this.deliveryreceiptstore.openDeliveryDetailsDialog();
      this.deliveryreceiptstore.retrieveDeliveryItem(row.id)
    },
  },
  components: {
    DeliveryDetailsPage,
  },
});
</script>
