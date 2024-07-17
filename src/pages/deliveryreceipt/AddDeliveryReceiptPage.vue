<template>
  <q-page class="q-pa-sm">
    <form-header-vue
      :headers="formHeader.headers"
      :name="`Create ${formHeader.name}`"
    />
    <div class="row items-center">
      <div class="col q-pa-sm">
        <q-input
          v-model="deliveryreceiptpayload.invoice_number"
          label="Delivery Receipt/Invoice Number"
        >
          <template v-slot:prepend>
            <q-icon name="123" color="black" />
          </template>
        </q-input>
      </div>
      <div class="col q-pa-sm">
        <q-select
          label="Delivered To"
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
        loading-label="Gimme a sec and I'll fetch ya data!"
        :rows="deliveryreceiptpayload.delivery_receipt_items"
        :columns="tablecreatecolumns"
        selection="single"
        v-model:selected="selected"
        row-key="description_label"
        :separator="'vertical'"
        auto-width
        flat
        bordered
      >
        <template v-slot:top-right>
          <!-- <q-input class="q-mr-sm" dense debounce="500" v-model="indextablefilter" placeholder="Search RS Number" outlined>
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input> -->
          <!-- <q-select
            use-input
            hide-selected
            outlined
            fill-input
            map-options
            emit-value
            input-debounce="0"
            class="q-mr-sm" dense debounce="500"
            v-model="delivery_receipt_item.rs_number"
            label="RS Number"
            :options="requisitionstore.rsNumberOptions"
            :loading="requisitionsearchrsnumberloading"
            @filter="filterRsNumber"
            @update:model-value="updateRsNumberModel"
          >
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey">
                  No results
                </q-item-section>
              </q-item>
            </template>
            <template v-slot:prepend>
              <q-icon name="title" />
            </template>
          </q-select> -->
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
            <q-icon name="fact_check" color="black" />
          </template>
        </q-select>
      </div>
      <div class="col q-pa-sm">
        <q-input
          label="Delivered By"
          v-model="deliveryreceiptpayload.delivered_by"
        >
          <template v-slot:prepend>
            <q-icon name="fact_check" color="black" />
          </template>
        </q-input>
        <!-- <q-select label="Delivered By" :options="usersOptions" map-options emit-value v-model="deliveryreceiptpayload.delivered_by">
          <template v-slot:prepend>
            <q-icon name="fact_check" color="black" />
          </template>
        </q-select> -->
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
            <q-icon name="fact_check" color="black" />
          </template>
        </q-select>
      </div>
      <div class="col q-pa-sm">
        <q-select label="Noted By" :options="usersOptions" map-options emit-value v-model="deliveryreceiptpayload.noted_by">
          <template v-slot:prepend>
            <q-icon name="fact_check" color="black" />
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
import { useRequisitionStore } from "src/stores/requisition/index";
import FormHeaderVue from "src/components/forms/FormHeader.vue";
import AddDeliveryReceiptDialog from './AddDeliveryReceiptDialog.vue'

export default defineComponent({
  name: "deliveryreciept",
  setup() {
    const formheaders = useFormHeadersStore();
    const formHeader = formheaders[getCurrentInstance().type.name];
    const deliverystore = useDeliveryReceiptStore();
    const locationstore = useLocationStore();
    const requisitionstore = useRequisitionStore();
    const userstore = useUserStore();
    const loginstore = useLoginStore();
    const deliveryreceiptpayload = computed(
      () => deliverystore.deliveryreceiptpayload
    );
    const tablecreatecolumns = computed(() => deliverystore.tablecreatecolumns);
    const preparedByOptions = computed(() => loginstore.preparedByOptions);
    const approverOptions = computed(() => userstore.approverOptions);
    const usersOptions = computed(() => userstore.usersOptions);
    const delivery_receipt_item = computed(() => deliverystore.delivery_receipt_item)
    const requisitionsearchrsnumberloading = computed(() => requisitionstore.requisitionsearchrsnumberloading)

    return {
      formheaders,
      formHeader,
      deliverystore,
      locationstore,
      requisitionstore,
      userstore,
      loginstore,
      deliveryreceiptpayload,
      tablecreatecolumns,
      preparedByOptions,
      approverOptions,
      usersOptions,
      delivery_receipt_item,
      requisitionsearchrsnumberloading,
      selected: ref([]),
      rsnumberoptions: ref([]),
    };
  },
  methods: {
    filterRsNumber(inputvalue, update, abort) {
      console.log('HEHHEHE')
      update(() => {
        if (inputvalue === '') {
          this.rsnumberoptions = ref([])
        } else {
          // this.requisitionstore.searchRsNumber(inputvalue)
          this.deliverystore.searchDeliveryRsOrItem(inputvalue)
        }
      })
    },
    updateRsNumberModel(value) {
      console.log(value)
      this.delivery_receipt_item.rs_number_label = value
      let searchresult = this.requisitionstore.rsnumbersearchresults.find(item => item.id === value)
      this.deliverystore.delivery_receipt_item.rs_number_label = searchresult.rs_number
    },
  },
  components: {
    FormHeaderVue,
    AddDeliveryReceiptDialog
  },
});
</script>
