
import type WrapperLike from "node_modules/@vue/test-utils/dist/interfaces/wrapperLike";
import i18n from "@/i18n";
const { t } = i18n.global;

export function extractLabelTranslation(labelEl: WrapperLike) {
    const text = labelEl.text();
    return t(text.substring(0, text.length / 2))
}

export function getSelector(id: string) {
    return `[data-test="${id}"]`
}