<template>
  <q-page class="q-pa-sm">
    <q-dialog
      v-model="requeststore.requisitionrequestdialog"
    >
    <q-card style="width: 450px; height: 360px">
        <q-card-section><h6>Requisition Slip</h6></q-card-section>
        <q-separator />
        <q-card-section class="scroll">
          <q-row
            class="q-gutter-xs"
            v-for="item in requeststore.requestdetailsinput"
            :key="item.name"
          >
            <q-input
              filled
              :label="item.label"
              v-model="requisition_request_item[item.name]"
              v-if="item.type === 'input'"
            >
              <template v-slot:prepend>
                <q-icon :name="item.icon" color="black" />
              </template>
            </q-input>
            <q-select
              v-else-if="item.type === 'select'"
              :label="item.label"
              v-model="requisition_request_item[item.name]"
              use-input
              hide-selected
              filled
              fill-input
              map-options
              emit-value
              input-debounce="0"
              :options="consumablesstore.consumableOptions"
              @filter="filterFn"
              @update:model-value="updateModelValue"
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
        <q-separator />
        <q-card-actions align="left">
          <q-btn
            outline
            label="Close"
            color="red"
            @click="requeststore.closeAddRequisitionDialog()"
          ></q-btn>
          <q-btn
            outline
            label="Add"
            color="blue"
            @click="requeststore.addRequestItem()"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { defineComponent, computed, ref } from "vue";
import { useRequisitionStore } from "src/stores/requisition/index";
import { useConsumablesStore } from "src/stores/consumables/index";

export default defineComponent({
  name: "addrequest",
  setup() {
    const requeststore = useRequisitionStore();
    const consumablesstore = useConsumablesStore()
    const requisition_request_item = computed(() => requeststore.requisition_request_item)

    return {
      requeststore,
      requisition_request_item,
      consumablesstore,
      options: ref([]),
    };
  },
  methods: {
    filterFn(inputvalue, update, abort) {
      update(() => {
        if (inputvalue === '') {
          this.options = ref([])
        } else {
          this.consumablesstore.searchConsumable(inputvalue)
        }
      })
    },
    updateModelValue(value) {
      console.log(value)
      this.requisition_request_item.description = value
      let x = this.consumablesstore.consumablesearchresults.find(item => item.id === value)
      this.requeststore.requisition_request_item.description_label = x.name
    }
  }
});
</script>
