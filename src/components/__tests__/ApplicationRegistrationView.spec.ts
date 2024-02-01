import { describe, it, expect, afterAll, beforeAll } from "vitest";
import { mount, VueWrapper } from '@vue/test-utils'
import ApplicantRegistrationView from "@/views/applicant/ApplicantRegistrationView.vue";
import { RegistrationTestId } from "@/util/enums";
import {
    GenericComponent,
    Verb,
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
        wrapper = mount(ApplicantRegistrationView) 
    }

    function teardown() {
        wrapper = null;
    }
    
    describe("Form Fields", () => {
        describe("First Name", () => {
            beforeAll(() => {
                setup()
                inputIs = (wrapper as any).vm.firstNameRules[0];
            })

            afterAll(() => {
                teardown()
                inputIs = null
            })

            describe(GenericComponent.Label, () => {
                it(Verb.HasEnglishTranslation, () => {
                    const labelEl = wrapper!.findComponent(getSelector(RegistrationTestId.FirstName))
                    expect(extractLabelTranslation(labelEl)).toBe('First Name')
                })

                it(Verb.HasSwedishTranslation, () => {
                    i18n.global.locale.value = Language.Swedish                
                    const labelEl = wrapper!.findComponent(getSelector(RegistrationTestId.FirstName))
                    expect(extractLabelTranslation(labelEl)).toBe('Förnamn')
                    i18n.global.locale.value = Language.English
                })
            })

            describe(GenericComponent.ValidationMessage, () => {
                it(Verb.Shows + When.NoInput, () => {
                    expect(inputIs!('')).not.toBe(true);
                })

                it(Verb.Hides + When.InputIsGiven, () => {
                    expect(inputIs!('test')).toBe(true);
                })

                it(Verb.HasEnglishTranslation, () => {
                    expect(inputIs!('')).toContain('You must enter a ');
                })

                it(Verb.HasSwedishTranslation, () => {
                    i18n.global.locale.value = Language.Swedish
                    expect(inputIs!('')).toContain('Du måste ange ett ')
                    i18n.global.locale.value = Language.English
                })
            })
        })

        describe("Last Name", () => {
            beforeAll(() => {
                setup()
                inputIs = (wrapper as any).vm.lastNameRules[0];
            })

            afterAll(() => {
                teardown()
                inputIs = null
            })

            describe(GenericComponent.Label, () => {
                it(Verb.HasEnglishTranslation, () => {
                    const labelEl = wrapper!.findComponent(getSelector(RegistrationTestId.LastName))
                    expect(extractLabelTranslation(labelEl)).toBe('Last Name')
                })

                it(Verb.HasSwedishTranslation, () => {
                    i18n.global.locale.value = Language.Swedish                
                    const labelEl = wrapper!.findComponent(getSelector(RegistrationTestId.LastName))
                    expect(extractLabelTranslation(labelEl)).toBe('Efternamn')
                    i18n.global.locale.value = Language.English
                })
            })

            describe(GenericComponent.ValidationMessage, () => {
                it(Verb.Shows, () => {
                    expect(inputIs!('')).not.toBe(true);
                })

                it(Verb.Hides, () => {
                    expect(inputIs!('test')).toBe(true);
                })

                it(Verb.HasEnglishTranslation, () => {
                    expect(inputIs!('')).toContain('You must enter a ')
                })

                it(Verb.HasSwedishTranslation, () => {
                    i18n.global.locale.value = Language.Swedish
                    expect(inputIs!('')).toContain('Du måste ange ett ')
                    i18n.global.locale.value = Language.English
                })
            })
        })

        describe("Email", () => {
            beforeAll(() => {
                setup()
                inputIs = (wrapper as any).vm.emailRules[0];
            })

            afterAll(() => {
                teardown()
                inputIs = null
            })

            describe(GenericComponent.Label, () => {
                it(Verb.HasEnglishTranslation, () => {
                    const labelEl = wrapper!.findComponent(getSelector(RegistrationTestId.Email))
                    expect(extractLabelTranslation(labelEl)).toBe('Email')
                })

                it(Verb.HasSwedishTranslation, () => {
                    i18n.global.locale.value = Language.Swedish                
                    const labelEl = wrapper!.findComponent(getSelector(RegistrationTestId.Email))
                    expect(extractLabelTranslation(labelEl)).toBe('E-postadress')
                    i18n.global.locale.value = Language.English
                })
            })

            describe(GenericComponent.ValidationMessage, () => {
                it(Verb.Shows + When.NoInput, () => {
                    expect(inputIs!('')).not.toBe(true);
                })

                it(Verb.Shows + " when only local-part is given but no @ nor domain", () => {
                    expect(inputIs!('test')).not.toBe(true);
                })

                it(Verb.Shows + " when only @ is given but no local-part nor domain", () => {
                    expect(inputIs!('@')).not.toBe(true);
                })

                it(Verb.Shows + " when only domain is given but no local-part nor domain", () => {
                    expect(inputIs!('test.com')).not.toBe(true);
                })

                it(Verb.Shows + " when only local-part and @ are given but no domain", () => {
                    expect(inputIs!('test@')).not.toBe(true)
                })

                it(Verb.Shows + " when only @ and domain are given but no local-part", () => {
                    expect(inputIs!('@test.com')).not.toBe(true)
                })

                it(Verb.Hides + " when local-part, @ and domain are present in email address", () => {
                    expect(inputIs!('test@test.com')).toBe(true);
                })

                it(Verb.HasEnglishTranslation, () => {
                    expect(inputIs!('')).toEqual('Invalid email')
                })

                it(Verb.HasEnglishTranslation, () => {
                    i18n.global.locale.value = Language.Swedish
                    expect(inputIs!('')).toEqual('Ogiltig e-postadress')
                    i18n.global.locale.value = Language.English
                })
            })
        })

        describe("Person Number", () => {
            beforeAll(() => {
                setup()
                inputIs = (wrapper as any).vm.personNumberRules[0];
            })

            afterAll(() => {
                teardown()
                inputIs = null
            })

            describe(GenericComponent.Label, () => {
                it(Verb.HasEnglishTranslation, () => {
                    const labelEl = wrapper!.findComponent(getSelector(RegistrationTestId.Email))
                    expect(extractLabelTranslation(labelEl)).toBe('Email')
                })

                it(Verb.HasSwedishTranslation, () => {
                    i18n.global.locale.value = Language.Swedish                
                    const labelEl = wrapper!.findComponent(getSelector(RegistrationTestId.Email))
                    expect(extractLabelTranslation(labelEl)).toBe('E-postadress')
                    i18n.global.locale.value = Language.English
                })
            })

            describe(GenericComponent.ValidationMessage, () => {
                it(Verb.Shows + When.NoInput, () => {
                    expect(inputIs!('')).not.toBe(true);
                })

                it(Verb.Shows + " when containing letters", () => {
                    expect(inputIs!('2001010112a')).not.toBe(true);
                })

                it(Verb.Shows + " when less than 10 digits", () => {
                    expect(inputIs!('200101011')).not.toBe(true);
                })

                it(Verb.Shows + " when being 11 digits", () => {
                    expect(inputIs!('20010101123')).not.toBe(true);
                })

                it(Verb.Shows + " when more 12 digits", () => {
                    expect(inputIs!('2001010112345')).not.toBe(true);
                })

                it(Verb.Hides + " when exactly 12 digits", () => {
                    expect(inputIs!('200101011234')).toEqual(true);
                })

                it(Verb.Hides + " when exactly 10 digits", () => {
                    expect(inputIs!('0101011234')).toBe(true);
                })

                it(Verb.HasEnglishTranslation, () => {
                    expect(inputIs!('')).toEqual('Invalid person number');
                })

                it(Verb.HasSwedishTranslation, () => {
                    i18n.global.locale.value = Language.Swedish;
                    expect(inputIs!('')).toEqual('Ogiltigt personnummer');
                    i18n.global.locale.value = Language.English;
                })
            })
        })

        describe("Username", () => {
            beforeAll(() => {
                setup()
                inputIs = (wrapper as any).vm.usernameRules[0];
            })

            afterAll(() => {
                teardown()
                inputIs = null
            })

            describe(GenericComponent.Label, () => {
                it(Verb.HasEnglishTranslation, () => {
                    const labelEl = wrapper!.findComponent(getSelector(RegistrationTestId.Username))
                    expect(extractLabelTranslation(labelEl)).toBe('Username')
                })

                it(Verb.HasSwedishTranslation, () => {
                    i18n.global.locale.value = Language.Swedish                
                    const labelEl = wrapper!.findComponent(getSelector(RegistrationTestId.Username))
                    expect(extractLabelTranslation(labelEl)).toBe('Användarnamn')
                    i18n.global.locale.value = Language.English
                })
            })

            describe(GenericComponent.ValidationMessage, () => {
                it(Verb.Shows + When.NoInput, () => {
                    expect(inputIs!('')).toEqual('You must enter a username');
                })

                it(Verb.Hides + When.InputIsGiven, () => {
                    expect(inputIs!('test')).toBe(true);
                })
            })
        })
    })

    describe(GenericComponent.SubmitButton, () => {
        let buttonEl: any | null;

        beforeAll(() => {
            setup()
            buttonEl = wrapper!.find(getSelector(RegistrationTestId.Submit));
        })

        afterAll(() => {
            teardown()
            buttonEl = null
        })

        it(Verb.IsDisabled + " when form is not filled", () => {
            expect(buttonEl!.attributes('disabled')).not.toBeUndefined();
        })
    })
}) 