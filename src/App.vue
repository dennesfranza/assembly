<template>
  <router-view />
</template>

<script>
import { defineComponent, onMounted } from "vue";
import { useLocationStore } from "./stores/location/index";
import { useUserStore } from "./stores/users/index";

export default defineComponent({
  name: "App",
  setup() {
    const locationstore = useLocationStore();
    const userstore = useUserStore();

    onMounted(() => locationstore.loadLocations());
    onMounted(() => userstore.loadAllUsers());

    return {
      locationstore,
    };
  },
});
</script>
