<script setup lang="ts">
import { ApplicationTestId } from '@/util/enums';
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/auth';
const { token } = storeToRefs(useAuthStore());
const props = defineProps<{
    basePath: string,
}>()

const personalInformationPath = props.basePath + 'personal-information.'

const {
    firstNameInput,
    lastNameInput,
    personNumberInput,
    emailInput
} = initPersonalInformation();

function initPersonalInformation() {
    return {
        firstNameInput: ref("Sven"),
        lastNameInput: ref("Svensson"),
        personNumberInput: ref("930101-xxxx"),
        emailInput: ref("test@exempel.com")
    }
}

fetch("https://application-form-service-8e764787209b.herokuapp.com/api/application-form/applicant/personal-info/", {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token.value}`
    }
}).then(response => {
    if(response.status !== 200) {
        throw "could not get personal information, status code: " + response.status
    } else {
        response.json().then(result => {
            firstNameInput.value = result.name;
            lastNameInput.value = result.surname;
            personNumberInput.value = result.pnr;
            emailInput.value = result.email;
        })
    }
})
</script>

<template>
    <v-sheet width="600">
        <div class="text-h5 ">{{ $t(personalInformationPath + 'header') }}</div>
        <v-container>
            <v-row no-gutters>
                <v-text-field :data-test="ApplicationTestId.FirstName" :label="$t(personalInformationPath + 'first-name')" v-model="firstNameInput" readonly />
                <v-text-field :data-test="ApplicationTestId.LastName" :label="$t(personalInformationPath + 'last-name')" v-model="lastNameInput" readonly />
            </v-row>
            <v-row no-gutters>
                <v-text-field :data-test="ApplicationTestId.PersonNumber" :label="$t(personalInformationPath + 'person-number')" v-model="personNumberInput" readonly />
                <v-text-field :data-test="ApplicationTestId.Email" :label="$t(personalInformationPath + 'email')" v-model="emailInput" readonly />
            </v-row>
        </v-container>
    </v-sheet>
</template>