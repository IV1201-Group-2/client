<script setup lang="ts">
import { computed, ref, type Ref } from "vue";
import { statuses } from "@/util/constants";
import router from "@/router";
import { storeToRefs } from "pinia";
import { useStatusStore } from "@/stores/status";
import { useAuthStore } from "@/stores/auth";
import { useI18n } from "vue-i18n";
const { setApplicantId } = useStatusStore();
const { loginToken } = storeToRefs(useAuthStore());
const { t } = useI18n();

interface ApplicantRow {
  personal_info: {
    name: string;
    surname: string;
    pnr: string;
    email: string;
  },
  competences: {
    competence_id: number;
    years_of_experience: number;
  }[],
  availabilities: {
    from_date: string;
    to_date: string;
  }[],
  status: "Pending" | "Reject" | "Accept";
  actions: "mdi-eye";
}

interface Applications {
  applications: Omit<ApplicantRow, "actions">[]
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

// fetch("https://recruiter-service-b2f03b50686a.herokuapp.com/api/applications/", {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//     "Authorization": `Bearer ${loginToken.value}`
//   }
// }).then(response => {
//   if(response.status !== 200) {
//     throw "could not fetch applications, status code: " + response.status
//   } else {
//     response.json().then((result)  => {
//       const applications: ApplicantRow[] = (result as Applications).applications.map(application => ({ ...application, actions: 'mdi-eye' }));
//       rows.value = applications;
//     })
//   }
// })

// const test: any[] = [
//   {
//     firstName: "Test",
//     lastName: "Testsson",
//     personNumber: "930822-1234",
//     email: "test@exempel.com",
//     status: "pending",
//     actions: "mdi-eye",
//     id: 30
//   },
//   {
//     firstName: "Sven",
//     lastName: "Svensson",
//     personNumber: "930822-1235",
//     email: "test@exempel.com",
//     status: "accepted",
//     actions: "mdi-eye",
//     id: 0
//   },
//   {
//     firstName: "Daniel",
//     lastName: "Dahlberg",
//     personNumber: "930822-1234",
//     email: "test@exempel.com",
//     status: "rejected",
//     actions: "mdi-eye",
//     id: 0
//   },
//   {
//     firstName: "Sven",
//     lastName: "Svensson",
//     personNumber: "930822-1235",
//     email: "test@exempel.com",
//     status: "accepted",
//     actions: "mdi-eye",
//     id: 0
//   },
//   {
//     firstName: "Daniel",
//     lastName: "Dahlberg",
//     personNumber: "930822-1234",
//     email: "test@exempel.com",
//     status: "pending",
//     actions: "mdi-eye",
//     id: 0
//   },
//   {
//     firstName: "Sven",
//     lastName: "Svensson",
//     personNumber: "930822-1235",
//     email: "test@exempel.com",
//     status: "accepted",
//     actions: "mdi-eye",
//     id: 0
//   },
//   {
//     firstName: "Daniel",
//     lastName: "Dahlberg",
//     personNumber: "930822-1234",
//     email: "test@exempel.com",
//     status: "rejected",
//     actions: "mdi-eye",
//     id: 0
//   },
//   {
//     firstName: "Sven",
//     lastName: "Svensson",
//     personNumber: "930822-1235",
//     email: "test@exempel.com",
//     status: "accepted",
//     actions: "mdi-eye",
//     id: 0
//   },
//   {
//     firstName: "Daniel",
//     lastName: "Dahlberg",
//     personNumber: "930822-1234",
//     email: "test@exempel.com",
//     status: "pending",
//     actions: "mdi-eye",
//     id: 0
//   },
//   {
//     firstName: "Sven",
//     lastName: "Svensson",
//     personNumber: "930822-1235",
//     email: "test@exempel.com",
//     status: "accepted",
//     actions: "mdi-eye",
//     id: 0
//   },
//   {
//     firstName: "Daniel",
//     lastName: "Dahlberg",
//     personNumber: "930822-1234",
//     email: "test@exempel.com",
//     status: "rejected",
//     actions: "mdi-eye",
//     id: 0
//   },
//   {
//     firstName: "Sven",
//     lastName: "Svensson",
//     personNumber: "930822-1235",
//     email: "test@exempel.com",
//     status: "accepted",
//     actions: "mdi-eye",
//     id: 0
//   }
// ];

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

function view(applicantId: number) {
  setApplicantId(applicantId)
  router.push(router.currentRoute.value.path + "/handle");
}
</script>

<template>
  <main style="height: 30rem">
    <div class="text-h3 text-center mb-10">{{ header }}</div>
    <v-data-table :items="rows" :headers="headers" :items-per-page-text="itemsPerPageText">
     <template #item.actions="{ value, index }">
        <v-tooltip :text="viewTooltip">
          <!-- <template #activator="{ props }">
            <v-icon :icon="value" v-bind="props" @click="view(rows[index].id)" />
          </template> -->
        </v-tooltip>
      </template>

      <template #item.status="{ value }">
        <v-chip v-if="value === 'pending'" :color="statuses.pending.color" :append-icon="statuses.pending.icon">
          {{ t(statusPath + statuses.pending.i18nPath) }}
        </v-chip>
        <v-chip v-if="value === 'accepted'" :color="statuses.accepted.color" :append-icon="statuses.accepted.icon">
          {{ t(statusPath + statuses.accepted.i18nPath) }}
        </v-chip>
        <v-chip v-if="value === 'rejected'" :color="statuses.rejected.color" :append-icon="statuses.rejected.icon">
          {{ t(statusPath + statuses.rejected.i18nPath) }}
        </v-chip>
      </template> 
    </v-data-table>
  </main>
</template>
