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
      :columns="tableindexcolumns"
      :rows="tableindexrows"
      row-key="id"
      :separator="'vertical'"
      auto-width
      flat
      bordered
      :loading="listallitemstableloading"
      @row-click="onRowClick"
      selection="single"
      v-model:selected="selected"
    >
      <template v-slot:top-right>
        <q-btn class="q-mr-sm" color="primary" icon="thumb_up" v-if="hasSelection">
          <q-tooltip class="bg-accent">Approve Request</q-tooltip>
        </q-btn>
        <q-btn class="q-mr-sm" color="primary" icon="thumb_down" v-if="hasSelection">
          <q-tooltip class="bg-accent">Disapprove Request</q-tooltip>
        </q-btn>
        <q-btn class="q-mr-sm" color="primary" icon="sync" @click="requeststore.getAllItems()">
          <q-tooltip class="bg-accent">Get Latest Data</q-tooltip>
        </q-btn>
      </template>
    </q-table>
    <RequisitionDetailsPage :id="requisitionid" />
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
import RequisitionDetailsPage from "./RequisitionDetailsPage.vue"

export default defineComponent({
  name: "requisitionslip",
  setup() {
    const requeststore = useRequisitionStore();

    const tableindexcolumns = computed(
      () => requeststore.tableindexcolumns
    );
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
      set: (value) => (requeststore.selected = value)
    })

    const hasSelection = computed(() => requeststore.hasSelection)

    onMounted(() => requeststore.getAllItems())

    return {
      requisitionid: null,
      requeststore,
      tableindexcolumns,
      tableindexrows,
      listallitemstableloading,
      postrequisitionrequestitemloading,
      openrequisitionrequestdialog,
      selected,
      hasSelection
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
    RequisitionDetailsPage
  }
});
</script>
