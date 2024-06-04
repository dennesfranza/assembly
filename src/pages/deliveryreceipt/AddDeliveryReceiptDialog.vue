<template>
  <q-page class="q-pa-sm">
    <q-dialog
      v-model="deliveryreceiptdialog"
      persistent
      maximized
    >
      <q-card>
        <q-card-section><h6>Delivery Receipt Slip</h6></q-card-section>
        {{ delivery_receipt_item }}
        {{ requisitionstore.rsNumberOptions }}
        <q-separator></q-separator>
        <q-card-section class="scroll">
          <q-row class="q-gutter-xs">
            <q-select
              use-input
              hide-selected
              filled
              fill-input
              map-options
              emit-value
              input-debounce="0"
              v-model="delivery_receipt_item.rs_number"
              label="RS Number"
              :options="requisitionstore.rsNumberOptions"
              @filter="filterFn"
              @update:model-value="on"
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
            </q-select>
          </q-row>
          <q-row class="q-gutter-xs">
            <q-input v-model="delivery_receipt_item.quantity" filled label="Quantity">
              <template v-slot:prepend>
                <q-icon name="123" />
              </template>
            </q-input>
          </q-row>
          <q-row class="q-gutter-xs">
            <q-input v-model="delivery_receipt_item.description" filled label="Description">
              <template v-slot:prepend>
                <q-icon name="description" />
              </template>
            </q-input>
          </q-row>
        </q-card-section>
        <q-separator></q-separator>
        <q-card-actions align="left">
          <q-btn
            outline
            label="Close"
            color="red"
            @click="deliverystore.closeAddDeliveryDialog()"
          ></q-btn>
          <q-btn
            outline
            label="Add"
            color="blue"
            @click="deliverystore.addDeliveryItem()"
          ></q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { computed, defineComponent, ref } from "vue";
import { useDeliveryReceiptStore } from "src/stores/deliveryreceipt/index";
import { useRequisitionStore } from "src/stores/requisition/index";

export default defineComponent({
  name: "adddeliveryreceipt",
  setup() {
    const deliverystore = useDeliveryReceiptStore();
    const requisitionstore = useRequisitionStore();
    const delivery_receipt_item = computed(() => deliverystore.delivery_receipt_item)
    const deliveryreceiptdialog = computed(() => deliverystore.deliveryreceiptdialog)

    return {
      deliverystore,
      requisitionstore,
      options: ref([]),
      delivery_receipt_item,
      deliveryreceiptdialog
    };
  },
  methods: {
    filterFn(inputvalue, update, abort) {
      update(() => {
        if (inputvalue === '') {
          this.options = ref([])
        } else {
          this.requisitionstore.searchRsNumber(inputvalue)
        }
      })
    },
    on(value) {
      console.log(value)
      this.delivery_receipt_item.rs_number_label = value
      console.log(this.requisitionstore.rsnumbersearchresults)
      let x = this.requisitionstore.rsnumbersearchresults.find(item => item.id === value)
      this.deliverystore.delivery_receipt_item.rs_number_label = x.rs_number
    }
  },
});
</script>
