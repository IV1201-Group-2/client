<script setup lang="ts">
import { watch } from 'vue';
import type { Competence, CompetenceList, Availability, AvailabilityList } from './types'
import type { Ref } from 'vue';
import { useI18n } from 'vue-i18n';
const i18n = useI18n();
const { t } = i18n;
defineProps<{
    headerI18nKey: string,
    firstColumnI18nKey: string,
    secondColumnI18nKey: string,
}>()

interface CompetenceOrAvailability {
    __typename: "AvailabilityList" | "CompetenceList"
    data: Array<Availability | Competence>
}

const list = defineModel<CompetenceOrAvailability>('list', { required: true });
const areasOfExpertise = defineModel<Array<string>>('areasOfExpertise');
const conflictingDateIndices = defineModel<Array<number>>('conflictingDateIndices');

const expertiseOptionsPath = "applicant.application-form-page.competence.options."

function removeItemFromList(removedItem: Availability | Competence) {
    console.log(list.value);
    list.value.data = list.value.data.filter(item => item !== removedItem);
    const expertises = areasOfExpertise.value;
    if('areaOfExpertise' in removedItem && expertises) {
        areasOfExpertise.value = [ ...expertises, t(expertiseOptionsPath + removedItem.areaOfExpertise)].sort()
    }
}

function isCompetenceList(itemList: CompetenceOrAvailability): itemList is CompetenceList {
    return itemList.__typename === 'CompetenceList';
}

function isAvailabilityList(itemList: CompetenceOrAvailability): itemList is AvailabilityList {
    return itemList.__typename === 'AvailabilityList';
}
</script>

<template> 
    <v-sheet class="d-flex w-100 h-100">
        <v-sheet>
            <div class="text-h5">{{ $t(headerI18nKey) }}</div>
            <v-table>
                <thead>
                    <tr>
                        <th>{{ $t(firstColumnI18nKey) }}</th>
                        <th>{{ $t(secondColumnI18nKey) }}</th>
                        <th>{{ $t('applicant.application-form-page.item-list.third-column') }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="isAvailabilityList(list)" v-for="(availability, index) in list.data" :key="index">
                        <td :style="{ color: conflictingDateIndices?.includes(index) ? 'red' : '' }">{{ availability.start }}</td>
                        <td :style="{ color: conflictingDateIndices?.includes(index) ? 'red' : '' }">{{ availability.end }}</td>
                        <td><v-icon icon="mdi-delete" @click="removeItemFromList(availability)" /></td>
                    </tr>
                    <tr v-if="isCompetenceList(list)" v-for="(competence, index) in list!.data" :key="index">
                        <td>{{ $t(expertiseOptionsPath + competence.areaOfExpertise) }}</td>
                        <td>{{ competence.yearsOfExperience }}</td>
                        <td><v-icon icon="mdi-delete" @click="removeItemFromList(competence)" /></td>
                    </tr>
                </tbody>
            </v-table>
        </v-sheet>
    </v-sheet>
</template>