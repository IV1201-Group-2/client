<script setup lang="ts">
import { type Ref, ref } from 'vue';

const basePath = "applicant.login-page.";
const formPath = basePath + "form.";
const fieldsPath = formPath + "fields.";
const buttonsPath = formPath + "buttons.";

const username = ref("");
const password = ref(""); 

const test = ref(false);
</script>

<template>
  <main>
    <v-sheet width="300" class="mx-auto">
      <h1>{{ $t(basePath + "header") }}</h1><br>
      <v-form @submit.prevent>
        <v-text-field v-model="username" :label="$t(fieldsPath + 'username')" />
        <v-text-field v-model="password" :label="$t(fieldsPath + 'password')" />
        <v-btn type="submit" :disabled="test" :loading="test" block>{{ $t(buttonsPath + 'login') }}</v-btn>
      </v-form>
    </v-sheet>
  </main>
</template>

<style scoped>
h1 {
  text-align: center;
}
</style>