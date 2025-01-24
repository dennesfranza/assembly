<template>
  <q-page class="q-pa-sm">
    <q-dialog v-model="requeststore.requisitionaddeditdialog">
      <q-card style="width: 450px; height: 360px">
        <q-card-section class="scroll">
          <q-row
            class="q-gutter-xs"
            v-for="item in requeststore.requestdetailsinput"
            :key="item.name"
          >
            <q-input
              filled
              :label="item.label"
              v-if="item.type === 'input'"
              v-model="requisitionedit.requisition_request_items[id][item.name]"
            >
              <template v-slot:prepend>
                <q-icon :name="item.icon" color="black" />
              </template>
            </q-input>
          </q-row>
        </q-card-section>
        <q-card-actions>
          <q-btn
            outline
            label="Close"
            color="red"
            @click="requeststore.closeAddEditDialog()"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { defineComponent, computed, ref } from "vue";
import { useRequisitionStore } from "src/stores/requisition/index";

export default defineComponent({
  name: "editrequisition",
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const requeststore = useRequisitionStore();
    const requisitionedit = computed(() => requeststore.requisitionedit);

    return {
      requeststore,
      requisitionedit,
    };
  },
});
</script>
