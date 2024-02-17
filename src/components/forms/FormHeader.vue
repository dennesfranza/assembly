<template>
  <div class="row items-center">
    <div class="col items-center">
      <div class="row">
        <h2>{{ name }}</h2>
      </div>
    </div>
    <q-separator vertical inset color="black" />
    <div class="col-2 q-pa-sm">
      <div class="row" v-for="header in headers" :key="header.label">
        <div class="col">
          <q-input v-model="header.model" :label="header.label" readonly />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
};
</script>
