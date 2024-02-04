<script setup lang="ts">
import PersonalInformation from '@/components/application_form/PersonalInformation.vue';
const basePath = "applicant.application-form-page."
</script>

<template>
    <v-sheet>
        <PersonalInformation :base-path="basePath" />
    </v-sheet>
</template>