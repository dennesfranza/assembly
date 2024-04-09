<template>
  <q-page class="q-pa-sm">
    <form-header-vue :headers="formHeader.headers" :name="formHeader.name" />
    <div class="row items-center">
      <div class="col q-pa-sm">
        <q-input v-model="location" label="Location" readonly />
      </div>
      <div class="col q-pa-sm">
        <q-input class="fit" v-model="date" label="Inventory as Of">
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
        <q-input v-model="preparedBy" label="Prepared By" readonly />
      </div>
      <div class="col q-pa-sm">
        <q-input v-model="notedBy" label="Noted By" readonly>
          <template v-slot:prepend>
            <q-icon name="fact_check" color="orange" />
          </template>
        </q-input>
      </div>
      <div class="col q-pa-sm">
        <q-input v-model="checkedBy" label="Checked By" readonly>
          <template v-slot:prepend>
            <q-icon name="fact_check" color="orange" />
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
  name: "inventoryreport",
  setup() {
    const formheaders = useFormHeadersStore();
    const formHeader = formheaders[getCurrentInstance().type.name];

    return {
      formHeader,
      tetsNumber: ref("23413"),
      date: ref(date.formatDate(new Date(), "MMMM DD, YYYY")),
      location: ref("Umapad Mandaue City"),
      preparedBy: ref("Dennes Franza"),
      notedBy: ref("Marc Gino Osmeña"),
      checkedBy: ref("Ma. Christina Bedro"),
      dateFormat: "MMMM DD, YYYY",
      formattedDate: ref(date.formatDate(new Date(), "MMMM DD, YYYY")),
      columns: [
        {
          name: "parts_name",
          label: "Supply/Parts Name",
          field: "parts_name",
          align: "left",
        },
        {
          name: "beginning_balance",
          label: "Beginning Balance",
          field: "beginning_balance",
          align: "left",
        },
        {
          name: "total_in",
          label: "Total IN",
          field: "total_in",
          align: "left",
        },
        {
          name: "total_out",
          label: "Total OUT",
          field: "total_out",
          align: "left",
        },
        {
          name: "ending_balance",
          label: "Actual Ending Balance",
          field: "ending_balance",
          align: "left",
        },
        { name: "remarks", label: "Remarks", field: "remarks", align: "left" },
      ],
      rows: [
        {
          parts_name: "Form Oil",
          beginning_balance: "1",
          quantity: "2",
          total_in: "DRUM",
          total_out: "DRUM",
          ending_balance: "DRUM",
          remarks: "",
        },
        {
          parts_name: "Cutting Disk",
          beginning_balance: "2",
          quantity: "100",
          total_in: "PCS",
          total_out: "PCS",
          ending_balance: "PCS",
          remarks: "",
        },
        {
          parts_name: "Hacksaw Blade",
          beginning_balance: "3",
          quantity: "100",
          total_in: "PCS",
          total_out: "PCS",
          ending_balance: "PCS",
          remarks: "",
        },
        {
          parts_name: "Plywood 1/4 x 4 x 8",
          beginning_balance: "4",
          quantity: "10",
          total_in: "SHEETS",
          total_out: "SHEETS",
          ending_balance: "SHEETS",
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
