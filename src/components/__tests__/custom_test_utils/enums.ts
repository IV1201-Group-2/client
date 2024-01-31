/** 
 * FILE DESCRIPTION:
 * The enums in this file are meant to be imported to test files for more consistent adherence to naming conventions. 
 * Resort to custom strings when the component, verb or time cannot be described by any of the enums below.
 */

/**
 * DESCRIPTION: A generic component, i.e. a component that is used in many places and be referred to by the same name.
 * WHERE TO USE: Should be passed as the 1st argument to "vitest#describe()".
 * EXAMPLE: describe(GenericComponent.Label, () => { ... })
 * RULES WHEN ADDING MORE PROPERTIES: First letter should be uppercase.
 */
export enum GenericComponent {
    Label = "Label",
    ValidationMessage = "Validation message",
    SubmitButton = "Submit button"
}

/**
 * DESCRIPTION: The verb that is performed by a component or {@link GenericComponent}.
 * WHERE TO USE: Should be passed as the 1st argument to "vitest#it()" or "vitest#test()".
 * EXAMPLE: it(Verb.HasEnglishTranslation, () => { ... })
 * RULES WHEN ADDING MORE PROPERTIES: First letter should be lowercase.
 */
export enum Verb {
    HasEnglishTranslation = "has English translation",
    HasSwedishTranslation = "has Swedish translation",
    Shows = "shows",
    Hides = "hides"
}

/**
 * DESCRIPTION: When the {@link Verb} is performed.
 * WHERE TO USE: Should be concatenated with the verb.
 * EXAMPLE: it(Verb.Shows + When.NoInput, () => { ... })
 * RULES WHEN ADDING MORE PROPERTIES: 1) first character is a space 2) first letter is lowercase
 */
export enum When {
    NoInput = " when no input is given",
    InputIsGiven = " when input is given"
}

/**
 * DESCRIPTION: The language codes used by Vue I18n.
 * WHERE TO USE: When testing translations.
 * EXAMPLE: i18n.global.locale.value = Language.Swedish
 */
export enum Language {
    English = 'en',
    Swedish = 'sv'
}