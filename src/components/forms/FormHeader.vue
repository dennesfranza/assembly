<template>
  <div class="row items-center">
    <div class="col items-center">
      <div class="row">
        <h2 v-if="$q.platform.is.desktop">{{ name }}</h2>
        <h6 v-if="$q.platform.is.mobile">{{ name }}</h6>
      </div>
    </div>
    <q-separator vertical inset color="black" />
    <div class="col-md-2 col-sm-4 q-pa-sm">
      <div class="row" v-for="header in headers" :key="header.label">
        <div class="col">
          <q-input v-model="header.model" :label="header.label" readonly />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useQuasar } from "quasar";

export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    headers: {
      type: Array,
      required: true,
    },
  },
  setup() {
    const $q = useQuasar();
  },
};
</script>
