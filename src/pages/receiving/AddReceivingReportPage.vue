<template>
  <q-page class="q-pa-sm">
    <form-header-vue
      :headers="formHeader.headers"
      :name="`Create ${formHeader.name}`"
    />
    <div class="row items-center">
      <div class="col q-pa-sm">
        <q-input v-model="receivingpayload.rr_no" label="RR Number">
          <template v-slot:prepend>
            <q-icon name="123" color="black" />
          </template>
        </q-input>
      </div>
      <div class="col q-pa-sm">
        <q-select
          label="Report From"
          :options="locationstore.locationOptions"
          v-model="receivingpayload.report_from"
          map-options
          emit-value
        >
          <template v-slot:prepend>
            <q-icon name="map" color="black" />
          </template>
        </q-select>
      </div>
      <div class="col q-pa-sm">
        <q-input class="fit" v-model="receivingpayload.date" label="Date">
          <template v-slot:prepend>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date
                  v-model="receivingpayload.date"
                  :mask="receivingstore.dateFormat"
                  today-btn
                >
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
        title="Items List"
        row-key="item_number"
        :separator="'vertical'"
        :columns="receivingstore.tablecreatecolumns"
        :rows="receivingstore.tablecreaterows"
        auto-width
        flat
        bordered
      >
        <template v-slot:top-right>
          <q-btn
            class="q-mr-sm"
            color="primary"
            icon="add"
            @click="receivingstore.openAddReceivingItemDialog()"
          >
            <q-tooltip class="bg-accent">Add Item</q-tooltip>
          </q-btn>
          <q-btn
            class="q-mr-sm"
            color="primary"
            icon="groups"
            v-if="hasSelectedReportItems"
            @click="receivingstore.openAddSupplierDialog()"
          >
            <q-tooltip class="bg-accent">Add Supplier</q-tooltip>
          </q-btn>
          <q-btn
            class="q-mr-sm"
            color="primary"
            icon="description"
            v-if="hasSelectedReportItems"
            @click="receivingstore.openAddRemarksDialog()"
          >
            <q-tooltip class="bg-accent">Add Remarks</q-tooltip>
          </q-btn>
          <q-btn
            class="q-mr-sm"
            color="primary"
            icon="restart_alt"
            @click="receivingstore.reset()"
          >
            <q-tooltip class="bg-accent">Reset</q-tooltip>
          </q-btn>
          <q-btn
            class="q-mr-sm"
            color="primary"
            icon="save"
            :loading="postitemloading"
            @click="receivingstore.createReceivingReportItem()"
          >
            <q-tooltip class="bg-accent">Save</q-tooltip>
          </q-btn>
        </template>
      </q-table>
    </div>
    <div class="row items-center">
      <div class="col q-pa-sm">
        <q-select
          label="Requested By"
          :options="preparedByOptions"
          map-options
          emit-value
          v-model="receivingpayload.received_by"
        >
          <template v-slot:prepend>
            <q-icon name="fact_check" color="black" />
          </template>
        </q-select>
      </div>
    </div>
    <AddReceivingReportDialog />
    <AddSupplierDialog />
    <AddRemarksDialog />
  </q-page>
</template>

<script>
import { defineComponent, ref, getCurrentInstance, computed } from "vue";
import { useFormHeadersStore } from "src/stores/formheaders/index";
import { useLocationStore } from "src/stores/location/index";
import { useReceivingStore } from "src/stores/receiving/index";
import { useLoginStore } from "src/stores/login/index";
import FormHeaderVue from "src/components/forms/FormHeader.vue";
import AddReceivingReportDialog from "./AddReceivingReportDialog.vue";
import AddSupplierDialog from "./AddSupplierDialog.vue";
import AddRemarksDialog from "./AddRemarksDialog.vue";

export default defineComponent({
  name: "receivingreport",
  setup() {
    const formheaders = useFormHeadersStore();
    const formHeader = formheaders[getCurrentInstance().type.name];
    const locationstore = useLocationStore();
    const receivingstore = useReceivingStore();
    const loginstore = useLoginStore();
    const selected = computed({
      get: () => receivingstore.selected,
      set: (value) => (receivingstore.selected = value),
    });
    const receivingpayload = computed(() => receivingstore.receivingpayload);
    const preparedByOptions = computed(() => loginstore.preparedByOptions);
    const hasSelectedReportItems = computed(() => receivingstore.hasSelectedReportItems);
    const postitemloading = computed(() => receivingstore.postitemloading);

    return {
      formheaders,
      formHeader,
      locationstore,
      receivingstore,
      loginstore,
      selected,
      receivingpayload,
      preparedByOptions,
      hasSelectedReportItems,
      postitemloading,
    };
  },
  components: {
    FormHeaderVue,
    AddReceivingReportDialog,
    AddSupplierDialog,
    AddRemarksDialog,
  },
});
</script>
