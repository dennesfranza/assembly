<template>
  <q-page class="q-pa-sm">
    <form-header-vue
      :headers="formHeader.headers"
      :name="formHeader.name"
    />
    <div class="row items-center">
      <div class="col q-pa-sm">
        <q-input v-model="wsNumber" label="WS Number" />
      </div>
      <div class="col q-pa-sm">
        <q-input v-model="department" label="Department" />
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
        <q-input v-model="requestedBy" label="Requested By" />
      </div>
      <div class="col q-pa-sm">
        <q-input v-model="notedBy" label="Noted By">
          <template v-slot:prepend>
            <q-icon name="fact_check" color="green" />
          </template>
        </q-input>
      </div>
      <div class="col q-pa-sm">
        <q-input v-model="issuedBy" label="Issued By">
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
  name: "withdrawalslip",
  setup() {
    const formheaders = useFormHeadersStore();
    const formHeader = formheaders[getCurrentInstance().type.name];

    return {
      formHeader,
      date: ref(date.formatDate(new Date(), "MMMM DD, YYYY HH:mm:ss")),
      wsNumber: ref("134301"),
      department: ref(""),
      requestedBy: ref("Dennes Franza"),
      reportFrom: ref("Astra Project"),
      notedBy: ref("Marc Gino Osmeña"),
      issuedBy: ref("Ma. Christina Bedro"),
      dateFormat: "MMMM DD, YYYY HH:mm:ss",
      formattedDate: ref(date.formatDate(new Date(), "MMMM DD, YYYY HH:mm:ss")),
      columns: [
        {
          name: "item",
          label: "Item/Description",
          field: "item",
          align: "left",
        },
        {
          name: "quantity",
          label: "Quantity",
          field: "quantity",
          align: "left",
        },
        { name: "purpose", label: "Purpose", field: "purpose", align: "left" },
      ],
      rows: [
        {
          item: "1 Form Oil",
          quantity: "2 DRUM",
          description: "Form Oil",
          invoice: "SI #42296",
          purpose: "Weld Power Tools Industrial",
        },
        {
          item: "2 Cutting Disk",
          quantity: "100 PCS",
          description: "Cutting Disk",
          invoice: "SI #42296",
          purpose: "Weld Power Tools Industrial",
        },
        {
          item: "3 Hacksaw Blade",
          quantity: "100 PCS",
          description: "Hacksaw Blade",
          invoice: "SI #42296",
          purpose: "Weld Power Tools Industrial",
        },
        {
          item: "4 Plywood 1/4 x 4 x 8",
          quantity: "10 SHEETS",
          description: "Plywood 1/4 x 4 x 8",
          invoice: "SI #42296",
          purpose: "Weld Power Tools Industrial",
        },
      ],
    };
  },
  components: {
    FormHeaderVue,
  },
});
</script>
