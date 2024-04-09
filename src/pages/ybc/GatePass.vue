<template>
  <q-page class="q-pa-sm">
    <form-header-vue :headers="formHeader.headers" :name="formHeader.name" />
    <div class="row items-center">
      <div class="col q-pa-sm">
        <q-input v-model="gpNumber" label="Gate Pass Number" />
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
    <div class="row items-center">
      <div class="col q-pa-sm">
        <q-input v-model="personAllowed" label="Please Allow Mr/Mrs" />
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
        <q-input v-model="purposeOfVisit" label="Purpose" />
      </div>
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
        <q-input
          v-model="checkedBy"
          label="Checked By: Security Guard"
          readonly
        >
          <template v-slot:prepend>
            <q-icon name="fact_check" color="orange" />
          </template>
        </q-input>
      </div>
      <div class="col q-pa-sm">
        <q-input class="fit" v-model="date" label="Date & Time IN">
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
      <div class="col q-pa-sm">
        <q-input class="fit" v-model="date" label="Date & Time Out">
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
    <div class="row q-pa-md">
      <div class="col q-pa-sm">
        <q-input v-model="remarks" label="Remarks" />
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
  name: "gatepass",
  setup() {
    const formheaders = useFormHeadersStore();
    const formHeader = formheaders[getCurrentInstance().type.name];

    return {
      formHeader,
      gpNumber: ref("9980"),
      date: ref(date.formatDate(new Date(), "MMMM DD, YYYY HH:mm:ss")),
      location: ref("Umapad Mandaue City"),
      preparedBy: ref("Dennes Franza"),
      notedBy: ref("Marc Gino Osmeña"),
      checkedBy: ref("Ma. Christina Bedro"),
      personAllowed: ref("Fidel Ramos"),
      purposeOfVisit: ref(""),
      remarks: ref(""),
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
          name: "item_description",
          label: "Item Description",
          field: "item_description",
          align: "left",
        },
        { name: "remarks", label: "Remarks", field: "remarks", align: "left" },
      ],
      rows: [
        {
          item: "Form Oil",
          item_description: "1",
          remarks: "",
        },
        {
          item: "Cutting Disk",
          item_description: "2",
          remarks: "",
        },
        {
          item: "Hacksaw Blade",
          item_description: "3",
          remarks: "",
        },
        {
          item: "Plywood 1/4 x 4 x 8",
          item_description: "4",
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
