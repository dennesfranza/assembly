<template>
  <q-page class="q-pa-sm">
    <q-dialog
      v-model="receivingstore.addremarksdialog"
      :backdrop-filter="'blur(4px)'"
      persistent
    >
      <q-card style="width: 700px; max-width: 80vw">
        <q-card-section>
          <h6>Add Remarks</h6>
        </q-card-section>
        <q-separator></q-separator>
        <q-card-section class="scroll">
          <div class="row items-center">
            <div class="col q-pa-sm">
              <q-input label="Remarks" v-model="remarks" filled>
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
  name: 'addremarks',
  setup() {
    const receivingstore = useReceivingStore();

    return {
      receivingstore,
      remarks: ref('')
    }
  },
  methods: {
    save() {
      this.receivingstore.addRemarksToItems(this.remarks)
      this.remarks = ref('')
    },
    close() {
      this.receivingstore.closeAddRemarksDialog()
      this.remarks = ref('')
    }
  }
})
</script>
