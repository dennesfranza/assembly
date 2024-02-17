<template>
  <q-page class="q-pa-sm">
    <form-header-vue :headers="formHeader.headers" :name="formHeader.name" />
    <div class="q-pt-md">
      <q-table
        :rows="rows"
        :columns="columns"
        row-key="name"
        :separator="'cell'"
        flat
        bordered
      >
        <template v-slot:header="props">
          <q-tr>
            <q-th></q-th>
            <q-th></q-th>
            <q-th colspan="2">Tool/Equipment/Facility</q-th>
            <q-th></q-th>
            <q-th></q-th>
            <q-th></q-th>
          </q-tr>
          <q-tr :props="props">
            <q-th v-for="col in props.cols" :key="col.name" :props="props">{{
              col.label
            }}</q-th>
          </q-tr>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, getCurrentInstance } from "vue";
import { useFormHeadersStore } from "src/stores/formheaders/index";
import FormHeaderVue from "src/components/forms/FormHeader.vue";
import { date } from "quasar";

export default defineComponent({
  name: "listtoolsequipfac",
  setup() {
    const formheaders = useFormHeadersStore();
    const formHeader = formheaders[getCurrentInstance().type.name];

    console.log(formHeader);

    return {
      formHeader,
      date: ref(date.formatDate(new Date(), "MMMM DD, YYYY HH:mm:ss")),
      item: ref("Welding Rod 60N x 1/8"),
      location: ref("Mandtra Residences Project Warehouse"),
      reorderPoint: ref(""),
      beginningBalance: ref("0"),
      dateFormat: "MMMM DD, YYYY HH:mm:ss",
      formattedDate: ref(date.formatDate(new Date(), "MMMM DD, YYYY HH:mm:ss")),
      columns: [
        {
          name: "item",
          label: "Item Number",
          field: "item",
          align: "left",
        },
        {
          name: "type",
          label: "Type (Toll/Equipment/Facility)",
          field: "type",
          align: "left",
        },
        {
          name: "name",
          label: "Name",
          field: "name",
          align: "left",
        },
        {
          name: "equipment_id",
          label: "Equipment ID",
          field: "equipment_id",
          align: "left",
        },
        {
          name: "model",
          label: "Maker/Brand/Model",
          field: "model",
          align: "left",
        },
        {
          name: "location",
          label: "Location",
          field: "location",
          align: "left",
        },
        {
          name: "remarks",
          label: "Remarks",
          field: "remarks",
          align: "left",
        },
      ],
      rows: [
        {
          item: "1",
          type: "PowerTool",
          name: "Grinder",
          equipment_id: "SI #422296",
          model: "Stanley",
          location: "Cebu",
          remarks: "",
        },
        {
          item: "2",
          type: "PowerTool",
          name: "Welding Machine",
          equipment_id: "SI #422296",
          model: "Makita",
          location: "Mandaue",
          remarks: "",
        },
        {
          item: "3",
          type: "PowerTool",
          name: "Wrench Socket",
          equipment_id: "SI #422296",
          model: "Flymann",
          location: "Talisay",
          remarks: "",
        },
        {
          item: "4",
          type: "PowerTool",
          name: "Grinder",
          equipment_id: "SI #422296",
          model: "Stanley",
          location: "Mandaue",
          remarks: "",
        },
        {
          item: "5",
          type: "PowerTool",
          name: "Grinder",
          equipment_id: "SI #422296",
          model: "Stanley",
          location: "Lapu-lapu",
          remarks: "",
        },
      ],
    };
  },
  components: {
    FormHeaderVue,
  },
});
</script>
