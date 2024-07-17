<template>
  <q-page class="q-pa-sm">
    <form-header-vue
      :headers="formHeader.headers"
      :name="`Create ${formHeader.name}`"
    />
    <div class="row items-center">
      <div class="col q-pa-sm">
        <q-input v-model="createwithdrawalitem.ws_number" label="WS Number">
          <template v-slot:prepend>
            <q-icon name="123" color="black" />
          </template>
        </q-input>
      </div>
      <div class="col q-pa-sm">
        <q-select
          label="Location"
          :options="locationstore.locationOptions"
          v-model="createwithdrawalitem.location"
          map-options
          emit-value
        >
          <template v-slot:prepend>
            <q-icon name="map" color="black" />
          </template>
        </q-select>
      </div>
      <div class="col q-pa-sm">
        <q-input class="fit" v-model="createwithdrawalitem.date" label="Date">
          <template v-slot:prepend>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date
                  v-model="createwithdrawalitem.date"
                  :mask="withdrawalstore.dateFormat"
                  today-btn
                >
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
        title="Items List"
        :columns="withdrawalstore.tablecreatecolumns"
        :rows="withdrawalstore.createwithdrawalitem.withdrawal_slip_items"
        selection="single"
        v-model:selected="selected"
        row-key="description"
        :separator="'vertical'"
        auto-width
        flat
        bordered
      >
        <template v-slot:top-right>
          <q-btn
            class="q-mr-sm"
            color="primary"
            :disable="loading"
            icon="add"
            @click="withdrawalstore.openAddWithdrawalSlipDialog()"
          >
            <q-tooltip class="bg-accent">Add Item</q-tooltip>
          </q-btn>
          <q-btn
            class="q-mr-sm"
            color="primary"
            :disable="selected.length == 0"
            icon="remove"
            @click="onClickRemoveItem"
          >
            <q-tooltip class="bg-accent">Remove Item</q-tooltip>
          </q-btn>
          <q-btn
            class="q-mr-sm"
            color="primary"
            :disable="loading"
            icon="restart_alt"
          >
            <q-tooltip class="bg-accent">Reset</q-tooltip>
          </q-btn>
          <q-btn
            class="q-mr-sm"
            color="primary"
            icon="save"
            :disable="createwithdrawalitem.withdrawal_slip_items.length === 0"
            :loading="postwithdrawalslipitemloading"
            @click="withdrawalstore.postWithdrawalItem(createwithdrawalitem)"
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
          :options="loginstore.preparedByOptions"
          map-options
          emit-value
          v-model="createwithdrawalitem.requested_by"
        >
          <template v-slot:prepend>
            <q-icon name="fact_check" color="black" />
          </template>
        </q-select>
      </div>
      <div class="col q-pa-sm">
        <q-select
          label="Noted By"
          :options="userstore.supervisorOptions"
          map-options
          emit-value
          v-model="createwithdrawalitem.noted_by"
        >
          <template v-slot:prepend>
            <q-icon name="fact_check" color="black" />
          </template>
        </q-select>
      </div>
      <div class="col q-pa-sm">
        <q-select
          label="Issued By"
          :options="userstore.supervisorOptions"
          map-options
          emit-value
          v-model="createwithdrawalitem.issued_by"
        >
          <template v-slot:prepend>
            <q-icon name="fact_check" color="black" />
          </template>
        </q-select>
      </div>
    </div>
    <AddWithdrawalSlipDialog />
  </q-page>
</template>

<script>
import { defineComponent, ref, getCurrentInstance, computed } from "vue";
import { useFormHeadersStore } from "src/stores/formheaders/index";
import { useWithdrawalStore } from "src/stores/withdrawal/index";
import { useLocationStore } from "src/stores/location/index";
import { useLoginStore } from "src/stores/login/index";
import { useUserStore } from "src/stores/users/index";
import FormHeaderVue from "src/components/forms/FormHeader.vue";
import AddWithdrawalSlipDialog from "./AddWithdrawalSlipDialog.vue";

export default defineComponent({
  name: "withdrawalslip",
  setup() {
    const formheaders = useFormHeadersStore();
    const formHeader = formheaders[getCurrentInstance().type.name];
    const withdrawalstore = useWithdrawalStore();
    const locationstore = useLocationStore();
    const loginstore = useLoginStore();
    const userstore = useUserStore();
    const createwithdrawalitem = computed(
      () => withdrawalstore.createwithdrawalitem
    );
    const postwithdrawalslipitemloading = computed(
      () => withdrawalstore.postwithdrawalslipitemloading
    );

    return {
      formheaders,
      formHeader,
      withdrawalstore,
      locationstore,
      loginstore,
      userstore,
      createwithdrawalitem,
      postwithdrawalslipitemloading,
      selected: ref([]),
    };
  },
  methods: {
    onClickRemoveItem() {
      this.withdrawalstore.removeWithdrawalItem(this.selected[0])
      this.selected = []
    }
  },
  components: {
    FormHeaderVue,
    AddWithdrawalSlipDialog,
  },
});
</script>
