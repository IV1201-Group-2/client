<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { ValidationBuilder } from '@/util/validation'
import { RegistrationTestId } from '@/util/enums';
import { useI18n } from 'vue-i18n';
const i18n = useI18n();

const isFormValid = ref(false);

const { 
    registrationPath,
    formPath, 
    fieldsPath, 
    buttonsPath
} = initPaths();

const {
    firstName,
    lastName,
    email,
    personNumber,
    username,
    password
} = initInputs();

const {
    firstNameRules,
    lastNameRules,
    emailRules,
    personNumberRules,
    usernameRules,
    passwordRules
} = initValidationRules()

function initPaths() {
    const registrationPath = "applicant.registration-page."
    const formPath = registrationPath + "form."

    return { 
        registrationPath,
        formPath, 
        fieldsPath: formPath + "fields.", 
        buttonsPath: formPath + "buttons."
    }
}

function initInputs() {
   return {
        firstName: ref(""),
        lastName: ref(""),
        email: ref(""),
        personNumber: ref(""),
        username: ref(""),
        password: ref("")
   }
}

function initValidationRules() {
    const mandatoryFieldPath = "validation-util.mandatory.";

    const firstNameTranslation = ref(i18n.t(mandatoryFieldPath + "first-name"))
    const lastNameTranslation = ref(i18n.t(mandatoryFieldPath + "last-name"))
    const usernameTranslation = ref(i18n.t(mandatoryFieldPath + "username"))
    const passwordTranslation = ref(i18n.t(mandatoryFieldPath + "password"))

    watch(i18n.locale, () => {
        firstNameTranslation.value = i18n.t(mandatoryFieldPath + "first-name")
        lastNameTranslation.value = i18n.t(mandatoryFieldPath + "last-name")
        usernameTranslation.value = i18n.t(mandatoryFieldPath + "username")
        passwordTranslation.value = i18n.t(mandatoryFieldPath + "password")
    })

    const builder = new ValidationBuilder(formPath + "validations.");

    return {
        firstNameRules: computed(() => builder.isMandatory(firstNameTranslation.value).build()),
        lastNameRules: computed(() => builder.isMandatory(lastNameTranslation.value).build()),
        emailRules: builder.isEmail().build(),
        personNumberRules: builder.isPersonNumber().build(),
        usernameRules: computed(() => builder.isMandatory(usernameTranslation.value).build()),
        passwordRules: computed(() => builder.isMandatory(passwordTranslation.value).build())
    }
}
</script>

<template>
    <v-sheet width="300" class="mx-auto">
        <v-form v-model="isFormValid" @submit.prevent>
            <h1 style="text-align: center">{{ $t(registrationPath + "header") }}</h1>
            <v-text-field :data-test="RegistrationTestId.FirstName" v-model="firstName" :rules="firstNameRules" :label="$t(fieldsPath + 'first-name')" />
            <v-text-field :data-test="RegistrationTestId.LastName" v-model="lastName" :rules="lastNameRules" :label="$t(fieldsPath + 'last-name')" />
            <v-text-field :data-test="RegistrationTestId.Email" v-model="email" :rules="emailRules" :label="$t(fieldsPath + 'email')" />
            <v-text-field :data-test="RegistrationTestId.PersonNumber" v-model="personNumber" :rules="personNumberRules" :label="$t(fieldsPath + 'person-number')" />
            <v-text-field :data-test="RegistrationTestId.Username" v-model="username" :rules="usernameRules" :label="$t(fieldsPath + 'username')" />
            <v-text-field :data-test="RegistrationTestId.Password" v-model="password" :rules="passwordRules" type="password" :label="$t(fieldsPath + 'password')" />
            <v-btn :data-test="RegistrationTestId.Submit" :disabled="!isFormValid" type="submit" block>{{ $t(buttonsPath + 'submit') }}</v-btn>
        </v-form>
    </v-sheet>
</template>