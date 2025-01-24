<template>
  <q-page class="q-pa-sm">
    <div class="row items-center">
      <div class="col items-center">
        <div class="row">
          <h2 v-if="$q.platform.is.desktop">Receiving Report</h2>
          <h6 v-if="$q.platform.is.mobile">Receiving Report</h6>
        </div>
      </div>
    </div>
    <q-table
      title="Receiving List"
      row-key="id"
      selection="single"
      :columns="tableindexcolumns"
      :rows="tableindexrows"
      :separator="'vertical'"
      :loading="listitemsloading"
      auto-width
      flat
      bordered
      v-model:selected="selected"
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
          icon="remove"
          v-if="hasSelection"
        >
          <q-tooltip class="bg-accent">Remove Item</q-tooltip>
        </q-btn>
        <q-btn
          class="q-mr-sm"
          color="primary"
          icon="fact_check"
          v-if="hasSelection"
          :loading="receivingstore.confirmedloading"
          @click="onClickConfirmedBy"
        >
          <q-tooltip class="bg-accent">Confirmed</q-tooltip>
        </q-btn>
        <q-btn
          class="q-mr-sm"
          color="primary"
          icon="done_all"
          v-if="hasSelection"
          :loading="receivingstore.verifiedloading"
          @click="onClickVerifiedBy"
        >
          <q-tooltip class="bg-accent">Verified</q-tooltip>
        </q-btn>
        <q-btn
          class="q-mr-sm"
          color="primary"
          icon="sync"
          @click="receivingstore.getAllReceivingReportItems()"
        >
          <q-tooltip class="bg-accent">Get Latest Data</q-tooltip>
        </q-btn>
      </template>
    </q-table>
    <ReceivingReportDetails />
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
import { useReceivingStore } from "src/stores/receiving/index";
import ReceivingReportDetails from "./ReceivingReportDetails.vue";

export default defineComponent({
  name: "receivingreport",
  setup() {
    const receivingstore = useReceivingStore();
    const tableindexcolumns = computed(() => receivingstore.tableindexcolumns);
    const tableindexrows = computed(() => receivingstore.tableindexrows);
    const listitemsloading = computed(() => receivingstore.listitemsloading);
    const selected = computed({
      get: () => receivingstore.selected,
      set: (value) => (receivingstore.selected = value),
    });

    const hasSelection = computed(() => receivingstore.hasSelection);

    onMounted(() => receivingstore.getAllReceivingReportItems());

    return {
      receivingstore,
      tableindexcolumns,
      tableindexrows,
      listitemsloading,
      selected,
      hasSelection,
    };
  },
  methods: {
    onRowClick(event, row, index) {
      this.receivingstore.openReceivingDetailsDialog();
      this.receivingstore.retrieveReceivingReportItem(row.id);
    },
    onClickConfirmedBy() {
      this.receivingstore.updateConfirmedBy(this.selected[0].id)
    },
    onClickVerifiedBy() {
      this.receivingstore.updateVerifiedBy(this.selected[0].id)
    }
  },
  components: {
    ReceivingReportDetails,
  },
});
</script>
