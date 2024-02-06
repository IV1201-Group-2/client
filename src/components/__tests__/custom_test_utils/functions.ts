
import type WrapperLike from "node_modules/@vue/test-utils/dist/interfaces/wrapperLike";
import type { VueWrapper } from "@vue/test-utils";
import { Action, Language } from "./enums";
import { expect, describe, it } from "vitest";
import i18n from "@/i18n";
const { t } = i18n.global;

export function extractLabelTranslation(labelEl: WrapperLike) {
    const text = labelEl.text();
    return t(text.substring(0, text.length / 2))
}

export function getSelector(id: string) {
    return `[data-test="${id}"]`
}

export function checkTranslation(translation: string, targetLanguage: string, applicationTestId: string, wrapper: VueWrapper | null, isNotInput?: boolean) {
    i18n.global.locale.value = Language.Swedish                
    const element = wrapper!.findComponent(getSelector(applicationTestId))
    expect(isNotInput ? t(element.text()) : extractLabelTranslation(element)).toBe(translation)
    i18n.global.locale.value = Language.English
}

export function checkEnglish(text: string, applicationTestId: string, wrapper: VueWrapper | null, isNotInput?: boolean) {
    const labelEl = wrapper!.findComponent(getSelector(applicationTestId))
    expect(isNotInput ? t(labelEl.text()) : extractLabelTranslation(labelEl)).toBe(text)
}

// interface TranslationDTO {
//     englishTranslation: string,
//     swedishTranslation?: string,
//     applicationTestId: string,
//     wrapper: VueWrapper | null,
// }

// export function checkTranslations(dto: TranslationDTO) {
//     it(Action.HasEnglishTranslation, () => {
//         checkEnglish(dto.englishTranslation, dto.applicationTestId, dto.wrapper)
//     })

//     if(dto.swedishTranslation) {
//         it(Action.HasSwedishTranslation, () => {
//             checkTranslation(dto.swedishTranslation as string, Language.Swedish, dto.applicationTestId, dto.wrapper);
//         })
//     }
// }