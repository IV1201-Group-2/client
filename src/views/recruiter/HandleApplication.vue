<script setup lang="ts">
import PersonalInformation from "@/components/generic/PersonalInformation.vue";
import ItemList from "@/components/generic/ItemList.vue";
import StatusCard from "@/components/handle_application/StatusCard.vue";
import type { AvailabilityList, CompetenceList } from "@/components/generic/types";

const basePath = "recruiter.handle-application.";
const itemListPath = basePath + "item-list.";
const competencePath = basePath + "competence.";
const availabilityPath = basePath + "availability.";

const testAvailabilityList: AvailabilityList = {
  __typename: "AvailabilityList",
  data: [
    {
      start: new Date().toISOString().substring(0, 10),
      end: new Date().toISOString().substring(0, 10)
    },
    {
      start: new Date().toISOString().substring(0, 10),
      end: new Date().toISOString().substring(0, 10)
    },
    {
      start: new Date().toISOString().substring(0, 10),
      end: new Date().toISOString().substring(0, 10)
    },
    {
      start: new Date().toISOString().substring(0, 10),
      end: new Date().toISOString().substring(0, 10)
    },
    {
      start: new Date().toISOString().substring(0, 10),
      end: new Date().toISOString().substring(0, 10)
    },
    {
      start: new Date().toISOString().substring(0, 10),
      end: new Date().toISOString().substring(0, 10)
    }
  ]
};

const testCompetenceList: CompetenceList = {
  __typename: "CompetenceList",
  data: [
    {
      areaOfExpertise: "lotteries",
      yearsOfExperience: 3
    },
    {
      areaOfExpertise: "ticket-sales",
      yearsOfExperience: 3
    }
  ]
};
</script>

<template>
  <main style="height: 30rem">
    <div class="text-h3 text-center mb-10">{{ $t(basePath + "header") }}</div>
    <v-sheet class="d-flex">
      <v-sheet>
        <PersonalInformation :base-path="basePath" />
        <StatusCard />
      </v-sheet>
      <v-sheet class="d-flex flex-column justify-space-between">
        <v-sheet class="d-flex">
          <ItemList
            :header-i18n-key="itemListPath + 'competence-header'"
            :first-column-i18n-key="competencePath + 'area-of-expertise'"
            :second-column-i18n-key="competencePath + 'years-of-experience'"
            :disable-delete="true"
            v-model:list="testCompetenceList"
          />
          <ItemList
            :header-i18n-key="itemListPath + 'availability-header'"
            :first-column-i18n-key="availabilityPath + 'start-date'"
            :second-column-i18n-key="availabilityPath + 'end-date'"
            :disable-delete="true"
            v-model:list="testAvailabilityList"
          />
        </v-sheet>
      </v-sheet>
    </v-sheet>
  </main>
</template>
