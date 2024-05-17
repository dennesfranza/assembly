<template>
  <q-page class="q-pa-sm">
    <form-header-vue :headers="formHeader.headers" :name="`Create ${formHeader.name}`" />
    {{ requisitionRequestItem }}
    <div class="row items-center">
      <div class="col q-pa-sm">
        <q-input v-model="requisitionRequestItem.rs_number" label="RS Number">
          <template v-slot:prepend>
            <q-icon name="123" color="black" />
          </template>
        </q-input>
      </div>
      <div class="col q-pa-sm">
        <q-select label="Location" :options="locationstore.locationOptions" map-options emit-value v-model="requisitionRequestItem.location">
          <template v-slot:prepend>
            <q-icon name="map" color="black" />
          </template>
        </q-select>
      </div>
      <div class="col q-pa-sm">
        <q-input v-model="requisitionRequestItem.date_requested" label="Date Requested">
          <template v-slot:prepend>
            <q-icon name="event" class="cursor-pointer" color="black">
              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date v-model="requisitionRequestItem.date_requested" :mask="requeststore.dateFormat" today-btn>
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
        <q-input class="fit" v-model="requisitionRequestItem.date_needed" label="Date Needed">
          <template v-slot:prepend>
            <q-icon name="event" class="cursor-pointer" color="black">
              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date v-model="requisitionRequestItem.date_needed" :mask="requeststore.dateFormat" today-btn>
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
        :rows="requeststore.createrequisitionrequest.requisition_request_items"
        :columns="requeststore.tablecreatecolumns"
        selection="single"
        v-model:selected="selected"
        row-key="item_number"
        :separator="'vertical'"
        auto-width
        flat
        bordered
      >
        <template v-slot:top-right>
          <q-btn class="q-mr-sm" color="primary" :disable="loading" icon="add" @click="requeststore.openAddRequisitionDialog()">
            <q-tooltip class="bg-accent">Add Item</q-tooltip>
          </q-btn>
          <q-btn class="q-mr-sm" color="primary" :disable="loading" icon="remove" @click="requeststore.removeRequesItem(selected[0])">
            <q-tooltip class="bg-accent">Remove Item</q-tooltip>
          </q-btn>
          <q-btn class="q-mr-sm" color="primary" :disable="loading" icon="restart_alt">
            <q-tooltip class="bg-accent">Reset</q-tooltip>
          </q-btn>
          <q-btn class="q-mr-sm" color="primary" :disable="loading" icon="save">
            <q-tooltip class="bg-accent">Save</q-tooltip>
          </q-btn>
        </template>
      </q-table>
    </div>
    <AddRequisitionDialog />
  </q-page>
</template>

<script>
import { defineComponent, ref, getCurrentInstance, computed } from "vue";
import { useFormHeadersStore } from "src/stores/formheaders/index";
import { useLocationStore } from "src/stores/location/index";
import { useUserStore } from "src/stores/users/index";
import { useRequisitionStore } from "src/stores/requisition/index";
import FormHeaderVue from "src/components/forms/FormHeader.vue";
import AddRequisitionDialog from "./AddRequisitionDialog.vue";
import { date } from "quasar";

export default defineComponent({
  name: 'requisitionslip',
  setup() {
    const formheaders = useFormHeadersStore();
    const locationstore = useLocationStore();
    const userstore = useUserStore();
    const requeststore = useRequisitionStore()
    const formHeader = formheaders[getCurrentInstance().type.name];

    const requisitionRequestItem = computed(() => requeststore.createrequisitionrequest)
    const dateNeeded = computed(() => requeststore.dateNeeded)

    return {
      formheaders,
      formHeader,
      locationstore,
      userstore,
      requeststore,
      requisitionRequestItem,
      dateNeeded,
      selected: ref([])
    }
  },
  components: {
    FormHeaderVue,
    AddRequisitionDialog
  }
})
</script>
