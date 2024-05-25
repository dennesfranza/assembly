<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex bg-image flex-center">
        <q-card
          v-bind:style="$q.screen.lt.sm ? { width: '80%' } : { width: '30%' }"
        >
          <q-card-section>
            <q-avatar size="103px" class="absolute-center shadow-10">
              <img src="profile.svg" />
            </q-avatar>
          </q-card-section>
          <q-card-section>
            <div class="text-center q-pt-lg">
              <div class="col text-h6 ellipsis">Log in</div>
            </div>
          </q-card-section>
          <q-card-section>
            <q-form class="q-gutter-md">
              <q-input
                filled
                v-model="loginstore.credentials.username"
                label="Username"
                lazy-rules
              />

              <q-input
                type="password"
                filled
                v-model="loginstore.credentials.password"
                label="Password"
                lazy-rules
              />

              <div>
                <q-btn
                  label="Login"
                  :loading="loginstore.loginloadingpage"
                  type="button"
                  color="primary"
                  @click="loginstore.userLogin()"
                />
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref, getCurrentInstance, computed } from "vue";
import { useLoginStore } from "src/stores/login/index";

export default defineComponent({
  name: "login",
  setup() {
    const loginstore = useLoginStore();

    return {
      loginstore,
    };
  },
});
</script>

<style>
.bg-image {
  background-image: linear-gradient(135deg, #7028e4 0%, #e5b2ca 100%);
}
</style>
