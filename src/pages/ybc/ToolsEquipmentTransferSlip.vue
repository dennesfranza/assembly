<template>
  <q-page class="q-pa-sm">
    <form-header-vue :headers="formHeader.headers" :name="formHeader.name" />
    <div class="row items-center">
      <div class="col q-pa-sm">
        <q-input
          v-model="projectAssignment"
          label="Project Assignment"
          readonly
        />
      </div>
      <div class="col q-pa-sm">
        <q-input v-model="tetsNumber" label="TETS Number" readonly />
      </div>
    </div>
    <div class="row items-center">
      <div class="col q-pa-sm">
        <q-input v-model="location" label="Location" readonly />
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
        <q-input v-model="preparedBy" label="Prepared By" readonly />
      </div>
      <div class="col q-pa-sm">
        <q-input v-model="notedBy" label="Noted By" readonly>
          <template v-slot:prepend>
            <q-icon name="fact_check" color="orange" />
          </template>
        </q-input>
      </div>
    </div>
    <div class="row q-pa-md">
      <div class="col q-pa-sm">
        <q-input v-model="notedBy" label="Deliverd By" readonly>
          <template v-slot:prepend>
            <q-icon name="fact_check" color="orange" />
          </template>
        </q-input>
      </div>
      <div class="col q-pa-sm">
        <q-input v-model="notedBy" label="Received By" readonly>
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
  name: "toolsequiptransferslip",
  setup() {
    const formheaders = useFormHeadersStore();
    const formHeader = formheaders[getCurrentInstance().type.name];

    return {
      formHeader,
      tetsNumber: ref('23413'),
      date: ref(date.formatDate(new Date(), "MMMM DD, YYYY HH:mm:ss")),
      projectAssignment: ref("7901"),
      location: ref("Umapad Mandaue City"),
      preparedBy: ref("Dennes Franza"),
      notedBy: ref("Marc Gino Osmeña"),
      dateFormat: "MMMM DD, YYYY HH:mm:ss",
      formattedDate: ref(date.formatDate(new Date(), "MMMM DD, YYYY HH:mm:ss")),
      columns: [
        {
          name: "item",
          label: "Item No",
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
          name: "item_description",
          label: "Item Description",
          field: "item_description",
          align: "left",
        },
        { name: "id", label: "ID", field: "id", align: "left" },
        {
          name: "rs_number",
          label: "RS Number",
          field: "rs_number",
          align: "left",
        },
        { name: "return", label: "Return", field: "return", align: "left" },
        { name: "remarks", label: "Remarks", field: "remarks", align: "left" },
      ],
      rows: [
        {
          item: "1",
          quantity: "2",
          item_description: "Form Oil",
          id: "DRUM",
          rs_number: "DRUM",
          return: "DRUM",
          remarks: "",
        },
        {
          item: "2",
          quantity: "100",
          item_description: "Cutting Disk",
          id: "PCS",
          rs_number: "PCS",
          return: "PCS",
          remarks: "",
        },
        {
          item: "3",
          quantity: "100",
          item_description: "Hacksaw Blade",
          id: "PCS",
          rs_number: "PCS",
          return: "PCS",
          remarks: "",
        },
        {
          item: "4",
          quantity: "10",
          item_description: "Plywood 1/4 x 4 x 8",
          id: "SHEETS",
          rs_number: "SHEETS",
          return: "SHEETS",
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
