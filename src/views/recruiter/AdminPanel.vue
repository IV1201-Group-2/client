<script setup lang="ts">
import type { ApplicantRow } from "@/util/types"
import { computed, ref, type Ref } from "vue";
import { statuses } from "@/util/constants";
import router from "@/router";
import { storeToRefs } from "pinia";
import { useStatusStore } from "@/stores/status";
import { useAuthStore } from "@/stores/auth";
import { useErrorStore } from "@/stores/error";
import { useI18n } from "vue-i18n";
import { BASE_URL } from "@/util/api";
const { setApplicant } = useStatusStore();
const { loginToken } = storeToRefs(useAuthStore());
const { showGenericErrorMsg } = useErrorStore();
const { t } = useI18n();

interface Applications {
  applications: Omit<ApplicantRow, "actions">[]
  errors: Array<[error: string]>
}

const { basePath, statusPath, tableHeaderPath, tableFooterPath, tooltipPath } = initPaths();

const header = computed(() => t(basePath + "header"));

const firstName = computed(() => t(tableHeaderPath + "first-name"));
const lastName = computed(() => t(tableHeaderPath + "last-name"));
const personNumber = computed(() => t(tableHeaderPath + "person-number"));
const email = computed(() => t(tableHeaderPath + "email"));
const status = computed(() => t(tableHeaderPath + "status"));
const actions = computed(() => t(tableHeaderPath + "actions"));

const itemsPerPageText = computed(() => t(tableFooterPath + "items-per-page-text"));
const viewTooltip = computed(() => t(tooltipPath + "view"));

const rows: Ref<ApplicantRow[]> = ref([])

const headers: any = [
  { title: firstName, align: "start", key: "personal_info.name" },
  { title: lastName, align: "start", key: "personal_info.surname" },
  { title: personNumber, align: "start", key: "personal_info.pnr" },
  { title: email, align: "start", key: "personal_info.email" },
  { title: status, align: "start", key: "status" },
  { title: actions, align: "center", key: "actions" }
];


fetch(BASE_URL.RECRUITER + "/api/applications/", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${loginToken.value}`
  }
}).then(response => {
  if(response.status === 200) {
    response.json().then((result)  => {
      const applications: ApplicantRow[] = (result as Array<ApplicantRow>).map(application => ({ ...application, status: application.status === "UNHANDLED" ? "Pending" : application.status, actions: 'mdi-eye' }));
      rows.value = applications;
    })
  } else if(response.status === 206) {
    response.json().then((result) => {
      const applications: ApplicantRow[] = (result as Applications).applications.map(application => ({ ...application, actions: 'mdi-eye' }));
      rows.value = applications;
    })
  }
}).catch(_ => showGenericErrorMsg("cannot-fetch-applications"))

function initPaths() {
  const basePath = "recruiter.admin-panel.";
  const tablePath = basePath + "table.";

  return {
    basePath,
    statusPath: "recruiter.handle-application.status.",
    tableHeaderPath: tablePath + "header.",
    tableFooterPath: tablePath + "footer.",
    tooltipPath: tablePath + "tooltip."
  };
}

function view(applicant: ApplicantRow) {
  setApplicant(applicant);
  router.push(router.currentRoute.value.path + "/handle");
}
</script>

<template>
  <main style="height: 30rem">
    <div class="text-h3 text-center mb-10">{{ header }}</div>
    <v-data-table :items="rows" :headers="headers" :items-per-page-text="itemsPerPageText">
     <template #item.actions="{ value, index }">
        <v-tooltip :text="viewTooltip">
          <template #activator="{ props }">
            <v-icon :icon="value" v-bind="props" @click="view(rows[index])" />
          </template>
        </v-tooltip>
      </template>

      <template #item.status="{ value }">
        <v-chip v-if="value === 'Pending'" :color="statuses.pending.color" :append-icon="statuses.pending.icon">
          {{ t(statusPath + statuses.pending.i18nPath) }}
        </v-chip>
        <v-chip v-if="value === 'Accept'" :color="statuses.accept.color" :append-icon="statuses.accept.icon">
          {{ t(statusPath + statuses.accept.i18nPath) }}
        </v-chip>
        <v-chip v-if="value === 'Reject'" :color="statuses.reject.color" :append-icon="statuses.reject.icon">
          {{ t(statusPath + statuses.reject.i18nPath) }}
        </v-chip>
      </template> 
    </v-data-table>
  </main>
</template>
