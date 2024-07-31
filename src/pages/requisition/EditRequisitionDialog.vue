<template>
  <q-page class="q-pa-sm">
    <q-dialog v-model="requisitioneditdialog" persistent maximized>
      <q-card>
        <q-card-section>
          <form-header-vue
            :headers="formHeader.headers"
            :name="formHeader.name"
          />
        </q-card-section>
        {{ requisitionedit }}
        <q-card-section>
          <div class="row items-center">
            <div class="col q-pa-sm">
              <q-input
                v-model="requisitionedit.rs_number"
                label="RS Number"
                readonly
              >
                <template v-slot:prepend>
                  <q-icon name="123" color="black" />
                </template>
              </q-input>
            </div>
            <div class="col q-pa-sm">
              <q-input
                v-model="requisitionedit.date_requested"
                label="Date Requested"
                readonly
              >
                <template v-slot:prepend>
                  <q-icon name="calendar_month" color="black" />
                </template>
              </q-input>
            </div>
            <div class="col q-pa-sm">
              <q-input
                class="fit"
                v-model="requisitionedit.date_needed"
                label="Date Needed"
                readonly
              >
                <template v-slot:prepend>
                  <q-icon name="calendar_month" color="black" />
                </template>
              </q-input>
            </div>
            <div class="col q-pa-sm">
              <q-input
                class="fit"
                v-model="requisitionedit.location_label"
                label="Location"
                readonly
              >
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
              title="Requisition Items"
              row-key="id"
              selection="single"
              :rows="requeststore.requisitionedit.requisition_request_items"
              :columns="requeststore.requisitioneditcolumns"
              :separator="'vertical'"
              auto-width
              flat
              bordered
              v-model:selected="itemselected"
            >
              <template v-slot:top-right>
                <q-btn
                  class="q-mr-sm"
                  color="primary"
                  icon="add"
                  @click="onAddClick"
                >
                  <q-tooltip class="bg-accent">Add Item</q-tooltip>
                </q-btn>
                <q-btn
                  class="q-mr-sm"
                  color="primary"
                  icon="edit"
                  v-if="hasEditItemSelection"
                  @click="onEditClick"
                >
                  <q-tooltip class="bg-accent">Edit Item</q-tooltip>
                </q-btn>
                <q-btn
                  class="q-mr-sm"
                  color="primary"
                  icon="remove"
                  v-if="hasEditItemSelection"
                  :loading="requeststore.removerequisitionitemloading"
                  @click="onRemoveClick"
                >
                  <q-tooltip class="bg-accent">Remove Item</q-tooltip>
                </q-btn>
              </template>
            </q-table>
          </div>
        </q-card-section>
        <q-card-actions>
          <q-btn
            outline
            label="Close"
            color="red"
            @click="requeststore.closeRequisitionDetailsDialog()"
          />
          <q-btn
            outline
            label="Update"
            color="primary"
            :loading="requeststore.updaterequisitioneditloading"
            @click="requeststore.updateRequisitionRequest()"
          />
        </q-card-actions>
        <q-inner-loading :showing="requeststore.requisitiondetailsloadingpage">
          <q-spinner-gears size="50px" color="primary" />
        </q-inner-loading>
      </q-card>
    </q-dialog>
    <EditRequisitionItemsDialog :id="id" />
  </q-page>
</template>

<script>
import { defineComponent, ref, getCurrentInstance, computed } from "vue";
import { useFormHeadersStore } from "src/stores/formheaders/index";
import { useRequisitionStore } from "src/stores/requisition/index";
import FormHeaderVue from "src/components/forms/FormHeader.vue";
import EditRequisitionItemsDialog from "./EditRequisitionItemsDialog.vue";

export default defineComponent({
  name: "requisitionslip",
  setup() {
    const formheaders = useFormHeadersStore();
    const formHeader = formheaders[getCurrentInstance().type.name];
    const requeststore = useRequisitionStore();
    const editable = computed(() => requeststore.editable);
    const requisitionedit = computed(() => requeststore.requisitionedit);
    const requisitioneditdialog = computed(
      () => requeststore.requisitioneditdialog
    );
    const requisitiondetailsitems = computed(
      () => requeststore.requisitiondetailsitems
    );
    const requisitiondetailscolumns = computed(
      () => requeststore.requisitiondetailscolumns
    );
    const itemselected = computed({
      get: () => requeststore.itemselected,
      set: (value) => (requeststore.itemselected = value),
    });
    const hasEditItemSelection = computed(
      () => requeststore.hasEditItemSelection
    );

    return {
      formheaders,
      formHeader,
      requeststore,
      editable,
      requisitionedit,
      requisitioneditdialog,
      requisitiondetailsitems,
      requisitiondetailscolumns,
      itemselected,
      hasEditItemSelection,
      id: ref('')
    };
  },
  methods: {
    onEditClick() {
      let _id = this.itemselected[0].id
      let objIndex = this.requisitionedit.requisition_request_items.findIndex(a => a.id === _id)
      this.id = objIndex
      this.requeststore.openAddEditDialog();
    },
    onRemoveClick() {
      this.requeststore.removeRequisitionItem(this.itemselected[0].id);
    },
    onAddClick() {

    }
  },
  components: {
    FormHeaderVue,
    EditRequisitionItemsDialog,
  },
});
</script>
