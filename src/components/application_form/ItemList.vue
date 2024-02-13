<script setup lang="ts">
import { watch } from "vue"
import type { Competence, CompetenceList, Availability, AvailabilityList } from "./types"
import type { Ref } from "vue"
import { useI18n } from "vue-i18n"
const i18n = useI18n()
const { t } = i18n
defineProps<{
  headerI18nKey: string
  firstColumnI18nKey: string
  secondColumnI18nKey: string
  disableDelete?: boolean
}>()

interface CompetenceOrAvailability {
  __typename: "AvailabilityList" | "CompetenceList"
  data: Array<Availability | Competence>
}

const list = defineModel<CompetenceOrAvailability>("list", { required: true })
const areasOfExpertise = defineModel<Array<string>>("areasOfExpertise")
const conflictingDateIndices = defineModel<Array<number>>("conflictingDateIndices")

const expertiseOptionsPath = "applicant.application-form-page.competence.options."

function removeItemFromList(removedItem: Availability | Competence) {
  list.value.data = list.value.data.filter((item) => item !== removedItem)
  const expertises = areasOfExpertise.value
  if ("areaOfExpertise" in removedItem && expertises) {
    areasOfExpertise.value = [...expertises, t(expertiseOptionsPath + removedItem.areaOfExpertise)].sort()
  }
}

function isCompetenceList(itemList: CompetenceOrAvailability): itemList is CompetenceList {
  return itemList.__typename === "CompetenceList"
}

function isAvailabilityList(itemList: CompetenceOrAvailability): itemList is AvailabilityList {
  return itemList.__typename === "AvailabilityList"
}
</script>

<template>
  <v-sheet class="d-flex w-100 h-100">
    <v-sheet>
      <div class="text-h5">{{ $t(headerI18nKey) }}</div>
      <v-table>
        <thead>
          <tr>
            <th style="text-align: center">{{ $t(firstColumnI18nKey) }}</th>
            <th style="text-align: center">{{ $t(secondColumnI18nKey) }}</th>
            <th v-if="!disableDelete" style="text-align: center">
              {{ $t("applicant.application-form-page.item-list.third-column") }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="isAvailabilityList(list)" v-for="(availability, index) in list.data" :key="index">
            <td :style="{ color: conflictingDateIndices?.includes(index) ? 'red' : '' }">
              {{ availability.start }}
            </td>
            <td :style="{ color: conflictingDateIndices?.includes(index) ? 'red' : '' }">
              {{ availability.end }}
            </td>
            <v-tooltip v-if="!disableDelete" text="Delete" open-delay="500">
              <template v-slot:activator="{ props }">
                <td>
                  <v-icon icon="mdi-delete" v-bind="props" @click="removeItemFromList(availability)" />
                </td>
              </template>
            </v-tooltip>
          </tr>
          <tr v-if="isCompetenceList(list)" v-for="(competence, index) in list!.data" :key="index">
            <td>{{ $t(expertiseOptionsPath + competence.areaOfExpertise) }}</td>
            <td style="text-align: center">{{ competence.yearsOfExperience }}</td>
            <v-tooltip v-if="!disableDelete" text="Delete" open-delay="500">
              <template v-slot:activator="{ props }">
                <td>
                  <v-icon icon="mdi-delete" v-bind="props" @click="removeItemFromList(competence)" />
                </td>
              </template>
            </v-tooltip>
          </tr>
        </tbody>
      </v-table>
    </v-sheet>
  </v-sheet>
</template>

<style scoped>
tbody {
  display: block;
  max-height: 11rem;
  overflow-y: auto;
}

thead,
tbody tr {
  display: table;
  width: 100%;
  table-layout: fixed;
  text-align: center;
}

thead {
  width: calc(100% - 1em);
}
</style>
