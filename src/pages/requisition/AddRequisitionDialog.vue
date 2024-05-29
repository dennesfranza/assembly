<template>
  <q-page class="q-pa-sm">
    <q-dialog v-model="requeststore.requisitionrequestdialog" persistent maximized>
      <q-card>
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
              v-model="requeststore.requisition_request_item[item.name]"
            >
              <template v-slot:prepend>
                <q-icon :name="item.icon" color="black" />
              </template>
            </q-input>
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
          <q-btn outline label="Save" color="blue" @click="requeststore.addRequestItem()" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { useRequisitionStore } from "src/stores/requisition/index";

export default defineComponent({
  name: "addrequest",
  setup() {
    const requeststore = useRequisitionStore();

    return {
      requeststore
    };
  },
});
</script>
