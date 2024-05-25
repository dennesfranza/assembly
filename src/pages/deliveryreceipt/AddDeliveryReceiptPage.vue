<template>
  <q-page class="q-pa-sm">
    <form-header-vue :headers="formHeader.headers" :name="`Create ${formHeader.name}`" />
    <div class="row items-center">
      <div class="col q-pa-sm">
        <div class="col q-pa-sm">
          <q-input v-model="deliverystore" label="Delivered To">
            <template v-slot:prepend>
              <q-icon name="123" color="black" />
            </template>
          </q-input>
        </div>
      </div>
      <div class="col q-pa-sm">
        <q-select label="Address" :options="locationstore.locationOptions" map-options emit-value v-model="deliverystore">
          <template v-slot:prepend>
            <q-icon name="map" color="black" />
          </template>
        </q-select>
      </div>
      <div class="col q-pa-sm">
        <q-input class="fit" v-model="deliverystore" label="Date">
          <template v-slot:prepend>
            <q-icon name="event" class="cursor-pointer" color="black">
              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date v-model="deliverystore" :mask="deliverystore.dateFormat" today-btn>
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>
    </div>
    <div class="q-pt-md">
      <q-table
        title="Items List"
        :rows="deliverystore.deliveryreceiptpayload.deliveryreceiptpayloaditems"
        :columns="deliverystore.tablecreatecolumns"
        selection="single"
        v-model:selected="selected"
        row-key="item_number"
        :separator="'vertical'"
        auto-width
        flat
        bordered
      >
        <template v-slot:top-right>
          <q-btn class="q-mr-sm" color="primary" :disable="loading" icon="add">
            <q-tooltip class="bg-accent">Add Item</q-tooltip>
          </q-btn>
          <q-btn class="q-mr-sm" color="primary" :disable="loading" icon="remove">
            <q-tooltip class="bg-accent">Remove Item</q-tooltip>
          </q-btn>
          <q-btn class="q-mr-sm" color="primary" :disable="loading" icon="restart_alt">
            <q-tooltip class="bg-accent">Reset</q-tooltip>
          </q-btn>
          <q-btn class="q-mr-sm" color="primary" :loading="deliverystore.postdeliveryreceiptitemloading" icon="save">
            <q-tooltip class="bg-accent">Save</q-tooltip>
          </q-btn>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, getCurrentInstance, computed } from "vue";
import { useFormHeadersStore } from "src/stores/formheaders/index";
import { useDeliveryReceiptStore } from "src/stores/deliveryreceipt/index";
import { useLocationStore } from "src/stores/location/index";
import FormHeaderVue from "src/components/forms/FormHeader.vue";

export default defineComponent({
  name: 'deliveryreciept',
  setup() {
    const formheaders = useFormHeadersStore();
    const formHeader = formheaders[getCurrentInstance().type.name];
    const deliverystore = useDeliveryReceiptStore()
    const locationstore = useLocationStore();

    return {
      formheaders,
      formHeader,
      deliverystore,
      locationstore,
      selected: ref([])
    }
  },
  components: {
    FormHeaderVue,
  }
})
</script>
