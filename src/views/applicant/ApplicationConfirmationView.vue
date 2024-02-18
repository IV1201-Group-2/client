<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useApplicationStore } from "@/stores/applicationForm";
import ItemList from "@/components/generic/ItemList.vue";
import PersonalInformation from "@/components/generic/PersonalInformation.vue";
import { ref } from "vue";
const applicationStore = useApplicationStore();
const { competenceList, availabilityList } = storeToRefs(applicationStore);
const { basePath, availabilityPath, competencePath, itemListPath } = applicationStore;

const confirmPath = basePath + "confirmation.confirm";
const submitPath = basePath + "buttons.submit";

const hasConfirmed = ref(false);
</script>

<template>
  <main style="height: 30rem; display: flex; flex-direction: column; align-items: center">
    <v-sheet width="600" class="d-flex flex-column align-center">
      <div class="text-h3 mb-10">{{ $t(basePath + "header") }}</div>
      <PersonalInformation :base-path="basePath" />
      <v-sheet class="d-flex justify-space-around">
        <ItemList
          :header-i18n-key="itemListPath + 'competence-header'"
          :first-column-i18n-key="competencePath + 'area-of-expertise'"
          :second-column-i18n-key="competencePath + 'years-of-experience'"
          :disable-delete="true"
          v-model:list="competenceList"
        />
        <ItemList
          :header-i18n-key="itemListPath + 'availability-header'"
          :first-column-i18n-key="availabilityPath + 'start-date'"
          :second-column-i18n-key="availabilityPath + 'end-date'"
          :disable-delete="true"
          v-model:list="availabilityList"
        />
      </v-sheet>
      <v-checkbox v-model="hasConfirmed" :label="$t(confirmPath)" />
      <v-btn :disabled="!hasConfirmed">{{ $t(submitPath) }}</v-btn>
    </v-sheet>
  </main>
</template>
