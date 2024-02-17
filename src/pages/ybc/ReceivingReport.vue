<template>
  <q-page class="q-pa-sm">
    <form-header-vue
      :headers="formHeader.headers"
      :name="formHeader.name"
    />
    <div class="row items-center">
      <div class="col q-pa-sm">
        <q-input v-model="rrNumber" label="RR Number" readonly />
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
        row-key="item_number"
        :separator="'vertical'"
        auto-width
        flat
        bordered
      />
    </div>
    <div class="row q-pa-md">
      <div class="col q-pa-sm">
        <q-input v-model="received" label="Received By" readonly />
      </div>
      <div class="col q-pa-sm">
        <q-input v-model="confirmedBy" label="Confirmed By" readonly>
          <template v-slot:prepend>
            <q-icon name="fact_check" color="green" />
          </template>
        </q-input>
      </div>
    </div>
    <div class="row q-pa-md">
      <div class="col q-pa-sm">
        <q-input v-model="reportFrom" label="Report From" readonly />
      </div>
      <div class="col q-pa-sm">
        <q-input v-model="verifiedBy" label="Verified By (Purchasing)" readonly>
          <template v-slot:prepend>
            <q-icon name="fact_check" color="green" />
          </template>
        </q-input>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, getCurrentInstance } from "vue";
import { useFormHeadersStore } from "src/stores/formheaders/index";
import FormHeaderVue from "src/components/forms/FormHeader.vue";
import { date } from "quasar";

export default defineComponent({
  name: "receivingreport",
  setup() {
    const formheaders = useFormHeadersStore();
    const formHeader = formheaders[getCurrentInstance().type.name];

    return {
      formHeader,
      dateRequested: ref(date.formatDate(new Date(), "MMMM DD, YYYY HH:mm:ss")),
      date: ref(date.formatDate(new Date(), "MMMM DD, YYYY HH:mm:ss")),
      rrNumber: ref("10204"),
      received: ref("Dennes Franza"),
      reportFrom: ref("Astra Project"),
      confirmedBy: ref("Marc Gino Osmeña"),
      verifiedBy: ref("Ma. Christina Bedro"),
      dateFormat: "MMMM DD, YYYY HH:mm:ss",
      formattedDate: ref(date.formatDate(new Date(), "MMMM DD, YYYY HH:mm:ss")),
      columns: [
        {
          name: "item",
          label: "Item",
          field: "item",
          align: "left",
        },
        {
          name: "quantity",
          label: "Quantity",
          field: "quantity",
          align: "left",
        },
        {
          name: "description",
          label: "Item Description",
          field: "description",
          align: "left",
        },
        {
          name: "invoice",
          label: "Invoice/DR No",
          field: "invoice",
          align: "left",
        },
        {
          name: "supplier",
          label: "Supplier",
          field: "supplier",
          align: "left",
        },
        { name: "remarks", label: "Remarks", field: "remarks", align: "left" },
      ],
      rows: [
        {
          item: "1",
          quantity: "2 DRUM",
          description: "Form Oil",
          invoice: "SI #42296",
          supplier: "Weld Power Tools Industrial",
          remarks: "",
        },
        {
          item: "2",
          quantity: "100 PCS",
          description: "Cutting Disk",
          invoice: "SI #42296",
          supplier: "Weld Power Tools Industrial",
          remarks: "",
        },
        {
          item: "3",
          quantity: "100 PCS",
          description: "Hacksaw Blade",
          invoice: "SI #42296",
          supplier: "Weld Power Tools Industrial",
          remarks: "",
        },
        {
          item: "4",
          quantity: "10 SHEETS",
          description: "Plywood 1/4 x 4 x 8",
          invoice: "SI #42296",
          supplier: "Weld Power Tools Industrial",
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
