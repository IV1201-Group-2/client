<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useApplicationStore } from "@/stores/applicationForm";
import { useAuthStore } from "@/stores/auth";
import { useErrorStore } from "@/stores/error";
import { useI18n } from "vue-i18n";
import ItemList from "@/components/generic/ItemList.vue";
import PersonalInformation from "@/components/generic/PersonalInformation.vue";
import { ref } from "vue";
import type { AvailabilityList } from "@/components/generic/types";
import type { CompetenceIdAndYears } from "@/util/types";
import { BASE_URL, getSelectableCompetences } from "@/util/api";
const applicationStore = useApplicationStore();
const authStore = useAuthStore();
const { competenceList, availabilityList } = storeToRefs(applicationStore);
const { loginToken } = storeToRefs(authStore);
const { basePath, availabilityPath, competencePath, itemListPath } = applicationStore;
const { showGenericErrorMsg } = useErrorStore();
const { t } = useI18n();

const confirmationPath = basePath + "confirmation.";
const confirmPath = confirmationPath + "confirm";
const dialogPath = confirmationPath + "dialog.";
const buttonsPath = basePath + "buttons.";

const hasConfirmed = ref(false);
const waitingForResponse = ref(false);
const dialogIsVisible = ref(false);

const dialogMsg = ref("");

function submit() {
  isWaitingForResponse();
  const competencesPromise = getSelectableCompetences(loginToken);
  competencesPromise
    .then((response) => {
      if (response.status !== 200) {
        dialogMsg.value = t(dialogPath + "failure");
        showDialog();
        noLongerWaitingForResponse();
      } else {
        response.json().then((result: Array<{ competence_id: number; i18n_key: string }>) => {
          const selectedCompetenceAreas = competenceList.value.data.map((competence) => competence.areaOfExpertise);
          const selectedCompetenceIdsAndAreas = result.filter((competence) =>
            selectedCompetenceAreas.includes(competence.i18n_key)
          );
          const selectedCompetenceIdsAndYears: CompetenceIdAndYears[] = selectedCompetenceIdsAndAreas.map(
            (competenceWithId) => {
              const competenceAreaAndYears = competenceList.value.data.find(
                (competenceWithYear) => competenceWithId.i18n_key === competenceWithYear.areaOfExpertise
              );
              return {
                competence_id: competenceWithId.competence_id,
                years_of_experience: competenceAreaAndYears!.yearsOfExperience
              };
            }
          );

          storeApplication(selectedCompetenceIdsAndYears, availabilityList.value);
        });
      }
    })
    .catch(() => showGenericErrorMsg());

  function storeApplication(selectedCompetenceIdsAndYears: any, availabilities: AvailabilityList) {
    const url = BASE_URL.APPLICATION_FORM + "/api/application-form/submit/";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${loginToken.value}`
      },
      body: JSON.stringify({
        competences: selectedCompetenceIdsAndYears,
        availabilities: availabilities.data.map((availability) => ({
          from_date: availability.start,
          to_date: availability.end
        }))
      })
    };

    fetch(url, options)
      .then(async (response) => {
        const result = await response.json();

        if (result?.error === "ALREADY_APPLIED_BEFORE") {
          dialogMsg.value = t(dialogPath + "already-applied");
        } else if (response.status !== 201) {
          dialogMsg.value = t(dialogPath + "failure");
        } else {
          dialogMsg.value = t(dialogPath + "success");
        }
        showDialog();
        noLongerWaitingForResponse();
      })
      .catch(() => showGenericErrorMsg());
  }

  function showDialog() {
    dialogIsVisible.value = true;
  }

  function isWaitingForResponse() {
    waitingForResponse.value = true;
  }

  function noLongerWaitingForResponse() {
    waitingForResponse.value = false;
  }
}

function hideDialog() {
  dialogIsVisible.value = false;
}
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
      <v-sheet>
        <v-btn class="mr-2" @click="$router.back()">
          {{ $t(buttonsPath + "back") }}
        </v-btn>
        <v-btn :loading="waitingForResponse" :disabled="!hasConfirmed" @click="submit">
          {{ $t(buttonsPath + "submit") }}
        </v-btn>
      </v-sheet>
      <v-dialog v-model="dialogIsVisible" width="auto">
        <v-card>
          <v-card-title>
            {{ $t(dialogPath + "header") }}
          </v-card-title>
          <v-card-text class="text-center">
            <div v-html="dialogMsg" />
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="hideDialog">OK</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-sheet>
  </main>
</template>
