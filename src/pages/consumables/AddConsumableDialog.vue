<template>
  <q-page class="q-pa-sm">
    <q-dialog
      v-model="consumablesstore.addconsumableitemdialog"
      :backdrop-filter="'blur(4px)'"
      persistent
    >
      <q-card style="width: 700px; max-width: 80vw">
        <q-card-section>
          <h6>Add Consumable Item</h6>
        </q-card-section>
        <q-separator></q-separator>
        <q-card-section class="scroll">
          <div class="row items-center">
            <div class="col q-pa-sm">
              <q-input label="Name" v-model="createconsumableitem.name" filled>
                <template v-slot:prepend>
                  <q-icon name="123" />
                </template>
              </q-input>
            </div>
          </div>
          <div class="row items-center">
            <div class="col q-pa-sm">
              <q-input label="Description" v-model="createconsumableitem.description" filled>
                <template v-slot:prepend>
                  <q-icon name="description" />
                </template>
              </q-input>
            </div>
          </div>
          <div class="row items-center" style="max-width: 300px">
            <q-file v-model="createconsumableitem.image" label="Image" @update:model-value="onSelected()" clearable filled>
              <template v-slot:prepend>
                <q-icon name="attach_file" />
              </template>
            </q-file>
          </div>
          <div class="row items-center">
            <div class="col q-pa-sm">
              <q-img
                :src="createconsumableitem.imageurl"
                spinner-color="black"
                style="height: 140px; max-width: 150px"
              />
            </div>
          </div>
        </q-card-section>
        <q-separator></q-separator>
        <q-card-actions align="left">
          <q-btn
            outline
            label="Close"
            color="red"
            @click="consumablesstore.closeAddConsumableItemDialog()"
          ></q-btn>
          <q-btn
            outline
            label="Save"
            color="blue"
            :loading="consumablesstore.postconsumableitemloading"
            @click="consumablesstore.postConsumableItem()"
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
import { useConsumablesStore } from "src/stores/consumables/index";

export default defineComponent({
  name: "consumabledetails",
  setup() {
    const consumablesstore = useConsumablesStore();
    const createconsumableitem = computed(() => consumablesstore.createconsumableitem)

    return {
      consumablesstore,
      createconsumableitem,
    };
  },
  methods: {
    onSelected() {
      if (this.createconsumableitem.image != null) {
        this.createconsumableitem.imageurl = window.URL.createObjectURL(this.createconsumableitem.image)
      } else {
        this.createconsumableitem.imageurl = null
      }
    }
  }
});
</script>
