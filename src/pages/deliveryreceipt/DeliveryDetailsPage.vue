<template>
  <q-page class="q-pa-sm">
    <q-dialog v-model="deliveryreceiptstore.deliveryreceiptdetailspagedialog" persistent maximized>
      <q-card>
        <q-card-section>
          <form-header-vue :headers="formHeader.headers" :name="formHeader.name" />
        </q-card-section>
        <q-separator></q-separator>
        <q-card-section>
          <div class="row items-center">
            <div class="col q-pa-sm">
              <q-input v-model="deliveryreceiptdetails.invoice_number" label="Invoice Number/Delivery Receipts" readonly>
                <template v-slot:prepend>
                  <q-icon name="123" color="black" />
                </template>
              </q-input>
            </div>
            <div class="col q-pa-sm">
              <q-input v-model="deliveryreceiptdetails.address" label="Delivered To" readonly>
                <template v-slot:prepend>
                  <q-icon name="map" color="black" />
                </template>
              </q-input>
            </div>
            <div class="col q-pa-sm">
              <q-input v-model="deliveryreceiptdetails.date" label="Date" readonly>
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
              :rows="deliveryreceiptdetailsitems"
              :columns="deliveryreceiptdetailscolumns"
              row-key="rs_number"
              :separator="'vertical'"
              auto-width
              flat
              bordered
            ></q-table>
          </div>
        </q-card-section>
        <q-card-section>
          <div class="row q-pa-md">
            <div class="col q-pa-sm">
              <q-input v-model="deliveryreceiptdetails.prepared_by" label="Prepared By" readonly>
                <template v-slot:prepend>
                  <q-icon name="fact_check" color="black" />
                </template>
              </q-input>
            </div>
            <div class="col q-pa-sm">
              <q-input v-model="deliveryreceiptdetails.delivered_by" label="Delivered By" readonly>
                <template v-slot:prepend>
                  <q-icon name="fact_check" color="black" />
                </template>
              </q-input>
            </div>
          </div>
          <div class="row q-pa-md">
            <div class="col q-pa-sm">
              <q-input
                label="Received the above goods in good order & condition"
                readonly
              />
            </div>
          </div>
          <div class="row q-pa-md">
            <div class="col q-pa-sm">
              <q-input v-model="deliveryreceiptdetails.received_by" label="Received By" readonly>
                <template v-slot:prepend>
                  <q-icon name="fact_check" color="black" />
                </template>
              </q-input>
            </div>
            <div class="col q-pa-sm">
              <q-input v-model="deliveryreceiptdetails.noted_by" label="Noted By" readonly>
                <template v-slot:prepend>
                  <q-icon name="fact_check" color="black" />
                </template>
              </q-input>
            </div>
          </div>
          <div class="row q-pa-md">
            <div class="col q-pa-sm">
              <q-input v-model="deliveryreceiptdetails.received_date" label="Date Received" readonly>
                <template v-slot:prepend>
                  <q-icon name="calendar_month" color="black" />
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
            @click="deliveryreceiptstore.closeDeliveryDetailsDialog()"
          />
        </q-card-actions>
        <q-inner-loading :showing="deliveryreceiptstore.deliveryreceiptdetailsloadingpage">
          <q-spinner-gears size="50px" color="primary" />
        </q-inner-loading>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { defineComponent, ref, getCurrentInstance } from "vue";
import { useFormHeadersStore } from "src/stores/formheaders/index";
import FormHeaderVue from "src/components/forms/FormHeader.vue";
import { useDeliveryReceiptStore } from "src/stores/deliveryreceipt/index";
import { computed } from "vue";

export default defineComponent({
  name: 'deliveryreciept',
  setup () {
    const formheaders = useFormHeadersStore();
    const formHeader = formheaders[getCurrentInstance().type.name];
    const deliveryreceiptstore = useDeliveryReceiptStore()
    const deliveryreceiptdetailscolumns = computed(() => deliveryreceiptstore.deliveryreceiptdetailscolumns)
    const deliveryreceiptdetailsitems = computed(() => deliveryreceiptstore.deliveryreceiptdetailsitems)
    const deliveryreceiptdetails = computed(() => deliveryreceiptstore.deliveryreceiptdetails)

    return {
      formheaders,
      formHeader,
      deliveryreceiptstore,
      deliveryreceiptdetailscolumns,
      deliveryreceiptdetailsitems,
      deliveryreceiptdetails
    }
  },
  components: {
    FormHeaderVue
  }
})
</script>
