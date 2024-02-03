<script setup lang="ts">
import { ref, computed, watch, type Ref, type ComputedRef } from 'vue';
import { useI18n } from 'vue-i18n';
import type { CompetenceList, AvailabilityList } from './types';
import { ApplicationTestId } from '@/util/enums';
import ItemList from './ItemList.vue';
const i18n = useI18n();
const { t } = i18n;

const areaOfExpertiseKeys = [
    'ticket-sales',
    'lotteries',
    'roller-coaster-operations'
]

const {
    basePath,
    personalInformationPath,
    competencePath,
    availabilityPath,
    selectableExpertisesPath,
    buttonsPath,
    itemListPath
} = initPaths();

const {
    firstNameInput,
    lastNameInput,
    personNumberInput,
    emailInput
} = initPersonalInformation();

const {
    areasOfExpertise,
    selectedExpertise,
    yearsOfExperience,
    competenceList
} = initCompetence();

const {
    startDate,
    endDate,
    startDateStr,
    endDateStr,
    endDateIsPastStartDate,
    availabilityList
} = initAvailability();

watch(startDateStr, () => {
    startDate.value = new Date(Date.parse(startDateStr.value))
})

watch(endDateStr, () => {
    endDate.value = new Date(Date.parse(endDateStr.value))
})

watch(i18n.locale, () => {
    areasOfExpertise.value = areaOfExpertiseKeys.map(key => t(selectableExpertisesPath + key));
})

function addCompetence() {
    competenceList.value.data.push({ areaOfExpertise: selectedExpertise.value, yearsOfExperience: yearsOfExperience.value })
}

function addAvailability() {
    availabilityList.value.data.push({ start: startDateStr.value, end: endDateStr.value })
}

function initPaths() {
    const basePath = "applicant.application-form-page.";
    const competencePath = basePath + "competence.";
    return {
        basePath,
        personalInformationPath: basePath + "personal-information.",
        competencePath,
        selectableExpertisesPath: competencePath + 'selectables.',
        availabilityPath: basePath + "availability.",
        buttonsPath: basePath + "buttons.",
        itemListPath: basePath + "item-list."
    }
}

function initPersonalInformation() {
    return {
        firstNameInput: ref("Sven"),
        lastNameInput: ref("Svensson"),
        personNumberInput: ref("930101-xxxx"),
        emailInput: ref("test@exempel.com")
    }
}

function initCompetence(): {
    areasOfExpertise: Ref<string[]>,
    selectedExpertise: Ref<string>,
    yearsOfExperience: Ref<number>,
    competenceList: Ref<CompetenceList>
} {
    return {
        areasOfExpertise: ref(areaOfExpertiseKeys.map(key => t(selectableExpertisesPath + key))),
        selectedExpertise: ref(""),
        yearsOfExperience: ref(0),
        competenceList: ref({ __typename: "CompetenceList", data: [] })
    }
}

function initAvailability(): {
    startDate: Ref<Date>,
    endDate: Ref<Date>,
    startDateStr: Ref<string>,
    endDateStr: Ref<string>,
    endDateIsPastStartDate: ComputedRef<boolean>,
    availabilityList: Ref<AvailabilityList>
} {
    return {
        startDate: ref(new Date()),
        endDate: ref(new Date()),
        startDateStr: ref(new Date().toISOString().substring(0, 10)),
        endDateStr: ref(new Date().toISOString().substring(0, 10)),
        endDateIsPastStartDate: computed(() => startDate.value.getTime() >= endDate.value.getTime()),
        availabilityList: ref({ __typename: "AvailabilityList", data: []})
    }
}
</script>

<template>
    <main>
        <div class="text-h3 text-center mb-10">{{ $t(basePath + 'header') }}</div>
        <v-sheet class="d-flex w-100 h-100">
            <v-sheet>
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
                <v-sheet width="600">
                    <div class="text-h5 ">{{ $t(competencePath + 'header') }}</div>
                    <v-container>
                        <v-row>
                            <v-col cols="5">
                                <v-select :data-test="ApplicationTestId.AreaOfExpertise" :label="$t(competencePath + 'area-of-expertise')" :items="areasOfExpertise" v-model="selectedExpertise" />
                            </v-col>
                            <v-col cols="4">
                                <v-text-field :data-test="ApplicationTestId.YearsOfExperience" :label="$t(competencePath + 'years-of-experience')" type="number" min="0" v-model="yearsOfExperience" />
                            </v-col>
                            <v-col cols="1" class="d-flex align-center">
                                <v-btn :data-test="ApplicationTestId.AddCompetence" :disabled="!selectedExpertise" @click="addCompetence">{{ $t(buttonsPath + 'add') }}</v-btn>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-sheet>
                
                <v-sheet width="600">
                    <div class="text-h5 ">{{ $t(availabilityPath + 'header') }}</div>
                    <v-container>
                        <v-row>
                            <v-col cols="4">
                                <v-text-field :data-test="ApplicationTestId.StartDate" :label="$t(availabilityPath + 'start-date')" type="date" :min="new Date()" v-model="startDateStr" />
                            </v-col>
                            <v-col cols="4">
                                <v-text-field :data-test="ApplicationTestId.EndDate" :label="$t(availabilityPath + 'end-date')" type="date" :min="startDateStr" v-model="endDateStr" />
                            </v-col>
                            <v-col cols="1" class="d-flex align-center">
                                <v-btn :data-test="ApplicationTestId.AddAvailability" @click="addAvailability" :disabled="endDateIsPastStartDate">{{ $t(buttonsPath + "add") }}</v-btn>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-sheet>
            </v-sheet>
            <v-sheet class="d-flex flex-column align-end">
                <v-sheet class="d-flex">
                    <ItemList 
                        :header-i18n-key="itemListPath + 'competence-header'" 
                        :first-column-i18n-key="competencePath + 'area-of-expertise'"
                        :second-column-i18n-key="competencePath + 'years-of-experience'"
                        v-model="competenceList  " />
                    <ItemList
                        :header-i18n-key="itemListPath + 'availability-header'"
                        :first-column-i18n-key="availabilityPath + 'start-date'"
                        :second-column-i18n-key="availabilityPath + 'end-date'"
                        v-model="availabilityList" />
                </v-sheet>
                <v-btn 
                    :data-test="ApplicationTestId.Submit"
                    :disabled="competenceList.data.length === 0 || availabilityList.data.length === 0"
                    class="mt-4">{{ $t(buttonsPath + 'submit') }}</v-btn>
            </v-sheet>
        </v-sheet>
    </main>
</template>