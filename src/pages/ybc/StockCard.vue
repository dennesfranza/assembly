<template>
  <q-page class="q-pa-sm">
    <form-header-vue :headers="formHeader.headers" :name="formHeader.name" />
    <div class="row items-center">
      <div class="col q-pa-sm">
        <q-input v-model="item" label="Item" />
      </div>
      <div class="col q-pa-sm">
        <q-input v-model="location" label="Location" />
      </div>
      <div class="col q-pa-sm">
        <q-input v-model="reorderPoint" label="ReOrder Point" />
      </div>
      <div class="col q-pa-sm">
        <q-input v-model="beginningBalance" label="Beginning Balance" />
      </div>
      <div class="col q-pa-sm">
        <q-input class="fit" v-model="date" label="Date">
          <template v-slot:prepend>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date v-model="date" :mask="dateFormat" today-btn>
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>
    </div>
    <div class="q-pt-md">
      <q-table
        :rows="rows"
        :columns="columns"
        row-key="name"
        :separator="'cell'"
        flat
        bordered
      >
        <template v-slot:header="props">
          <q-tr>
            <q-th></q-th>
            <q-th colspan="3">For Receiving</q-th>
            <q-th colspan="2">For Issuance</q-th>
            <q-th colspan="2">Quantity</q-th>
            <q-th></q-th>
            <q-th></q-th>
          </q-tr>
          <q-tr :props="props">
            <q-th v-for="col in props.cols" :key="col.name" :props="props">{{
              col.label
            }}</q-th>
          </q-tr>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, getCurrentInstance } from "vue";
import { useFormHeadersStore } from "src/stores/formheaders/index";
import FormHeaderVue from "src/components/forms/FormHeader.vue";
import { date } from "quasar";

export default defineComponent({
  name: "stockcard",
  setup() {
    const formheaders = useFormHeadersStore();
    const formHeader = formheaders[getCurrentInstance().type.name];

    console.log(formHeader);

    return {
      formHeader,
      date: ref(date.formatDate(new Date(), "MMMM DD, YYYY HH:mm:ss")),
      item: ref("Welding Rod 60N x 1/8"),
      location: ref("Mandtra Residences Project Warehouse"),
      reorderPoint: ref(""),
      beginningBalance: ref("0"),
      dateFormat: "MMMM DD, YYYY HH:mm:ss",
      formattedDate: ref(date.formatDate(new Date(), "MMMM DD, YYYY HH:mm:ss")),
      columns: [
        {
          name: "date",
          label: "Date",
          field: "date",
          align: "left",
        },
        {
          name: "invoice_number",
          label: "DR Number/Invoice Number",
          field: "invoice_number",
          align: "left",
        },
        {
          name: "rr_number",
          label: "RR Number",
          field: "rr_number",
          align: "left",
        },
        {
          name: "received_by",
          label: "Received By",
          field: "received_by",
          align: "left",
        },
        {
          name: "ws_number",
          label: "WS Number",
          field: "ws_number",
          align: "left",
        },
        {
          name: "issued_to",
          label: "Issued To",
          field: "issued_to",
          align: "left",
        },
        {
          name: "in",
          label: "In",
          field: "in",
          align: "left",
        },
        {
          name: "out",
          label: "Out",
          field: "out",
          align: "left",
        },
        {
          name: "balance_on_hand",
          label: "Balance On Hand",
          field: "balance_on_hand",
          align: "left",
        },
        {
          name: "remarks",
          label: "Remarks",
          field: "remarks",
          align: "left",
        },
      ],
      rows: [
        {
          date: "Jan 01, 2024",
          invoice_number: "SI #422296",
          rr_number: "12004",
          received_by: "Dennes Franza",
          ws_number: "134043",
          issued_to: "Marc",
          in: "100",
          out: "0",
          balance_on_hand: "100",
          remarks: "",
        },
        {
          date: "Jan 03, 2024",
          invoice_number: "SI #422296",
          rr_number: "12004",
          received_by: "Dennes Franza",
          ws_number: "134087",
          issued_to: "Marc",
          in: "",
          out: "1",
          balance_on_hand: "99",
          remarks: "",
        },
        {
          date: "Jan 10, 2024",
          invoice_number: "SI #422296",
          rr_number: "12004",
          received_by: "Dennes Franza",
          ws_number: "134118",
          issued_to: "Marc",
          in: "",
          out: "5",
          balance_on_hand: "94",
          remarks: "",
        },
        {
          date: "Jan 15, 2024",
          invoice_number: "SI #422296",
          rr_number: "12004",
          received_by: "Dennes Franza",
          ws_number: "134133",
          issued_to: "Marc",
          in: "",
          out: "5",
          balance_on_hand: "89",
          remarks: "",
        },
        {
          date: "Jan 18, 2024",
          invoice_number: "SI #422296",
          rr_number: "12004",
          received_by: "Dennes Franza",
          ws_number: "134139",
          issued_to: "Marc",
          in: "",
          out: "10",
          balance_on_hand: "79",
          remarks: "",
        },
        {
          date: "Jan 21, 2024",
          invoice_number: "SI #422296",
          rr_number: "12004",
          received_by: "Dennes Franza",
          ws_number: "134256",
          issued_to: "Marc",
          in: "",
          out: "5",
          balance_on_hand: "74",
          remarks: "",
        },
      ],
    };
  },
  components: {
    FormHeaderVue,
  },
});
</script>
