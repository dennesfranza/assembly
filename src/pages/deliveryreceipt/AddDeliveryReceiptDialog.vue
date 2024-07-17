<template>
  <q-page class="q-pa-sm">
    <q-dialog v-model="deliveryreceiptdialog" persistent maximized>
      <q-card>
        <q-card-section><h6>Delivery Receipt Slip</h6></q-card-section>
        {{ delivery_receipt_item }}
        {{ requisitionstore.rsNumberOptions }}
        <q-separator></q-separator>
        <q-card-section class="scroll">
          <q-row class="q-gutter-xs">
            <q-input
              filled
              label="RS Number or Item Name"
              :loading="requisitionstore.requisitionsearchrsnumberloading"
              @update:model-value="inputSearch"
            >
              <template v-slot:prepend>
                <q-icon name="search" />
              </template>
            </q-input>
            <!-- <q-select
              use-input
              hide-selected
              filled
              fill-input
              map-options
              emit-value
              input-debounce="0"
              v-model="delivery_receipt_item.rs_number"
              label="RS Number or Item Name"
              :loading="requisitionstore.requisitionsearchrsnumberloading"
              @filter="filterRsNumber"
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
            </q-select> -->
          </q-row>
          <!-- <q-row class="q-gutter-xs">
            <q-input v-model="delivery_receipt_item.quantity" filled label="Quantity" type="number">
              <template v-slot:prepend>
                <q-icon name="123" />
              </template>
            </q-input>
          </q-row> -->
          <!-- <q-row class="q-gutter-xs">
            <q-select
              use-input
              hide-selected
              filled
              fill-input
              map-options
              emit-value
              input-debounce="0"
              v-model="delivery_receipt_item.description"
              label="Description"
              :options="consumablestore.consumableOptions"
              @filter="filterConsumableItem"
              @update:model-value="updateConsumableModel"
            >
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    No results
                  </q-item-section>
                </q-item>
              </template>
              <template v-slot:prepend>
                <q-icon name="description" />
              </template>
            </q-select>
          </q-row> -->
        </q-card-section>
        <div class="q-pt-md">
          <q-table
            title="Search Results"
            :columns="deliveryreceiptsearchcolumns"
            :rows="deliveryreceiptsearchrows"
            :loading="deliveryreceiptsearchtableloading"
            :separator="'vertical'"
            row-key="rs_number_id"
            selection="single"
            auto-width
            flat
            bordered
            @row-click="onRowClick"
          ></q-table>
        </div>
        <q-separator></q-separator>
        <q-card-actions align="left">
          <q-btn
            outline
            label="Close"
            color="red"
            @click="deliverystore.closeAddDeliveryDialog()"
          ></q-btn>
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

    return {
      deliverystore,
      requisitionstore,
      consumablestore,
      delivery_receipt_item,
      deliveryreceiptdialog,
      deliveryreceiptsearchcolumns,
      deliveryreceiptsearchrows,
      deliveryreceiptsearchtableloading,
      rsnumberoptions: ref([]),
      consumableoptions: ref([]),
    };
  },
  methods: {
    onRowClick(event, row, index) {
      this.delivery_receipt_item.rs_number = row.rs_number
      this.delivery_receipt_item.rs_number_label = row.rs_number_label
      this.delivery_receipt_item.description_label = row.description_label
      this.delivery_receipt_item.description = row.description
      this.deliverystore.openQuantityRemarksDialog()
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
    inputSearch(inputvalue) {
      if (inputvalue.length >= 2) {
        this.deliverystore.searchDeliveryRsOrItem(inputvalue);
      }
    },
    filterRsNumber(inputvalue, update, abort) {
      update(() => {
        if (inputvalue === "") {
          this.rsnumberoptions = ref([]);
        } else {
          if (inputvalue.length >= 2) {
            this.deliverystore.searchDeliveryRsOrItem(inputvalue);
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
    AddDeliveryReceiptQuantityRemarksDialog
  }
});
</script>
