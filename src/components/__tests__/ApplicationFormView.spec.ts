import { describe, it, expect, afterAll, beforeAll } from "vitest";
import { mount, VueWrapper } from '@vue/test-utils'
import ApplicationFormView from '@/views/applicant/ApplicationFormView.vue'
import { ApplicationTestId } from "@/util/enums";
import {
    GenericComponent,
    Action,
    When,
    Language
} from "./custom_test_utils/enums"
import { extractLabelTranslation, getSelector } from "./custom_test_utils/functions";
import i18n from "@/i18n";
import type WrapperLike from "node_modules/@vue/test-utils/dist/interfaces/wrapperLike";

describe("Applicant Registration View", () => {
    let wrapper: VueWrapper | null; 
    let inputIs: Function | null;

    function setup() {
        wrapper = mount(ApplicationFormView) 
    }

    function teardown() {
        wrapper = null;
    }
    
    describe("Personal Information", () => {
        describe("First Name", () => {
            beforeAll(() => {
                setup()
                // inputIs = (wrapper as any).vm.firstNameRules[0];
            })

            afterAll(() => {
                teardown()
                // inputIs = null
            })

            describe(GenericComponent.Label, () => {
                it(Action.HasEnglishTranslation, () => {
                    const labelEl = wrapper!.findComponent(getSelector(ApplicationTestId.FirstName))
                    expect(extractLabelTranslation(labelEl)).toBe('First Name')
                })

                it(Action.HasSwedishTranslation, () => {
                    i18n.global.locale.value = Language.Swedish                
                    const labelEl = wrapper!.findComponent(getSelector(ApplicationTestId.FirstName))
                    expect(extractLabelTranslation(labelEl)).toBe('Förnamn')
                    i18n.global.locale.value = Language.English
                })
            })

            describe.skip(GenericComponent.ValidationMessage, () => {
                it(Action.Shows + When.NoInput, () => {
                    expect(inputIs!('')).not.toBe(true);
                })

                it(Action.Hides + When.InputIsGiven, () => {
                    expect(inputIs!('test')).toBe(true);
                })

                it(Action.HasEnglishTranslation, () => {
                    expect(inputIs!('')).toContain('You must enter a ');
                })

                it(Action.HasSwedishTranslation, () => {
                    i18n.global.locale.value = Language.Swedish
                    expect(inputIs!('')).toContain('Du måste ange ett ')
                    i18n.global.locale.value = Language.English
                })
            })
        })

        describe("Last Name", () => {
            beforeAll(() => {
                setup()
                // inputIs = (wrapper as any).vm.lastNameRules[0];
            })

            afterAll(() => {
                teardown()
                // inputIs = null
            })

            describe(GenericComponent.Label, () => {
                it(Action.HasEnglishTranslation, () => {
                    const labelEl = wrapper!.findComponent(getSelector(ApplicationTestId.LastName))
                    expect(extractLabelTranslation(labelEl)).toBe('Last Name')
                })

                it(Action.HasSwedishTranslation, () => {
                    i18n.global.locale.value = Language.Swedish                
                    const labelEl = wrapper!.findComponent(getSelector(ApplicationTestId.LastName))
                    expect(extractLabelTranslation(labelEl)).toBe('Efternamn')
                    i18n.global.locale.value = Language.English
                })
            })

            describe.skip(GenericComponent.ValidationMessage, () => {
                it(Action.Shows, () => {
                    expect(inputIs!('')).not.toBe(true);
                })

                it(Action.Hides, () => {
                    expect(inputIs!('test')).toBe(true);
                })

                it(Action.HasEnglishTranslation, () => {
                    expect(inputIs!('')).toContain('You must enter a ')
                })

                it(Action.HasSwedishTranslation, () => {
                    i18n.global.locale.value = Language.Swedish
                    expect(inputIs!('')).toContain('Du måste ange ett ')
                    i18n.global.locale.value = Language.English
                })
            })
        })

        describe("Email", () => {
            beforeAll(() => {
                setup()
                // inputIs = (wrapper as any).vm.emailRules[0];
            })

            afterAll(() => {
                teardown()
                // inputIs = null
            })

            describe(GenericComponent.Label, () => {
                it(Action.HasEnglishTranslation, () => {
                    const labelEl = wrapper!.findComponent(getSelector(ApplicationTestId.Email))
                    expect(extractLabelTranslation(labelEl)).toBe('Email')
                })

                it(Action.HasSwedishTranslation, () => {
                    i18n.global.locale.value = Language.Swedish                
                    const labelEl = wrapper!.findComponent(getSelector(ApplicationTestId.Email))
                    expect(extractLabelTranslation(labelEl)).toBe('E-postadress')
                    i18n.global.locale.value = Language.English
                })
            })

            describe.skip(GenericComponent.ValidationMessage, () => {
                it(Action.Shows + When.NoInput, () => {
                    expect(inputIs!('')).not.toBe(true);
                })

                it(Action.Shows + " when only local-part is given but no @ nor domain", () => {
                    expect(inputIs!('test')).not.toBe(true);
                })

                it(Action.Shows + " when only @ is given but no local-part nor domain", () => {
                    expect(inputIs!('@')).not.toBe(true);
                })

                it(Action.Shows + " when only domain is given but no local-part nor domain", () => {
                    expect(inputIs!('test.com')).not.toBe(true);
                })

                it(Action.Shows + " when only local-part and @ are given but no domain", () => {
                    expect(inputIs!('test@')).not.toBe(true)
                })

                it(Action.Shows + " when only @ and domain are given but no local-part", () => {
                    expect(inputIs!('@test.com')).not.toBe(true)
                })

                it(Action.Hides + " when local-part, @ and domain are present in email address", () => {
                    expect(inputIs!('test@test.com')).toBe(true);
                })

                it(Action.HasEnglishTranslation, () => {
                    expect(inputIs!('')).toEqual('Invalid email')
                })

                it(Action.HasEnglishTranslation, () => {
                    i18n.global.locale.value = Language.Swedish
                    expect(inputIs!('')).toEqual('Ogiltig e-postadress')
                    i18n.global.locale.value = Language.English
                })
            })
        })
    })

    describe(GenericComponent.SubmitButton, () => {
        let buttonEl: any | null;

        beforeAll(() => {
            setup()
            buttonEl = wrapper!.find(getSelector(ApplicationTestId.Submit));
        })

        afterAll(() => {
            teardown()
            buttonEl = null
        })

        it(Action.IsDisabled + " when form is not filled", () => {
            expect(buttonEl!.attributes('disabled')).not.toBeUndefined();
        })
    })
}) 