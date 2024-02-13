import { defineStore } from "pinia"
import { ref, type Ref } from "vue"
import type { AvailabilityList, CompetenceList } from "@/components/application_form/types"

export const useApplicationStore = defineStore("application", () => {
  const basePath = "applicant.application-form-page."
  const competencePath = basePath + "competence."
  const availabilityPath = basePath + "availability."
  const itemListPath = basePath + "item-list."
  const competenceList: Ref<CompetenceList> = ref({ __typename: "CompetenceList", data: [] })
  const availabilityList: Ref<AvailabilityList> = ref({ __typename: "AvailabilityList", data: [] })

  return {
    basePath,
    availabilityPath,
    competencePath,
    itemListPath,
    competenceList,
    availabilityList
  }
})
