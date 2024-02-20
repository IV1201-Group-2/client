<script setup lang="ts">
import type { Statuses, StatusKeys } from "@/util/types";
import { statuses } from "@/util/constants";
import { computed, ref } from "vue";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/auth";
import { useStatusStore } from "@/stores/status"
import { useI18n } from "vue-i18n";;
const { loginToken } = storeToRefs(useAuthStore());
const { applicantId } = storeToRefs(useStatusStore());
const { t } = useI18n();

console.log(applicantId.value)

const basePath = "recruiter.handle-application.";
const statusPath = basePath + "status.";
const actionsPath = statusPath + "actions.";
const undoMsgPath = statusPath + "undo-message.";

const status = ref(statuses.pending);
const isHandled = computed(() => status.value.i18nPath !== statuses.pending.i18nPath);
const dialogIsVisible = ref(false);
const undoMsgBody = computed(() => t(undoMsgPath + "body"));

function accept() {
  submitStatus(statuses.accepted.i18nPath as keyof Statuses);
}

function reject() {
  submitStatus(statuses.rejected.i18nPath as keyof Statuses);
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
  console.log(JSON.stringify({ person_id: applicantId.value, status: captializeFirstLetter(statuses[statusKey].i18nPath) }))
  fetch("https://application-status-service-e3dff919c7c0.herokuapp.com/api/applicant", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer:${loginToken.value}`
    },
    body: JSON.stringify({ person_id: applicantId.value, status: captializeFirstLetter(statuses[statusKey].i18nPath) })
  }).then((response) => {
    if (response.status !== 200) {
      throw "could not set status. error code: " + response.status
    } else {
      status.value = statuses[statusKey]
    }
  });
  
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
      <v-chip :color="status.color" :append-icon="status.icon">
        {{ $t(statusPath + status.i18nPath) }}
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
