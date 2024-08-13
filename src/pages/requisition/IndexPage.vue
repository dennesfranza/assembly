<template>
  <q-page class="q-pa-sm">
    <div class="row items-center">
      <div class="col items-center">
        <div class="row">
          <h2 v-if="$q.platform.is.desktop">Requisition Slip</h2>
          <h6 v-if="$q.platform.is.mobile">Requisition Slip</h6>
        </div>
      </div>
    </div>
    <q-table
      title="Requisition List"
      row-key="id"
      selection="single"
      :columns="tableindexcolumns"
      :rows="tableindexrows"
      :separator="'vertical'"
      :loading="listallitemstableloading"
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
          :loading="requeststore.deleterequisitionitemloading"
          @click="removeItem"
        >
          <q-tooltip class="bg-accent">Remove Item</q-tooltip>
        </q-btn>
        <q-btn
          class="q-mr-sm"
          color="primary"
          icon="thumb_up"
          v-if="hasSelection && isApproved === false"
          :loading="requisitionapprovalloading"
          @click="onClickApproval"
        >
          <q-tooltip class="bg-accent">Approve Request</q-tooltip>
        </q-btn>
        <q-btn
          class="q-mr-sm"
          color="primary"
          icon="thumb_down"
          v-if="hasSelection && isApproved === false"
          :loading="requisitiondisapprovalloading"
          @click="onClickDisapproval"
        >
          <q-tooltip class="bg-accent">Disapprove Request</q-tooltip>
        </q-btn>
        <q-btn
          class="q-mr-sm"
          color="primary"
          icon="edit"
          v-if="hasSelection && isApproved === false"
          @click="requeststore.openEditDialog()"
        >
          <q-tooltip class="bg-accent">Edit</q-tooltip>
        </q-btn>
        <q-btn
          class="q-mr-sm"
          color="primary"
          icon="sync"
          @click="requeststore.getAllItems()"
        >
          <q-tooltip class="bg-accent">Get Latest Data</q-tooltip>
        </q-btn>
      </template>
    </q-table>
    <RequisitionDetailsPage />
    <EditRequisitionDialog />
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
import { useRequisitionStore } from "src/stores/requisition/index";
import { useLoginStore } from "src/stores/login/index";
import RequisitionDetailsPage from "./RequisitionDetailsPage.vue";
import EditRequisitionDialog from "./EditRequisitionDialog.vue";

export default defineComponent({
  name: "requisitionslip",
  setup() {
    const requeststore = useRequisitionStore();
    const loginstore = useLoginStore();
    const tableindexcolumns = computed(() => requeststore.tableindexcolumns);
    const tableindexrows = computed(() => requeststore.tableindexrows);
    const listallitemstableloading = computed(
      () => requeststore.listallitemstableloading
    );
    const postrequisitionrequestitemloading = computed(
      () => requeststore.postrequisitionrequestitemloading
    );
    const openrequisitionrequestdialog = computed(
      () => requeststore.openrequisitionrequestdialog
    );
    const selected = computed({
      get: () => requeststore.selected,
      set: (value) => (requeststore.selected = value),
    });
    const hasSelection = computed(() => requeststore.hasSelection);
    const requisitionapprovalloading = computed(
      () => requeststore.requisitionapprovalloading
    );
    const requisitiondisapprovalloading = computed(
      () => requeststore.requisitiondisapprovalloading
    );
    const isApproved = computed(() => requeststore.isApproved);

    onMounted(() => requeststore.getAllItems());

    return {
      requeststore,
      loginstore,
      tableindexcolumns,
      tableindexrows,
      listallitemstableloading,
      postrequisitionrequestitemloading,
      openrequisitionrequestdialog,
      selected,
      hasSelection,
      requisitionapprovalloading,
      requisitiondisapprovalloading,
      isApproved,
      requisitionid: null,
    };
  },
  methods: {
    onRowClick(event, row, index) {
      this.requeststore.openRequisitionDetailsDialog();
      this.requisitionid = row.id;
      this.requeststore.retrieveRequisitionItem(row.id);
    },
    onClickApproval() {
      let _item = {
        id: this.selected[0].id,
        is_approved: true,
        status: "Approved",
      };
      this.requeststore.approveRequest(_item);
    },
    onClickDisapproval() {
      let _item = {
        id: this.selected[0].id,
        is_approved: false,
        status: "Disapproved",
      };
      this.requeststore.approveRequest(_item);
    },
    removeItem() {
      this.requeststore.removeRequesitionRequestItem(this.selected[0].id);
    },
  },
  components: {
    RequisitionDetailsPage,
    EditRequisitionDialog,
  },
});
</script>
