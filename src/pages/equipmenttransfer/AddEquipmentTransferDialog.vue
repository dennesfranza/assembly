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
            @click="equipttransferstore.closeCreateDialog()"
          ></q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { defineComponent, ref, getCurrentInstance, computed } from "vue";
import { useLocationStore } from "src/stores/location/index";
import { useUserStore } from "src/stores/users/index";
import { useLoginStore } from "src/stores/login/index";
import { useEquipTransferSlipStore } from "src/stores/toolsequiptransferslip/index";

export default defineComponent({
  name: 'toolsequiptransferslip',
  setup() {
    const locationstore = useLocationStore();
    const userstore = useUserStore();
    const loginstore = useLoginStore();
    const equipttransferstore = useEquipTransferSlipStore()
    const createequipmenttransferitems = computed(() => equipttransferstore.createequipmenttransferitems)
    const addequipmenttransferitemdialog = computed(() => equipttransferstore.addequipmenttransferitemdialog)
    const equipmentitemsinput = computed(() => equipttransferstore.equipmentitemsinput)

    return {
      locationstore,
      userstore,
      loginstore,
      equipttransferstore,
      createequipmenttransferitems,
      addequipmenttransferitemdialog,
      equipmentitemsinput
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
      this.requisition_request_item.description = value
      let x = this.consumablesstore.consumablesearchresults.find(item => item.id === value)
      console.log(x.name)
      this.requeststore.requisition_request_item.description_label = x.name
    }
  }
})
</script>
