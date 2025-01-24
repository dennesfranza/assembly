<template>
  <q-page class="q-pa-sm">
    <q-dialog
      v-model="receivingstore.addsupplierdialog"
      :backdrop-filter="'blur(4px)'"
      persistent
    >
      <q-card style="width: 700px; max-width: 80vw">
        <q-card-section>
          <h6>Add Supplier Name</h6>
        </q-card-section>
        <q-separator></q-separator>
        <q-card-section class="scroll">
          <div class="row items-center">
            <div class="col q-pa-sm">
              <q-input label="Suppliers Name" v-model="supplier_name" filled>
                <template v-slot:prepend>
                  <q-icon name="123" />
                </template>
              </q-input>
            </div>
          </div>
        </q-card-section>
        <q-separator></q-separator>
        <q-card-actions align="left">
          <q-btn
            outline
            label="Close"
            color="red"
            @click="close"
          ></q-btn>
          <q-btn
            outline
            label="Save"
            color="blue"
            @click="save"
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
import { useReceivingStore } from "src/stores/receiving/index";

export default defineComponent({
  name: 'addsupplier',
  setup() {
    const receivingstore = useReceivingStore();

    return {
      receivingstore,
      supplier_name: ref('')
    }
  },
  methods: {
    save() {
      this.receivingstore.addSupplierToItems(this.supplier_name)
      this.supplier_name = ref('')
    },
    close() {
      this.receivingstore.closeAddSupplierDialog()
      this.supplier_name = ref('')
    }
  }
})
</script>
