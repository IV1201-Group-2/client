import type { ApplicantRow } from "@/util/types";
import { defineStore } from "pinia";
import { ref, type Ref } from "vue";

export const useStatusStore = defineStore("status", () => {
  const applicantId = ref(0);
  const firstName = ref("");
  const lastName = ref("");
  const personNumber = ref("");
  const email = ref("");
  const competenceList: Ref<ApplicantRow["competences"]> = ref([]);
  const availabilityList: Ref<ApplicantRow["availabilities"]> = ref([]);
  const status = ref("");

  function setApplicant(applicant: ApplicantRow): void {
    applicantId.value = applicant.personal_info.person_id;
    firstName.value = applicant.personal_info.name;
    lastName.value = applicant.personal_info.surname;
    personNumber.value = applicant.personal_info.pnr;
    email.value = applicant.personal_info.email;
    competenceList.value = applicant.competences;
    availabilityList.value = applicant.availabilities;
    status.value = applicant.status;
  }

  return {
    applicantId,
    firstName,
    lastName,
    personNumber,
    email,
    competenceList,
    availabilityList,
    status,
    setApplicant
  };
});
