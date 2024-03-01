<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import { RESTError } from "@/util/error";
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import router from "@/router";

const authStore = useAuthStore();
const i18n = useI18n();

const basePath = "applicant.login-page.";
const formPath = basePath + "form.";
const fieldsPath = formPath + "fields.";
const buttonsPath = formPath + "buttons.";

const newPassword = ref("");

const resetError = ref(RESTError.None);
const resetErrorTranslation = ref("");

const identity = ref("");

const showErrorDialog = computed(() => resetError.value !== RESTError.None);
const showResetDialog = computed(() => !showErrorDialog.value);

const token = router.currentRoute.value.query.token as string;
if (token) {
  try {
    const decodedToken = authStore.parseJwt(token);
    if (decodedToken.username) {
      identity.value = decodedToken.username;
    } else if (decodedToken.email) {
      identity.value = decodedToken.email;
    }
  } catch (e) {
    resetError.value = RESTError.InvalidToken;
    resetErrorTranslation.value = i18n.t(`error.${resetError.value}`);
  }
} else {
  resetError.value = RESTError.InvalidToken;
  resetErrorTranslation.value = i18n.t(`error.${resetError.value}`);
}

const onResetPassword = async (password: string) => {
  resetError.value = await authStore.resetPassword(token, password);
  resetErrorTranslation.value = i18n.t(`error.${resetError.value}`);
  router.replace({ path: "/", query: { token: "" } });
};

const onCancel = () => {
  router.replace({ path: "/", query: { token: "" } });
};

const resetDisabled = computed(() => newPassword.value.length === 0);
</script>

<template>
  <v-dialog v-model="showResetDialog" width="auto">
    <v-card :text="$t(formPath + 'resetTitle', { user: identity })">
      <v-text-field class="mx-6" v-model="newPassword" type="password" :label="$t(fieldsPath + 'password')" />
      <v-card-actions class="justify-center">
        <v-btn color="primary" :disabled="resetDisabled" @click="onResetPassword(newPassword)">{{
          $t(buttonsPath + "reset")
        }}</v-btn>
        <v-btn color="primary" @click="onCancel()">{{ $t(buttonsPath + "cancel") }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-dialog v-model="showErrorDialog" width="auto">
    <v-card :text="resetErrorTranslation">
      <v-card-actions>
        <v-btn color="primary" block @click="onCancel()">OK</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
