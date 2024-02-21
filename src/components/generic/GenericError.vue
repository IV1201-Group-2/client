<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useErrorStore } from "@/stores/error";
import { useAuthStore } from "@/stores/auth";
import { useI18n } from "vue-i18n";
import router from "@/router";
import { computed } from "vue";
const errorStore = useErrorStore();
const authStore = useAuthStore();
const { t } = useI18n();
const { genericErrorMsgIsVisible, specificMsg } = storeToRefs(errorStore);
const { logout } = authStore;
const { hideGenericErrorMsg } = errorStore;

const basePath = "generic-error.";

const msg = computed(() => t(basePath + (specificMsg.value ? specificMsg.value : "generic-msg")));

function resetPage() {
  logout();
  router.push("/")
  hideGenericErrorMsg();
}
</script>

<template>
  <v-dialog persistent v-model="genericErrorMsgIsVisible" width="auto">
    <v-card>
      <v-card-title>
        {{ $t(basePath + "header") }}
      </v-card-title>
      <v-card-text>
        <div v-html="msg" />
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="resetPage">{{ $t(basePath + "take-me-back") }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>