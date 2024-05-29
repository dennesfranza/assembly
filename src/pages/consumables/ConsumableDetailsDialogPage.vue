<template>
  <q-page class="q-pa-sm">
    <q-dialog v-model="consumablesstore.consumabledetailsdialog" :backdrop-filter="'blur(4px)'">
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section><h6>Consumable Details Page</h6></q-card-section>
        <q-separator></q-separator>
        <q-card-section class="scroll">
          <div class="row items-center">
            <div class="col q-pa-sm">
              <q-input v-model="consumablesstore.consumabledetailsitem.name" label="Name" readonly></q-input>
            </div>
          </div>
          <div class="row items-center">
            <div class="col q-pa-sm">
              <q-input v-model="consumablesstore.consumabledetailsitem.description" label="Description" readonly></q-input>
            </div>
          </div>
          <div class="row items-center">
            <div class="col q-pa-sm">
              <q-img
                :src="consumablesstore.consumabledetailsitem.image"
                spinner-color="white"
                style="height: 140px; max-width: 150px"
              />
            </div>
          </div>
        </q-card-section>
        <q-separator></q-separator>
        <q-card-actions align="right">
          <q-btn
            outline
            label="Close"
            color="red"
            @click="consumablesstore.closeConsumableDetailsDialog()"
          ></q-btn>
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
import { useConsumablesStore } from "src/stores/consumables/index";

export default defineComponent({
  name: 'consumabledetails',
  setup() {
    const consumablesstore = useConsumablesStore()

    return {
      consumablesstore
    }
  }
})
</script>
