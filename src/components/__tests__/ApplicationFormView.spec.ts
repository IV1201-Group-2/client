import { describe, it, expect, afterAll, beforeAll, afterEach, beforeEach } from "vitest";
import { mount, VueWrapper } from '@vue/test-utils'
import ApplicationFormView from '@/views/applicant/ApplicationFormView.vue'
import { ApplicationTestId } from "@/util/enums";
import {
    GenericComponent,
    Action,
    When,
    Language
} from "./custom_test_utils/enums"
import { extractLabelTranslation, getSelector, checkTranslation, checkEnglish } from "./custom_test_utils/functions";
import i18n from "@/i18n";
import { useI18n } from "vue-i18n";
import type WrapperLike from "node_modules/@vue/test-utils/dist/interfaces/wrapperLike";


describe("Applicant Registration View", () => {
    let wrapper: VueWrapper | null; 
    let data: any;
    const isNotInput = true;

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
            })

            afterAll(() => {
                teardown()
            })

            describe(GenericComponent.Label, () => {
                it(Action.HasEnglishTranslation, () => {
                    checkEnglish("First Name", ApplicationTestId.FirstName, wrapper)
                })

                it(Action.HasSwedishTranslation, () => {
                    checkTranslation("Förnamn", Language.Swedish, ApplicationTestId.FirstName, wrapper);
                })
            })

            describe(GenericComponent.Field, () => {
                it(Action.IsReadonly, () => {
                    const fieldEl = wrapper!.findComponent(getSelector(ApplicationTestId.FirstName));
                    expect(fieldEl.classes('v-input--readonly')).toBe(true);
                })
            })
        })

        describe("Last Name", () => {
            beforeAll(() => {
                setup()
            })

            afterAll(() => {
                teardown()
            })

            describe(GenericComponent.Label, () => {
                it(Action.HasEnglishTranslation, () => {
                    checkEnglish("Last Name", ApplicationTestId.LastName, wrapper)
                })

                it(Action.HasSwedishTranslation, () => {
                    checkTranslation("Efternamn", Language.Swedish, ApplicationTestId.LastName, wrapper)
                })
            })

            describe(GenericComponent.Field, () => {
                it(Action.IsReadonly, () => {
                    const fieldEl = wrapper!.findComponent(getSelector(ApplicationTestId.LastName));
                    expect(fieldEl.classes('v-input--readonly')).toBe(true);
                })
            })
        })

        describe("Email", () => {
            beforeAll(() => {
                setup()
            })

            afterAll(() => {
                teardown()
            })

            describe(GenericComponent.Label, () => {
                it(Action.HasEnglishTranslation, () => {
                    checkEnglish("Email", ApplicationTestId.Email, wrapper)
                })

                it(Action.HasSwedishTranslation, () => {
                    checkTranslation("E-postadress", Language.Swedish, ApplicationTestId.Email, wrapper)
                })
            })

            describe(GenericComponent.Field, () => {
                it(Action.IsReadonly, () => {
                    const fieldEl = wrapper!.findComponent(getSelector(ApplicationTestId.Email));
                    expect(fieldEl.classes('v-input--readonly')).toBe(true);
                })
            })
        })

        describe("Person Number", () => {
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
                    checkEnglish("Person Number", ApplicationTestId.PersonNumber, wrapper)
                })

                it(Action.HasSwedishTranslation, () => {
                    checkTranslation("Personnummer", Language.Swedish, ApplicationTestId.PersonNumber, wrapper)
                })
            })

            describe(GenericComponent.Field, () => {
                it(Action.IsReadonly, () => {
                    const fieldEl = wrapper!.findComponent(getSelector(ApplicationTestId.PersonNumber));
                    expect(fieldEl.classes('v-input--readonly')).toBe(true);
                })
            })
        })
    })

    describe("Competence Profile", () => {
        describe("Area of Expertise", () => {
            beforeAll(() => {
                setup()
                // inputIs = (wrapper as any).vm.firstNameRules[0];
            })

            afterAll(() => {
                teardown()
            })

            describe(GenericComponent.Label, () => {
                it(Action.HasEnglishTranslation, () => {
                    checkEnglish("Area of Expertise", ApplicationTestId.AreaOfExpertise, wrapper)
                })

                it(Action.HasSwedishTranslation, () => {
                    checkTranslation("Yrkesområde", Language.Swedish, ApplicationTestId.AreaOfExpertise, wrapper)
                })
            })

            describe(GenericComponent.List, () => {
                it(Action.Contains + " 3 items", () => {
                    data = (wrapper as any).vm.areasOfExpertise;
                    expect(data?.length).toBe(3);
                })
            })
        })

        describe("Years of Experience", () => {
            beforeAll(() => {
                setup()
            })

            afterAll(() => {
                teardown()
            })

            describe(GenericComponent.Label, () => {
                it(Action.HasEnglishTranslation, () => {
                    checkEnglish("Years of Experience", ApplicationTestId.YearsOfExperience, wrapper)
                })

                it(Action.HasSwedishTranslation, () => {
                    checkTranslation("Antal arbetsår", Language.Swedish, ApplicationTestId.YearsOfExperience, wrapper)
                })
            })
        })
    })

    describe("Add button", () => {
        let addButtonEl: WrapperLike | null

        beforeEach(() => {
            setup()
            addButtonEl = wrapper!.findComponent(getSelector(ApplicationTestId.AddCompetence))
        })

        afterEach(() => {
            teardown()
            addButtonEl = null;
        })

        describe(GenericComponent.Label, () => {
            it(Action.HasEnglishTranslation, () => {
                checkEnglish("Add", ApplicationTestId.AddCompetence, wrapper, isNotInput)
            })

            it(Action.HasSwedishTranslation, () => {
                checkTranslation("Lägg till", Language.Swedish, ApplicationTestId.AddCompetence, wrapper, isNotInput)
            })
        })

        it(Action.IsNotDisabled + " when area of expertise is selected and years of experience is positive", async () => {
            await wrapper!.findComponent(getSelector(ApplicationTestId.AreaOfExpertise)).setValue("Lotteries")
            // years of experience is 0 by default
            expect(addButtonEl!.attributes('disabled')).toBeUndefined()
        }) 

        it(Action.IsDisabled + " when area of expertise is not selected", () => {
            expect(addButtonEl!.attributes('disabled')).not.toBeUndefined()
        })

        it(Action.IsDisabled + " when years of experience is negative", async () => {
            await wrapper!.findComponent(getSelector(ApplicationTestId.YearsOfExperience)).setValue("-3")
            expect(addButtonEl!.attributes('disabled')).not.toBeUndefined()
        })

        it(Action.IsDisabled + " when area of expertise is selected but years of experience is negative", async () => {
            await wrapper!.findComponent(getSelector(ApplicationTestId.AreaOfExpertise)).setValue("Lotteries")
            await wrapper!.findComponent(getSelector(ApplicationTestId.YearsOfExperience)).setValue("-3")
            expect(addButtonEl!.attributes('disabled')).not.toBeUndefined()
        })
    })


    describe("Available Through", () => {
        describe("Start Date", () => {
            beforeAll(() => {
                setup();
            })

            afterAll(() => {
                teardown();
            })

            describe(GenericComponent.Label, () => {
                it(Action.HasEnglishTranslation, () => {
                    checkEnglish("Start Date", ApplicationTestId.StartDate, wrapper);
                })

                it(Action.HasSwedishTranslation, () => {
                    checkTranslation("Startdatum", Language.Swedish, ApplicationTestId.StartDate, wrapper)
                })
            })
        })

        describe("End Date", () => {
            beforeAll(() => {
                setup();
            })

            afterAll(() => {
                teardown();
            })
            
            describe(GenericComponent.Label, () => {
                it(Action.HasEnglishTranslation, () => {
                    checkEnglish("End Date", ApplicationTestId.EndDate, wrapper);
                })

                it(Action.HasSwedishTranslation, () => {
                    checkTranslation("Slutdatum", Language.Swedish, ApplicationTestId.EndDate, wrapper)
                })
            })
        })

       
        describe("Add button", () => {
            let addButtonEl: WrapperLike | null
            const oneDay = 24 * 60 * 60 * 1000;
            const today = new Date();
            const yesterday = new Date();
            const tomorrow = new Date();
            const dayAfterTomorrow = new Date();
            yesterday.setTime(today.getTime() - oneDay);
            tomorrow.setTime(today.getTime() + oneDay);
            dayAfterTomorrow.setTime(tomorrow.getTime() + oneDay)

            beforeEach(() => {
                setup()
                addButtonEl = wrapper!.findComponent(getSelector(ApplicationTestId.AddAvailability))
            })

            afterEach(() => {
                teardown()
                addButtonEl = null;
            })

            describe(GenericComponent.Label, () => {
                it(Action.HasEnglishTranslation, () => {
                    checkEnglish("Add", ApplicationTestId.AddAvailability, wrapper, isNotInput)
                })

                it(Action.HasSwedishTranslation, () => {
                    checkTranslation("Lägg till", Language.Swedish, ApplicationTestId.AddAvailability, wrapper, isNotInput)
                })
            })

            it(Action.IsNotDisabled + " when the start and end date are set to today", () => {
                // start and end date are set to today by default
                expect(addButtonEl!.attributes('disabled')).toBeUndefined()
            }) 

            it(Action.IsNotDisabled + " when the start and end date are set to yesterday (both start and end are in the past)", async () => {
                await wrapper!.findComponent(getSelector(ApplicationTestId.StartDate)).setValue(yesterday.toISOString().substring(0, 10))
                await wrapper!.findComponent(getSelector(ApplicationTestId.EndDate)).setValue(yesterday.toISOString().substring(0, 10))
                expect(addButtonEl!.attributes('disabled')).not.toBeUndefined()
            })
            
            it(Action.IsNotDisabled + " when the start date is set to today and end date to tomorrow (start comes before end)", async () => {
                await wrapper!.findComponent(getSelector(ApplicationTestId.EndDate)).setValue(tomorrow.toISOString().substring(0, 10))
                expect(addButtonEl!.attributes('disabled')).toBeUndefined()
            })

            it(Action.IsDisabled + " when the start date is set to yesterday and the end date to today (start is in the past)", async () => {
                await wrapper!.findComponent(getSelector(ApplicationTestId.StartDate)).setValue(yesterday.toISOString().substring(0, 10))
                expect(addButtonEl!.attributes('disabled')).not.toBeUndefined()
            })

            it(Action.IsDisabled + " when start date is set to today end date to yesterday (ends comes before start)", async () => {
                // start date set to today by default
                await wrapper!.findComponent(getSelector(ApplicationTestId.EndDate)).setValue(yesterday.toISOString().substring(0, 10))
                expect(addButtonEl!.attributes('disabled')).not.toBeUndefined()
            })

            it(Action.IsDisabled + " when start and end date is set to today, after having added availability between today and tomorrow (conflict with start)", async () => {
                await addButtonEl!.trigger('click');
                await wrapper!.findComponent(getSelector(ApplicationTestId.EndDate)).setValue(tomorrow.toISOString().substring(0, 10))
                expect(addButtonEl!.attributes('disabled')).not.toBeUndefined();
            })

            it(Action.IsDisabled + " when the start and end date when start and end date is set to tomorrow, after having added availability between today and tomorrow (conflict with end)", async () => {
                await wrapper!.findComponent(getSelector(ApplicationTestId.EndDate)).setValue(tomorrow.toISOString().substring(0, 10))
                await wrapper!.findComponent(getSelector(ApplicationTestId.EndDate)).setValue(tomorrow.toISOString().substring(0, 10))
                await addButtonEl!.trigger('click');
                await wrapper!.findComponent(getSelector(ApplicationTestId.EndDate)).setValue(today.toISOString().substring(0, 10))
                expect(addButtonEl!.attributes('disabled')).not.toBeUndefined();
            })

            it(Action.IsDisabled + " when availability has been added for tomorrow and the user attempts to add availability between today and the day after tomorrow (period contains added period)", async () => {
                await wrapper!.findComponent(getSelector(ApplicationTestId.StartDate)).setValue(tomorrow.toISOString().substring(0, 10))
                await wrapper!.findComponent(getSelector(ApplicationTestId.EndDate)).setValue(tomorrow.toISOString().substring(0, 10))
                await addButtonEl!.trigger('click');
                await wrapper!.findComponent(getSelector(ApplicationTestId.StartDate)).setValue(today.toISOString().substring(0, 10))
                await wrapper!.findComponent(getSelector(ApplicationTestId.EndDate)).setValue(dayAfterTomorrow.toISOString().substring(0, 10))
                expect(addButtonEl!.attributes('disabled')).not.toBeUndefined()
            })
        })
    })

    describe("Review Application button", () => {
        let addAvailabilityButtonEl: WrapperLike | null
        let addCompetenceButtonEl: WrapperLike | null
        let reviewApplicationEl: WrapperLike | null

        beforeEach(() => {
            setup()
            addAvailabilityButtonEl = wrapper!.findComponent(getSelector(ApplicationTestId.AddAvailability))
            addCompetenceButtonEl = wrapper!.findComponent(getSelector(ApplicationTestId.AddCompetence))
            reviewApplicationEl = wrapper!.findComponent(getSelector(ApplicationTestId.Submit))
        })

        afterEach(() => {
            teardown()
            addAvailabilityButtonEl = null;
            addCompetenceButtonEl = null;
            reviewApplicationEl = null;
        })

        describe(GenericComponent.Label, () => {
            it(Action.HasEnglishTranslation, () => {
                checkEnglish("Review Application", ApplicationTestId.Submit, wrapper, isNotInput)
            })

            it(Action.HasSwedishTranslation, () => {
                checkTranslation("Granska ansökan", Language.Swedish, ApplicationTestId.Submit, wrapper, isNotInput)
            })
        })

        it(Action.IsDisabled + " when form is not filled", () => {
            expect(reviewApplicationEl!.attributes('disabled')).not.toBeUndefined();
        })
        
        it(Action.IsDisabled + " when form is partially filled (only competence has been added)", async () => {
            await wrapper!.findComponent(getSelector(ApplicationTestId.AreaOfExpertise)).setValue("Lotteries")
            addCompetenceButtonEl?.trigger('click');
            expect(reviewApplicationEl!.attributes('disabled')).not.toBeUndefined();
        })

        it(Action.IsNotDisabled + " when form is filled", async () => {
            await wrapper!.findComponent(getSelector(ApplicationTestId.AreaOfExpertise)).setValue("Lotteries")
            addAvailabilityButtonEl?.trigger('click')
            addCompetenceButtonEl?.trigger('click')
            expect(reviewApplicationEl!.attributes('disabled')).toBeUndefined();
        })
    })
}) 