<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import { RESTError } from "@/util/error";
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const { login } = useAuthStore();
const i18n = useI18n();

const basePath = "applicant.login-page.";
const formPath = basePath + "form.";
const fieldsPath = formPath + "fields.";
const buttonsPath = formPath + "buttons.";

const username = ref("");
const password = ref("");

const loginError = ref(RESTError.None);
const loginErrorTranslation = ref("");
const showDialog = computed(() => loginError.value !== RESTError.None);

const onLogin = async (username: string, password: string) => {
  loginError.value = await login(username, password);
  loginErrorTranslation.value = i18n.t(`error.${loginError.value}`);
};
</script>

<template>
  <main>
    <v-sheet width="300" class="mx-auto">
      <h1>{{ $t(basePath + "header") }}</h1>
      <br />
      <v-form @submit.prevent>
        <v-text-field v-model="username" :label="$t(fieldsPath + 'username')" />
        <v-text-field v-model="password" :label="$t(fieldsPath + 'password')" />
        <v-btn type="submit" @click="onLogin(username, password)" block>{{ $t(buttonsPath + "login") }}</v-btn>
      </v-form>
    </v-sheet>
    <v-dialog v-model="showDialog" width="auto">
      <v-card :text="loginErrorTranslation">
        <v-card-actions>
          <v-btn color="primary" block @click="loginError = RESTError.None">OK</v-btn>
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
