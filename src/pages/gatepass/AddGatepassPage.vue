<template>
  <q-page class="q-pa-sm">
    <form-header-vue
      :headers="formHeader.headers"
      :name="`Create ${formHeader.name}`"
    />
    <div class="row items-center">
      <div class="col q-pa-sm">
        <q-input v-model="gatepasscreateitem.gp_number" label="Gate Pass Number">
          <template v-slot:prepend>
            <q-icon name="123" color="black" />
          </template>
        </q-input>
      </div>
      <div class="col q-pa-sm">
        <q-input v-model="gatepasscreateitem.please_allow" label="Please Allow Mr/Mrs">
          <template v-slot:prepend>
            <q-icon name="person" color="black" />
          </template>
        </q-input>
      </div>
      <div class="col q-pa-sm">
        <q-select
          label="Location"
          :options="locationstore.locationOptions"
          map-options
          emit-value
          v-model="gatepasscreateitem.location"
        >
          <template v-slot:prepend>
            <q-icon name="map" color="black" />
          </template>
        </q-select>
      </div>
      <div class="col q-pa-sm">
        <q-input class="fit" v-model="gatepasscreateitem.date" label="Date">
          <template v-slot:prepend>
            <q-icon name="event" class="cursor-pointer" color="black">
              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date v-model="gatepasscreateitem.date" :mask="gatepassstore.dateFormat" today-btn>
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="black" flat />
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
        :rows="gatepasscreateitem.gate_pass_items"
        :columns="createtablecolumn"
        row-key="item_number"
        :separator="'vertical'"
        auto-width
        flat
        bordered
      >
        <template v-slot:top-right>
          <q-btn class="q-mr-sm" color="primary" icon="add" @click="gatepassstore.openAddGatepassDialog()">
            <q-tooltip class="bg-accent">Add Item</q-tooltip>
          </q-btn>
          <q-btn class="q-mr-sm" color="primary" icon="remove">
            <q-tooltip class="bg-accent">Remove Item</q-tooltip>
          </q-btn>
          <q-btn class="q-mr-sm" color="primary" icon="restart_alt" @click="gatepassstore.reset()">
            <q-tooltip class="bg-accent">Reset</q-tooltip>
          </q-btn>
          <q-btn class="q-mr-sm" color="primary" icon="save">
            <q-tooltip class="bg-accent">Save</q-tooltip>
          </q-btn>
        </template>
      </q-table>
    </div>
    <div class="row items-center">
      <div class="col q-pa-sm">
        <q-input v-model="gatepasscreateitem.purpose" label="Purpose">
          <template v-slot:prepend>
            <q-icon name="badge" color="black" />
          </template>
        </q-input>
      </div>
      <div class="col q-pa-sm">
        <q-input v-model="gatepasscreateitem.remarks" label="Remarks">
          <template v-slot:prepend>
            <q-icon name="description" color="black" />
          </template>
        </q-input>
      </div>
    </div>
    <div class="row items-center">
      <div class="col q-pa-sm">
        <q-select
          label="Prepared By"
          :options="preparedByOptions"
          map-options
          emit-value
          v-model="gatepasscreateitem.prepared_by"
        >
          <template v-slot:prepend>
            <q-icon name="fact_check" color="black" />
          </template>
        </q-select>
      </div>
    </div>
    <AddGatepassDialog />
  </q-page>
</template>

<script>
import { defineComponent, ref, getCurrentInstance, computed } from "vue";
import { useFormHeadersStore } from "src/stores/formheaders/index";
import { useLocationStore } from "src/stores/location/index";
import { useUserStore } from "src/stores/users/index";
import { useGatepassStore } from "src/stores/gatepass/index";
import { useLoginStore } from "src/stores/login/index";
import FormHeaderVue from "src/components/forms/FormHeader.vue";
import AddGatepassDialog from "./AddGatepassDialog.vue";

export default defineComponent({
  name: "gatepass",
  setup() {
    const formheaders = useFormHeadersStore();
    const locationstore = useLocationStore();
    const userstore = useUserStore();
    const gatepassstore = useGatepassStore();
    const loginstore = useLoginStore();
    const formHeader = formheaders[getCurrentInstance().type.name];
    const createtablecolumn = computed(() => gatepassstore.createtablecolumn);
    const createtablerows = computed(() => gatepassstore.createtablerows);
    const preparedByOptions = computed(() => loginstore.preparedByOptions);
    const gatepasscreateitem = computed(() => gatepassstore.gatepasscreateitem)

    return {
      formheaders,
      locationstore,
      userstore,
      gatepassstore,
      loginstore,
      formHeader,
      createtablecolumn,
      createtablerows,
      preparedByOptions,
      gatepasscreateitem
    };
  },
  components: {
    FormHeaderVue,
    AddGatepassDialog
  },
});
</script>
