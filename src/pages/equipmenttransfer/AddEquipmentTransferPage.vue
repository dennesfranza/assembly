<template>
  <q-page class="q-pa-sm">
    <form-header-vue
      :headers="formHeader.headers"
      :name="`Create ${formHeader.name}`"
    />
    <div class="row items-center">
      <div class="col q-pa-sm">
        <q-select
          label="From"
          :options="locationstore.locationOptions"
          map-options
          emit-value
          v-model="createequipmenttransferitem.location_from"
        >
          <template v-slot:prepend>
            <q-icon name="map" color="black" />
          </template>
        </q-select>
      </div>
      <div class="col q-pa-sm">
        <q-select
          label="To"
          :options="locationstore.locationOptions"
          map-options
          emit-value
          v-model="createequipmenttransferitem.location_to"
        >
          <template v-slot:prepend>
            <q-icon name="map" color="black" />
          </template>
        </q-select>
      </div>
    </div>
    <div class="row items-center">
      <div class="col q-pa-sm">
        <q-input
          v-model="createequipmenttransferitem.tets_number"
          label="TETS Number"
        >
          <template v-slot:prepend>
            <q-icon name="123" color="black" />
          </template>
        </q-input>
      </div>
      <div class="col q-pa-sm">
        <q-input
          class="fit"
          v-model="createequipmenttransferitem.date"
          label="Date"
        >
          <template v-slot:prepend>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date
                  v-model="createequipmenttransferitem.date"
                  :mask="equipttransferstore.dateFormat"
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
        :separator="'vertical'"
        :columns="tablecreatecolumns"
        :rows="tablecreaterows"
        row-key="description_label"
        auto-width
        flat
        bordered
      >
        <template v-slot:top-right>
          <q-btn class="q-mr-sm" color="primary" icon="add" @click="equipttransferstore.openCreateDialog()">
            <q-tooltip class="bg-accent">Add Item</q-tooltip>
          </q-btn>
          <q-btn
            class="q-mr-sm"
            color="primary"
            icon="remove"
            @click="loginstore"
          >
            <q-tooltip class="bg-accent">Remove Item</q-tooltip>
          </q-btn>
          <q-btn class="q-mr-sm" color="primary" icon="restart_alt">
            <q-tooltip class="bg-accent">Reset</q-tooltip>
          </q-btn>
          <q-btn
            class="q-mr-sm"
            color="primary"
            :loading="loginstore"
            icon="save"
            @click="loginstore"
          >
            <q-tooltip class="bg-accent">Save</q-tooltip>
          </q-btn>
        </template>
      </q-table>
    </div>
    <div class="row items-center">
      <div class="col q-pa-sm">
        <q-select
          label="Prepared By"
          :options="loginstore.preparedByOptions"
          map-options
          emit-value
          v-model="createequipmenttransferitem.prepared_by"
        >
          <template v-slot:prepend>
            <q-icon name="fact_check" color="black" />
          </template>
        </q-select>
      </div>
    </div>
    <AddEquipmentTransferDialog />
  </q-page>
</template>

<script>
import { defineComponent, ref, getCurrentInstance, computed } from "vue";
import { useFormHeadersStore } from "src/stores/formheaders/index";
import { useLocationStore } from "src/stores/location/index";
import { useUserStore } from "src/stores/users/index";
import { useLoginStore } from "src/stores/login/index";
import { useEquipTransferSlipStore } from "src/stores/toolsequiptransferslip/index";
import FormHeaderVue from "src/components/forms/FormHeader.vue";
import AddEquipmentTransferDialog from "./AddEquipmentTransferDialog.vue";

export default defineComponent({
  name: "toolsequiptransferslip",
  setup() {
    const formheaders = useFormHeadersStore();
    const locationstore = useLocationStore();
    const userstore = useUserStore();
    const loginstore = useLoginStore();
    const equipttransferstore = useEquipTransferSlipStore();
    const formHeader = formheaders[getCurrentInstance().type.name];

    const createequipmenttransferitem = computed(
      () => equipttransferstore.createequipmenttransferitem
    );
    const tablecreatecolumns = computed(
      () => equipttransferstore.tablecreatecolumns
    );
    const tablecreaterows = computed(() => equipttransferstore.tablecreaterows);

    return {
      formheaders,
      locationstore,
      userstore,
      loginstore,
      equipttransferstore,
      formHeader,
      createequipmenttransferitem,
      tablecreatecolumns,
      tablecreaterows,
    };
  },
  components: {
    FormHeaderVue,
    AddEquipmentTransferDialog
  },
});
</script>
