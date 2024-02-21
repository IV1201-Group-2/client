<script setup lang="ts">
import { ApplicationTestId } from "@/util/enums";
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/auth";
import { useErrorStore } from "@/stores/error";
import { BASE_URL } from "@/util/api";
const { loginToken, role } = storeToRefs(useAuthStore());
const { showGenericErrorMsg } = useErrorStore();
const props = defineProps({
  basePath: {
    type: String,
    required: true
  },
  personId: Number
});

const personalInformationPath = props.basePath + "personal-information.";

const { firstNameInput, lastNameInput, personNumberInput, emailInput } = initPersonalInformation();

getPersonalInformation();

function initPersonalInformation() {
  return {
    firstNameInput: ref(""),
    lastNameInput: ref(""),
    personNumberInput: ref(""),
    emailInput: ref("")
  };
}

function getPersonalInformation() {
  let params: "" | number = "";

  if (props.personId && role.value === "Recruiter") {
    params = props.personId;
  }

  const url = BASE_URL.PERSONAL_INFORMATION + "/api/applicant/personal-info/" + params;
  let options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${loginToken.value}`
    }
  };

  fetch(url, options).then((response) => {
    if (response.status !== 200) {
      showGenericErrorMsg();
    } else {
      response.json().then((result) => {
        firstNameInput.value = result.name;
        lastNameInput.value = result.surname;
        personNumberInput.value = result.pnr;
        emailInput.value = result.email;
      });
    }
  }).catch(_ => showGenericErrorMsg("cannot-fetch-data"));
}
</script>

<template>
  <v-sheet width="600">
    <div class="text-h5">{{ $t(personalInformationPath + "header") }}</div>
    <v-container>
      <v-row no-gutters>
        <v-text-field
          :data-test="ApplicationTestId.FirstName"
          :label="$t(personalInformationPath + 'first-name')"
          v-model="firstNameInput"
          readonly
        />
        <v-text-field
          :data-test="ApplicationTestId.LastName"
          :label="$t(personalInformationPath + 'last-name')"
          v-model="lastNameInput"
          readonly
        />
      </v-row>
      <v-row no-gutters>
        <v-text-field
          :data-test="ApplicationTestId.PersonNumber"
          :label="$t(personalInformationPath + 'person-number')"
          v-model="personNumberInput"
          readonly
        />
        <v-text-field
          :data-test="ApplicationTestId.Email"
          :label="$t(personalInformationPath + 'email')"
          v-model="emailInput"
          readonly
        />
      </v-row>
    </v-container>
  </v-sheet>
</template>
