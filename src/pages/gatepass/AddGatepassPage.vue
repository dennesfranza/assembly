<template>
  <q-page class="q-pa-sm">
    <form-header-vue
      :headers="formHeader.headers"
      :name="`Create ${formHeader.name}`"
    />
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
        :rows="createtablerows"
        :columns="createtablecolumn"
        row-key="item_number"
        :separator="'vertical'"
        auto-width
        flat
        bordered
      >
        <template v-slot:top-right>
          <q-btn
            class="q-mr-sm"
            color="primary"
            icon="add"
          >
            <q-tooltip class="bg-accent">Add Item</q-tooltip>
          </q-btn>
          <q-btn
            class="q-mr-sm"
            color="primary"
            icon="remove"
          >
            <q-tooltip class="bg-accent">Remove Item</q-tooltip>
          </q-btn>
          <q-btn
            class="q-mr-sm"
            color="primary"
            icon="restart_alt"
          >
            <q-tooltip class="bg-accent">Reset</q-tooltip>
          </q-btn>
          <q-btn
            class="q-mr-sm"
            color="primary"
            icon="save"
          >
            <q-tooltip class="bg-accent">Save</q-tooltip>
          </q-btn>
        </template>
      </q-table>
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
import { defineComponent, ref, getCurrentInstance, computed } from "vue";
import { useFormHeadersStore } from "src/stores/formheaders/index";
import { useLocationStore } from "src/stores/location/index";
import { useUserStore } from "src/stores/users/index";
import { useGatepassStore } from "src/stores/gatepass/index";
import FormHeaderVue from "src/components/forms/FormHeader.vue";

export default defineComponent({
  name: 'gatepass',
  setup() {
    const formheaders = useFormHeadersStore();
    const locationstore = useLocationStore();
    const userstore = useUserStore();
    const gatepassstore = useGatepassStore()
    const formHeader = formheaders[getCurrentInstance().type.name];
    const createtablecolumn = computed(() => gatepassstore.createtablecolumn)
    const createtablerows = computed(() => gatepassstore.createtablerows)

    return {
      formheaders,
      locationstore,
      userstore,
      gatepassstore,
      formHeader,
      createtablecolumn,
      createtablerows
    }
  },
  components: {
    FormHeaderVue
  }
})
</script>
