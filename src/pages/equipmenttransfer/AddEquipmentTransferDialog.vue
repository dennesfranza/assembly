<template>
  <q-page class="q-pa-sm">
    <q-dialog
      v-model="addequipmenttransferitemdialog"
      persistent
      maximized
    >
      <q-card>
        <q-card-section>
          <h6>Equipment Transfer</h6>
        </q-card-section>
        <q-separator></q-separator>
        <q-card-section class="scroll">
          <q-row
            class="q-gutter-xs"
            v-for="item in equipmentitemsinput"
            :key="item.name"
          >
            <q-input
              filled
              :label="item.label"
              v-model="createequipmenttransferitems[item.name]"
              v-if="item.type === 'input'"
            >
              <template v-slot:prepend>
                <q-icon :name="item.icon" color="black" />
              </template>
            </q-input>
            <q-select
              v-else-if="item.type === 'select'"
              :label="item.label"
              v-model="createequipmenttransferitems[item.name]"
              use-input
              hide-selected
              filled
              fill-input
              map-options
              emit-value
              input-debounce="0"
              :options="consumablesstore.consumableOptions"
              @filter="filterFn"
              @update:model-value="onUpdate"
            >
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    No results
                  </q-item-section>
                </q-item>
              </template>
              <template v-slot:prepend>
                <q-icon :name="item.icon" color="black"></q-icon>
              </template>
            </q-select>
          </q-row>
        </q-card-section>
        <!-- <q-card-section class="scroll">
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
              label="Requisition Slip Number"
              :options="requisitionstore.rsNumberOptions"
              :loading="requisitionstore.requisitionsearchrsnumberloading"
              @filter="filterRsNumber"
              @update:model-value="updateModel"
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
        </q-card-section> -->
        <!-- <q-card-section>
          <q-row>
            <div class="q-pt-md">
              <q-table
                title="Requisition Items Search Results"
                :separator="'vertical'"
                row-key="rs_number_id"
                auto-width
                flat
                bordered
                @row-click="onRowClick"
              ></q-table>
            </div>
          </q-row>
        </q-card-section> -->
        <q-separator></q-separator>
        <q-card-actions align="left">
          <q-btn
            outline
            label="Close"
            color="red"
            @click="equipttransferstore.closeCreateDialog()"
          ></q-btn>
          <q-btn
            outline
            label="Add"
            color="primary"
            @click="add"
          ></q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { defineComponent, ref, getCurrentInstance, computed } from "vue";
import { useLocationStore } from "src/stores/location/index";
import { useRequisitionStore } from "src/stores/requisition/index";
import { useEquipTransferSlipStore } from "src/stores/toolsequiptransferslip/index";
import { useConsumablesStore } from "src/stores/consumables/index";

export default defineComponent({
  name: 'toolsequiptransferslip',
  setup() {
    const locationstore = useLocationStore();
    const requisitionstore = useRequisitionStore()
    const consumablesstore = useConsumablesStore()
    const equipttransferstore = useEquipTransferSlipStore()
    const createequipmenttransferitems = computed(() => equipttransferstore.createequipmenttransferitems)
    const addequipmenttransferitemdialog = computed(() => equipttransferstore.addequipmenttransferitemdialog)
    const equipmentitemsinput = computed(() => equipttransferstore.equipmentitemsinput)

    return {
      locationstore,
      requisitionstore,
      consumablesstore,
      equipttransferstore,
      createequipmenttransferitems,
      addequipmenttransferitemdialog,
      equipmentitemsinput
    }
  },
  methods: {
    updateModel(value) {
      if (value != null) {
        console.log(value)
        this.requisitionstore.retrieveRequisitionItem(value);
        // this.deliverystore.deliveryreceiptpayload.delivery_receipt_items.rs_number =
        //   value;
        // this.deliverystore.deliveryreceiptpayload.delivery_receipt_items.rs_number_label =
        //   this.requisitionstore.requisitiondetails.rs_number;
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
    filterFn(inputvalue, update, abort) {
      update(() => {
        if (inputvalue === '') {
          this.options = ref([])
        } else {
          this.consumablesstore.searchConsumable(inputvalue)
        }
      })
    },
    onUpdate(value) {
      console.log(value)
      // this.requisition_request_item.description = value
      let x = this.consumablesstore.consumablesearchresults.find(item => item.id === value)
      console.log(x.name)
      // this.requeststore.requisition_request_item.description_label = x.name
    },
    add() {
      console.log(this.createequipmenttransferitems)
    }
  }
})
</script>
