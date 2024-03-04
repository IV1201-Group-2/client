<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import { RESTError } from "@/util/error";
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { storeToRefs } from "pinia";

const authStore = useAuthStore();
const authStoreRefs = storeToRefs(authStore);
const i18n = useI18n();

const basePath = "applicant.login-page.";
const formPath = basePath + "form.";
const fieldsPath = formPath + "fields.";
const buttonsPath = formPath + "buttons.";

const username = ref("");
const password = ref("");

const loginError = ref(RESTError.None);
const loginErrorTranslation = ref("");

const showErrorDialog = computed(() => loginError.value !== RESTError.None);
const showResetDialog = ref(false);

const onLogin = async (username: string, password: string) => {
  loginError.value = await authStore.login(username, password);
  loginErrorTranslation.value = i18n.t(`error.${loginError.value}`);

  // Clear the error and show a reset dialog
  if (loginError.value === RESTError.MissingPassword) {
    loginError.value = RESTError.None;
    showResetDialog.value = true;
  }
};

const loginDisabled = computed(() => username.value.length === 0 || password.value.length === 0);
</script>

<template>
  <main>
    <v-sheet width="300" class="mx-auto">
      <h1>{{ $t(basePath + "header") }}</h1>
      <br />
      <v-form @submit.prevent>
        <v-text-field v-model="username" :label="$t(fieldsPath + 'username')" />
        <v-text-field v-model="password" type="password" :label="$t(fieldsPath + 'password')" />
        <v-btn type="submit" :disabled="loginDisabled" @click="onLogin(username, password)" block>{{
          $t(buttonsPath + "login")
        }}</v-btn>
      </v-form>
    </v-sheet>
    <v-dialog v-model="showErrorDialog" width="auto">
      <v-card :text="loginErrorTranslation">
        <v-card-actions>
          <v-btn color="primary" block @click="loginError = RESTError.None">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="showResetDialog" width="auto">
      <v-card :text="$t(formPath + 'resetEmail')">
        <a
          :style="{ fontSize: '12px', marginLeft: '40px', marginRight: '40px' }"
          :href="authStoreRefs.resetLink.value"
          >{{ authStoreRefs.resetLink }}</a
        >
        <v-card-actions class="justify-center">
          <v-btn color="primary" @click="showResetDialog = false">{{ $t(buttonsPath + "cancel") }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </main>
</template>

<style scoped>
h1 {
  text-align: center;
}
</style>
