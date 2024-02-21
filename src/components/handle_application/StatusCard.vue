<script setup lang="ts">
import type { Statuses, StatusKeys } from "@/util/types";
import { statuses } from "@/util/constants";
import { computed, ref } from "vue";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/auth";
import { useStatusStore } from "@/stores/status";
import { useErrorStore } from "@/stores/error";
import { useI18n } from "vue-i18n";
import { BASE_URL } from "@/util/api";
const { loginToken } = storeToRefs(useAuthStore());
const { applicantId, status } = storeToRefs(useStatusStore());
const { showGenericErrorMsg } = useErrorStore();
const { t } = useI18n();

const basePath = "recruiter.handle-application.";
const statusPath = basePath + "status.";
const actionsPath = statusPath + "actions.";
const undoMsgPath = statusPath + "undo-message.";

const applicantStatus = ref(statuses[(status.value.charAt(0).toLowerCase() + status.value.slice(1)) as keyof Statuses]);
const isHandled = computed(() => applicantStatus.value.i18nPath !== statuses.pending.i18nPath);
const dialogIsVisible = ref(false);
const undoMsgBody = computed(() => t(undoMsgPath + "body"));

function accept() {
  submitStatus(statuses.accept.i18nPath as keyof Statuses);
}

function reject() {
  submitStatus(statuses.reject.i18nPath as keyof Statuses);
}

function undo() {
  submitStatus(statuses.pending.i18nPath as keyof Statuses);
  hideDialog();
}

function showDialog() {
  dialogIsVisible.value = true;
}

function hideDialog() {
  dialogIsVisible.value = false;
}

function submitStatus(statusKey: StatusKeys) {
  fetch(BASE_URL.APPLICATION_STATUS + "/api/applicant", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer:${loginToken.value}`
    },
    body: JSON.stringify({ person_id: applicantId.value, status: captializeFirstLetter(statuses[statusKey].i18nPath) })
  })
    .then((response) => {
      if (response.status !== 200) {
        showGenericErrorMsg();
      } else {
        applicantStatus.value = statuses[statusKey];
      }
    })
    .catch(() => showGenericErrorMsg());

  function captializeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}
</script>

<template>
  <v-card variant="outlined" max-width="200" class="ml-3">
    <template #title>
      {{ $t(statusPath + "header") }}
    </template>
    <v-card-item>
      <v-chip :color="applicantStatus.color" :append-icon="applicantStatus.icon">
        {{ $t(statusPath + applicantStatus.i18nPath) }}
      </v-chip>
    </v-card-item>
    <v-card-actions>
      <v-dialog v-if="isHandled" v-model="dialogIsVisible" width="auto">
        <template #activator="{ props }">
          <v-btn v-bind="props" @click="showDialog">
            {{ $t(actionsPath + "undo") }}
          </v-btn>
        </template>

        <v-card>
          <v-card-title>
            {{ $t(undoMsgPath + "header") }}
          </v-card-title>
          <v-card-text class="text-center">
            <div v-html="undoMsgBody" />
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red" @click="hideDialog">{{ $t(undoMsgPath + "no") }}</v-btn>
            <v-btn color="success" @click="undo">{{ $t(undoMsgPath + "yes") }}</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-btn v-if="!isHandled" color="red" class="mr-2" @click="reject">{{ $t(actionsPath + "reject") }}</v-btn>
      <v-btn v-if="!isHandled" color="success" @click="accept">{{ $t(actionsPath + "accept") }}</v-btn>
    </v-card-actions>
  </v-card>
</template>
