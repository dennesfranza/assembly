<template>
  <q-page class="q-pa-sm">
    <div class="row items-center">
      <div class="col items-center">
        <div class="row">
          <h2>Requisition Slip</h2>
        </div>
      </div>
      <q-separator vertical inset color="black" />
      <div class="col-2 q-pa-sm">
        <div class="row">
          <div class="col">
            <q-input
              v-model="documentNumber"
              label="Document Number"
              readonly
            />
          </div>
        </div>
        <div class="row">
          <div class="col">
            <q-input
              v-model="revisionNumber"
              label="Revision Number"
              readonly
            />
          </div>
        </div>
        <div class="row">
          <div class="col">
            <q-input v-model="effectiveDate" label="Effective Date" readonly />
          </div>
        </div>
      </div>
    </div>
    <div class="row items-center">
      <div class="col q-pa-sm">
        <q-input v-model="rsNumber" label="RS Number" readonly />
      </div>
      <div class="col q-pa-sm">
        <q-input v-model="dateRequested" label="Date Requested" readonly />
      </div>
      <div class="col q-pa-sm">
        <q-input class="fit" v-model="dateNeeded" label="Date Needed">
          <template v-slot:prepend>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date v-model="dateNeeded" :mask="dateFormat" today-btn>
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
        <q-input v-model="requestor" label="Requested By" readonly />
      </div>
      <div class="col q-pa-sm">
        <q-input v-model="approver" label="Approved By" readonly />
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useRequisitionStore } from "src/stores/requisition/index";
import { date } from "quasar";

const req = useRequisitionStore();
console.log(req.rsNumber);

req.rsNumber = "92844";
console.log(req.rsNumber);

console.log(req.prototype);

req.addItemInRequisition({
  number: "1232",
  quantity: "q",
  unit: "Dr",
  description: "asdfqergwergw",
  purpose: "sddddd",
});

export default defineComponent({
  setup() {
    return {
      documentNumber: ref("FM-PUR-01"),
      revisionNumber: ref("0"),
      effectiveDate: ref("01-Dec-12"),
      dateRequested: ref(date.formatDate(new Date(), "MMMM DD, YYYY HH:mm:ss")),
      dateNeeded: ref(date.formatDate(new Date(), "MMMM DD, YYYY HH:mm:ss")),
      rsNumber: ref("7901"),
      requestor: ref("Dennes Franza"),
      approver: ref("Marc Gino Osmeña"),
      date: ref(""),
      dateFormat: "MMMM DD, YYYY HH:mm:ss",
      formattedDate: ref(date.formatDate(new Date(), "MMMM DD, YYYY HH:mm:ss")),
      columns: [
        {
          name: "item_number",
          label: "Item No",
          field: "item_number",
          align: "left",
        },
        {
          name: "quantity",
          label: "Quantity",
          field: "quantity",
          align: "left",
        },
        { name: "unit", label: "Unit", field: "unit", align: "left" },
        {
          name: "item_description",
          label: "Item Description",
          field: "item_description",
          align: "left",
        },
        { name: "purpose", label: "Purpose", field: "purpose", align: "left" },
      ],
      rows: [
        {
          item_number: "1",
          quantity: "2",
          unit: "DRUM",
          item_description: "Form Oil",
          purpose: "",
        },
        {
          item_number: "2",
          quantity: "100",
          unit: "PCS",
          item_description: "Cutting Disk",
          purpose: "",
        },
        {
          item_number: "3",
          quantity: "100",
          unit: "PCS",
          item_description: "Hacksaw Blade",
          purpose: "",
        },
        {
          item_number: "4",
          quantity: "10",
          unit: "SHEETS",
          item_description: "Plywood 1/4 x 4 x 8",
          purpose: "",
        },
      ],
    };
  },
});
</script>
