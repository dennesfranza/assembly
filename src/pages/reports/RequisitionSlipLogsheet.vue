<template>
  <q-page class="q-pa-sm">
    <div class="row items-center">
      <div class="col items-center">
        <div class="row">
          <h2 v-if="$q.platform.is.desktop">Requisition Slip Logsheet</h2>
          <h6 v-if="$q.platform.is.mobile">Requisition Slip Logsheet</h6>
        </div>
      </div>
    </div>
    <q-table
      title="Logsheet List"
      auto-width
      flat
      bordered
      :separator="'vertical'"
      :columns="reportstore.requisitionlogsheetcolumns"
    >
      <template v-slot:top-right>
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
import { useReportsStore } from 'src/stores/reports/index'

export default defineComponent({
  name: 'requisitionsliplogsheet',
  setup() {
    const reportstore = useReportsStore()

    return {
      reportstore,
    }
  },
  methods: {}
})
</script>
