<script setup lang="ts">
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

type StatusKeys = "accepted" | "pending" | "rejected";

type Statuses = {
  [status in StatusKeys]: {
    i18nPath: string;
    icon: string;
    color: string;
  };
};

const basePath = "recruiter.handle-application.";
const statusPath = basePath + "status.";
const actionsPath = statusPath + "actions.";
const undoMsgPath = statusPath + "undo-message.";

const statuses: Statuses = {
  accepted: {
    i18nPath: "accepted",
    icon: "mdi-check-circle",
    color: "success"
  },
  pending: {
    i18nPath: "pending",
    icon: "mdi-minus-circle",
    color: "orange"
  },
  rejected: {
    i18nPath: "rejected",
    icon: "mdi-close-circle",
    color: "red"
  }
};

const status = ref(statuses.pending);
const isHandled = computed(() => status.value.i18nPath !== statuses.pending.i18nPath);
const dialogIsVisible = ref(false);
const undoMsgBody = computed(() => t(undoMsgPath + "body"));

function accept() {
  status.value = statuses.accepted;
}

function reject() {
  status.value = statuses.rejected;
}

function undo() {
  status.value = statuses.pending;
  hideDialog();
}

function showDialog() {
  dialogIsVisible.value = true;
}

function hideDialog() {
  dialogIsVisible.value = false;
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
