<template>
  <q-page class="q-pa-sm">
    <q-dialog
      v-model="gatepassstore.addgatepassdialog"
      :backdrop-filter="'blur(4px)'"
      persistent
    >
      <q-card style="width: 700px; max-width: 80vw">
        <q-card-section>
          <h6>Add Gatepass Item</h6>
        </q-card-section>
        <q-separator></q-separator>
        {{ gate_pass_items }}
        <q-card-section class="scroll">
          <q-row
            class="q-gutter-xs"
            v-for="item in gatepassinput"
            :key="item.name"
          >
            <q-input
              filled
              :label="item.label"
              v-model="gate_pass_items[item.name]"
              v-if="item.name === 'quantity'"
              type="number"
            >
              <template v-slot:prepend>
                <q-icon :name="item.icon" color="black" />
              </template>
            </q-input>
            <q-input
              filled
              :label="item.label"
              v-model="gate_pass_items[item.name]"
              v-else-if="item.name != 'quantity'"
            >
              <template v-slot:prepend>
                <q-icon :name="item.icon" color="black" />
              </template>
            </q-input>
            <q-select
              v-if="item.type === 'select'"
              :label="item.label"
              v-model="gate_pass_items[item.name]"
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
        <q-separator></q-separator>
        <q-card-actions align="left">
          <q-btn
            outline
            label="Close"
            color="red"
            @click="gatepassstore.closeAddGatepassDialog()"
          ></q-btn>
          <q-btn outline label="Add" color="blue" @click="addItem" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import {
  defineComponent,
  ref,
  getCurrentInstance,
  computed,
  onMounted,
} from "vue";
import { useGatepassStore } from "src/stores/gatepass";
import { useConsumablesStore } from "src/stores/consumables/index";

export default defineComponent({
  name: "gatepass",
  setup() {
    const gatepassstore = useGatepassStore();
    const consumablesstore = useConsumablesStore();
    const gatepassinput = computed(() => gatepassstore.gatepassinput);
    const gate_pass_items = computed(() => gatepassstore.gate_pass_items);
    const gatepasscreateitem = computed(() => gatepassstore.gatepasscreateitem);

    return {
      gatepassstore,
      consumablesstore,
      gatepassinput,
      gate_pass_items,
      gatepasscreateitem,
      options: ref([]),
    };
  },
  methods: {
    addItem() {
      this.gatepasscreateitem.gate_pass_items.unshift(this.gate_pass_items);
      this.gatepassstore.closeAddGatepassDialog();
    },
    filterFn(inputvalue, update, abort) {
      update(() => {
        if (inputvalue === "") {
          this.options = ref([]);
        } else {
          this.consumablesstore.searchConsumable(inputvalue);
        }
      });
    },
    updateModelValue(value) {
      this.gate_pass_items.description = value
      let x = this.consumablesstore.consumablesearchresults.find(
        (item) => item.id === value
      );
      this.gate_pass_items.description_label = x.name
    }
  },
});
</script>
