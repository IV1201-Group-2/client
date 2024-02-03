<script setup lang="ts">
import type { ModelRef } from 'vue';
import type { Competence, CompetenceList, Availability, AvailabilityList } from './types'
import type { Ref } from 'vue';
defineProps<{
    headerI18nKey: string,
    firstColumnI18nKey: string,
    secondColumnI18nKey: string,
}>()

interface CompetenceOrAvailability {
    __typename: "AvailabilityList" | "CompetenceList"
    data: Array<Availability | Competence>
}

const model: ModelRef<CompetenceOrAvailability | undefined, string> = defineModel();

function removeItem(removedItem: Availability | Competence) {
    model.value!.data = model.value!.data.filter(item => item !== removedItem);
}

function isCompetenceList(model: CompetenceOrAvailability | undefined): model is CompetenceList {
    return model!.__typename === 'CompetenceList';
}

function isAvailabilityList(model: CompetenceOrAvailability | undefined): model is AvailabilityList {
    return model!.__typename === 'AvailabilityList';
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
                    <tr v-if="isAvailabilityList(model)" v-for="(availability, index) in model!.data" :key="index">
                        <td>{{ availability.start }}</td>
                        <td>{{ availability.end }}</td>
                        <td><v-icon icon="mdi-delete" @click="removeItem(availability)" /></td>
                    </tr>
                    <tr v-if="isCompetenceList(model)" v-for="(competence, index) in model!.data" :key="index">
                        <td>{{ competence.areaOfExpertise }}</td>
                        <td>{{ competence.yearsOfExperience }}</td>
                        <td><v-icon icon="mdi-delete" @click="removeItem(competence)" /></td>
                    </tr>
                </tbody>
            </v-table>
        </v-sheet>
    </v-sheet>
</template>