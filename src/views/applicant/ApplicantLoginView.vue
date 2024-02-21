<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import { RESTError } from "@/util/error";
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const { login, resetPassword } = useAuthStore();
const i18n = useI18n();

const basePath = "applicant.login-page.";
const formPath = basePath + "form.";
const fieldsPath = formPath + "fields.";
const buttonsPath = formPath + "buttons.";

const username = ref("");
const password = ref("");
const newPassword = ref("");

const loginError = ref(RESTError.None);
const loginErrorTranslation = ref("");

const showErrorDialog = computed(() => loginError.value !== RESTError.None);
const showResetDialog = ref(false);

const onLogin = async (username: string, password: string) => {
  loginError.value = await login(username, password);
  loginErrorTranslation.value = i18n.t(`error.${loginError.value}`);

  // Clear the error and show a reset dialog
  if (loginError.value === RESTError.MissingPassword) {
    newPassword.value = "";
    loginError.value = RESTError.None;
    showResetDialog.value = true;
  }
};

const onResetPassword = async (password: string) => {
  loginError.value = await resetPassword(password);
  loginErrorTranslation.value = i18n.t(`error.${loginError.value}`);
  showResetDialog.value = false;
};

const loginDisabled = computed(() => username.value.length === 0 || password.value.length === 0);
const resetDisabled = computed(() => newPassword.value.length === 0);
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
      <v-card :text="$t(formPath + 'resetRequired')">
        <v-text-field class="mx-6" v-model="newPassword" :label="$t(fieldsPath + 'password')" />
        <v-card-actions class="justify-center">
          <v-btn color="primary" :disabled="resetDisabled" @click="onResetPassword(password)">Reset</v-btn>
          <v-btn color="primary" @click="showResetDialog = false">Cancel</v-btn>
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
