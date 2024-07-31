<template>
  <q-page class="q-pa-sm">
    <q-dialog v-model="receivingstore.detailsdialog" persistent maximized>
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
              <q-input v-model="receivingdetails.rr_no" label="RR Number" readonly />
            </div>
            <div class="col q-pa-sm">
              <q-input v-model="receivingdetails.invoice_dr_no" label="Invoice/DR Number" readonly />
            </div>
            <div class="col q-pa-sm">
              <q-input class="fit" v-model="receivingdetails.date" label="Date" readonly>
                <template v-slot:prepend>
                  <q-icon name="event" />
                </template>
              </q-input>
            </div>
          </div>
        </q-card-section>
        <q-card-section>
          <div class="q-pt-md">
            <q-table
              :rows="receivingdetails.receiving_report_items"
              :columns="receivingstore.tabledetailscolumns"
              row-key="item_number"
              :separator="'vertical'"
              auto-width
              flat
              bordered
            />
          </div>
        </q-card-section>
        <q-card-section>
          <div class="row items-center">
            <div class="col q-pa-sm">
              <q-input v-model="receivingdetails.received_by" label="Received By" readonly />
            </div>
            <div class="col q-pa-sm">
              <q-input v-model="receivingdetails.confirmed_by" label="Confirmed By" readonly>
                <template v-slot:prepend>
                  <q-icon name="fact_check" color="black" />
                </template>
              </q-input>
            </div>
            <div class="col q-pa-sm">
              <q-input v-model="receivingdetails.report_from" label="Report From" readonly />
            </div>
            <div class="col q-pa-sm">
              <q-input
                v-model="receivingdetails.verified_by"
                label="Verified By (Purchasing)"
                readonly
              >
                <template v-slot:prepend>
                  <q-icon name="fact_check" color="black" />
                </template>
              </q-input>
            </div>
          </div>
        </q-card-section>
        <q-card-actions>
          <q-btn
            outline
            label="Close"
            color="red"
            @click="receivingstore.closeReceivingDetailsDialog()"
          />
        </q-card-actions>
        <q-inner-loading :showing="receivingstore.retrieveitemloading">
          <q-spinner-gears size="50px" color="primary" />
        </q-inner-loading>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { defineComponent, ref, getCurrentInstance, computed } from "vue";
import { useFormHeadersStore } from "src/stores/formheaders/index";
import { useReceivingStore } from "src/stores/receiving/index";
import FormHeaderVue from "src/components/forms/FormHeader.vue";

export default defineComponent({
  name: "receivingreport",
  setup() {
    const formheaders = useFormHeadersStore();
    const formHeader = formheaders[getCurrentInstance().type.name];
    const receivingstore = useReceivingStore();
    const receivingdetails = computed(() => receivingstore.receivingdetails);

    return {
      formheaders,
      formHeader,
      receivingstore,
      receivingdetails,
    };
  },
  components: {
    FormHeaderVue,
  },
});
</script>
