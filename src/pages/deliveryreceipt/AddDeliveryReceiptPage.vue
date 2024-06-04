<template>
  <q-page class="q-pa-sm">
    <form-header-vue
      :headers="formHeader.headers"
      :name="`Create ${formHeader.name}`"
    />
    {{ deliveryreceiptpayload }}
    <div class="row items-center">
      <div class="col q-pa-sm">
        <q-input
          v-model="deliveryreceiptpayload.delivered_to"
          label="Delivered To"
        >
          <template v-slot:prepend>
            <q-icon name="123" color="black" />
          </template>
        </q-input>
      </div>
      <div class="col q-pa-sm">
        <q-select
          label="Address"
          :options="locationstore.locationOptions"
          map-options
          emit-value
          v-model="deliveryreceiptpayload.address"
        >
          <template v-slot:prepend>
            <q-icon name="map" color="black" />
          </template>
        </q-select>
      </div>
      <div class="col q-pa-sm">
        <q-input class="fit" v-model="deliveryreceiptpayload.date" label="Date">
          <template v-slot:prepend>
            <q-icon name="event" class="cursor-pointer" color="black">
              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date
                  v-model="deliveryreceiptpayload.date"
                  :mask="deliverystore.dateFormat"
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
        :rows="deliveryreceiptpayload.delivery_receipt_items"
        :columns="tablecreatecolumns"
        selection="single"
        v-model:selected="selected"
        row-key="item_number"
        :separator="'vertical'"
        auto-width
        flat
        bordered
      >
        <template v-slot:top-right>
          <q-btn class="q-mr-sm" color="primary" :disable="loading" icon="add" @click="deliverystore.openAddDeliveryDialog()">
            <q-tooltip class="bg-accent">Add Item</q-tooltip>
          </q-btn>
          <q-btn
            class="q-mr-sm"
            color="primary"
            :disable="loading"
            icon="remove"
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
            :loading="deliverystore.postdeliveryreceiptitemloading"
            icon="save"
            @click="deliverystore.postItem()"
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
          :options="preparedByOptions"
          map-options
          emit-value
          v-model="deliveryreceiptpayload.prepared_by"
        >
          <template v-slot:prepend>
            <q-icon name="fact_check" color="green" />
          </template>
        </q-select>
      </div>
      <div class="col q-pa-sm">
        <q-select label="Received By" :options="usersOptions" map-options emit-value v-model="deliveryreceiptpayload.delivered_by">
          <template v-slot:prepend>
            <q-icon name="fact_check" color="green" />
          </template>
        </q-select>
      </div>
    </div>
    <div class="row items-center">
      <div class="col q-pa-sm">
        <q-input
          label="Received the above goods in good order & condition"
          readonly
        />
      </div>
    </div>
    <div class="row items-center">
      <div class="col q-pa-sm">
        <q-select label="Received By" :options="usersOptions" map-options emit-value v-model="deliveryreceiptpayload.received_by">
          <template v-slot:prepend>
            <q-icon name="fact_check" color="green" />
          </template>
        </q-select>
      </div>
      <div class="col q-pa-sm">
        <q-select label="Noted By" :options="usersOptions" map-options emit-value v-model="deliveryreceiptpayload.noted_by">
          <template v-slot:prepend>
            <q-icon name="fact_check" color="green" />
          </template>
        </q-select>
      </div>
    </div>
    <div class="row items-center">
      <q-input
        class="fit"
        v-model="deliveryreceiptpayload.received_date"
        label="Received Date"
      >
        <template v-slot:prepend>
          <q-icon name="event" class="cursor-pointer" color="black">
            <q-popup-proxy
              cover
              transition-show="scale"
              transition-hide="scale"
            >
              <q-date
                v-model="deliveryreceiptpayload.received_date"
                :mask="deliverystore.dateFormat"
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
    <AddDeliveryReceiptDialog />
  </q-page>
</template>

<script>
import { defineComponent, ref, getCurrentInstance, computed } from "vue";
import { useFormHeadersStore } from "src/stores/formheaders/index";
import { useDeliveryReceiptStore } from "src/stores/deliveryreceipt/index";
import { useLocationStore } from "src/stores/location/index";
import { useUserStore } from "src/stores/users/index";
import { useLoginStore } from "src/stores/login/index";
import FormHeaderVue from "src/components/forms/FormHeader.vue";
import AddDeliveryReceiptDialog from './AddDeliveryReceiptDialog.vue'

export default defineComponent({
  name: "deliveryreciept",
  setup() {
    const formheaders = useFormHeadersStore();
    const formHeader = formheaders[getCurrentInstance().type.name];
    const deliverystore = useDeliveryReceiptStore();
    const locationstore = useLocationStore();
    const userstore = useUserStore();
    const loginstore = useLoginStore();
    const deliveryreceiptpayload = computed(
      () => deliverystore.deliveryreceiptpayload
    );
    const tablecreatecolumns = computed(() => deliverystore.tablecreatecolumns);
    const preparedByOptions = computed(() => loginstore.preparedByOptions);
    const approverOptions = computed(() => userstore.approverOptions);
    const usersOptions = computed(() => userstore.usersOptions);


    return {
      formheaders,
      formHeader,
      deliverystore,
      locationstore,
      userstore,
      loginstore,
      selected: ref([]),
      deliveryreceiptpayload,
      tablecreatecolumns,
      preparedByOptions,
      approverOptions,
      usersOptions,
    };
  },
  components: {
    FormHeaderVue,
    AddDeliveryReceiptDialog
  },
});
</script>
