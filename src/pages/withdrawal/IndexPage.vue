<template>
  <q-page class="q-pa-sm">
    <div class="row items-center">
      <div class="col items-center">
        <div class="row">
          <h2 v-if="$q.platform.is.desktop">Withdrawal Slip</h2>
          <h6 v-if="$q.platform.is.mobile">Withdrawal Slip</h6>
        </div>
      </div>
    </div>
    <q-table
      title="Withdrawal List"
      :separator="'vertical'"
      :columns="tableindexcolumns"
      :rows="tableindexrows"
      :loading="tableindexloading"
      row-key="id"
      selection="single"
      v-model:selected="selected"
      auto-width
      flat
      bordered
      @row-click="onRowClick"
    >
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
        <!-- <q-btn class="q-mr-sm" color="primary" :disable="loading" icon="add">
          <q-tooltip class="bg-accent">Add Item</q-tooltip>
        </q-btn>
        <q-btn class="q-mr-sm" color="primary" :disable="loading" icon="remove">
          <q-tooltip class="bg-accent">Remove Item</q-tooltip>
        </q-btn> -->
        <q-btn
          class="q-mr-sm"
          color="primary"
          icon="thumb_up"
          v-if="hasSelection"
          :loading="withdrawalslipapprovalloading"
          @click="onClickApproval"
        >
          <q-tooltip class="bg-accent">Approve Request</q-tooltip>
        </q-btn>
        <q-btn
          class="q-mr-sm"
          color="primary"
          icon="thumb_down"
          v-if="hasSelection"
          :loading="withdrawalslipdisapprovalloading"
          @click="onClickDisapproval"
        >
          <q-tooltip class="bg-accent">Disapprove Request</q-tooltip>
        </q-btn>
        <q-btn
          class="q-mr-sm"
          color="primary"
          icon="sync"
          @click="withdrawalstore.getAllItems()"
        >
          <q-tooltip class="bg-accent">Get Latest Data</q-tooltip>
        </q-btn>
      </template>
    </q-table>
    <WithdrawalDetailsPage />
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
import { useWithdrawalStore } from "src/stores/withdrawal/index";
import WithdrawalDetailsPage from "./WithdrawalDetailsPage.vue";

export default defineComponent({
  name: "withdrawalslip",
  setup() {
    const withdrawalstore = useWithdrawalStore();
    const tableindexrows = computed(() => withdrawalstore.tableindexrows);
    const tableindexcolumns = computed(() => withdrawalstore.tableindexcolumns);
    const selected = computed({
      get: () => withdrawalstore.selected,
      set: (value) => (withdrawalstore.selected = value),
    });
    const tableindexloading = computed(() => withdrawalstore.tableindexloading);
    const hasSelection = computed(() => withdrawalstore.hasSelection);
    const withdrawalslipapprovalloading = computed(
      () => withdrawalstore.withdrawalslipapprovalloading
    );
    const withdrawalslipdisapprovalloading = computed(
      () => withdrawalstore.withdrawalslipdisapprovalloading
    );

    onMounted(() => withdrawalstore.getAllItems());

    return {
      withdrawalstore,
      tableindexrows,
      tableindexcolumns,
      selected,
      tableindexloading,
      hasSelection,
      withdrawalslipapprovalloading,
      withdrawalslipdisapprovalloading,
    };
  },
  methods: {
    onRowClick(event, row, index) {
      console.log(row);
      this.withdrawalstore.openDetailsDialog();
      this.withdrawalstore.retrieveWithdrawalItem(row.id);
    },
    onClickApproval() {
      let _item = {
        id: this.selected[0].id,
        is_approved: true,
        status: "Approved",
      };
      this.withdrawalstore.approveRequest(_item);
    },
    onClickDisapproval() {
      let _item = {
        id: this.selected[0].id,
        is_approved: false,
        status: "Disapproved",
      };
      this.withdrawalstore.disapproveRequest(_item);
    },
  },
  components: {
    WithdrawalDetailsPage,
  },
});
</script>
