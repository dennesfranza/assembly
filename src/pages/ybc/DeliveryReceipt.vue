<template>
  <q-page class="q-pa-sm">
    <form-header-vue :headers="formHeader.headers" :name="formHeader.name" />
    <div class="row items-center">
      <div class="col q-pa-sm">
        <q-input v-model="deliveredTo" label="Delivered To" />
      </div>
      <div class="col q-pa-sm">
        <q-input v-model="address" label="Address" />
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
        <q-input v-model="preparedBy" label="Prepared By" />
      </div>
      <div class="col q-pa-sm">
        <q-input v-model="deliveredBy" label="Delivered By">
          <template v-slot:prepend>
            <q-icon name="fact_check" color="green" />
          </template>
        </q-input>
      </div>
    </div>
    <div class="row q-pa-md">
      <div class="col q-pa-sm">
        <q-input
          label="Received the above goods in good order & condition"
          readonly
        />
      </div>
    </div>
    <div class="row q-pa-md">
      <div class="col q-pa-sm">
        <q-input v-model="receivedBy" label="Received By">
          <template v-slot:prepend>
            <q-icon name="fact_check" color="green" />
          </template>
        </q-input>
      </div>
      <div class="col q-pa-sm">
        <q-input v-model="notedBy" label="Noted By">
          <template v-slot:prepend>
            <q-icon name="fact_check" color="green" />
          </template>
        </q-input>
      </div>
    </div>
    <div class="row q-pa-md">
      <div class="col q-pa-sm">
        <q-input v-model="date" label="Date Received" />
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
  name: "deliveryreciept",
  setup() {
    const formheaders = useFormHeadersStore();
    const formHeader = formheaders[getCurrentInstance().type.name];

    return {
      formHeader,
      date: ref(date.formatDate(new Date(), "MMMM DD, YYYY HH:mm:ss")),
      deliveredTo: ref("134301"),
      address: ref("Centro, Mandaue City"),
      preparedBy: ref("Dennes Franza"),
      reportFrom: ref("Astra Project"),
      deliveredBy: ref("Marc Gino Osmeña"),
      receivedBy: ref("Ma. Christina Bedro"),
      notedBy: ref("Ferdinand Marcos"),
      dateFormat: "MMMM DD, YYYY HH:mm:ss",
      formattedDate: ref(date.formatDate(new Date(), "MMMM DD, YYYY HH:mm:ss")),
      columns: [
        {
          name: "rs_number",
          label: "RS Number",
          field: "rs_number",
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
          label: "Description",
          field: "description",
          align: "left",
        },
      ],
      rows: [
        {
          rs_number: "SI #42296",
          quantity: "2 DRUM",
          description: "Form Oil",
        },
        {
          rs_number: "SI #42296",
          quantity: "100 PCS",
          description: "Cutting Disk",
        },
        {
          rs_number: "SI #42296",
          quantity: "100 PCS",
          description: "Hacksaw Blade",
        },
        {
          rs_number: "SI #42296",
          quantity: "10 SHEETS",
          description: "Plywood 1/4 x 4 x 8",
        },
      ],
    };
  },
  components: {
    FormHeaderVue,
  },
});
</script>
