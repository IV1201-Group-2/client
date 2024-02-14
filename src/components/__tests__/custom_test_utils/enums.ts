/**
 * FILE DESCRIPTION:
 * The enums in this file are meant to be imported to test files to enforce naming conventions.
 * Resort to custom strings when the component, action or time cannot be described by any of the enums below.
 */

/**
 * DESCRIPTION: A generic component, i.e. a component that is used in many places and be referred to by the same name.
 * WHERE TO USE: Should be passed as the 1st argument to "vitest#describe()".
 * EXAMPLE: describe(GenericComponent.Label, () => { ... })
 * RULES WHEN ADDING MORE PROPERTIES: First letter should be uppercase.
 */
export enum GenericComponent {
  Label = "Label",
  List = "List",
  Field = "Field",
  ValidationMessage = "Validation message",
  SubmitButton = "Submit button"
}

/**
 * DESCRIPTION: The action that is performed by a component or {@link GenericComponent}.
 * WHERE TO USE: Should be passed as the 1st argument to "vitest#it()" or "vitest#test()".
 * EXAMPLE: it(Action.HasEnglishTranslation, () => { ... })
 * RULES WHEN ADDING MORE PROPERTIES: First letter should be lowercase.
 */
export enum Action {
  HasEnglishTranslation = "has English translation",
  HasSwedishTranslation = "has Swedish translation",
  IsDisabled = "is disabled",
  IsNotDisabled = "is not disabled",
  IsReadonly = "is read-only",
  Shows = "shows",
  Hides = "hides",
  Contains = "contains"
}

/**
 * DESCRIPTION: When the {@link Action} is performed.
 * WHERE TO USE: Should be concatenated with the action.
 * EXAMPLE: it(Action.Shows + When.NoInput, () => { ... })
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
  English = "en",
  Swedish = "sv"
}
