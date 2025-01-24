<template>
  <div class="q-pa-md q-gutter-sm">
    <q-dialog v-model="deliveryreceiptaddquantityremarksdialog">
      <q-card style="width: 450px; height: 320px">
        <q-card-section>
          <div class="h6">Add Quantity and Remarks</div>
        </q-card-section>
        <q-separator></q-separator>
        <q-card-section>
          <q-input
            class="q-mr-sm"
            v-model="delivery_receipt_item.quantity"
            dense
            debounce="500"
            outlined
            label="Quantity"
            type="number"
          >
            <template v-slot:prepend>
              <q-icon name="123" />
            </template>
          </q-input>
          <q-input
            class="q-mr-sm"
            v-model="delivery_receipt_item.remarks"
            dense
            debounce="500"
            outlined
            label="Remarks"
          >
            <template v-slot:prepend>
              <q-icon name="description" />
            </template>
          </q-input>
        </q-card-section>
        <q-separator></q-separator>
        <q-card-actions>
          <q-btn
            outline
            label="Close"
            color="red"
            @click="deliverystore.closeQuantityRemarksDialog()"
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
  </div>
</template>

<script>
import { computed, defineComponent, ref } from "vue";
import { useDeliveryReceiptStore } from "src/stores/deliveryreceipt/index";

export default defineComponent({
  name: "adddeliveryreceiptquantityremarks",
  setup() {
    const deliverystore = useDeliveryReceiptStore();
    const deliveryreceiptaddquantityremarksdialog = computed(
      () => deliverystore.deliveryreceiptaddquantityremarksdialog
    );
    const delivery_receipt_item = computed(
      () => deliverystore.delivery_receipt_item
    );

    return {
      deliverystore,
      deliveryreceiptaddquantityremarksdialog,
      delivery_receipt_item,
    };
  },
});
</script>
