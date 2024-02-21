import { defineStore } from "pinia";
import { ref } from "vue";

export const useErrorStore = defineStore("error", () => {
    const genericErrorMsgIsVisible = ref(false);
    const specificMsg = ref("");

    function showGenericErrorMsg(msg?: string) {
        if(msg) specificMsg.value = "specific-msg." + msg;
        genericErrorMsgIsVisible.value = true;
    }

    function hideGenericErrorMsg() {
        specificMsg.value = "";
        genericErrorMsgIsVisible.value = false;
    }

    return { genericErrorMsgIsVisible, specificMsg, showGenericErrorMsg, hideGenericErrorMsg }
})