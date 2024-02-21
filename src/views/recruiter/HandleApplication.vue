<script setup lang="ts">
import PersonalInformation from "@/components/generic/PersonalInformation.vue";
import ItemList from "@/components/generic/ItemList.vue";
import StatusCard from "@/components/handle_application/StatusCard.vue";
import type { AvailabilityList, CompetenceList } from "@/components/generic/types";
import type { CompetenceIdAndI18nKey } from "@/util/types";
import { getSelectableCompetences } from "@/util/api";
import { storeToRefs } from "pinia";
import { useStatusStore } from "@/stores/status";
import { useAuthStore } from "@/stores/auth";
import { useErrorStore } from "@/stores/error";
import { ref, type Ref } from "vue";
const { competenceList, availabilityList, applicantId } = storeToRefs(useStatusStore());
const { loginToken } = storeToRefs(useAuthStore());
const { showGenericErrorMsg } = useErrorStore();

const basePath = "recruiter.handle-application.";
const itemListPath = basePath + "item-list.";
const competencePath = basePath + "competence.";
const availabilityPath = basePath + "availability.";

const processedAvailabilityList: AvailabilityList = {
  __typename: "AvailabilityList",
  data: availabilityList.value.map(availability => ({ start: availability.from_date, end: availability.to_date }))
}

const processedCompetenceList: Ref<CompetenceList> = ref({
  __typename: "CompetenceList",
  data: []
});

getSelectableCompetences(loginToken).then(response => {
  if(response.status !== 200) {
    showGenericErrorMsg();
  } else {
    response.json().then((competenceIdsAndI18nKeys: Array<CompetenceIdAndI18nKey>) => {
      processedCompetenceList.value = { ...processedCompetenceList.value, data: competenceList.value.map((competence) => {
        const competenceIdAndI18nKey = competenceIdsAndI18nKeys.find(competenceIdAndI18nKey => competenceIdAndI18nKey.competence_id === competence.competence_id);
        return { areaOfExpertise: competenceIdAndI18nKey!.i18n_key, yearsOfExperience: competence.years_of_experience }
      }) }
    })
  }
}).catch(_ => showGenericErrorMsg())
</script>

<template>
  <main style="height: 30rem">
    <div class="text-h3 text-center mb-10">{{ $t(basePath + "header") }}</div>
    <v-sheet class="d-flex">
      <v-sheet>
        <PersonalInformation :base-path="basePath" :person-id="applicantId" />
        <v-sheet class="d-flex">
          <StatusCard />
          <v-spacer></v-spacer>
          <v-sheet style="display: flex; align-items: flex-end">
            <v-btn @click="$router.back()">Back</v-btn>
          </v-sheet>
        </v-sheet>
      </v-sheet>
      <v-sheet class="d-flex flex-column justify-space-between">
        <v-sheet class="d-flex">
          <ItemList
            :header-i18n-key="itemListPath + 'competence-header'"
            :first-column-i18n-key="competencePath + 'area-of-expertise'"
            :second-column-i18n-key="competencePath + 'years-of-experience'"
            :disable-delete="true"
            v-model:list="processedCompetenceList"
          />
          <ItemList
            :header-i18n-key="itemListPath + 'availability-header'"
            :first-column-i18n-key="availabilityPath + 'start-date'"
            :second-column-i18n-key="availabilityPath + 'end-date'"
            :disable-delete="true"
            v-model:list="processedAvailabilityList"
          />
        </v-sheet>
      </v-sheet>
    </v-sheet>
  </main>
</template>
