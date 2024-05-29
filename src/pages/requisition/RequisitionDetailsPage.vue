<template>
  <q-page class="q-pa-sm">
    <q-dialog v-model="requeststore.requisitiondetailspagedialog" persistent maximized>
      <q-card>
        <q-card-section>
          <form-header-vue :headers="formHeader.headers" :name="formHeader.name" />
        </q-card-section>
        <q-card-section>
          <div class="row items-center">
            <div class="col q-pa-sm">
              <q-input v-model="requeststore.requisitiondetails.rs_number" label="RS Number" readonly>
                <template v-slot:prepend>
                  <q-icon name="123" color="black" />
                </template>
              </q-input>
            </div>
            <div class="col q-pa-sm">
              <q-input v-model="requeststore.requisitiondetails.date_requested" label="Date Requested" readonly>
                <template v-slot:prepend>
                  <q-icon name="calendar_month" color="black" />
                </template>
              </q-input>
            </div>
            <div class="col q-pa-sm">
              <q-input class="fit" v-model="requeststore.requisitiondetails.date_needed" label="Date Needed" readonly>
                <template v-slot:prepend>
                  <q-icon name="calendar_month" color="black" />
                </template>
              </q-input>
            </div>
            <div class="col q-pa-sm">
              <q-input class="fit" v-model="requeststore.requisitiondetails.location" label="Location" readonly>
                <template v-slot:prepend>
                  <q-icon name="map" color="black" />
                </template>
              </q-input>
            </div>
          </div>
        </q-card-section>
        <q-card-section>
          <div class="q-pt-md">
            <q-table
              :rows="requeststore.requisitiondetailsitems"
              :columns="requeststore.tablecreatecolumns"
              row-key="item_number"
              :separator="'vertical'"
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
              <q-input v-model="requeststore.requisitiondetails.requested_by" label="Requested By" readonly>
                <template v-slot:prepend>
                  <q-icon name="fact_check" color="green" />
                </template>
              </q-input>
            </div>
            <div class="col q-pa-sm">
              <q-input v-model="requeststore.requisitiondetails.approved_by" label="Approved By" readonly>
                <template v-slot:prepend>
                  <q-icon name="fact_check" color="orange" />
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
            @click="requeststore.closeRequisitionDetailsDialog()"
          />
        </q-card-actions>
        <q-inner-loading :showing="requeststore.requisitiondetailsloadingpage">
          <q-spinner-gears size="50px" color="primary" />
        </q-inner-loading>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { defineComponent, ref, getCurrentInstance } from "vue";
import { useFormHeadersStore } from "src/stores/formheaders/index";
import { useRequisitionStore } from "src/stores/requisition/index";
import FormHeaderVue from "src/components/forms/FormHeader.vue";

export default defineComponent({
  name: 'requisitionslip',
  props: {
    id: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const formheaders = useFormHeadersStore();
    const formHeader = formheaders[getCurrentInstance().type.name];
    const requeststore = useRequisitionStore();

    return {
      formheaders,
      formHeader,
      requeststore
    }
  },
  components: {
    FormHeaderVue
  }
})
</script>
