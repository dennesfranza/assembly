<template>
  <q-page class="q-pa-sm">
    <q-dialog v-model="deliveryreceiptdialog" persistent maximized>
      <q-card>
        <q-card-section><h6>Delivery Receipt Slip</h6></q-card-section>
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
              clearable
              v-model="deliverystore.rssearchnumber"
              label="Requisition Slip Number"
              :options="requisitionstore.rsNumberOptions"
              :loading="requisitionstore.requisitionsearchrsnumberloading"
              @filter="filterRsNumber"
              @update:model-value="updateDeliveryModel"
              @clear="clearDeliverySearchTable"
            >
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    No results
                  </q-item-section>
                </q-item>
              </template>
              <template v-slot:prepend>
                <q-icon name="search" />
              </template>
            </q-select>
          </q-row>
        </q-card-section>
        <q-card-section>
          <q-row>
            <div class="q-pt-md">
              <q-table
                title="Requisition Items Search Results"
                :columns="deliveryreceiptsearchcolumns"
                :rows="requisitionstore.requisitiondetailsitems"
                :loading="deliveryreceiptsearchtableloading"
                :separator="'vertical'"
                row-key="rs_number_id"
                auto-width
                flat
                bordered
                @row-click="onRowClick"
              ></q-table>
            </div>
          </q-row>
        </q-card-section>
        <q-separator></q-separator>
        <q-card-actions align="left">
          <q-btn outline label="Close" color="red" @click="closeDialog" />
          <q-btn outline label="Add" color="blue" @click="addItems" />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <AddDeliveryReceiptQuantityRemarksDialog />
  </q-page>
</template>

<script>
import { computed, defineComponent, ref } from "vue";
import { useDeliveryReceiptStore } from "src/stores/deliveryreceipt/index";
import { useRequisitionStore } from "src/stores/requisition/index";
import { useConsumablesStore } from "src/stores/consumables/index";
import AddDeliveryReceiptQuantityRemarksDialog from "./AddDeliveryReceiptQuantityRemarksDialog.vue";

export default defineComponent({
  name: "adddeliveryreceipt",
  setup() {
    const deliverystore = useDeliveryReceiptStore();
    const requisitionstore = useRequisitionStore();
    const consumablestore = useConsumablesStore();
    const delivery_receipt_item = computed(
      () => deliverystore.delivery_receipt_item
    );
    const deliveryreceiptdialog = computed(
      () => deliverystore.deliveryreceiptdialog
    );
    const deliveryreceiptsearchcolumns = computed(
      () => deliverystore.deliveryreceiptsearchcolumns
    );
    const deliveryreceiptsearchrows = computed(
      () => deliverystore.deliveryreceiptsearchrows
    );
    const deliveryreceiptsearchtableloading = computed(
      () => deliverystore.deliveryreceiptsearchtableloading
    );
    const requisitiondetails = computed(
      () => requisitionstore.requisitiondetails
    );
    const requisitiondetailsitems = computed(
      () => requisitionstore.requisitiondetailsitems
    );
    const deliveryreceiptpayload = computed(
      () => deliverystore.deliveryreceiptpayload
    );

    return {
      deliverystore,
      requisitionstore,
      consumablestore,
      delivery_receipt_item,
      deliveryreceiptdialog,
      deliveryreceiptsearchcolumns,
      deliveryreceiptsearchrows,
      deliveryreceiptsearchtableloading,
      requisitiondetails,
      requisitiondetailsitems,
      deliveryreceiptpayload,
      rsnumberoptions: ref([]),
      consumableoptions: ref([]),
    };
  },
  methods: {
    closeDialog() {
      this.requisitionstore.requisitiondetailsitems = [];
      this.deliverystore.closeAddDeliveryDialog();
    },
    addItems() {
      let _items = this.requisitiondetailsitems.map((a) => ({
        quantity: a.quantity,
        description: a.description.id,
        description_label: a.description.name,
        rs_number: this.requisitiondetails.id,
        rs_number_label: this.requisitiondetails.rs_number,
        remarks: "",
      }));
      this.deliveryreceiptpayload.delivery_receipt_items = _items;
      this.requisitionstore.requisitiondetailsitems = [];
      this.deliverystore.closeAddDeliveryDialog();
    },
    onRowClick(event, row, index) {
      this.delivery_receipt_item.rs_number = row.rs_number;
      this.delivery_receipt_item.rs_number_label = row.rs_number_label;
      this.delivery_receipt_item.description_label = row.description_label;
      this.delivery_receipt_item.description = row.description;
      this.deliverystore.openQuantityRemarksDialog();
    },
    filterConsumableItem(inputvalue, update, abort) {
      update(() => {
        if (inputvalue === "") {
          this.consumableoptions = ref([]);
        } else {
          this.consumablestore.searchConsumable(inputvalue);
        }
      });
    },
    updateDeliveryModel(value) {
      if (value != null) {
        this.requisitionstore.retrieveRequisitionItem(value);
        this.deliverystore.deliveryreceiptpayload.delivery_receipt_items.rs_number =
          value;
        this.deliverystore.deliveryreceiptpayload.delivery_receipt_items.rs_number_label =
          this.requisitionstore.requisitiondetails.rs_number;
      }
    },
    filterRsNumber(inputvalue, update, abort) {
      update(() => {
        if (inputvalue === "") {
          this.rsnumberoptions = ref([]);
        } else {
          if (inputvalue.length >= 2) {
            this.requisitionstore.searchRsNumber(inputvalue);
          }
        }
      });
    },
    updateRsNumberModel(value) {
      this.delivery_receipt_item.rs_number_label = value;
      let searchresult = this.requisitionstore.rsnumbersearchresults.find(
        (item) => item.id === value
      );
      this.deliverystore.delivery_receipt_item.rs_number_label =
        searchresult.rs_number;
    },
    updateConsumableModel(value) {
      this.delivery_receipt_item.description_label = value;
      let searchresult = this.consumablestore.consumablesearchresults.find(
        (item) => item.id === value
      );
      this.deliverystore.delivery_receipt_item.description_label =
        searchresult.name;
    },
  },
  components: {
    AddDeliveryReceiptQuantityRemarksDialog,
  },
});
</script>
