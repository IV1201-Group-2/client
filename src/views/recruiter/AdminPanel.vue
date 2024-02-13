<script setup lang=ts>
import { computed } from 'vue';
import router from '@/router';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

interface ApplicantRow {
    firstName: string,
    lastName: string,
    personNumber: string,
    email: string,
    receivedAt: string,
    actions: "mdi-eye"
}

const {
    basePath,
    tableHeaderPath,
    tableFooterPath,
    tooltipPath
} = initPaths();

const header = computed(() => t(basePath + "header"))

const firstName = computed(() => t(tableHeaderPath + "first-name"));
const lastName = computed(() => t(tableHeaderPath + "last-name"));
const personNumber = computed(() => t(tableHeaderPath + "person-number"));
const email = computed(() => t(tableHeaderPath + "email"));
const receivedAt = computed(() => t(tableHeaderPath + "received-at"));
const actions = computed(() => t(tableHeaderPath + "actions"));

const itemsPerPageText = computed(() => t(tableFooterPath + "items-per-page-text"));
const viewTooltip = computed(() => t(tooltipPath + "view"));

const tempCurrDate = computed(() => new Date().toISOString().substring(0, 10));

const headers: any = [
    { title: firstName, align: "start", key: "firstName" },
    { title: lastName, align: "start", key: "lastName" },
    { title: personNumber, align: "start", key: "personNumber" },
    { title: email, align: "start", key: "email" },
    { title: receivedAt, align: "start", key: "receivedAt" },
    { title: actions, align: "center", key: "actions" }
]
const test: ApplicantRow[] = [
    { firstName: "Daniel", lastName: "Dahlberg", personNumber: "930822-1234", email: "test@exempel.com", receivedAt: tempCurrDate.value, actions: "mdi-eye" },
    { firstName: "Sven", lastName: "Svensson", personNumber: "930822-1235", email: "test@exempel.com", receivedAt: tempCurrDate.value, actions: "mdi-eye" },
    { firstName: "Daniel", lastName: "Dahlberg", personNumber: "930822-1234", email: "test@exempel.com", receivedAt: tempCurrDate.value, actions: "mdi-eye" },
    { firstName: "Sven", lastName: "Svensson", personNumber: "930822-1235", email: "test@exempel.com", receivedAt: tempCurrDate.value, actions: "mdi-eye" },
    { firstName: "Daniel", lastName: "Dahlberg", personNumber: "930822-1234", email: "test@exempel.com", receivedAt: tempCurrDate.value, actions: "mdi-eye" },
    { firstName: "Sven", lastName: "Svensson", personNumber: "930822-1235", email: "test@exempel.com", receivedAt: tempCurrDate.value, actions: "mdi-eye" },
    { firstName: "Daniel", lastName: "Dahlberg", personNumber: "930822-1234", email: "test@exempel.com", receivedAt: tempCurrDate.value, actions: "mdi-eye" },
    { firstName: "Sven", lastName: "Svensson", personNumber: "930822-1235", email: "test@exempel.com", receivedAt: tempCurrDate.value, actions: "mdi-eye" },
    { firstName: "Daniel", lastName: "Dahlberg", personNumber: "930822-1234", email: "test@exempel.com", receivedAt: tempCurrDate.value, actions: "mdi-eye" },
    { firstName: "Sven", lastName: "Svensson", personNumber: "930822-1235", email: "test@exempel.com", receivedAt: tempCurrDate.value, actions: "mdi-eye" },
    { firstName: "Daniel", lastName: "Dahlberg", personNumber: "930822-1234", email: "test@exempel.com", receivedAt: tempCurrDate.value, actions: "mdi-eye" },
    { firstName: "Sven", lastName: "Svensson", personNumber: "930822-1235", email: "test@exempel.com", receivedAt: tempCurrDate.value, actions: "mdi-eye" },
    { firstName: "Daniel", lastName: "Dahlberg", personNumber: "930822-1234", email: "test@exempel.com", receivedAt: tempCurrDate.value, actions: "mdi-eye" },
    { firstName: "Sven", lastName: "Svensson", personNumber: "930822-1235", email: "test@exempel.com", receivedAt: tempCurrDate.value, actions: "mdi-eye" },
    { firstName: "Daniel", lastName: "Dahlberg", personNumber: "930822-1234", email: "test@exempel.com", receivedAt: tempCurrDate.value, actions: "mdi-eye" },
    { firstName: "Sven", lastName: "Svensson", personNumber: "930822-1235", email: "test@exempel.com", receivedAt: tempCurrDate.value, actions: "mdi-eye" },
]

function initPaths() {
    const basePath = "recruiter.admin-panel.";
    const tablePath = basePath + "table.";

    return {
        basePath,
        tableHeaderPath: tablePath + "header.",
        tableFooterPath: tablePath + "footer.",
        tooltipPath: tablePath + "tooltip."
    }
}

function view() {
    router.push(router.currentRoute.value.path + "/handle")
}
</script>

<template>
    <main style="height: 30rem">
        <div class="text-h3 text-center mb-10">{{ header }}</div>
        <v-data-table :items="test" :headers="headers" :items-per-page-text="itemsPerPageText">
            <template #item.actions="{ value }">
                <v-tooltip :text="viewTooltip">
                    <template #activator="{ props }">
                        <v-icon :icon="value" v-bind="props" @click="view"/>
                    </template>
                </v-tooltip>
            </template>
        </v-data-table>
    </main>
</template>