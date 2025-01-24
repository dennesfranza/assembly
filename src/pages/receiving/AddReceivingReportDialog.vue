<template>
  <q-page class="q-pa-sm">
    <q-dialog v-model="receivingstore.additemdialog" persistent maximized>
      <q-card>
        <q-card-section>
          <h6>Receiving Report</h6>
        </q-card-section>
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
              v-model="receivingstore.deliverynumbersearchnumber"
              label="Delivery Receipt Number"
              :options="receivingstore.deliveryNumberOptions"
              :loading="receivingstore.deliverynumbersearchloading"
              @filter="filterDRNumber"
              @update:model-value="updateReceivingModel"
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
                title="Search Results"
                :columns="receivingstore.searchresultstablecolumn"
                :rows="deliveryresultitems"
                row-key="rs_number_id"
                selection="single"
                auto-width
                flat
                bordered
              ></q-table>
            </div>
          </q-row>
        </q-card-section>
        <q-separator></q-separator>
        <q-card-actions align="left">
          <q-btn outline label="Close" color="red" @click="closeDialog"></q-btn>
          <q-btn outline label="Add" color="blue" @click="addItems" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { defineComponent, ref, getCurrentInstance, computed } from "vue";
import { useReceivingStore } from "src/stores/receiving/index";
import { useLocationStore } from "src/stores/location/index";
import { useDeliveryReceiptStore } from "src/stores/deliveryreceipt/index";
import { useUserStore } from "src/stores/users/index";

export default defineComponent({
  name: "receivingreport",
  setup() {
    const receivingstore = useReceivingStore();
    const locationstore = useLocationStore();
    const deliverystore = useDeliveryReceiptStore();
    const userstore = useUserStore();
    const deliveryresultitems = computed(() => deliverystore.deliveryGetItems);
    const receivingpayload = computed(() => receivingstore.receivingpayload);

    return {
      receivingstore,
      locationstore,
      deliverystore,
      userstore,
      deliveryresultitems,
      receivingpayload,
      drnumberoptions: ref([]),
    };
  },
  methods: {
    filterDRNumber(inputvalue, update, abort) {
      update(() => {
        if (inputvalue === "") {
          this.drnumberoptions = ref([]);
        } else {
          if (inputvalue.length >= 1) {
            this.receivingstore.searchDeliveryNumber(inputvalue);
          }
        }
      });
    },
    updateReceivingModel(value) {
      if (value != null) {
        this.deliverystore.retrieveDeliveryItem(value);
        this.receivingpayload.invoice_dr_no = value;
      }
    },
    clearDeliverySearchTable() {
      this.deliverystore.closeDeliveryDetailsDialog();
      this.receivingstore.deliverynumbersearchresults = [];
    },
    closeDialog() {
      this.deliverystore.closeDeliveryDetailsDialog();
      this.receivingstore.closeAddReceivingItemDialog();
      this.receivingstore.deliverynumbersearchresults = [];
    },
    addItems() {
      this.receivingstore.addItemToCreate(this.deliveryresultitems);
      this.deliverystore.closeDeliveryDetailsDialog();
    },
  },
});
</script>
