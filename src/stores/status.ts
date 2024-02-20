import { defineStore } from "pinia";
import { ref } from "vue";

export const useStatusStore = defineStore("status", () => {
    const applicantId = ref(0)

    function setApplicantId(id: number): void {
        applicantId.value = id;
    }

    return { applicantId, setApplicantId }
})