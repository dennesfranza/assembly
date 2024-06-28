<template>
  <q-page class="q-pa-sm">
    <q-dialog
      v-model="withdrawalstore.withdrawalslipdetailsdialog"
      persistent
      maximized
    >
      <q-card>
        <q-card-section>
          <form-header-vue
            :headers="formHeader.headers"
            :name="formHeader.name"
          />
        </q-card-section>
        <q-card-section>
          <div class="row items-center">
            <div class="col q-pa-sm">
              <q-input v-model="withdrawalslipdetails.ws_number" label="WS Number" readonly>
                <template v-slot:prepend>
                  <q-icon name="123" color="black" />
                </template>
              </q-input>
            </div>
            <div class="col q-pa-sm">
              <q-input v-model="withdrawalslipdetails.location" label="Location" readonly>
                <template v-slot:prepend>
                  <q-icon name="map" color="black" />
                </template>
              </q-input>
            </div>
            <div class="col q-pa-sm">
              <q-input v-model="withdrawalslipdetails.date" label="Date" readonly>
                <template v-slot:prepend>
                  <q-icon name="calendar_month" color="black" />
                </template>
              </q-input>
            </div>
          </div>
        </q-card-section>
        <q-card-section>
          <div class="q-pt-md">
            <q-table
              :columns="withdrawalstore.withdrawalslipdetailscolumns"
              :rows="withdrawalstore.withdrawalslipdetailsitems"
              :separator="'vertical'"
              row-key="id"
              auto-width
              flat
              bordered
            >
            </q-table>
          </div>
        </q-card-section>
        <q-card-section>
          <div class="row q-pa-md">
            <div class="col q-pa-sm">
              <q-input v-model="withdrawalslipdetails.requested_by" label="Requested By" readonly>
                <template v-slot:prepend>
                  <q-icon name="fact_check" color="black" />
                </template>
              </q-input>
            </div>
            <div class="col q-pa-sm">
              <q-input v-model="withdrawalslipdetails.noted_by" label="Noted By" readonly>
                <template v-slot:prepend>
                  <q-icon name="fact_check" color="black" />
                </template>
              </q-input>
            </div>
            <div class="col q-pa-sm">
              <q-input v-model="withdrawalslipdetails.issued_by" label="Issued By" readonly>
                <template v-slot:prepend>
                  <q-icon name="fact_check" color="black" />
                </template>
              </q-input>
            </div>
          </div>
        </q-card-section>
        <q-separator></q-separator>
        <q-card-actions>
          <q-btn
            outline
            label="Close"
            color="red"
            @click="withdrawalstore.closeDetailsDialog()"
          />
        </q-card-actions>
        <q-inner-loading
          :showing="withdrawalstore.withdrawalslipdetailsloadingpage"
        >
          <q-spinner-gears size="50px" color="primary" />
        </q-inner-loading>
      </q-card>
    </q-dialog>
  </q-page>
</template>
<script>
import { defineComponent, ref, getCurrentInstance, computed } from "vue";
import { useFormHeadersStore } from "src/stores/formheaders/index";
import FormHeaderVue from "src/components/forms/FormHeader.vue";
import { useWithdrawalStore } from "src/stores/withdrawal/index";

export default defineComponent({
  name: "withdrawalslip",
  setup() {
    const formheaders = useFormHeadersStore();
    const formHeader = formheaders[getCurrentInstance().type.name];
    const withdrawalstore = useWithdrawalStore();
    const withdrawalslipdetails = computed(() => withdrawalstore.withdrawalslipdetails)

    return {
      formheaders,
      formHeader,
      withdrawalstore,
      withdrawalslipdetails
    };
  },
  components: {
    FormHeaderVue
  }
});
</script>
