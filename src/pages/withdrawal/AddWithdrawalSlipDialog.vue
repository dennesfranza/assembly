<template>
  <q-page class="q-pa-sm">
    <q-dialog
      v-model="withdrawalstore.addwithdrawalslipitemdialog"
      :backdrop-filter="'blur(4px)'"
      persistent
    >
      <q-card style="width: 700px; max-width: 80vw">
        <q-card-section><h6>Withdrawal Slip</h6></q-card-section>
        <q-separator></q-separator>
        <q-card-section class="scroll">
          <q-row
            class="q-gutter-xs"
            v-for="item in withdrawalstore.withdrawalslipdetailsinput"
            :key="item.name"
          >
            <q-input
              filled
              :label="item.label"
              v-model="withdrawalstore.createwithdrawalitems[item.name]"
              v-if="item.type === 'input'"
            >
              <template v-slot:prepend>
                <q-icon :name="item.icon" color="black" />
              </template>
            </q-input>
            <q-select
              v-else-if="item.type === 'select'"
              :label="item.label"
              v-model="withdrawalstore.createwithdrawalitems[item.name]"
              use-input
              hide-selected
              filled
              fill-input
              map-options
              emit-value
              input-debounce="0"
              :options="consumablesstore.consumableOptions"
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
            @click="withdrawalstore.closeAddWithdrawalSlipDialog()"
          ></q-btn>
          <q-btn
            outline
            label="Add"
            color="blue"
            @click="withdrawalstore.addWithdrawalItem()"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { defineComponent, computed, ref } from "vue";
import { useConsumablesStore } from "src/stores/consumables/index";
import { useWithdrawalStore } from "src/stores/withdrawal/index";

export default defineComponent({
  name: 'addwithdrawalslip',
  setup() {
    const consumablesstore = useConsumablesStore()
    const withdrawalstore = useWithdrawalStore()
    const createwithdrawalitems = computed(() => withdrawalstore.createwithdrawalitems)

    return {
      consumablesstore,
      withdrawalstore,
      createwithdrawalitems,
      options: ref([]),
    }
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
    on(value) {
      console.log(value)
      this.createwithdrawalitems.description = value
      let x = this.consumablesstore.consumablesearchresults.find(item => item.id === value)
      console.log(x.name)
      this.withdrawalstore.createwithdrawalitems.description_label = x.name
    }
  }
})

</script>
